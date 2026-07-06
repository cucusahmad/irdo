"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [openSidebar, setOpenSidebar] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <MobileSidebar
        open={openSidebar}
        onClose={() =>
          setOpenSidebar(false)
        }
      />

      <div className="flex flex-1 flex-col">

        <Navbar
          onOpenSidebar={() =>
            setOpenSidebar(true)
          }
        />

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}