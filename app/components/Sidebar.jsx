"use client";
import React, { useContext, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeProvider";
import { LanguageContext } from "../context/LanguageProvider";
import {
  Bell,
  DollarSign,
  House,
  Mail,
  Settings,
  Users,
  ShoppingBag,
  ShoppingCart,
  Info,
} from "lucide-react";

const ICONS = {
  Bell,
  DollarSign,
  House,
  Mail,
  Settings,
  Users,
  ShoppingBag,
  ShoppingCart,
  Info,
};

const Sidebar = () => {
  const { colorScheme, colorSchemes } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const sidebarItems = [
    { id: 1, label: t("home"), href: "/overview", icon: "House" },
    { id: 2, label: t("earnings"), href: "/earnings", icon: "DollarSign" },
    { id: 3, label: t("settings"), href: "/settings", icon: "Settings" },
    { id: 4, label: t("shop"), href: "/shop", icon: "ShoppingBag" },
    { id: 7, label: t("users"), href: "/users", icon: "Users" },
  ];

  return (
    <div
      className={`relative z-10 transition-all duration-500 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-white dark:bg-gray-800 p-4 flex flex-col border-r border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 max-w-fit cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu
            size={24}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
          />
        </button>
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 mb-2 ${
                    pathname === item.href
                      ? `${colorSchemes[colorScheme].primary} text-white`
                      : "text-gray-600 dark:text-gray-300"
                  } hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform`}
                >
                  {IconComponent && (
                    <IconComponent
                      size={20}
                      className={`transition-colors duration-300 ${
                        pathname === item.href
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    />
                  )}
                  {isSidebarOpen && (
                    <span className="ml-4 whitespace-nowrap">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
