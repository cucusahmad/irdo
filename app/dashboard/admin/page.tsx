import Link from "next/link";
import {
  Users,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-black text-white">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome to IRDO Administration Panel
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <Users
            className="text-cyan-400"
            size={36}
          />

          <h2 className="mt-5 text-3xl font-bold text-white">
            --
          </h2>

          <p className="mt-1 text-slate-400">
            Participants
          </p>

          <Link
            href="/dashboard/admin/participant"
            className="mt-5 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            Open

            <ArrowRight size={16} />
          </Link>

        </div>

      </div>

    </div>
  );
}