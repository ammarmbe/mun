import {
  getCompletedInterviews,
  getMissedInterviews,
  getTodaysInterviews,
  getTomorrowsInterviews,
  getUpcomingInterviews,
} from "@/data/interviews";
import { getUser } from "@/utils/auth/user";
import { getInterviewById, getInterviewQuestions } from "@/data/interview";

export const queryKeys = {
  interviews: {
    today: ({ upcoming }: { upcoming: boolean }) => [
      "interviews",
      "today",
      upcoming,
    ],
    tomorrow: () => ["interviews", "tomorrow"],
    completed: () => ["interviews", "completed"],
    missed: () => ["interviews", "missed"],
    upcoming: () => ["interviews", "upcoming"],
  },
  interview: {
    id: ({ id }: { id: string }) => ["interview", id],
    questions: ({ id }: { id: string }) => ["interview", id, "questions"],
  },
  user: () => ["user"],
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
    completed: async () => {
      const res = await fetch("/api/interviews/completed");

      if (res.status === 401) return null;

      if (!res.ok) {
        throw new Error();
      }

      return (await res.json()) as Awaited<
        ReturnType<typeof getCompletedInterviews>
      >;
    },
    missed: async () => {
      const res = await fetch("/api/interviews/missed");

      if (res.status === 401) return null;

      if (!res.ok) {
        throw new Error();
      }

      return (await res.json()) as Awaited<
        ReturnType<typeof getMissedInterviews>
      >;
    },
    upcoming: async () => {
      const res = await fetch("/api/interviews/upcoming");

      if (res.status === 401) return null;

      if (!res.ok) {
        throw new Error();
      }

      return (await res.json()) as Awaited<
        ReturnType<typeof getUpcomingInterviews>
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
};
