"use client";
import React, { useContext } from "react";
import { X } from "lucide-react";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider";
import { translations } from "../lib/translations";

const ThemeSidebar = ({ isOpen, toggleSidebar }) => {
  const { theme, toggleTheme, colorScheme, setColorScheme, colorSchemes } =
    useContext(ThemeContext);
  const { language, setLanguage, t } = useContext(LanguageContext);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "hi", name: "हिन्दी" },
  ];

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("themeSettings")}
          </h2>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Theme Toggle Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("theme")}
          </h3>
          <button
            onClick={toggleTheme}
            className={`w-full py-2 px-4 rounded-md ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {theme === "dark" ? t("switchToLight") : t("switchToDark")}
          </button>
        </div>

        {/* Color Scheme Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("colorScheme")}
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {Object.keys(colorSchemes).map((scheme) => (
              <button
                key={scheme}
                onClick={() => setColorScheme(scheme)}
                className={`h-8 rounded-full ${
                  colorSchemes[scheme].primary.split(" ")[0]
                } ${
                  colorScheme === scheme
                    ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500"
                    : ""
                }`}
                aria-label={`${scheme} color scheme`}
              />
            ))}
          </div>
        </div>

        {/* Language Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("language")}
          </h3>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full py-2 px-4 rounded-md text-left ${
                  language === lang.code
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ThemeSidebar;
