"use client";

import buttonStyles from "@/utils/styles/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Links from "./links";
import User from "./user";
import { usePathname } from "next/navigation";
import { Drawer } from "vaul";
import Image from "next/image";
import { queryKeys, queryFunctions } from "@/utils/react-query";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const { data: user, refetch } = useQuery({
    queryKey: queryKeys.user.current(),
    queryFn: queryFunctions.user.current,
  });

  useEffect(() => {
    setOpen(false);
    refetch();
  }, [pathname]);

  if (
    pathname === "/login" ||
    pathname === "/form" ||
    pathname === "/success"
  ) {
    return null;
  }

  return (
    <>
      <div className="m-1 hidden h-[calc(100dvh-0.5rem)] w-72 flex-none flex-col justify-between rounded-2xl border bg-primary shadow-xs md:flex">
        <Links user={user} />
        <User user={user} />
      </div>
      <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
        <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-primary p-4 md:hidden">
          <Link href="/">
            <Image
              src="/logo.png"
              height={32}
              width={32}
              alt="Logo"
              className="h-fit"
            />
          </Link>
          <Drawer.Trigger asChild>
            <button
              className={buttonStyles({
                variant: "tertiary",
                size: "sm",
                symmetrical: true,
              })}
            >
              <Menu size={20} />
            </button>
          </Drawer.Trigger>
        </header>
        <Drawer.Portal>
          <Drawer.Content className="fixed right-0 top-0 z-40 flex h-[100dvh] w-3/4 flex-col justify-between border-l bg-primary pb-[env(safe-area-inset-bottom,20px)]">
            <Drawer.Title hidden>Main menu</Drawer.Title>
            <Drawer.Description hidden>Navigation links</Drawer.Description>
            <Links user={user} />
            <User user={user} />
            <Drawer.Close asChild>
              <button
                className={buttonStyles(
                  {
                    variant: "tertiary",
                    size: "sm",
                    symmetrical: true,
                  },
                  "absolute right-4 top-4",
                )}
              >
                <X size={20} />
              </button>
            </Drawer.Close>
          </Drawer.Content>
          <Drawer.Overlay className="fixed inset-0 z-30 bg-black/40" />
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
