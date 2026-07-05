"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import api from "@/lib/api";

import ProfileInput from "./ProfileInput";
import ProfileSelect from "./ProfileSelect";

interface Competition {
  competition_id: number;
  competition_name: string;
}

interface Profile {
  competition_id: number | "";
  team_name: string;
  institution_name: string;
  country: string;
  province: string;
  city: string;
  address: string;
  leader_name: string;
  leader_gender: string;
  leader_phone: string;
  leader_student_number: string;
}

export default function ProfileForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [loadingPage, setLoadingPage] = useState(true);

  const [competitions, setCompetitions] = useState<
    Competition[]
  >([]);

  const [form, setForm] =
    useState<Profile>({
      competition_id: "",

      team_name: "",

      institution_name: "",

      country: "",

      province: "",

      city: "",

      address: "",

      leader_name: "",

      leader_gender: "",

      leader_phone: "",

      leader_student_number: "",
    });

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    setLoadingPage(true);

    await Promise.all([
      loadCompetition(),
      loadProfile(),
    ]);

    setLoadingPage(false);
  }

  async function loadCompetition() {
    try {
      const response =
        await api.get("/competition");

      setCompetitions(
        response.data.data
      );
    } catch (error) {
      toast.error(
        "Failed to load competition"
      );
    }
  }

  async function loadProfile() {
    try {
      const response =
        await api.get(
          "/participant/profile"
        );

      if (response.data.data) {
        setForm({
          competition_id:
            Number(
              response.data.data
                .competition_id
            ) || "",

          team_name:
            response.data.data
              .team_name || "",

          institution_name:
            response.data.data
              .institution_name ||
            "",

          country:
            response.data.data
              .country || "",

          province:
            response.data.data
              .province || "",

          city:
            response.data.data
              .city || "",

          address:
            response.data.data
              .address || "",

          leader_name:
            response.data.data
              .leader_name || "",

          leader_gender:
            response.data.data
              .leader_gender || "",

          leader_phone:
            response.data.data
              .leader_phone || "",

          leader_student_number:
            response.data.data
              .leader_student_number ||
            "",
        });
      }
    } catch {}
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  }

  async function saveProfile() {
    try {
      setLoading(true);

      await api.put(
        "/participant/profile",
        {
          ...form,

          competition_id:
            Number(
              form.competition_id
            ),
        }
      );

      toast.success(
        "Profile saved successfully"
      );

      router.push(
        "/dashboard/team"
      );
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ??
          "Failed to save profile"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingPage) {
    return (
      <div className="flex h-[500px] items-center justify-center">

        <div className="text-cyan-400">
          Loading...
        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      <div className="mb-10">

        <h1 className="text-4xl font-black text-white">
          Participant Profile
        </h1>

        <p className="mt-2 text-slate-400">
          Complete your
          registration profile.
        </p>

      </div>

      <div
        className="
        rounded-3xl

        border

        border-cyan-500/20

        bg-white/5

        p-10

        backdrop-blur-xl
      "
      >

        <div className="grid gap-6 md:grid-cols-2">

          <ProfileSelect
            label="Competition"
            name="competition_id"
            value={form.competition_id}
            required
            onChange={handleChange}
            options={competitions.map(
              (
                competition
              ) => ({
                value:
                  competition.competition_id,

                label:
                  competition.competition_name,
              })
            )}
          />

          <ProfileInput
            label="Team Name"
            name="team_name"
            value={form.team_name}
            required
            onChange={handleChange}
          />

          <ProfileInput
            label="Institution"
            name="institution_name"
            value={
              form.institution_name
            }
            required
            onChange={handleChange}
          />

          <ProfileInput
            label="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
          />

          <ProfileInput
            label="Province"
            name="province"
            value={form.province}
            onChange={handleChange}
          />

          <ProfileInput
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
                    <ProfileInput
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <ProfileInput
            label="Leader Name"
            name="leader_name"
            value={form.leader_name}
            required
            onChange={handleChange}
          />

          <ProfileSelect
            label="Gender"
            name="leader_gender"
            value={form.leader_gender}
            onChange={handleChange}
            options={[
              {
                value: "Male",
                label: "Male",
              },
              {
                value: "Female",
                label: "Female",
              },
            ]}
          />

          <ProfileInput
            label="Phone Number"
            name="leader_phone"
            value={form.leader_phone}
            required
            onChange={handleChange}
          />

          <ProfileInput
            label="Student Number"
            name="leader_student_number"
            value={form.leader_student_number}
            onChange={handleChange}
          />

        </div>

        {/* Footer */}

        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Registration Progress
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Complete your profile before continuing to Team Member.
            </p>

          </div>

          <button
            onClick={saveProfile}
            disabled={loading}
            className="
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-8
              py-4
              font-semibold
              text-white
              transition
              duration-300
              hover:scale-105
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Saving..."
              : "Save & Continue"}
          </button>

        </div>

      </div>

    </div>
  );
}