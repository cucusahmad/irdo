import CompetitionList from "@/components/competition/CompetitionList";

export default function CompetitionPage() {
  return (
    <div>

      <h1 className="mb-2 text-4xl font-black text-white">
        Competition Registration
      </h1>

      <p className="mb-10 text-slate-400">
        Please choose one competition to continue your registration.
      </p>

      <CompetitionList />

    </div>
  );
}