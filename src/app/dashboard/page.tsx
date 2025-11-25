import EmissionsChart from "@/components/dashboard/emissions-chart";
import ActivityChart from "@/components/dashboard/activity-chart";
import ForecastChart from "@/components/dashboard/forecast-chart";
import ComplianceScore from "@/components/dashboard/compliance-score";
import AiAlerts from "@/components/dashboard/ai-alerts";
import NetZeroRoadmap from "@/components/dashboard/net-zero-roadmap";
import SinksVsEmissions from "@/components/dashboard/sinks-vs-emissions";
import { Leaf, Target, Tractor } from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import { Co2Icon } from "@/components/icons";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Emissions (MT CO₂e)" value="3.3k" icon={Co2Icon} trend="+2.1%" />
          <StatCard title="Active Carbon Sinks" value="1.6k" icon={Leaf} trend="-1.5%" trendDirection="down" />
          <StatCard title="Top Emitting Asset" value="Excavator #3" icon={Tractor} subValue="14 tCO₂e" />
          <StatCard title="Net-Zero Gap" value="0.8k" icon={Target} trend="+5%" />
       </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <EmissionsChart />
        </div>
        <ActivityChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ForecastChart />
        <div className="lg:col-span-2">
          <AiAlerts />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ComplianceScore />
        <SinksVsEmissions />
        <NetZeroRoadmap />
      </div>
    </div>
  );
}
