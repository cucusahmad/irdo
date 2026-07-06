export default function ParticipantLoading() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <tr
          key={index}
          className="border-t border-white/5"
        >
          {Array.from({ length: 8 }).map((__, col) => (
            <td
              key={col}
              className="px-6 py-5"
            >
              <div className="h-5 animate-pulse rounded bg-white/10" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}