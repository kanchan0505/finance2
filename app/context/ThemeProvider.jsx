import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const [colorScheme, setColorScheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("colorScheme") || "blue";
    }
    return "blue";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    localStorage.setItem("colorScheme", colorScheme);
  }, [theme, colorScheme]);

  const colorSchemes = {
    blue: {
      primary: "bg-blue-500 hover:bg-blue-600",
      chartColors: ["#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#EFF6FF"],
    },
    green: {
      primary: "bg-green-500 hover:bg-green-600",
      chartColors: ["#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5", "#ECFDF5"],
    },
    purple: {
      primary: "bg-purple-500 hover:bg-purple-600",
      chartColors: ["#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE", "#F5F3FF"],
    },
    orange: {
      primary: "bg-orange-500 hover:bg-orange-600",
      chartColors: ["#F97316", "#FB923C", "#FDBA74", "#FED7AA", "#FFEDD5"],
    },
    teal: {
      primary: "bg-teal-500 hover:bg-teal-600",
      chartColors: ["#2DD4BF", "#5EEAD4", "#99F6E4", "#CCFBF1", "#F0FDFA"],
    },
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colorScheme, setColorScheme, colorSchemes }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
