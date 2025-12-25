"use client";

import { useState, useEffect } from "react";
import { HiEye, HiEyeSlash, HiLockClosed, HiArrowRight } from "react-icons/hi2";
import { m } from "framer-motion";

const ADMIN_PASSWORD = "jenera2025"; // Change this to your secure password

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDropActive, setIsDropActive] = useState(false);

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem("adminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }

    // Load drop state
    const dropState = localStorage.getItem("dropSquareActive");
    if (dropState !== null) {
      setIsDropActive(JSON.parse(dropState));
    }
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

  const toggleDrop = () => {
    const newState = !isDropActive;
    setIsDropActive(newState);
    
    // Save to local storage for persistence
    localStorage.setItem("dropSquareActive", JSON.stringify(newState));
    
    // Trigger custom event so the main page updates immediately if open in another tab
    window.dispatchEvent(new Event("dropSquareToggle"));
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-neutral-950 border border-white/10 p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                <HiLockClosed className="text-white" size={32} />
              </div>
            </div>

            <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">
              ADMIN ACCESS
            </h1>
            <p className="text-white/60 text-center mb-8 text-sm">
              Enter password to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-white/60 uppercase mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-colors pr-12"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <HiEyeSlash size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
                {error && (
                  <m.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-2"
                  >
                    {error}
                  </m.p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-bold text-sm tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group"
              >
                LOGIN
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="text-[10px] text-white/40 text-center mt-6">
              Protected Area • Authorized Personnel Only
            </p>
          </div>
        </m.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                ADMIN PANEL
              </h1>
              <p className="text-white/60">Manage homepage display settings</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-bold tracking-[0.2em] uppercase"
            >
              LOGOUT
            </button>
          </div>

          {/* Main Control Card */}
          <div className="bg-neutral-950 border border-white/10 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                  Homepage Display
                </h2>
                <p className="text-white/60 text-sm">
                  Control what visitors see on the main homepage
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    Drop Square Page
                  </h3>
                  <p className="text-white/60 text-sm">
                    {isDropActive 
                      ? "Currently showing drop signup page to all visitors"
                      : "Currently showing normal homepage to all visitors"
                    }
                  </p>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={toggleDrop}
                  className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                    isDropActive ? "bg-white" : "bg-white/10"
                  }`}
                >
                  <m.div
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`absolute top-1 w-8 h-8 rounded-full shadow-lg ${
                      isDropActive
                        ? "right-1 bg-black"
                        : "left-1 bg-white/40"
                    }`}
                  />
                </button>
              </div>

              {/* Status Display */}
              <div className="mt-6 p-4 bg-black border border-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isDropActive ? "bg-green-500 animate-pulse" : "bg-white/20"
                    }`}
                  />
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60">
                    Current Status:
                  </span>
                  <span className="text-sm font-bold text-white">
                    {isDropActive ? "DROP PAGE ACTIVE" : "NORMAL HOMEPAGE ACTIVE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-950 border border-white/10 p-6">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <HiEye className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Normal Homepage
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Shows all sections: Hero, Products, Categories, Collections, Brand Story, and more.
              </p>
            </div>

            <div className="bg-neutral-950 border border-white/10 p-6">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <HiEyeSlash className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Drop Square Page
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Shows only the exclusive drop signup page. Acts as a "Coming Soon" or "Locked" landing page.
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-neutral-950/50 border border-white/5">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/60 mb-3">
              How it works
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-white/40">•</span>
                <span>Toggle OFF (left) = Visitors see normal homepage with all sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/40">•</span>
                <span>Toggle ON (right) = Visitors see only the drop signup page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/40">•</span>
                <span>Changes take effect immediately</span>
              </li>
            </ul>
          </div>
        </m.div>
      </div>
    </div>
  );
}