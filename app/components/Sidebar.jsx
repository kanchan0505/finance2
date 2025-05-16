"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  Users,
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  const sidebarItems = [
    { id: 1, label: "Home", href: "/overview", icon: "House" },
    { id: 2, label: "Earnings", href: "/earnings", icon: "DollarSign" },
    { id: 3, label: "Settings", href: "/settings", icon: "Settings" },
    { id: 4, label: "Shop", href: "/shop", icon: "ShoppingBag" },
    { id: 5, label: "Users", href: "/users", icon: "Users" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-white dark:bg-gray-800 flex flex-col items-start py-4 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 z-30`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 mx-auto mb-6"
        aria-label="Toggle sidebar"
      >
        <Menu
          size={24}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300"
        />
      </button>

      <nav className="flex flex-col items-start w-full space-y-4 flex-grow px-2">
        {sidebarItems.map((item) => {
          const IconComponent = ICONS[item.icon];
          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`flex items-center p-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-300"
                } hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transform`}
              >
                {IconComponent && (
                  <IconComponent
                    size={24}
                    className={`transition-colors duration-300 ${
                      pathname === item.href
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  />
                )}
                {isOpen && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Issue Badge */}
      <div
        className={`mb-4 ${
          isOpen ? "px-4" : "px-2"
        } w-full flex justify-center`}
      >
        <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
          <span>1 ISSUE</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
