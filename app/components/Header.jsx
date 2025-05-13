import React from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import uk from "../../public/images/uk.avif";
import user from "../../public/images/user2.jpg";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 mx-4 sm:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image
            src={uk}
            alt="country flag"
            width={25}
            height={18}
            className="rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform duration-300"
          />
          <div className="relative">
            <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors duration-300" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 group">
            <Image
              src={user}
              alt="user"
              width={35}
              height={35}
              className="rounded-full border-2 border-gray-200 group-hover:border-gray-300 transition-colors duration-300"
            />
            <span className="hidden sm:block text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
              User Name
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
