"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ThemeProvider from "./context/ThemeProvider";
import LanguageProvider from "./context/LanguageProvider";
import ThemeSidebar from "./components/ThemeSidebar";
import CustomCursor from "./context/CustomCursor";
import { useState } from "react";
import { Box } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [manualMode, setManualMode] = useState(true); // or false, whatever you want

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                open={isSidebarOpen}
                onToggle={setIsSidebarOpen} // ✅ This is important
                isManualMode={manualMode}
                onModeToggle={setManualMode}
              />
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  ml: isSidebarOpen ? "10px" : "64px",
                  transition: "margin-left 0.3s ease",
                }}
              >
                <Header
                  sidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />

                <Box sx={{ flexGrow: 1, pt: "64px" }}>{children}</Box>
              </Box>
              <ThemeSidebar />
            </Box>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
