"use client";

import { BookOpen, BookOpenText, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "@prisma/client";
import { useMemo } from "react";
import Image from "next/image";
import Notifications from "./notifications";
import { queryKeys, queryFunctions } from "@/utils/react-query";
import { useQuery } from "@tanstack/react-query";

export default function Links({ user }: { user: User | null | undefined }) {
  const pathname = usePathname();

  const { data: settings } = useQuery({
    queryKey: queryKeys.settings(),
    queryFn: queryFunctions.settings,
  });

  const links = useMemo(() => {
    const links = [{ href: "/home", label: "Home", icon: Home }];

    if (user?.council) {
      links.push({
        href: `/interviews/${user?.council}`,
        label: `${user?.council} interviews`,
        icon: BookOpen,
      });
    }

    if (
      settings?.find((setting) => setting.id === "canAccess")?.value ===
        "TRUE" ||
      user?.admin
    ) {
      links.push({
        href: "/interviews",
        label: "All interviews",
        icon: BookOpenText,
      });
    }

    return links;
  }, [user]);

  return (
    <div className="flex flex-grow flex-col justify-between">
      <div className="flex flex-col">
        <div className="relative mx-4 mb-0.5 mt-[1.125rem] size-[32px] md:mx-5 md:mb-0 md:mt-5 md:size-[56px] md:py-0">
          <Image
            src="/logo.png"
            fill
            sizes="(min-width: 768px) 56px, 32px"
            alt="Logo"
          />
        </div>
        <nav className="mt-5 flex flex-col gap-1 px-2 md:px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover active flex min-w-48 items-center gap-2.5 rounded-sm px-3 py-2 font-semibold transition-all active:shadow-ring ${
                pathname === link.href
                  ? "bg-active text-primary"
                  : "bg-primary text-secondary"
              }`}
            >
              <link.icon className="text-tertiary" size={20} />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-1 px-2 md:px-4">
        <Link
          href="/settings"
          className={`hover active flex min-w-48 items-center gap-2.5 rounded-sm px-3 py-2 font-semibold transition-all active:shadow-ring ${
            pathname === "/settings"
              ? "bg-active text-primary"
              : "bg-primary text-secondary"
          }`}
        >
          <Settings className="text-tertiary" size={20} />
          Settings
        </Link>
        <Notifications />
      </div>
    </div>
  );
}
