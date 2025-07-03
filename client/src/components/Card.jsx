import React from "react";

export default function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 transition-all">
      {children}
    </div>
  );
}
