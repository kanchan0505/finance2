"use client";
import React, { useContext } from "react";
import { X } from "lucide-react";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider";

const ThemeSidebar = () => {
  const {
    theme,
    toggleTheme,
    colorScheme,
    setColorScheme,
    colorSchemes,
    isThemeSidebarOpen,
    toggleThemeSidebar,
  } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  // Debug log to confirm isOpen state
  console.log("ThemeSidebar isOpen:", isThemeSidebarOpen);

  return (
    <aside
      className={`fixed top-0 right-0 h-screen w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isThemeSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t("themeSettings")}
          </h2>
          <button
            onClick={toggleThemeSidebar}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
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
            className={`w-full py-2 px-4 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-100 text-gray-800"
            } hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300`}
          >
            {theme === "dark" ? t("switchToLight") : t("switchToDark")}
          </button>
        </div>

        {/* Color Scheme Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("colorScheme")}
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {Object.keys(colorSchemes).map((scheme) => (
              <button
                key={scheme}
                onClick={() => setColorScheme(scheme)}
                className={`h-8 w-8 rounded-full ${
                  colorSchemes[scheme].primary.split(" ")[0]
                } ${
                  colorScheme === scheme
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : "hover:ring-2 hover:ring-offset-2 hover:ring-blue-300"
                } transition-all duration-300`}
                aria-label={`${scheme} color scheme`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ThemeSidebar;
