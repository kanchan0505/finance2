"use client";
import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageProvider";
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
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  backgroundColor: "#f3f4f6",
  color: "#374151",
}));

const StatCard = ({ name, icon: Icon, value }) => {
  const { t } = useContext(LanguageContext);
  const translationKey = name.toLowerCase().replace(/\s/g, "");

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <StyledCard>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <IconWrapper>
              <Icon sx={{ fontSize: 24, color: "#374151" }} />
            </IconWrapper>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                color: "#6b7280",
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
              color: "#374151",
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
