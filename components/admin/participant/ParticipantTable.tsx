"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Eye,
  RotateCw,
  Search,
} from "lucide-react";

import api from "@/lib/api";

import ParticipantStatusBadge from "./ParticipantStatusBadge";
import ParticipantLoading from "./ParticipantLoading";
import ParticipantEmpty from "./ParticipantEmpty";
import ParticipantPagination from "./ParticipantPagination";

export default function ParticipantTable() {
  const [participants, setParticipants] =
    useState<any[]>([]);

  const [competitions, setCompetitions] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

    
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [competition, setCompetition] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [limit, setLimit] =
    useState(10);

  const [pagination, setPagination] =
    useState<any>(null);

  useEffect(() => {
    loadCompetition();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadParticipants();
    }, 400);

    return () => clearTimeout(timer);
  }, [
    search,
    page,
    limit,
    status,
    competition,
  ]);

  async function loadCompetition() {
    try {
      const res =
        await api.get("/competition");

      setCompetitions(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadParticipants() {
    try {
      setLoading(true);

      const res =
        await api.get(
          "/admin/participant",
          {
            params: {
              page,
              limit,
              search,
              status,
              competition,
            },
          }
        );

      setParticipants(res.data.data);

      setPagination(
        res.data.pagination
      );

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-black text-white">
            Participants
          </h1>

          <p className="mt-2 text-slate-400">
            Manage participant registration.
          </p>

        </div>

      </div>

      <div className="grid gap-4 lg:grid-cols-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(
                e.target.value
              );
            }}
            placeholder="Search..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-400"
          />

        </div>

        <select
          value={competition}
          onChange={(e) => {
            setCompetition(
              e.target.value
            );
            setPage(1);
          }}
          className="rounded-xl border border-white/10 bg-white/5 px-4 text-white"
        >

          <option
            value=""
            className="bg-slate-900"
          >
            All Competition
          </option>

          {competitions.map(
            (item) => (
              <option
                key={
                  item.competition_id
                }
                value={
                  item.competition_id
                }
                className="bg-slate-900"
              >
                {
                  item.competition_name
                }
              </option>
            )
          )}

        </select>

        <select
          value={status}
          onChange={(e) => {
            setStatus(
              e.target.value
            );
            setPage(1);
          }}
          className="rounded-xl border border-white/10 bg-white/5 px-4 text-white"
        >

          <option
            value=""
            className="bg-slate-900"
          >
            All Status
          </option>

          <option
            value="DRAFT"
            className="bg-slate-900"
          >
            Draft
          </option>

          <option
            value="PENDING"
            className="bg-slate-900"
          >
            Pending
          </option>

          <option
            value="APPROVED"
            className="bg-slate-900"
          >
            Approved
          </option>

          <option
            value="REJECTED"
            className="bg-slate-900"
          >
            Rejected
          </option>

        </select>

        <button
          onClick={loadParticipants}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-white hover:bg-cyan-500"
        >

          <RotateCw
            size={18}
          />

          Refresh

        </button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-900">

              <tr className="border-b border-white/10 text-left text-sm uppercase tracking-wider text-slate-400">

                <th className="px-6 py-4">
                  No
                </th>

                <th className="px-6 py-4">
                  Registration
                </th>

                <th className="px-6 py-4">
                  Leader
                </th>

                <th className="px-6 py-4">
                  Competition
                </th>

                <th className="px-6 py-4">
                  Institution
                </th>

                <th className="px-6 py-4">
                  Payment
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading && (
                <ParticipantLoading />
              )}

              {!loading &&
                participants.length ===
                  0 && (
                  <ParticipantEmpty />
                )}

              {!loading &&
                participants.map(
                  (
                    item,
                    index
                  ) => (
                    <tr
                      key={
                        item.participant_id
                      }
                      className="border-b border-white/5 hover:bg-white/5"
                    >

                      <td className="px-6 py-5 text-white">
                        {(page - 1) *
                          limit +
                          index +
                          1}
                      </td>

                      <td className="px-6 py-5 font-medium text-white">
                        {item.registration_number ??
                          "-"}
                      </td>

                      <td className="px-6 py-5 text-white">
                        {item.leader_name}
                      </td>

                      <td className="px-6 py-5 text-white">
                        {
                          item.competition
                            ?.competition_name
                        }
                      </td>

                      <td className="px-6 py-5 text-white">
                        {
                          item.institution_name
                        }
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.payment_status ===
                            "PAID"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {
                            item.payment_status
                          }
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <ParticipantStatusBadge
                          status={
                            item.registration_status
                          }
                        />
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <Link
                            href={`/dashboard/admin/participant/${item.participant_id}`}
                            className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
                          >
                            <Eye size={16} />
                            Detail
                          </Link>
                        </div>
                      </td>

                    </tr>
                  ))}
                              </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex flex-col gap-4 border-t border-white/10 bg-slate-900/60 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="text-sm text-slate-400">

            Showing{" "}

            <span className="font-semibold text-white">
              {participants.length === 0
                ? 0
                : (page - 1) * limit + 1}
            </span>

            {" "}to{" "}

            <span className="font-semibold text-white">
              {(page - 1) * limit +
                participants.length}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-white">
              {pagination?.total ?? 0}
            </span>

            participants

          </div>

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2">

              <span className="text-sm text-slate-400">
                Rows
              </span>

              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >

                <option
                  value={10}
                  className="bg-slate-900"
                >
                  10
                </option>

                <option
                  value={25}
                  className="bg-slate-900"
                >
                  25
                </option>

                <option
                  value={50}
                  className="bg-slate-900"
                >
                  50
                </option>

                <option
                  value={100}
                  className="bg-slate-900"
                >
                  100
                </option>

              </select>

            </div>

            <ParticipantPagination
              page={page}
              totalPages={
                pagination?.totalPages ?? 1
              }
              onChange={setPage}
            />

          </div>

        </div>

      </div>

    </div>

  );
}