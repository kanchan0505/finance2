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
import { LanguageContext } from "../context/LanguageProvider";
import { Box, Typography, Paper, Stack } from "@mui/material";

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
  const { colorScheme, colorSchemes, theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const colors = chartColors || colorSchemes[colorScheme].chartColors;

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: "var(--card-border)",
        mx: { xs: 1, md: 0 },
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6,
        },
        bgcolor: "var(--card-bg)",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "var(--foreground)" }}
        >
          {t("monthlyComparison")}
        </Typography>
        <TrendingUp
          size={20}
          color={theme === "dark" ? "#60a5fa" : "blue"}
          style={{ cursor: "pointer", transition: "color 0.3s" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.color =
              theme === "dark" ? "#93c5fd" : "#1976d2")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.color =
              theme === "dark" ? "#60a5fa" : "blue")
          }
        />
      </Stack>

      <Box sx={{ width: "100%", height: { xs: 300, md: 400 } }}>
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
              stroke={theme === "dark" ? "#4b5563" : "#e0e0e0"}
              opacity={0.7}
            />
            <XAxis
              dataKey="month"
              stroke={theme === "dark" ? "#9ca3af" : "#666"}
              tick={{
                fontSize: 12,
                fill: theme === "dark" ? "#9ca3af" : "#666",
              }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke={theme === "dark" ? "#9ca3af" : "#666"}
              tick={{
                fontSize: 12,
                fill: theme === "dark" ? "#9ca3af" : "#666",
              }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                borderColor: "var(--tooltip-border)",
                fontSize: "12px",
                borderRadius: 8,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                color: "var(--tooltip-text)",
              }}
              itemStyle={{ color: "var(--foreground)" }}
              formatter={(value, name) => [
                `$${value}`,
                t(name), // Translate expenses and income
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
                stroke: theme === "dark" ? "#1f2937" : "#fff",
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
                stroke: theme === "dark" ? "#1f2937" : "#fff",
              }}
              name="income"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default Expensechart;
