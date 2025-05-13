"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 30 },
  { name: "Entertainment", value: 20 },
  { name: "Bills", value: 25 },
  { name: "Transportation", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = ["#FFB6C1", "#87CEFA", "#FFD700", "#98FB98", "#DDA0DD"];

const CategoryChart = () => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 border border-gray-100 mx-4 md:mx-0 transition-all duration-300 hover:shadow-md">
      <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
        Expense Category Distribution
      </h2>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-in-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-90 transition-opacity duration-300"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                color: "#4a5568",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
