"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "@/lib/api";

import CompetitionCard from "./CompetitionCard";

export default function CompetitionList() {
  const [competitions, setCompetitions] =
    useState<any[]>([]);

  const [selectedCompetitionId, setSelectedCompetitionId] =
    useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [competitionRes, profileRes] =
        await Promise.all([
          api.get("/competition"),
          api.get("/participant/profile"),
        ]);

      setCompetitions(competitionRes.data.data);

      if (profileRes.data.data?.competition_id) {
        setSelectedCompetitionId(
          Number(profileRes.data.data.competition_id)
        );
      }
    } catch {
      toast.error("Failed to load competitions.");
    }
  }

  function chooseCompetition(id: number) {
    toast(
      "Please select the competition from the Profile page."
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {competitions.map((competition) => (
        <CompetitionCard
          key={competition.competition_id}
          competition={competition}
          selected={
            selectedCompetitionId ===
            Number(competition.competition_id)
          }
          onChoose={chooseCompetition}
        />
      ))}
    </div>
  );
}