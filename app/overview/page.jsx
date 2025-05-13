"use client";
import React from "react";
import StatCard from "../components/StatCard";
import {
  DollarSign,
  ArrowDownCircle,
  PiggyBank,
  CreditCard,
} from "lucide-react";
import Profit from "../components/Profit";
import Expensechart from "../components/Expensechart";
import CategoryChart from "../components/CategoryChart";
import SpendingTrendChart from "../components/SpendingTrendChart";
const Page = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
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
          {/* First Row */}
          <div className="w-full">
            <Expensechart />
          </div>
          <div className="w-full">
            <CategoryChart />
          </div>

          {/* Second Row */}
          <div className="w-full">
            <Profit />
          </div>
          <div className="w-full">
            <SpendingTrendChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
