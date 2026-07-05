import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      {/* Background Blur */}
      <div className="absolute inset-0">
        <div className="absolute -left-24 -top-24 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[180px]" />
        <div className="absolute -bottom-24 -right-24 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[180px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </main>
  );
}