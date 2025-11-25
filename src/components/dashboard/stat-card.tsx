import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subValue?: string;
};

export default function StatCard({ title, value, icon: Icon, trend, trendDirection = 'up', subValue }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
        {trend && (
            <p className={cn(
                "text-xs text-muted-foreground",
                trendDirection === 'up' ? 'text-destructive' : 'text-primary'
            )}>
                {trend} from last month
            </p>
        )}
      </CardContent>
    </Card>
  );
}
