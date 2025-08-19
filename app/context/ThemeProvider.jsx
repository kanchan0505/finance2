// context/ThemeProvider.jsx
"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const colorSchemes = {
    blue: {
      primary: "#3B82F6", // Tailwind blue-500
      chartColors: ["#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#EFF6FF"],
    },
    green: {
      primary: "#22C55E",
      chartColors: ["#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5", "#ECFDF5"],
    },
    purple: {
      primary: "#8B5CF6",
      chartColors: ["#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE", "#F5F3FF"],
    },
    orange: {
      primary: "#F97316",
      chartColors: ["#F97316", "#FB923C", "#FDBA74", "#FED7AA", "#FFEDD5"],
    },
    teal: {
      primary: "#14B8A6",
      chartColors: ["#2DD4BF", "#5EEAD4", "#99F6E4", "#CCFBF1", "#F0FDFA"],
    },
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [colorScheme, setColorScheme] = useState(() => {
    if (typeof window === "undefined") return "blue";
    const saved = localStorage.getItem("colorScheme");
    return saved && colorSchemes[saved] ? saved : "blue";
  });

  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState(false);

  const toggleThemeSidebar = () => {
    console.log(
      "toggleThemeSidebar called, current state:",
      isThemeSidebarOpen
    );
    setIsThemeSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Create MUI theme that syncs with custom theme
  const muiTheme = createTheme({
    palette: {
      mode: theme, // Sync with custom theme (light/dark)
      primary: {
        main: colorSchemes[colorScheme]?.primary || "#3B82F6",
      },
      background: {
        default: theme === "dark" ? "#0a0a0a" : "#ffffff", // Match globals.css
        paper: theme === "dark" ? "#1f2937" : "#ffffff", // Match --card-bg
      },
      text: {
        primary: theme === "dark" ? "#ededed" : "#171717", // Match --foreground
        secondary: theme === "dark" ? "#9ca3af" : "#6b7280", // Match --text-secondary
      },
    },
    shadows: [
      "none",
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)", // shadow[3]
      // ... other shadows
    ],
  });

  // Apply theme + persist in localStorage
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply color scheme + set --primary CSS variable dynamically
  useEffect(() => {
    const root = document.documentElement;
    const scheme = colorSchemes[colorScheme];
    if (scheme) {
      root.style.setProperty("--primary", scheme.primary);
    }
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colorScheme,
        setColorScheme,
        colorSchemes,
        isThemeSidebarOpen,
        toggleThemeSidebar,
      }}
    >
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
