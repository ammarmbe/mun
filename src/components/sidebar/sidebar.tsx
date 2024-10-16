import Links from "./links";
import User from "./user";
import DrawerWrapper from "./drawer-wrapper";

export default function Sidebar() {
  return (
    <>
      <div className="m-1 hidden h-[calc(100dvh-0.5rem)] w-72 flex-none flex-col justify-between rounded-2xl border bg-primary shadow-xs md:flex">
        <Links />
        <User />
      </div>
      <DrawerWrapper>
        <Links />
        <User />
      </DrawerWrapper>
    </>
  );
}
