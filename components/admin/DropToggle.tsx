// src/components/admin/DropToggle.tsx
"use client";

import { useState, useEffect } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export function DropToggle() {
  const [isDropActive, setIsDropActive] = useState(false);

  useEffect(() => {
    // Load state from localStorage
    const savedState = localStorage.getItem("dropSquareActive");
    if (savedState !== null) {
      setIsDropActive(JSON.parse(savedState));
    }
  }, []);

  const toggleDrop = () => {
    const newState = !isDropActive;
    setIsDropActive(newState);
    localStorage.setItem("dropSquareActive", JSON.stringify(newState));
    window.dispatchEvent(new Event("dropSquareToggle"));
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <button
        onClick={toggleDrop}
        className="flex items-center gap-3 bg-white text-black px-6 py-3 shadow-2xl hover:bg-neutral-200 transition-all group border-2 border-black"
        title={isDropActive ? "Hide Drop Square" : "Show Drop Square"}
      >
        <span className="text-xs font-bold tracking-[0.2em] uppercase">
          {isDropActive ? "HIDE DROP" : "SHOW DROP"}
        </span>
        {isDropActive ? (
          <HiEyeSlash size={20} className="group-hover:scale-110 transition-transform" />
        ) : (
          <HiEye size={20} className="group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}