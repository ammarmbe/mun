"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";

const links = ["all", "new"];

export default function Links() {
  const [type] = useQueryState("type", { defaultValue: "all" });

  return (
    <div className="flex w-full flex-wrap gap-1 p-1">
      {links.map((link) => (
        <Link
          key={link}
          className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize transition-all ${
            type === link
              ? "bg-primary-alt text-secondary shadow-sm active:shadow-ring-alt-shadow-sm dark:bg-tertiary"
              : "text-quaternary hover:bg-primary-alt hover:text-secondary hover:shadow-sm active:bg-secondary-subtle active:text-quaternary active:shadow-ring-alt dark:hover:bg-tertiary"
          }`}
          href={`/notifications?type=${link}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
