"use client";

import { useEffect, useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import {
  Bell,
  Menu,
  UserCircle2,
} from "lucide-react";

import api from "@/lib/api";

interface Props {
  onOpenSidebar?: () => void;
}

export default function Navbar({
  onOpenSidebar,
}: Props) {
  const pathname = usePathname();

  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res =
        await api.get(
          "/participant/profile"
        );

      setProfile(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const title = useMemo(() => {
    if (pathname === "/dashboard")
      return "Dashboard";

    if (
      pathname.startsWith(
        "/dashboard/profile"
      )
    )
      return "Profile";

    if (
      pathname.startsWith(
        "/dashboard/team"
      )
    )
      return "My Team";

    if (
      pathname.startsWith(
        "/dashboard/documents"
      )
    )
      return "Documents";

    if (
      pathname.startsWith(
        "/dashboard/status"
      )
    )
      return "Registration Status";

    if (
      pathname.startsWith(
        "/dashboard/competition"
      )
    )
      return "Competition";

    return "Dashboard";
  }, [pathname]);

  const initials = useMemo(() => {
    if (!profile?.leader_name)
      return "U";

    return profile.leader_name
      .split(" ")
      .map(
        (item: string) =>
          item[0]
      )
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [profile]);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/90 px-6 backdrop-blur-lg lg:px-8">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        <button
          onClick={onOpenSidebar}
          className="rounded-xl p-2 transition hover:bg-white/10 lg:hidden"
        >
          <Menu className="text-white" />
        </button>

        <div>

          <h1 className="text-2xl font-bold text-white">
            {title}
          </h1>

          <p className="text-sm text-slate-400">
            Welcome back 👋
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-6">

        <button className="relative rounded-xl p-2 transition hover:bg-white/10">

          <Bell className="text-white" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white">

            {initials}

          </div>

          <div className="hidden sm:block">

            <h3 className="text-sm font-semibold text-white">

              {profile?.leader_name ??
                "Participant"}

            </h3>

            <p className="text-xs text-slate-400">

              {profile?.competition
                ?.competition_name ??
                "Participant"}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}