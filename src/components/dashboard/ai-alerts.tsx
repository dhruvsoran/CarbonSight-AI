import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { aiAlerts } from "@/lib/data";
import { AlertTriangle, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const alertIcons = {
    warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
    error: <AlertTriangle className="h-5 w-5 text-destructive" />,
    info: <Info className="h-5 w-5 text-blue-400" />
}

export default function AiAlerts() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI Alerts & Notifications</CardTitle>
        <CardDescription>Critical insights and updates from the AI engine.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
            {aiAlerts.map((alert) => (
                <li key={alert.id} className="flex items-start gap-4 p-3 rounded-lg bg-card hover:bg-muted/50">
                    <div className="mt-1">
                        {alertIcons[alert.severity as keyof typeof alertIcons]}
                    </div>
                    <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
                    </div>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
