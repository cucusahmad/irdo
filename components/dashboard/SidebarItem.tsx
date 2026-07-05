"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Props {
  href: string;
  icon: LucideIcon;
  title: string;
  active?: boolean;
  collapsed?: boolean;
}

export default function SidebarItem({
  href,
  icon: Icon,
  title,
  active,
  collapsed,
}: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300",
        active
          ? "bg-cyan-500 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon size={20} />

      {!collapsed && (
        <span className="font-medium">
          {title}
        </span>
      )}
    </Link>
  );
}