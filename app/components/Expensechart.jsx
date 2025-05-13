"use client";
import React, { useContext } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { ThemeContext } from "../context/ThemeProvider";

const chartData = [
  { month: "Jan", expenses: 1200, income: 2000 },
  { month: "Feb", expenses: 1500, income: 2200 },
  { month: "Mar", expenses: 1300, income: 2100 },
  { month: "Apr", expenses: 1700, income: 2300 },
  { month: "May", expenses: 1400, income: 2400 },
  { month: "Jun", expenses: 1600, income: 2500 },
  { month: "Jul", expenses: 1800, income: 2600 },
  { month: "Aug", expenses: 1550, income: 2450 },
  { month: "Sep", expenses: 1650, income: 2550 },
  { month: "Oct", expenses: 1750, income: 2700 },
  { month: "Nov", expenses: 1450, income: 2300 },
  { month: "Dec", expenses: 1900, income: 2800 },
];

const Expensechart = ({ chartColors }) => {
  const { colorScheme, colorSchemes } = useContext(ThemeContext);
  const colors = chartColors || colorSchemes[colorScheme].chartColors;

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 border border-gray-100 mx-4 md:mx-0 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          Monthly Expenses vs Income
        </h2>
        <TrendingUp className="h-5 w-5 text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-300" />
      </div>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={colors[0]} stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={colors[1]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={colors[1]} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--card-border)"
              opacity={0.7}
            />
            <XAxis
              dataKey="month"
              stroke="var(--chart-axis)"
              tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="var(--chart-axis)"
              tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                borderColor: "var(--tooltip-border)",
                fontSize: "12px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
              itemStyle={{ color: "var(--tooltip-text)" }}
              formatter={(value, name) => [
                `$${value}`,
                name.charAt(0).toUpperCase() + name.slice(1),
              ]}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="url(#expensesGradient)"
              strokeWidth={3}
              dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: colors[0],
                stroke: "var(--card-bg)",
              }}
              name="expenses"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="url(#incomeGradient)"
              strokeWidth={3}
              dot={{ fill: colors[1], strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: colors[1],
                stroke: "var(--card-bg)",
              }}
              name="income"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Expensechart;
