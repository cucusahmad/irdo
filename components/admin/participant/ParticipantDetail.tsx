"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  MapPin,
  Trophy,
  User,
  Phone,
  Mail,
  BadgeCheck,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "@/lib/api";

import ParticipantStatusBadge from "./ParticipantStatusBadge";

interface Props {
  participantId: number;
}

export default function ParticipantDetail({
  participantId,
}: Props) {
  const [participant, setParticipant] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

    const [notes, setNotes] =
  useState(
    participant?.notes ?? ""
  );

const [saving, setSaving] =
  useState(false);

  useEffect(() => {
    loadParticipant();
  }, []);

  async function loadParticipant() {
    try {
      setLoading(true);

      const res = await api.get(
        `/admin/participant/${participantId}`
      );

      setParticipant(res.data.data);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load participant."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center text-slate-400">
        Loading participant...
      </div>
    );
  }

  async function review(
  status:
    | "APPROVED"
    | "REJECTED"
) {
  try {

    setSaving(true);

    await api.put(
      `/admin/participant/${participantId}/review`,
      {
        registration_status:
          status,
        notes,
      }
    );

    toast.success(
      "Registration updated."
    );

    loadParticipant();

  } catch {

    toast.error(
      "Failed to update."
    );

  } finally {

    setSaving(false);

  }
}

  if (!participant) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-10 text-center text-red-400">
        Participant not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <Link
            href="/dashboard/admin/participant"
            className="mb-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft size={18} />

            Back to Participants
          </Link>

          <h1 className="text-4xl font-black text-white">

            Registration #

            {participant.registration_number}

          </h1>

          <p className="mt-2 text-slate-400">

            {participant.competition
              ?.competition_name}

          </p>

        </div>

        <ParticipantStatusBadge
          status={
            participant.registration_status
          }
        />

      </div>

      {/* TEAM INFORMATION */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Team Information
        </h2>

        <div className="grid gap-8 md:grid-cols-2">

          <div className="space-y-6">

            <div className="flex gap-4">

              <Trophy className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Competition
                </p>

                <h3 className="font-semibold text-white">
                  {
                    participant.competition
                      ?.competition_name
                  }
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <Building2 className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Institution
                </p>

                <h3 className="font-semibold text-white">
                  {
                    participant.institution_name
                  }
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <BadgeCheck className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Team Name
                </p>

                <h3 className="font-semibold text-white">
                  {participant.team_name}
                </h3>

              </div>

            </div>

          </div>

          <div className="space-y-6">

            <div className="flex gap-4">

              <MapPin className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Country
                </p>

                <h3 className="font-semibold text-white">
                  {participant.country}
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <MapPin className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Province
                </p>

                <h3 className="font-semibold text-white">
                  {participant.province}
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <MapPin className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  City
                </p>

                <h3 className="font-semibold text-white">
                  {participant.city}
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <MapPin className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Address
                </p>

                <h3 className="font-semibold text-white">
                  {participant.address}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* LEADER */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Leader Information
        </h2>

        <div className="grid gap-8 md:grid-cols-2">

          <div className="space-y-6">

            <div className="flex gap-4">

              <User className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Leader Name
                </p>

                <h3 className="font-semibold text-white">
                  {participant.leader_name}
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <BadgeCheck className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Gender
                </p>

                <h3 className="font-semibold text-white">
                  {participant.gender}
                </h3>

              </div>

            </div>

          </div>

          <div className="space-y-6">

            <div className="flex gap-4">

              <Mail className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Email
                </p>

                <h3 className="font-semibold text-white">
                  {participant.account?.email}
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <Phone className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Phone
                </p>

                <h3 className="font-semibold text-white">
                  {participant.phone}
                </h3>

              </div>

            </div>

            <div className="flex gap-4">

              <BadgeCheck className="mt-1 text-cyan-400" />

              <div>

                <p className="text-sm text-slate-400">
                  Student Number
                </p>

                <h3 className="font-semibold text-white">
                  {participant.student_number}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>
            {/* TEAM MEMBERS */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Team Members
        </h2>

        {participant.participant_member?.length === 0 ? (

          <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-slate-400">

            No team members.

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead>

                <tr className="border-b border-white/10 text-left text-sm uppercase text-slate-400">

                  <th className="px-5 py-4">
                    No
                  </th>

                  <th className="px-5 py-4">
                    Name
                  </th>

                  <th className="px-5 py-4">
                    Gender
                  </th>

                  <th className="px-5 py-4">
                    Student Number
                  </th>

                  <th className="px-5 py-4">
                    Email
                  </th>

                  <th className="px-5 py-4">
                    Phone
                  </th>

                </tr>

              </thead>

              <tbody>

                {participant.participant_member.map(
                  (
                    member: any,
                    index: number
                  ) => (

                    <tr
                      key={member.member_id}
                      className="border-b border-white/5"
                    >

                      <td className="px-5 py-4 text-white">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 text-white">
                        {member.full_name}
                      </td>

                      <td className="px-5 py-4 text-white">
                        {member.gender ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-white">
                        {member.student_number ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-white">
                        {member.email ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-white">
                        {member.phone ?? "-"}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* DOCUMENTS */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Documents
        </h2>

        <div className="space-y-4">

          {participant.participant_document?.length === 0 ? (

            <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-slate-400">

              No uploaded documents.

            </div>

          ) : (

            participant.participant_document.map(
              (doc: any) => (

                <div
                  key={doc.document_id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5"
                >

                  <div>

                    <h3 className="font-semibold text-white">
                      {doc.document_title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {doc.document_type}
                    </p>

                  </div>

                  <a
                    href={doc.file_path}
                    target="_blank"
                    className="rounded-lg bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-500"
                  >
                    View
                  </a>

                </div>

              )
            )

          )}

        </div>

      </div>

      {/* REVIEW */}

      <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Review
        </h2>

       <textarea
  value={notes}
  onChange={(e) =>
    setNotes(e.target.value)
  }
  rows={5}
  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white"
/>

        <div className="mt-6 flex flex-wrap gap-4">

         <div className="mt-6 flex gap-4">

  <button
    disabled={saving}
    onClick={() =>
      review("APPROVED")
    }
    className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-500 disabled:opacity-50"
  >
    Approve
  </button>

  <button
    disabled={saving}
    onClick={() =>
      review("REJECTED")
    }
    className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-500 disabled:opacity-50"
  >
    Reject
  </button>

</div>
        </div>

      </div>

    </div>

  );
}