// components/Header.jsx
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider"; // Import LanguageContext
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const drawerWidth = 280;
const collapsedWidth = 80;
const leftAdjustment = 20;
const rightAdjustment = 20;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})(({ theme, sidebarOpen }) => ({
  background: "var(--card-bg)", // #1f2937 in dark mode
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(29, 41, 55, 0.3)" : "var(--card-bg)", // Slightly translucent in dark mode
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid var(--card-border)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  color: "var(--foreground)",
  zIndex: theme.zIndex.drawer + 1,
  position: "fixed",
  top: 14,
  left: sidebarOpen
    ? drawerWidth + leftAdjustment
    : collapsedWidth + leftAdjustment,
  width: `calc(100% - ${
    sidebarOpen
      ? drawerWidth + leftAdjustment + rightAdjustment
      : collapsedWidth + leftAdjustment + rightAdjustment
  }px)`,
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  transition: theme.transitions.create(["left", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  boxSizing: "border-box",
}));

const pageDetails = [
  { path: "/", name: "dashboard", icon: <HomeIcon /> },
  { path: "/goals", name: "goals", icon: <FlagIcon /> },
  { path: "/transactions", name: "transactions", icon: <SwapHorizIcon /> },
  { path: "/chatbot", name: "chatbot", icon: <ChatIcon /> },
];

export default function Header({ isDarkMode, sidebarOpen, setIsSidebarOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage, t } = useContext(LanguageContext); // Access LanguageContext
  const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);

  const currentPage = pageDetails.find((page) => page.path === pathname) || {
    name: "dashboard",
    icon: <HomeIcon />,
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = (lang) => {
    if (lang) {
      setLanguage(lang); // Update the language using setLanguage
      // Change language logic here
    }
    setLanguageAnchorEl(null);
  };

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  return (
    <StyledAppBar sidebarOpen={sidebarOpen}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1.5,
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Toggle Sidebar">
            <IconButton
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              sx={{
                color: "var(--foreground)",
                opacity: isDarkMode ? 0.5 : 1,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {sidebarOpen ? <LockOpenIcon /> : <LockIcon />}
            </IconButton>
          </Tooltip>
          {React.cloneElement(currentPage.icon, {
            sx: {
              color: "var(--foreground)",
              opacity: isDarkMode ? 0.5 : 1,
            },
          })}
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              textTransform: "capitalize",
              color: "var(--foreground)",
              opacity: isDarkMode ? 0.5 : 1,
            }}
          >
            {t(currentPage.name)}
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Theme Toggle */}
          <Tooltip
            title={theme === "dark" ? t("switchToLight") : t("switchToDark")}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "var(--foreground)",
                opacity: isDarkMode ? 0.5 : 1,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
              }}
            >
              {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Language Button */}
          <Tooltip title="Change Language">
            <IconButton
              onClick={handleLanguageClick}
              sx={{
                color: "var(--foreground)",
                opacity: isDarkMode ? 0.5 : 1,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>

          {/* Language Menu */}
          <Menu
            anchorEl={languageAnchorEl}
            open={Boolean(languageAnchorEl)}
            onClose={() => handleLanguageClose(null)}
            PaperProps={{
              sx: {
                backdropFilter: "blur(10px)",
                background: "var(--card-bg)",
                color: "var(--foreground)",
                opacity: isDarkMode ? 0.7 : 1,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid var(--card-border)",
              },
            }}
          >
            <MenuItem onClick={() => handleLanguageClose("en")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageClose("es")}>
              Español
            </MenuItem>
            <MenuItem onClick={() => handleLanguageClose("hi")}>
              हिन्दी (Hindi)
            </MenuItem>
          </Menu>

          {/* Settings Button */}
          <Tooltip title="Settings">
            <IconButton
              onClick={handleSettingsClick}
              sx={{
                color: "var(--foreground)",
                opacity: isDarkMode ? 0.5 : 1,
                bgcolor: "rgba(255, 255, 255, 0.05)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 195, 0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}
