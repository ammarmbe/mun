"use client";

import buttonStyles from "@/utils/styles/button";
import { inputStyles, labelStyles } from "@/utils/styles/input";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Spinner from "@/components/spinner";
import Loading from "@/app/settings/questions/loading";
import { Plus, Trash2 } from "lucide-react";
import type { getCouncilQuestions } from "@/data/council";
import type { User } from "@prisma/client";

export default function Questions({ user }: { user: User }) {
  const [questions, setQuestions] = useState<
    | NonNullable<Awaited<ReturnType<typeof getCouncilQuestions>>>["questions"]
    | null
  >(null);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.questions(),
    queryFn: queryFunctions.questions,
  });

  const updateMutation = useMutation({
    mutationFn: async (
      questions: NonNullable<
        Awaited<ReturnType<typeof getCouncilQuestions>>
      >["questions"],
    ) => {
      if (
        questions === null ||
        questions.some(([_, councilQuestions]) =>
          councilQuestions.some((q) => !q.value),
        )
      ) {
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
            message="Please fill all the required fields."
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
      toast.custom((t) => (
        <Toast
          variant="success"
          title="Page saved"
          t={t}
          message="Your questions have been saved successfully."
        />
      ));
    },
  });

  useEffect(() => {
    !questions && data && setQuestions(data.questions);
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="-m-px mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border bg-primary">
      <div className="flex justify-between gap-4 border-b p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Interview questions</h2>
          <p className="text-sm text-tertiary">
            {user.admin
              ? "You can edit all councils' questions."
              : "You can edit these questions if your AC head allows it."}
          </p>
        </div>
        <button
          className={buttonStyles({
            variant: "primary",
            size: "sm",
          })}
          disabled={updateMutation.isPending || !questions || !data?.canEdit}
          onClick={() => questions && updateMutation.mutate(questions)}
        >
          {updateMutation.isPending ? <Spinner size={16} /> : null}
          <span>Save</span>
        </button>
      </div>
      <div className="relative flex flex-grow flex-col">
        <div className="inset-0 flex flex-col overflow-auto md:absolute">
          {questions?.map(([council, councilQuestions]) => (
            <div
              className="grid gap-5 border-b p-4 last:border-b-0 sm:grid-cols-2 md:grid-cols-[1fr,2fr]"
              key={council}
            >
              <div className="flex flex-col">
                <p className={labelStyles({ required: true })}>
                  {council} questions
                </p>
                <p className="mt-1 text-sm text-tertiary">
                  Changing a question will not delete previous answers.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {councilQuestions.length ? (
                  councilQuestions.map((question) => (
                    <div className="flex items-center gap-3" key={question.id}>
                      <input
                        type="text"
                        value={question.value}
                        onChange={(e) =>
                          setQuestions((prev) => {
                            if (!prev) return prev;

                            const newQuestions = prev.map(
                              ([council, questions]) => {
                                if (council !== council)
                                  return [council, questions];

                                return [
                                  council,
                                  questions.map((q) => {
                                    if (q.order !== question.order) return q;

                                    return {
                                      ...q,
                                      value: e.target.value,
                                    };
                                  }),
                                ];
                              },
                            );

                            return newQuestions as typeof prev;
                          })
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
                          className={buttonStyles(
                            {
                              variant: "tertiary",
                              size: "md",
                              symmetrical: true,
                            },
                            "h-fit",
                          )}
                          disabled={!data?.canEdit}
                          onClick={() => {
                            setQuestions((prev) => {
                              if (!prev) return prev;

                              return prev.map(([council, questions]) => {
                                if (council !== council)
                                  return [council, questions];

                                return [
                                  council,
                                  questions
                                    .filter((q) => q.order !== question.order)
                                    .map((q, i) => ({
                                      ...q,
                                      order: i + 1,
                                    })),
                                ];
                              });
                            });
                          }}
                        >
                          <Trash2 size={20} />
                        </button>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="flex h-[2.625rem] items-center justify-center text-center text-sm text-disabled">
                    <p>No questions found</p>
                  </div>
                )}
                <button
                  className={buttonStyles({
                    variant: "secondary",
                    size: "sm",
                  })}
                  disabled={!data?.canEdit}
                  onClick={() => {
                    setQuestions((prev) => {
                      if (!prev) return prev;

                      const newQuestions = prev.map(
                        ([council, councilQuestions]) => {
                          if (council !== council)
                            return [council, councilQuestions];

                          return [
                            council,
                            [
                              ...councilQuestions,
                              {
                                order: councilQuestions.length + 1,
                                value: "",
                              },
                            ],
                          ];
                        },
                      );

                      return newQuestions as typeof prev;
                    });
                  }}
                >
                  <Plus size={16} />
                  <span>Add question</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
