"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
      title="Thay đổi giao diện"
    >
      {isDarkMode ? (
        <>
          <span>🌙</span>
          <span className="hidden sm:inline">Tối</span>
        </>
      ) : (
        <>
          <span>☀️</span>
          <span className="hidden sm:inline">Sáng</span>
        </>
      )}
    </button>
  );
}
