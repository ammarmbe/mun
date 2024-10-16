"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import buttonStyles from "@/utils/styles/button";
import { Drawer } from "vaul";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DrawerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Drawer.Root direction="right" open={open} onOpenChange={setOpen}>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-primary p-4 md:hidden">
        <Image
          src="/logo.png"
          height={32}
          width={32}
          alt="Logo"
          className="h-fit"
        />
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
        <Drawer.Content className="fixed right-0 top-0 z-40 flex h-[100dvh] w-3/4 flex-col justify-between border-l bg-primary">
          <Drawer.Title hidden>Main menu</Drawer.Title>
          <Drawer.Description hidden>Navigation links</Drawer.Description>
          {children}
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
  );
}
