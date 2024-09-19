"use client";

import { Bell, Check, CircleAlert, Home, Settings, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/interviews/completed", label: "Completed", icon: Check },
  { href: "/interviews/missed", label: "Missed", icon: CircleAlert },
  { href: "/interviews/upcoming", label: "Upcoming", icon: Timer },
];

export default function Links() {
  const pathname = usePathname();

  return (
    <div className="flex flex-grow flex-col justify-between">
      <div className="flex flex-col">
        <div className="relative mx-5 mt-4 size-[32px] md:mx-6 md:mt-8 md:size-[56px]">
          <Image
            src="/logo.png"
            fill
            sizes="(min-width: 768px) 56px, 32px"
            alt="Logo"
          />
        </div>
        <nav className="mt-5 flex flex-col gap-1 px-2 md:mt-6 md:px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover active flex min-w-48 items-center gap-3 rounded-md px-3 py-3 font-semibold transition-all active:shadow-focus-ring ${
                pathname === link.href
                  ? "bg-active text-primary"
                  : "bg-primary text-secondary"
              }`}
            >
              <link.icon className="text-tertiary" size={24} />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-1 px-2 md:px-4">
        <Link
          href="/settings"
          className={`hover active flex min-w-48 items-center gap-3 rounded-md px-3 py-3 font-semibold transition-all active:shadow-focus-ring ${
            pathname === "/settings"
              ? "bg-active text-primary"
              : "bg-primary text-secondary"
          }`}
        >
          <Settings className="text-tertiary" size={24} />
          Settings
        </Link>
        <Link
          href="/notifications"
          className={`hover active flex min-w-48 items-center gap-3 rounded-md px-3 py-3 font-semibold transition-all active:shadow-focus-ring ${
            pathname === "/notifications"
              ? "bg-active text-primary"
              : "bg-primary text-secondary"
          }`}
        >
          <Bell className="text-tertiary" size={24} />
          Notifications
        </Link>
      </div>
    </div>
  );
}
