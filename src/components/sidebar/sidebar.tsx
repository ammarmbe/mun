import Links from "./links";
import User from "./user";
import DrawerWrapper from "./drawer-wrapper";

export default function Sidebar() {
  return (
    <>
      <div className="hidden h-screen w-64 flex-none flex-col justify-between border-r bg-primary md:flex">
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
