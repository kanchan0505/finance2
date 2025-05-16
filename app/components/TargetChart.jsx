import React, { useContext } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider";
import { Box, Typography, Paper } from "@mui/material";

const targetData = [
  {
    name: "Target Achievement",
    value: 75,
    fill: "#8884d8",
  },
];

const TargetChart = ({ chartColors }) => {
  const { colorScheme, colorSchemes } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const colors = chartColors || colorSchemes[colorScheme].chartColors;

  // Override fill with theme color for consistency
  targetData[0].fill = colors[0];

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
        {t("targetProgress")}
      </Typography>
      <Box sx={{ width: "100%", height: { xs: 300, md: 400 } }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={20}
            data={targetData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              minAngle={15}
              background={{ fill: "var(--background)" }}
              for
              background
              clockWise
              dataKey="value"
              cornerRadius={10}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: 14, color: "var(--foreground)" }}
              formatter={(value) => (
                <Typography sx={{ color: "var(--foreground)" }}>
                  {value}
                </Typography>
              )}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: 8,
                color: "var(--tooltip-text)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default TargetChart;
