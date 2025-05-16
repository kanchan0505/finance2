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

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            <div className="flex min-h-screen">
              <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
              <div className="flex-1 flex flex-col">
                <Header isSidebarOpen={isSidebarOpen} />
                <main className="flex-1 pt-16">{children}</main>
              </div>
              <ThemeSidebar />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
