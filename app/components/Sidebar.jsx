"use client";
import React, { useEffect, useState } from "react";
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
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const sidebarItems = [
    { id: 1, label: "Home", href: "/overview", icon: "House" },
    { id: 2, label: "Earnings", href: "/earnings", icon: "DollarSign" },
    { id: 3, label: "Settings", href: "/settings", icon: "Settings" },
    { id: 4, label: "Shop", href: "/shop", icon: "ShoppingBag" },
    { id: 5, label: "Cart", href: "/cart", icon: "ShoppingCart" },
    { id: 6, label: "Messages", href: "/messages", icon: "Mail" },
    { id: 7, label: "Users", href: "/users", icon: "Users" },
    { id: 8, label: "Notifications", href: "/notifications", icon: "Bell" },
    { id: 9, label: "About", href: "/about", icon: "Info" },
  ];

  return (
    <div
      className={`relative z-10 transition-all duration-500 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-white p-4 flex flex-col border-r border-gray-100 shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-50 transition-colors duration-300 max-w-fit cursor-pointer"
        >
          <Menu
            size={24}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          />
        </button>
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-300 mb-2 ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600"
                  } hover:text-gray-900 hover:scale-105 transform`}
                >
                  {IconComponent && (
                    <IconComponent
                      size={20}
                      className="transition-colors duration-300"
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
