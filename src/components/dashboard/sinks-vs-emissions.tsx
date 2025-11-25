"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { sinksVsEmissionsData } from "@/lib/data";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

export default function SinksVsEmissions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gap Analysis</CardTitle>
        <CardDescription>Current emissions vs. sinks and targets.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sinksVsEmissionsData}
              layout="vertical"
              margin={{ left: 10, right: 10 }}
            >
              <CartesianGrid horizontal={false} stroke="hsl(var(--border))" />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={80}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" radius={5}>
                {sinksVsEmissionsData.map((d, i) => (
                  <Cell key={d.name} fill={`hsl(var(--chart-${i+1}))`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
