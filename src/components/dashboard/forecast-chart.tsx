"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { forecastData } from "@/lib/data";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

export default function ForecastChart() {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>30-Day Emission Forecast</CardTitle>
        <CardDescription>AI-powered forecast of upcoming emissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={['auto', 'auto']} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                    <Legend />
                    <Line dataKey="emissions" type="monotone" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} name="Actual" />
                    <Line dataKey="forecast" type="monotone" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" name="Forecast" dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
