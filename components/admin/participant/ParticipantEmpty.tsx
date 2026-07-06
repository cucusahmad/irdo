import { Users } from "lucide-react";

export default function ParticipantEmpty() {
  return (
    <tr>
      <td
        colSpan={8}
        className="py-20"
      >
        <div className="flex flex-col items-center justify-center">

          <Users
            size={60}
            className="text-slate-600"
          />

          <h2 className="mt-5 text-xl font-bold text-white">
            No Participant Found
          </h2>

          <p className="mt-2 text-slate-400">
            There are no participants matching your search.
          </p>

        </div>
      </td>
    </tr>
  );
}