"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interviews/[id]/@questions/loading";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { inputStyles } from "@/utils/styles/input";
import buttonStyles from "@/utils/styles/button";
import { Check, Pencil } from "lucide-react";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { getGradeColor } from "@/utils";

export default function Page({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [editing, setEditing] = React.useState(
    searchParams.get("editing") === "true",
  );
  const [grade, setGrade] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [data, setData] = React.useState<
    {
      id: string;
      question: string;
      answer: string;
    }[]
  >([]);

  const { data: questions, isLoading } = useQuery({
    queryKey: queryKeys.interview.questions({ id: params.id }),
    queryFn: queryFunctions.interview.questions({ id: params.id }),
    throwOnError: true,
  });

  const answerMutation = useMutation({
    mutationFn: async (data: {
      answers: {
        id: string;
        answer: string;
      }[];
      grade: string;
      notes: string;
    }) => {
      const res = await fetch(`/api/interview/${params.id}/questions/`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error();
      }
    },
    onError: () => {
      toast.custom((t) => (
        <Toast
          variant="error"
          title="An error occurred"
          t={t}
          message="We couldn't save the answers. Please try again."
        />
      ));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.interview.questions({ id: params.id }),
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.interview.id({ id: params.id }),
      });

      toast.custom((t) => (
        <Toast
          variant="success"
          title="Answers saved"
          t={t}
          message="The answers have been saved successfully."
        />
      ));

      setEditing(false);
    },
  });

  useEffect(() => {
    if (questions?.questions.length) {
      setData(
        questions.questions.map((question) => ({
          id: question.id,
          question: question.question,
          answer: question.answers[0].answer,
        })),
      );
    }

    setGrade(questions?.grade || "");
    setNotes(questions?.notes || "");
  }, [questions]);

  if (isLoading) return <Loading />;

  if (questions === null) {
    return (
      <main className="flex flex-grow flex-col gap-8 px-4 py-8 md:px-8">
        <div className="flex min-h-72 flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">You are not logged in</h1>
          <p className="mt-1 text-sm font-medium text-secondary">
            Please log in to view this interview&apos;s questions
          </p>
        </div>
      </main>
    );
  }

  if (!questions?.questions.length) {
    notFound();
  }

  return (
    <main className="flex flex-grow flex-col md:h-screen">
      <div className="sticky top-[4.0625rem] flex items-center justify-between bg-primary px-4 py-8 md:static md:px-8">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          Answers
        </h1>
        <div className="flex gap-3">
          {editing ? (
            <button
              className={buttonStyles({
                size: "sm",
                variant: "secondary",
              })}
              onClick={() => {
                setEditing(false);
              }}
            >
              <span>Cancel</span>
            </button>
          ) : null}
          <button
            className={buttonStyles({
              size: "sm",
              variant: "primary",
            })}
            onClick={async () => {
              if (editing) {
                await answerMutation.mutateAsync({
                  answers: data.map((q) => ({ id: q.id, answer: q.answer })),
                  grade,
                  notes,
                });
              } else {
                setEditing((prev) => !prev);
              }
            }}
            disabled={answerMutation.isPending}
          >
            {editing ? <Check size={16} /> : <Pencil size={16} />}
            <span>{editing ? "Save" : "Edit"}</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 overflow-auto px-4 pb-8 md:px-8">
        {data.map((question) => (
          <div key={question.id} className="flex flex-col gap-1.5">
            <label
              htmlFor={question.id}
              className="text-sm font-medium text-primary"
            >
              {question.question}
            </label>
            {editing ? (
              <textarea
                rows={3}
                className={inputStyles(
                  {
                    size: "md",
                    variant: "primary",
                  },
                  "w-full max-w-96",
                )}
                value={question.answer}
                onChange={(e) => {
                  const index = data.findIndex((q) => q.id === question.id);
                  const newData = [...data];

                  newData[index].answer = e.target.value;

                  setData(newData);
                }}
              />
            ) : (
              <p className="text-secondary">
                {
                  questions.questions.filter((q) => q.id === question.id)[0]
                    .answers[0].answer
                }
              </p>
            )}
          </div>
        ))}
        <div key="grade" className="flex flex-col gap-1.5">
          <label htmlFor="grade" className="text-sm font-medium text-primary">
            Grade
          </label>
          {editing ? (
            <textarea
              rows={3}
              className={inputStyles(
                {
                  size: "md",
                  variant: "primary",
                },
                "w-full max-w-96",
              )}
              value={grade || ""}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
            />
          ) : (
            <p className={getGradeColor(grade, "text-secondary")}>
              {grade || <span className="text-disabled">No grade added</span>}
            </p>
          )}
        </div>
        <div key="notes" className="flex flex-col gap-1.5">
          <label htmlFor="notes" className="text-sm font-medium text-primary">
            Notes
          </label>
          {editing ? (
            <textarea
              rows={3}
              className={inputStyles(
                {
                  size: "md",
                  variant: "primary",
                },
                "w-full max-w-96",
              )}
              value={notes || ""}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          ) : (
            <p className="text-secondary">
              {notes || <span className="text-disabled">No notes added</span>}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
