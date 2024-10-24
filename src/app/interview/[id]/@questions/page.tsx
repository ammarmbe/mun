"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import Loading from "@/app/interview/[id]/@questions/loading";
import { notFound, useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import buttonStyles from "@/utils/styles/button";
import { Check, Pencil } from "lucide-react";
import { toast } from "sonner";
import Toast from "@/components/toast";
import { getGradeColor } from "@/utils";
import Spinner from "@/components/spinner";
import Textarea from "@/app/interview/[id]/@questions/textarea";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(
    searchParams.get("editing") === "true",
  );
  const [grade, setGrade] = useState("");
  const [notes, setNotes] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [data, setData] = useState<
    {
      id: string;
      value: string;
      answer: string;
    }[]
  >([]);

  const { data: questions, isLoading } = useQuery({
    queryKey: queryKeys.interview.questions({ id: params.id }),
    queryFn: queryFunctions.interview.questions({ id: params.id }),
  });

  const answerMutation = useMutation({
    mutationFn: async (data: {
      answers: {
        id: string;
        value: string;
        answer: string;
      }[];
      grade: string;
      universityId: string;
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
          value: question.value,
          answer: question.answers[0]?.answer,
        })),
      );
    }

    setGrade(questions?.grade || "");
    setNotes(questions?.notes || "");
    setUniversityId(questions?.universityId || "");
  }, [questions]);

  if (isLoading) return <Loading />;

  if (questions === null) return null;

  if (!questions?.questions.length) notFound();

  return (
    <main className="m-4 mt-0 flex flex-grow flex-col overflow-hidden rounded-2xl border md:m-1 md:mx-0 md:mt-1 md:h-[calc(100dvh-0.5rem)]">
      <div className="flex items-center justify-between border-b bg-primary p-4 md:p-6">
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
            className={buttonStyles(
              {
                size: "sm",
                variant: "primary",
              },
              "min-h-[2.375rem]",
            )}
            onClick={async () => {
              if (editing) {
                await answerMutation.mutateAsync({
                  answers: data.map((q) => ({
                    id: q.id,
                    answer: q.answer,
                    value: q.value,
                  })),
                  grade,
                  universityId,
                  notes,
                });
              } else {
                setEditing((prev) => !prev);
              }
            }}
            disabled={answerMutation.isPending}
          >
            {answerMutation.isPending ? (
              <Spinner size={16} />
            ) : editing ? (
              <Check size={16} />
            ) : (
              <Pencil size={16} />
            )}
            <span>{editing ? "Save" : "Edit"}</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 overflow-auto p-4 md:p-6">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="university-id"
            className="text-sm font-medium text-primary"
          >
            University ID
          </label>
          {editing ? (
            <Textarea
              value={universityId || ""}
              onChange={(e) => {
                setUniversityId(e.target.value);
              }}
            />
          ) : (
            <p className="text-secondary">
              {universityId || (
                <span className="text-disabled">Not specified</span>
              )}
            </p>
          )}
        </div>
        {data.map((question) => (
          <div key={question.id} className="flex flex-col gap-1.5">
            <label
              htmlFor={question.id}
              className="text-sm font-medium text-primary"
            >
              {question.value}
            </label>
            {editing ? (
              <Textarea
                value={question.answer || ""}
                onChange={(e) => {
                  const index = data.findIndex((q) => q.id === question.id);
                  const newData = [...data];

                  newData[index].answer = e.target.value;

                  setData(newData);
                }}
              />
            ) : (
              <p className="text-secondary">
                {questions.questions.filter((q) => q.id === question.id)[0]
                  .answers[0]?.answer || (
                  <span className="text-disabled">Not specified</span>
                )}
              </p>
            )}
          </div>
        ))}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="grade" className="text-sm font-medium text-primary">
            Grade
          </label>
          {editing ? (
            <Textarea
              value={grade || ""}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
            />
          ) : (
            <p className={getGradeColor(grade, "text-secondary")}>
              {grade || <span className="text-disabled">Not specified</span>}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="notes" className="text-sm font-medium text-primary">
            Notes
          </label>
          {editing ? (
            <Textarea
              value={notes || ""}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          ) : (
            <p className="text-secondary">
              {notes || <span className="text-disabled">Not specified</span>}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
