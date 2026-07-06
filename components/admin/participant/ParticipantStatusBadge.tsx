interface Props {
  status?: string;
}

export default function ParticipantStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "APPROVED":
      return (
        <span className="inline-flex rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
          Approved
        </span>
      );

    case "PENDING":
      return (
        <span className="inline-flex rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
          Pending
        </span>
      );

    case "REJECTED":
      return (
        <span className="inline-flex rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
          Rejected
        </span>
      );

    default:
      return (
        <span className="inline-flex rounded-full bg-slate-500/20 px-3 py-1 text-xs font-semibold text-slate-300">
          Draft
        </span>
      );
  }
}