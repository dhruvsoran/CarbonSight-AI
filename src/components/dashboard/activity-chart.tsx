"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { activityData } from "@/lib/data";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";

export default function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity-wise Emissions</CardTitle>
        <CardDescription>Distribution of carbon footprint by asset type.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={activityData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    cx="50%"
                    cy="50%"
                >
                {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
