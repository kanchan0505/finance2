import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider";
import { Box, Typography, Paper } from "@mui/material";

const historyData = [
  { day: "Mon", spent: 50, income: 120 },
  { day: "Tue", spent: 80, income: 90 },
  { day: "Wed", spent: 45, income: 100 },
  { day: "Thu", spent: 70, income: 110 },
  { day: "Fri", spent: 90, income: 130 },
  { day: "Sat", spent: 60, income: 140 },
  { day: "Sun", spent: 30, income: 80 },
];

const SpendingTrendChart = ({ chartColors }) => {
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
      <Typography
        variant="h6"
        component="h2"
        sx={{ mb: 2, color: "var(--foreground)", fontWeight: 600 }}
      >
        {t("weeklyHistory")}
      </Typography>
      <Box sx={{ width: "100%", height: { xs: 300, md: 400 } }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={historyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#4b5563" : "#e0e0e0"}
              opacity={0.7}
            />
            <XAxis
              dataKey="day"
              stroke={theme === "dark" ? "#9ca3af" : "#666"}
              tick={{
                fontSize: 12,
                fill: theme === "dark" ? "#9ca3af" : "#666",
              }}
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
                t(name), // Translate spent and income
              ]}
            />
            <Legend
              formatter={(value) => (
                <Typography sx={{ color: "var(--foreground)" }}>
                  {t(value)}
                </Typography>
              )}
              verticalAlign="bottom"
              height={36}
            />
            <Bar
              dataKey="spent"
              fill={colors[0]}
              radius={[5, 5, 0, 0]}
              name="spent"
              animationDuration={800}
            />
            <Bar
              dataKey="income"
              fill={colors[1]}
              radius={[5, 5, 0, 0]}
              name="income"
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SpendingTrendChart;
