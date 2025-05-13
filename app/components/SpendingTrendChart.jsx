"use client";
import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CalendarDays } from "lucide-react";
import { ThemeContext } from "../context/ThemeProvider";

const data = [
  { month: "Jan", expenses: 800 },
  { month: "Feb", expenses: 700 },
  { month: "Mar", expenses: 750 },
  { month: "Apr", expenses: 950 },
  { month: "May", expenses: 600 },
  { month: "Jun", expenses: 650 },
];

const SpendingTrendChart = ({ chartColors }) => {
  const { colorScheme, colorSchemes } = useContext(ThemeContext);

  const colors = chartColors || colorSchemes[colorScheme].chartColors;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-4 text-gray-800">
        <CalendarDays className="w-5 h-5 mr-2 text-blue-400" />
        <h2 className="text-lg font-semibold">Spending Trend</h2>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
            <XAxis dataKey="month" stroke="var(--foreground)" />
            <YAxis stroke="var(--foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
              itemStyle={{ color: "var(--foreground)" }}
            />
            <Bar
              dataKey="expenses"
              fill={colors[0]}
              barSize={30}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrendChart;
