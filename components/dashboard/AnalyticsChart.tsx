"use client";

import { Card } from "@/components/ui/card";
import dataAnalytics from "@/data/analytics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart() {
  return (
    <Card className="p-4 mb-5">
      <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataAnalytics}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              name="Page Views"
            />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" name="Visits" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
