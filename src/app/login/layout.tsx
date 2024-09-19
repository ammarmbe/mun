import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary flex h-screen justify-center py-24">
      <div className="bg-primary flex h-fit flex-col items-center rounded-2xl border px-10 py-8 shadow-sm">
        <Image priority src="/logo.png" height={48} width={48} alt="Logo" />
        <h1 className="text-display-xs mt-6 font-semibold">Sign in</h1>
        {children}
      </div>
    </div>
  );
}
