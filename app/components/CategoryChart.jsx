import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider";

const data = [
  { name: "Food", value: 30 },
  { name: "Entertainment", value: 20 },
  { name: "Bills", value: 25 },
  { name: "Transportation", value: 15 },
  { name: "Others", value: 10 },
];

const CategoryChart = ({ chartColors }) => {
  const { colorScheme, colorSchemes } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const colors = chartColors || colorSchemes[colorScheme].chartColors;

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 border border-gray-100 mx-4 md:mx-0 transition-all duration-300 hover:shadow-md">
      <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
        {t("expenseCategory")}
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
                  fill={colors[index % colors.length]}
                  className="hover:opacity-90 transition-opacity duration-300"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: "8px",
                color: "var(--tooltip-text)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-gray-800">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
