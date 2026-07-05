import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard";
import StatusCard from "@/components/dashboard/StatusCard";
import QuickAction from "@/components/dashboard/QuickAction";
import ActivityCard from "@/components/dashboard/ActivityCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <div className="grid gap-8 lg:grid-cols-2">

        <ProgressCard />

        <StatusCard />

      </div>

      <QuickAction />

      <ActivityCard />

    </div>
  );
}