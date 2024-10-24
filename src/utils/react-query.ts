import type {
  getAllInterviews,
  getTodaysInterviews,
  getTomorrowsInterviews,
} from "@/data/interviews";
import type { getUser } from "@/utils/auth";
import type { getInterviewById, getInterviewQuestions } from "@/data/interview";
import type { getCouncilQuestions } from "@/data/council";
import type { getNotificationSettings, getSettings } from "@/data/settings";
import type {
  getNotifications,
  getUnreadNotificationCount,
} from "@/data/notifications";

export const queryKeys = {
  interviews: {
    today: () => ["interviews", "today"],
    tomorrow: () => ["interviews", "tomorrow"],
    all: ({
      pageIndex,
      pageSize,
      search,
      sortingId,
      sortingDirection,
    }: {
      pageIndex: number;
      pageSize: number;
      search: string | null;
      sortingId: string;
      sortingDirection: "asc" | "desc";
    }) => [
      "interviews",
      "completed",
      pageIndex,
      pageSize,
      search,
      sortingId,
      sortingDirection,
    ],
  },
  interview: {
    id: ({ id }: { id: string }) => ["interview", id],
    questions: ({ id }: { id: string }) => ["interview", id, "questions"],
  },
  user: {
    current: () => ["user"],
    notifications: () => ["user", "notifications"],
  },
  questions: () => ["questions"],
  settings: () => ["settings"],
  notifications: {
    get: ({ type }: { type: string }) => ["notifications", type],
    unread: () => ["notifications", "unread"],
  },
};

export const queryFunctions = {
  interviews: {
    today: () => async () => {
      const res = await fetch(`/api/interviews/today`);

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
      ({
        pageIndex,
        pageSize,
        search,
        sortingId,
        sortingDirection,
      }: {
        pageIndex: number;
        pageSize: number;
        search: string | null;
        sortingId: string;
        sortingDirection: "asc" | "desc";
      }) =>
      async () => {
        const res = await fetch(
          `/api/interviews/all?page_index=${pageIndex}&page_size=${pageSize}&search=${search ?? ""}&sorting_id=${sortingId}&sorting_direction=${sortingDirection}`,
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
  user: {
    current: async () => {
      const res = await fetch("/api/user");

      if (res.status === 401) return null;

      if (!res.ok) {
        throw new Error();
      }

      return (await res.json()) as Awaited<ReturnType<typeof getUser>>;
    },
    notifications: async () => {
      const res = await fetch("/api/user/notifications");

      if (res.status === 401) return null;

      if (!res.ok) {
        throw new Error();
      }

      return (await res.json()) as Awaited<
        ReturnType<typeof getNotificationSettings>
      >;
    },
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
  settings: async () => {
    const res = await fetch("/api/settings");

    if (res.status === 401) return null;

    if (!res.ok) {
      throw new Error();
    }

    return (await res.json()) as Awaited<ReturnType<typeof getSettings>>;
  },
  notifications: {
    get:
      ({ type }: { type: "all" | "new" }) =>
      async () => {
        const res = await fetch(`/api/notifications?type=${type}`);

        if (res.status === 401) return null;

        if (!res.ok) {
          throw new Error();
        }

        return (await res.json()) as Awaited<
          ReturnType<typeof getNotifications>
        >;
      },
    unread: async () => {
      const res = await fetch("/api/notifications/unread");

      if (res.status === 401) return null;

      if (!res.ok) {
        throw new Error();
      }

      return (await res.json()) as Awaited<
        ReturnType<typeof getUnreadNotificationCount>
      >;
    },
  },
};
