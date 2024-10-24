"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

const links = [
  {
    href: "/settings/personal",
    text: "Personal",
  },
  {
    href: "/settings/notifications",
    text: "Notifications",
  },
  {
    href: "/settings/questions",
    text: "Questions",
  },
  {
    href: "/settings/admin",
    text: "Admin",
  },
];

export default function Links({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-wrap gap-1 p-1">
      {links.map((link) =>
        !(link.text === "Admin" && !user.admin) ? (
          <Link
            key={link.href}
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
              pathname === link.href
                ? "bg-primary-alt text-secondary shadow-sm active:shadow-ring-alt-shadow-sm dark:bg-tertiary"
                : "text-quaternary hover:bg-primary-alt hover:text-secondary hover:shadow-sm active:bg-secondary-subtle active:text-quaternary active:shadow-ring-alt dark:hover:bg-tertiary"
            }`}
            href={link.href}
          >
            {link.text}
          </Link>
        ) : null,
      )}
    </div>
  );
}
