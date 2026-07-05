"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/lib/api";

import MemberCard from "./MemberCard";
import MemberModal from "./MemberModal";

export default function TeamPage() {
  const router = useRouter();

  const [members, setMembers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [selectedMember, setSelectedMember] =
    useState<any>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      setLoading(true);

      const response = await api.get(
        "/participant/member"
      );

      setMembers(response.data.data);
    } catch {
      toast.error(
        "Failed to load members."
      );
    } finally {
      setLoading(false);
    }
  }

  function addMember() {
    setSelectedMember(null);

    setOpenModal(true);
  }

  function editMember(member: any) {
    setSelectedMember(member);

    setOpenModal(true);
  }

  async function deleteMember(
    id: number
  ) {
    const ok = window.confirm(
      "Delete this member?"
    );

    if (!ok) return;

    try {
      await api.delete(
        `/participant/member/${id}`
      );

      toast.success(
        "Member deleted."
      );

      loadMembers();
    } catch {
      toast.error(
        "Delete failed."
      );
    }
  }

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black text-white">
            My Team
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your team members.
          </p>

        </div>

        <button
          onClick={addMember}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold text-white"
        >
          <Plus size={18} />

          Add Member

        </button>

      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400">
          Loading...
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">

          <h2 className="text-xl font-semibold text-white">
            No Team Member
          </h2>

          <p className="mt-2 text-slate-400">
            Click Add Member to start.
          </p>

        </div>
      ) : (
        <div className="space-y-6">

          {members.map((member) => (
            <MemberCard
              key={member.member_id}
              member={member}
              onEdit={editMember}
              onDelete={deleteMember}
            />
          ))}

        </div>
      )}

      <div className="mt-12 flex justify-end">

        <button
          onClick={() =>
            router.push(
              "/dashboard/document"
            )
          }
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white"
        >
          Continue to Documents
        </button>

      </div>

      <MemberModal
        open={openModal}
        member={selectedMember}
        reload={loadMembers}
        onClose={() =>
          setOpenModal(false)
        }
      />

    </div>
  );
}