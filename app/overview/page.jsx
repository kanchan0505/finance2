// app/overview/page.jsx
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
import { Box, Button } from "@mui/material";

export default function Overview() {
  const { colorScheme, colorSchemes, isThemeSidebarOpen, toggleThemeSidebar } =
    useContext(ThemeContext);

  // Fallback chart colors if colorSchemes[colorScheme] is undefined
  const defaultChartColors = [
    "#60A5FA",
    "#93C5FD",
    "#BFDBFE",
    "#DBEAFE",
    "#EFF6FF",
  ];
  const chartColors =
    colorSchemes[colorScheme]?.chartColors || defaultChartColors;

  return (
    <Box flex={1} overflow="auto" position="relative" minHeight="100vh">
      <Box maxWidth="112rem" mx="auto" py={4} px={{ xs: 4, lg: 8 }} mt={10}>
        {/* Stat Cards Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={2}
          mb={6}
        >
          <StatCard name="Total Income" icon={DollarSign} value="$5,000" />
          <StatCard
            name="Total Expenses"
            icon={ArrowDownCircle}
            value="$2,500"
          />
          <StatCard name="Savings" icon={PiggyBank} value="$2,000" />
          <StatCard name="Remaining Budget" icon={CreditCard} value="$500" />
        </Box>

        {/* Charts Grid */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            lg: "repeat(2, 1fr)",
          }}
          gap={3}
          mt={6}
        >
          <Box width="100%">
            <Expensechart chartColors={chartColors} />
          </Box>
          <Box width="100%">
            <CategoryChart chartColors={chartColors} />
          </Box>
          <Box width="100%">
            <Profit chartColors={chartColors} />
          </Box>
          <Box width="100%">
            <SpendingTrendChart chartColors={chartColors} />
          </Box>
        </Box>
      </Box>

      {/* Theme Icon in Bottom-Right Corner */}
      <Button
        onClick={() => {
          console.log("Theme icon clicked");
          toggleThemeSidebar();
        }}
        aria-label="Toggle theme sidebar"
        variant="contained"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          p: 1.5,
          borderRadius: "50%",
          boxShadow: 3,
          zIndex: 50,
          minWidth: "auto",
          bgcolor: isThemeSidebarOpen ? "primary.main" : "background.paper",
          color: isThemeSidebarOpen ? "common.white" : "text.primary",
          "&:hover": {
            bgcolor: isThemeSidebarOpen ? "primary.dark" : "grey.100",
          },
        }}
      >
        <Palette size={24} />
      </Button>
    </Box>
  );
}
