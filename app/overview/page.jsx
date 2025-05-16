"use client";
import React, { useContext } from "react";
import StatCard from "../components/StatCard";
import {
  DollarSign,
  ArrowDownCircle,
  PiggyBank,
  CreditCard,
  Palette,
} from "lucide-react";
import Profit from "../components/Profit";
import Expensechart from "../components/Expensechart";
import CategoryChart from "../components/CategoryChart";
import SpendingTrendChart from "../components/SpendingTrendChart";
import { ThemeContext } from "../context/ThemeProvider";

export default function Overview() {
  const { colorScheme, colorSchemes, isThemeSidebarOpen, toggleThemeSidebar } =
    useContext(ThemeContext);

  return (
    <div className="flex-1 overflow-auto relative">
      <div className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <StatCard name="Total Income" icon={DollarSign} value="$5,000" />
          <StatCard
            name="Total Expenses"
            icon={ArrowDownCircle}
            value="$2,500"
          />
          <StatCard name="Savings" icon={PiggyBank} value="$2,000" />
          <StatCard name="Remaining Budget" icon={CreditCard} value="$500" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="w-full">
            <Expensechart chartColors={colorSchemes[colorScheme].chartColors} />
          </div>
          <div className="w-full">
            <CategoryChart
              chartColors={colorSchemes[colorScheme].chartColors}
            />
          </div>
          <div className="w-full">
            <Profit chartColors={colorSchemes[colorScheme].chartColors} />
          </div>
          <div className="w-full">
            <SpendingTrendChart
              chartColors={colorSchemes[colorScheme].chartColors}
            />
          </div>
        </div>
      </div>

      {/* Theme Icon in Bottom-Right Corner */}
      <button
        onClick={() => {
          console.log("Theme icon clicked");
          toggleThemeSidebar();
        }}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isThemeSidebarOpen
            ? "bg-blue-500 text-white"
            : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        }`}
        aria-label="Toggle theme sidebar"
      >
        <Palette size={24} />
      </button>
    </div>
  );
}
