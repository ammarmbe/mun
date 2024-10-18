import type {
  getAllInterviews,
  getTodaysInterviews,
  getTomorrowsInterviews,
} from "@/data/interviews";
import type { getUser } from "@/utils/auth";
import type { getInterviewById, getInterviewQuestions } from "@/data/interview";
import type { getCouncilQuestions } from "@/data/council";

export const queryKeys = {
  interviews: {
    today: ({ upcoming }: { upcoming: boolean }) => [
      "interviews",
      "today",
      upcoming,
    ],
    tomorrow: () => ["interviews", "tomorrow"],
    all: ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => [
      "interviews",
      "completed",
      pageIndex,
      pageSize,
    ],
  },
  interview: {
    id: ({ id }: { id: string }) => ["interview", id],
    questions: ({ id }: { id: string }) => ["interview", id, "questions"],
  },
  user: () => ["user"],
  questions: () => ["questions"],
};

export const queryFunctions = {
  interviews: {
    today:
      ({ upcoming }: { upcoming: boolean }) =>
      async () => {
        const res = await fetch(`/api/interviews/today?upcoming=${upcoming}`);

        if (res.status === 401) return null;

        if (!res.ok) {
          throw new Error();
        }

        return (await res.json()) as Awaited<
          ReturnType<typeof getTodaysInterviews>
        >;
      },
    tomorrow: async () => {
      const res = await fetch("/api/interviews/tomorrow");

      if (res.status === 401) return null;

      if (!res.ok) {
        throw new Error();
      }

      return (await res.json()) as Awaited<
        ReturnType<typeof getTomorrowsInterviews>
      >;
    },
    all:
      ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) =>
      async () => {
        const res = await fetch(
          `/api/interviews/all?page_index=${pageIndex}&page_size=${pageSize}`,
        );

        if (res.status === 401) return null;

        if (!res.ok) {
          throw new Error();
        }

        return (await res.json()) as Awaited<
          ReturnType<typeof getAllInterviews>
        >;
      },
  },
  interview: {
    id:
      ({ id }: { id: string }) =>
      async () => {
        const res = await fetch(`/api/interview/${id}`);

        if (res.status === 401) return null;

        if (!res.ok) {
          throw new Error();
        }

        return (await res.json()) as Awaited<
          ReturnType<typeof getInterviewById>
        >;
      },
    questions:
      ({ id }: { id: string }) =>
      async () => {
        const res = await fetch(`/api/interview/${id}/questions/`);

        if (res.status === 401) return null;

        if (!res.ok) {
          throw new Error();
        }

        return (await res.json()) as Awaited<
          ReturnType<typeof getInterviewQuestions>
        >;
      },
  },
  user: async () => {
    const res = await fetch("/api/user");

    if (res.status === 401) return null;

    if (!res.ok) {
      throw new Error();
    }

    return (await res.json()) as Awaited<ReturnType<typeof getUser>>;
  },
  questions: async () => {
    const res = await fetch("/api/questions");

    if (res.status === 401) return null;

    if (!res.ok) {
      throw new Error();
    }

    return (await res.json()) as Awaited<
      ReturnType<typeof getCouncilQuestions>
    >;
  },
};
