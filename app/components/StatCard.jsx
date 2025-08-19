// components/StatCard.jsx
"use client";
import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";
import { ThemeContext } from "../context/ThemeProvider"; // Import ThemeContext
import { motion } from "framer-motion";
import { Card, CardContent, Box, Typography, styled } from "@mui/material";

// Animation variants
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper, // Use MUI theme background
  boxShadow: theme.shadows[3], // Use MUI shadow
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6], // Stronger shadow on hover
  },
}));

const IconWrapper = styled(Box)(({ theme, primaryColor }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  backgroundColor: theme.palette.action.hover, // Theme-aware background
  color: primaryColor || theme.palette.text.primary, // Use primary color for icon
}));

const StatCard = ({ name, icon: Icon, value }) => {
  const { t } = useContext(LanguageContext);
  const { theme, colorScheme, colorSchemes } = useContext(ThemeContext); // Access ThemeContext
  const translationKey = name.toLowerCase().replace(/\s/g, "");

  // Fallback primary color
  const primaryColor = colorSchemes[colorScheme]?.primary || "#3B82F6";

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <StyledCard>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <IconWrapper primaryColor={primaryColor}>
              <Icon sx={{ fontSize: 24 }} />
            </IconWrapper>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                color: theme === "dark" ? "grey.400" : "text.secondary",
              }}
            >
              {t(translationKey)}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              color: theme === "dark" ? "common.white" : "text.primary",
            }}
          >
            {value}
          </Typography>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default StatCard;
