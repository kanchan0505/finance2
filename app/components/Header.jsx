"use client";
import React, { useContext } from "react";
import { Globe, Settings } from "lucide-react";
import { LanguageContext } from "../context/LanguageProvider";
import Link from "next/link";

const Header = ({ isSidebarOpen }) => {
  const { language, setLanguage, t } = useContext(LanguageContext);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "hi", name: "हिन्दी (Hindi)" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300 z-20 ${
        isSidebarOpen ? "ml-64" : "ml-16"
      } h-16 flex items-center`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          {/* Language Dropdown */}
          <div className="relative group">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Select language"
            >
              <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden hidden group-hover:block z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`w-full py-2 px-4 text-left text-sm ${
                    language === lang.code
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                  } transition-colors duration-300`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Icon */}
          <Link href="/settings">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Go to settings"
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
