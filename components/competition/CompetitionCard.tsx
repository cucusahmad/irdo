"use client";

import {
  Trophy,
  Users,
  DollarSign,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface Props {
  competition: any;

  selected?: boolean;

  onChoose: (id: number) => void;
}

export default function CompetitionCard({
  competition,
  selected = false,
  onChoose,
}: Props) {
  const fee =
    Number(
      competition.registration_fee ?? 0
    );

  return (
    <div
      className={`relative rounded-3xl border p-8 backdrop-blur-xl transition duration-300

      ${
        selected
          ? "border-cyan-400 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,.25)]"
          : "border-cyan-500/20 bg-white/5 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,.15)]"
      }
    `}
    >
      {selected && (
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white">

          <CheckCircle2 size={16} />

          Selected

        </div>
      )}

      <div className="flex items-center gap-5">

        <div className="rounded-2xl bg-cyan-500/20 p-4">

          <Trophy
            size={32}
            className="text-cyan-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            {competition.competition_name}
          </h2>

          <p className="mt-2 text-slate-400">
            {competition.description}
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl bg-white/5 p-5">

          <div className="mb-2 flex items-center gap-2 text-cyan-400">

            <Users size={18} />

            Team Size

          </div>

          <div className="text-lg font-semibold text-white">
            {competition.team_min} - {competition.team_max} Members
          </div>

        </div>

        <div className="rounded-2xl bg-white/5 p-5">

          <div className="mb-2 flex items-center gap-2 text-cyan-400">

            <DollarSign size={18} />

            Registration Fee

          </div>

          <div className="text-lg font-semibold text-white">
            {fee === 0
              ? "FREE"
              : `IDR ${fee.toLocaleString("id-ID")}`}
          </div>

        </div>

      </div>

      <button
        disabled={selected}
        onClick={() =>
          onChoose(
            Number(competition.competition_id)
          )
        }
        className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white transition

        ${
          selected
            ? "cursor-not-allowed bg-green-600"
            : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02]"
        }
      `}
      >
        {selected
          ? "Selected"
          : "Choose Competition"}

        <ArrowRight size={18} />
      </button>
    </div>
  );
}