"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

import {
  CheckCircle2,
  Clock3,
  Users,
  Trophy,
  CreditCard,
  FileText,
} from "lucide-react";

export default function StatusPage() {
  const [status, setStatus] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    try {
      const res =
        await api.get(
          "/participant/status"
        );

      setStatus(res.data.data);

    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-32 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl font-black text-white">
          Registration Status
        </h1>

        <p className="mt-2 text-slate-400">
          Review your registration
          progress.
        </p>

      </div>

      {/* STATUS */}

      <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8">

        <div className="flex flex-wrap items-center justify-between gap-5">

          <div>

            <p className="text-slate-400">
              Registration Number
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">

              {status.registration_number ??
                "-"}

            </h2>

          </div>

          <div>

            <span className="rounded-full bg-yellow-500/20 px-5 py-3 text-yellow-400">

              {status.registration_status}

            </span>

          </div>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-white/5 p-8">

        <div className="mb-4 flex justify-between">

          <span className="text-slate-300">
            Registration Progress
          </span>

          <span className="font-bold text-cyan-400">
            {status.progress}%
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
            style={{
              width: `${status.progress}%`,
            }}
          />

        </div>

      </div>

      {/* SUMMARY */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

          <div className="flex items-center gap-3">

            <Trophy className="text-cyan-400" />

            <h3 className="text-xl font-bold text-white">
              Competition
            </h3>

          </div>

          <p className="mt-6 text-white">

            {status.competition?.competition_name}

          </p>

          <p className="mt-2 text-slate-400">

            Registration Fee

          </p>

          <h2 className="mt-1 text-2xl font-bold text-cyan-400">

            {Number(
              status.competition?.registration_fee
            ) === 0
              ? "FREE"
              : `IDR ${Number(
                  status.competition.registration_fee
                ).toLocaleString(
                  "id-ID"
                )}`}

          </h2>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

          <div className="flex items-center gap-3">

            <Users className="text-cyan-400" />

            <h3 className="text-xl font-bold text-white">
              Team
            </h3>

          </div>

          <h2 className="mt-6 text-3xl font-bold text-white">

            {status.team_count}

          </h2>

          <p className="text-slate-400">

            Team Members

          </p>

        </div>

      </div>

      {/* DOCUMENT */}

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

        <div className="flex items-center gap-3">

          <FileText className="text-cyan-400" />

          <h3 className="text-xl font-bold text-white">
            Documents
          </h3>

        </div>

        <div className="mt-6 space-y-4">

          <div className="flex justify-between">

            <span className="text-slate-400">
              Payment Proof
            </span>

            <span className="text-green-400">

              {status.payment_uploaded
                ? "Uploaded"
                : "Waiting"}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-slate-400">

              Additional Documents

            </span>

            <span className="text-white">

              {status.additional_documents}

            </span>

          </div>

        </div>

      </div>

      {/* TIMELINE */}

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="mb-8 text-xl font-bold text-white">

          Registration Timeline

        </h3>

        <div className="space-y-6">

          <Timeline
            done={status.profile_completed}
            title="Profile Completed"
          />

          <Timeline
            done={
              status.team_count > 0
            }
            title="Team Registered"
          />

          <Timeline
            done={
              status.payment_uploaded
            }
            title="Payment Uploaded"
          />

          <Timeline
            done={false}
            title="Waiting Committee Verification"
          />

        </div>

      </div>

    </div>
  );
}

function Timeline({
  done,
  title,
}: {
  done: boolean;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">

      {done ? (
        <CheckCircle2
          className="text-green-400"
        />
      ) : (
        <Clock3
          className="text-yellow-400"
        />
      )}

      <span className="text-white">

        {title}

      </span>

    </div>
  );
}