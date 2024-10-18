"use client";

import buttonStyles from "@/utils/styles/button";
import { inputStyles, labelStyles } from "@/utils/styles/input";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Spinner from "@/components/spinner";
import Loading from "@/app/settings/questions/loading";
import { Plus, Trash2 } from "lucide-react";

export default function Questions() {
  const queryClient = useQueryClient();

  const [questions, setQuestions] = useState<
    | {
        number: number;
        question: string;
      }[]
    | null
  >(null);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.questions(),
    queryFn: queryFunctions.questions,
  });

  const updateMutation = useMutation({
    mutationFn: async (
      questions: {
        number: number;
        question: string;
      }[],
    ) => {
      if (questions === null) {
        throw new Error("MISSING_DATA");
      }

      const res = await fetch("/api/questions", {
        method: "PATCH",
        body: JSON.stringify(questions),
      });

      if (!res.ok) {
        throw new Error();
      }
    },
    onError: () => {
      if (
        updateMutation.error instanceof Error &&
        updateMutation.error.message === "MISSING_DATA"
      ) {
        toast.custom((t) => (
          <Toast
            variant="error"
            title="Missing data"
            t={t}
            message="Please add at least one question."
          />
        ));
      }

      toast.custom((t) => (
        <Toast
          variant="error"
          title="An error occurred"
          t={t}
          message="We couldn't save your questions. Please try again."
        />
      ));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.user(),
      });

      toast.custom((t) => (
        <Toast
          variant="success"
          title="Questions saved"
          t={t}
          message="Your questions has been saved successfully."
        />
      ));
    },
  });

  useEffect(() => {
    !questions && data && setQuestions(data.questions);
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="-m-px mt-0 flex flex-grow flex-col rounded-2xl border bg-primary">
      <div className="flex justify-between gap-4 border-b p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Interview questions</h2>
          <p className="text-sm text-tertiary">
            You can edit these questions if your AC head allows it.
          </p>
        </div>
        <button
          className={buttonStyles({
            variant: "primary",
            size: "md",
          })}
          disabled={updateMutation.isPending || !questions || !data?.canEdit}
          onClick={() => questions && updateMutation.mutate(questions)}
        >
          {updateMutation.isPending ? <Spinner size={16} /> : null}
          <span>Save</span>
        </button>
      </div>
      <div className="flex flex-grow flex-col">
        {questions?.length ? (
          <>
            {questions.map((question, index) => (
              <div
                className="grid gap-1.5 border-b p-4 md:grid-cols-[1fr,2fr]"
                key={question.number}
              >
                <label
                  htmlFor={question.number.toString()}
                  className={labelStyles({ required: true })}
                >
                  Question {index + 1}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id={question.number.toString()}
                    value={question.question}
                    onChange={(e) =>
                      setQuestions((prev) =>
                        prev!.map((q) =>
                          q.number === question.number
                            ? { ...q, question: e.target.value }
                            : q,
                        ),
                      )
                    }
                    disabled={!data?.canEdit}
                    className={inputStyles(
                      {
                        variant: "primary",
                        size: "sm",
                      },
                      "w-full",
                    )}
                  />
                  {data?.canEdit ? (
                    <button
                      className={buttonStyles({
                        variant: "secondary",
                        size: "md",
                        symmetrical: true,
                      })}
                      disabled={!data?.canEdit}
                      onClick={() => {
                        setQuestions((prev) =>
                          prev!.filter((q) => q.number !== question.number),
                        );
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {data?.canEdit ? (
              <div className="flex items-center justify-center p-4">
                <button
                  className={buttonStyles({
                    variant: "secondary",
                    size: "sm",
                  })}
                  disabled={!data?.canEdit}
                  onClick={() => {
                    const newQuestions = questions ?? [];

                    setQuestions([
                      ...newQuestions,
                      {
                        number: newQuestions.length + 1,
                        question: "",
                      },
                    ]);
                  }}
                >
                  <Plus size={16} />
                  <span>Add question</span>
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center gap-5 font-semibold">
            <p>No questions found</p>
            {data?.canEdit ? (
              <button
                className={buttonStyles({
                  variant: "secondary",
                  size: "sm",
                })}
                onClick={() => {
                  const newQuestions = questions ?? [];

                  setQuestions([
                    ...newQuestions,
                    {
                      number: newQuestions.length + 1,
                      question: "",
                    },
                  ]);
                }}
              >
                <Plus size={16} />
                <span>Add question</span>
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
