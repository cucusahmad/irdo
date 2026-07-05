"use client";

import { Pencil, Trash2, User } from "lucide-react";

interface Props {
  member: any;
  onEdit: (member: any) => void;
  onDelete: (id: number) => void;
}

export default function MemberCard({
  member,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-500">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="rounded-xl bg-cyan-500/20 p-4">
            <User className="text-cyan-400" />
          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              {member.full_name}
            </h2>

            <p className="mt-2 text-slate-400">
              Gender :
              {" "}
              {member.gender || "-"}
            </p>

            <p className="text-slate-400">
              Student Number :
              {" "}
              {member.student_number || "-"}
            </p>

            <p className="text-slate-400">
              Email :
              {" "}
              {member.email || "-"}
            </p>

            <p className="text-slate-400">
              Phone :
              {" "}
              {member.phone || "-"}
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(member)}
            className="rounded-xl bg-blue-500/20 p-3 transition hover:bg-blue-500"
          >
            <Pencil
              size={18}
              className="text-white"
            />
          </button>

          <button
            onClick={() =>
              onDelete(
                Number(member.member_id)
              )
            }
            className="rounded-xl bg-red-500/20 p-3 transition hover:bg-red-500"
          >
            <Trash2
              size={18}
              className="text-white"
            />
          </button>

        </div>

      </div>

    </div>
  );
}