"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ThemeProvider from "./context/ThemeProvider";
import LanguageProvider from "./context/LanguageProvider";
import ThemeSidebar from "./components/ThemeSidebar";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isThemeSidebarOpen, setIsThemeSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsThemeSidebarOpen((prev) => !prev);
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={isThemeSidebarOpen ? "theme-sidebar-open" : ""}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header toggleSidebar={toggleSidebar} />
                {children}
              </div>
              <ThemeSidebar
                isOpen={isThemeSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
