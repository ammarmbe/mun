import type {
  getAllInterviews,
  getAllPaginatedInterviews,
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
import { QueryClient } from "@tanstack/react-query";

export const queryKeys = {
  interviews: {
    today: () => ["interviews", "today"],
    tomorrow: () => ["interviews", "tomorrow"],
    all: ({
      council,
      pageIndex,
      pageSize,
      search,
      sortingId,
      sortingDirection,
    }: {
      council?: string;
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
      council,
    ],
    allPaginated: ({
      council,
      search,
      sortingId,
      sortingDirection,
    }: {
      council?: string;
      search: string | null;
      sortingId: string;
      sortingDirection: "asc" | "desc";
    }) => [
      "interviews",
      "completed",
      search,
      sortingId,
      sortingDirection,
      council,
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
        council,
        pageIndex,
        pageSize,
        search,
        sortingId,
        sortingDirection,
      }: {
        council?: string;
        pageIndex: number;
        pageSize: number;
        search: string | null;
        sortingId: string;
        sortingDirection: "asc" | "desc";
      }) =>
      async () => {
        const res = await fetch(
          `/api/interviews/all?page_index=${pageIndex}&page_size=${pageSize}&search=${search ?? ""}&sorting_id=${sortingId}&sorting_direction=${sortingDirection}&council=${council}`,
        );

        if (res.status === 401) return null;

        if (!res.ok) {
          throw new Error();
        }

        return (await res.json()) as Awaited<
          ReturnType<typeof getAllInterviews>
        >;
      },
    allPaginated:
      ({
        council,
        search,
        sortingId,
        sortingDirection,
      }: {
        council?: string;
        search: string | null;
        sortingId: string;
        sortingDirection: "asc" | "desc";
      }) =>
      async ({ pageParam }: { pageParam: number | null }) => {
        const res = await fetch(
          `/api/interviews/all-paginated?page_index=${pageParam}&page_size=${20}&search=${search ?? ""}&sorting_id=${sortingId}&sorting_direction=${sortingDirection}&council=${council}`,
        );

        if (res.status === 401) return null;

        if (!res.ok) {
          throw new Error();
        }

        return (await res.json()) as Awaited<
          ReturnType<typeof getAllPaginatedInterviews>
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

      return (await res.json()) as Awaited<ReturnType<typeof getUser>>["user"];
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

let clientQueryClientSingleton: QueryClient;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        throwOnError: true,
      },
    },
  });
}

export function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }

  return (clientQueryClientSingleton ??= makeQueryClient());
}
