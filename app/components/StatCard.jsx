import React from "react";

const StatCard = ({ name, icon: Icon, value }) => {
  return (
    <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-300">
          <Icon size={20} className="mr-2 text-gray-400 dark:text-gray-500" />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray-800 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
