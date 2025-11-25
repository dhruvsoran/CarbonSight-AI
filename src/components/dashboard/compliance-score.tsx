"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { complianceScore } from "@/lib/data";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

export default function ComplianceScore() {
    const chartData = [
        { name: 'Score', value: complianceScore, fill: 'hsl(var(--primary))' },
        { name: 'Remaining', value: 100 - complianceScore, fill: 'hsl(var(--muted))' }
    ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Score</CardTitle>
        <CardDescription>ESG and regulatory compliance rating.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={{}} className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius="70%"
                    outerRadius="100%"
                    strokeWidth={0}
                >
                    <Cell key="score" fill={chartData[0].fill} />
                    <Cell key="remaining" fill={chartData[1].fill} />
                </Pie>
                </PieChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl font-bold text-primary">{complianceScore}%</p>
                    <p className="text-sm text-muted-foreground">Excellent</p>
                </div>
            </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
