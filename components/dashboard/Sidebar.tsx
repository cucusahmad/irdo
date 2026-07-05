"use client";

import { useState } from "react";

import {
  LayoutDashboard,
  Trophy,
  User,
  Users,
  Folder,
  ClipboardCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bot,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-24" : "w-72"
      } transition-all duration-300 border-r border-white/10 bg-slate-950`}
    >
      <div className="flex h-full flex-col">

        {/* Logo */}

        <div className="flex items-center justify-between px-6 py-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500 p-3">

              <Bot className="text-white" />

            </div>

            {!collapsed && (

              <div>

                <h2 className="font-bold text-white">
                  IRDO
                </h2>

                <p className="text-xs text-slate-400">
                  Dashboard
                </p>

              </div>

            )}

          </div>

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
          >
            {collapsed ? (
              <ChevronRight
                className="text-white"
              />
            ) : (
              <ChevronLeft
                className="text-white"
              />
            )}
          </button>

        </div>

        <nav className="flex-1 space-y-2 px-4">

          <SidebarItem
            href="/dashboard"
            icon={LayoutDashboard}
            title="Dashboard"
            active
            collapsed={collapsed}
          />

          <SidebarItem
            href="/dashboard/competition"
            icon={Trophy}
            title="Competition"
            collapsed={collapsed}
          />

          <SidebarItem
            href="/dashboard/profile"
            icon={User}
            title="Profile"
            collapsed={collapsed}
          />

          <SidebarItem
            href="/dashboard/team"
            icon={Users}
            title="My Team"
            collapsed={collapsed}
          />

          <SidebarItem
            href="/dashboard/document"
            icon={Folder}
            title="Document"
            collapsed={collapsed}
          />

          <SidebarItem
            href="/dashboard/status"
            icon={ClipboardCheck}
            title="Registration"
            collapsed={collapsed}
          />

        </nav>

        <div className="space-y-2 border-t border-white/10 p-4">

          <SidebarItem
            href="#"
            icon={Settings}
            title="Settings"
            collapsed={collapsed}
          />

          <SidebarItem
            href="/"
            icon={LogOut}
            title="Logout"
            collapsed={collapsed}
          />

        </div>

      </div>

    </aside>
  );
}