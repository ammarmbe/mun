import { Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { queryFunctions, queryKeys } from "@/utils/react-query";
import { useEffect } from "react";

export default function Notifications() {
  const pathname = usePathname();

  const { data, refetch } = useQuery({
    queryKey: queryKeys.notifications.unread(),
    queryFn: queryFunctions.notifications.unread,
  });

  useEffect(() => {
    void refetch();
  }, [pathname]);

  return (
    <Link
      href="/notifications"
      className={`hover active flex min-w-48 items-center gap-2.5 rounded-sm px-3 py-2 font-semibold transition-all active:shadow-ring ${
        pathname === "/notifications"
          ? "bg-active text-primary"
          : "bg-primary text-secondary"
      }`}
    >
      <Bell className="text-tertiary" size={20} />
      <div className="flex items-center gap-2">
        Notifications
        <div
          className={`size-2 rounded-full bg-red-600 transition-all ${data ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </Link>
  );
}
