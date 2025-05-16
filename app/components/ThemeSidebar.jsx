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

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "320px",
        background: theme === "dark" ? "#1f2937" : "#ffffff",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        transform: isThemeSidebarOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 50,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            color: theme === "dark" ? "#f9fafb" : "#1f2937",
          }}
        >
          {t("themeSettings")}
        </h2>
        <button
          onClick={toggleThemeSidebar}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "999px",
          }}
          aria-label="Close sidebar"
        >
          <X color={theme === "dark" ? "#d1d5db" : "#4b5563"} size={20} />
        </button>
      </div>

      {/* Theme Toggle */}
      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            fontSize: "14px",
            marginBottom: "8px",
            color: theme === "dark" ? "#d1d5db" : "#374151",
          }}
        >
          {t("theme")}
        </h3>
        <button
          onClick={() => {
            toggleTheme();
            toggleThemeSidebar(); // Close sidebar
          }}
          style={{
            padding: "10px 16px",
            width: "100%",
            borderRadius: "8px",
            background: theme === "dark" ? "#374151" : "#e5e7eb",
            color: theme === "dark" ? "#ffffff" : "#111827",
            border: "none",
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? t("switchToLight") : t("switchToDark")}
        </button>
      </div>

      {/* Color Scheme */}
      <div>
        <h3
          style={{
            fontSize: "14px",
            marginBottom: "8px",
            color: theme === "dark" ? "#d1d5db" : "#374151",
          }}
        >
          {t("colorScheme")}
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
          }}
        >
          {Object.keys(colorSchemes).map((scheme) => (
            <button
              key={scheme}
              onClick={() => {
                setColorScheme(scheme);
                toggleThemeSidebar(); // Close sidebar
              }}
              aria-label={`${scheme} color scheme`}
              style={{
                height: "32px",
                width: "32px",
                borderRadius: "999px",
                backgroundColor: colorSchemes[scheme].primary,
                border:
                  colorScheme === scheme
                    ? "2px solid #3b82f6"
                    : "1px solid #ccc",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ThemeSidebar;
