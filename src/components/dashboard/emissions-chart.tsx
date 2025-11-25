"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { emissionsData } from "@/lib/data";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

export default function EmissionsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emissions vs. Sinks</CardTitle>
        <CardDescription>Monthly carbon emissions and sink performance for the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emissionsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} unit="k" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Legend />
                    <Line dataKey="emissions" type="monotone" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} name="Emissions" />
                    <Line dataKey="sinks" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Sinks" />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
