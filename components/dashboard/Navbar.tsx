"use client";

import {
  Bell,
  UserCircle2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950 px-8">

      <div>

        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-slate-400">
          Welcome back 👋
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell className="text-white" />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-3">

          <UserCircle2
            size={40}
            className="text-cyan-400"
          />

          <div>

            <h3 className="text-sm font-semibold text-white">
              Ahmad Cucus
            </h3>

            <p className="text-xs text-slate-400">
              Participant
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}