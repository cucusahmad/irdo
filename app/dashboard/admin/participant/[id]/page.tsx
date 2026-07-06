import ParticipantDetail from "@/components/admin/participant/ParticipantDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { id } = await params;

  return (
    <ParticipantDetail
      participantId={Number(id)}
    />
  );
}