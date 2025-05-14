"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Bell, Palette } from "lucide-react";
import { ThemeContext } from "../context/ThemeProvider";

import user from "../../public/images/user2.jpg";

const Header = ({ toggleSidebar }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="relative">
            <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300" />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Open theme changer"
            >
              <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 group">
            <Image
              src={user}
              alt="user"
              width={35}
              height={35}
              className="rounded-full border-2 border-gray-200 dark:border-gray-600 group-hover:border-gray-300 dark:group-hover:border-gray-500 transition-colors duration-300"
            />
            <span className="hidden sm:block text-gray-700 dark:text-gray-200 font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
              User Name
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
