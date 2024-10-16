"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
];

export default function Links() {
  const pathname = usePathname();

  return (
    <div className="flex w-full gap-1 p-1">
      {links.map((link) => (
        <Link
          key={link.href}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all ${
            pathname === link.href
              ? "active:shadow-focus-ring-alt-shadow-sm bg-tertiary text-secondary shadow-sm"
              : "text-quaternary hover:bg-tertiary hover:text-secondary hover:shadow-sm active:bg-secondary-subtle active:text-quaternary active:shadow-focus-ring-alt"
          }`}
          href={link.href}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}
