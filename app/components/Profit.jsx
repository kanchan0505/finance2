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
import { Box, Typography, Paper } from "@mui/material";

const budgetData = [
  { name: "spent", value: 65 },
  { name: "remaining", value: 35 },
];

const Profit = ({ chartColors }) => {
  const { colorScheme, colorSchemes } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const colors = chartColors || colorSchemes[colorScheme].chartColors;

  // Translate data names
  const translatedData = budgetData.map((item) => ({
    ...item,
    name: t(item.name),
  }));

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
        {t("budgetOverview")}
      </Typography>
      <Box sx={{ width: "100%", height: { xs: 300, md: 400 } }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={translatedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              innerRadius={80}
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
              {translatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  style={{ transition: "opacity 0.3s", cursor: "pointer" }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: 8,
                color: "var(--tooltip-text)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <Typography sx={{ color: "var(--foreground)" }}>
                  {value}
                </Typography>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default Profit;
