"use client";
import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider";

const Profit = ({ chartColors }) => {
  const { colorScheme, colorSchemes } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const colors = chartColors || colorSchemes[colorScheme].chartColors;

  const data = [
    { name: "Profit", value: 25.88 },
    { name: "Remaining", value: 74.12 },
  ];

  return (
    <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 border border-gray-100 mx-4 md:mx-0 transition-all duration-300 hover:shadow-md">
      <div className="w-full h-[300px] md:h-[400px] flex flex-col items-center justify-between">
        <div className="h-[80%] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={90}
                endAngle={-270}
                innerRadius="70%"
                outerRadius="90%"
                fill="#8884d8"
                dataKey="value"
                paddingAngle={0}
                cornerRadius={10}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? colors[0] : "var(--card-bg)"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-gray-700 dark:text-gray-300 text-sm md:text-base font-semibold">
              {t("profitMargin")}
            </h3>
            <p className="text-blue-500 dark:text-blue-300 text-xl md:text-3xl font-bold mt-1">
              25.88%
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-2">
              {t("stableGrowth")}
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full mt-4 text-gray-700 dark:text-gray-300 text-xs md:text-sm">
          <span className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">
            {t("savedAmount")}: $10,000
          </span>
          <span className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">
            {t("growthPercent")}: 45%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profit;
