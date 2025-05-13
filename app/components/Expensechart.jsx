"use client";
import React from "react";
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

const Expensechart = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 border border-gray-100 mx-4 md:mx-0 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          Monthly Expenses vs Income
        </h2>
        <TrendingUp className="h-5 w-5 text-blue-400 hover:text-blue-600 transition-colors duration-300" />
      </div>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFB6C1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#FFB6C1" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#98FB98" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#98FB98" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.7}
            />
            <XAxis
              dataKey="month"
              stroke="#718096"
              tick={{ fontSize: 12, fill: "#718096" }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#718096"
              tick={{ fontSize: 12, fill: "#718096" }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderColor: "#e2e8f0",
                fontSize: "12px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
              itemStyle={{ color: "#4a5568" }}
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
              dot={{ fill: "#FFB6C1", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: "#FFB6C1",
                stroke: "#fff",
              }}
              name="expenses"
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="url(#incomeGradient)"
              strokeWidth={3}
              dot={{ fill: "#98FB98", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: "#98FB98",
                stroke: "#fff",
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
