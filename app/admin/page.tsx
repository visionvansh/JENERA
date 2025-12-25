// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { HiEye, HiEyeSlash, HiLockClosed, HiArrowRight } from "react-icons/hi2";
import { m } from "framer-motion";
import { toggleDropStatus, getDropStatus } from "@/app/actions"; // Import Server Actions

const ADMIN_PASSWORD = "jenera2025"; 

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") setIsAuthenticated(true);

    // Initial fetch of status
    getDropStatus().then(setIsDropActive);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuthenticated", "true");
      setError("");
    } else {
      setError("Invalid password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
    setPassword("");
  };

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      // Calls Server Action (Database Update)
      const newState = await toggleDropStatus();
      setIsDropActive(newState);
    } catch (err) {
      console.error("Failed to toggle", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-neutral-950 border border-white/10 p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                <HiLockClosed className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">ADMIN ACCESS</h1>
            <p className="text-white/60 text-center mb-8 text-sm">Enter password to continue</p>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-white/60 uppercase mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors pr-12"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors">
                    {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
              <button type="submit" className="w-full py-4 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group">
                LOGIN <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </m.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">ADMIN PANEL</h1>
              <p className="text-white/60">Global Homepage Control</p>
            </div>
            <button onClick={handleLogout} className="px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-bold tracking-[0.2em] uppercase">LOGOUT</button>
          </div>
          <div className="bg-neutral-950 border border-white/10 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Homepage Status</h2>
                <p className="text-white/60 text-sm">
                  {isDropActive ? "Currently showing: DROP SQUARE ONLY (Popup)" : "Currently showing: FULL WEBSITE"}
                </p>
              </div>
            </div>
            <div className="border-t border-white/5 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Drop Mode</h3>
                  <p className="text-xs text-white/40">Turning this ON affects EVERY visitor instantly.</p>
                </div>
                <button
                  onClick={handleToggle}
                  disabled={isLoading}
                  className={`relative w-20 h-10 rounded-full transition-all duration-300 ${isDropActive ? "bg-white" : "bg-white/10"} ${isLoading ? "opacity-50" : ""}`}
                >
                  <m.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`absolute top-1 w-8 h-8 rounded-full shadow-lg ${isDropActive ? "right-1 bg-black" : "left-1 bg-white/40"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}