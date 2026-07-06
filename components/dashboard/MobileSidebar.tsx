"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Trophy,
  User,
  Users,
  FileText,
  ClipboardCheck,
  LogOut,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Competition",
    href: "/dashboard/competition",
    icon: Trophy,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "My Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Documents",
    href: "/dashboard/document",
    icon: FileText,
  },
  {
    title: "Registration Status",
    href: "/dashboard/status",
    icon: ClipboardCheck,
  },
];

export default function MobileSidebar({
  open,
  onClose,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition lg:hidden ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-slate-950 border-r border-white/10 shadow-2xl transition-transform duration-300 lg:hidden

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-6">

          <div>

            <h1 className="text-2xl font-black text-cyan-400">
              IRDO
            </h1>

            <p className="text-sm text-slate-400">
              Dashboard
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/10"
          >
            <X className="text-white" />
          </button>

        </div>

        {/* Menu */}

        <nav className="mt-6 space-y-2 px-4">

          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              pathname === menu.href;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition

                ${
                  active
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                <Icon size={20} />

                <span>{menu.title}</span>
              </Link>
            );
          })}

        </nav>

        {/* Footer */}

        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 p-5">

          <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700">

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}