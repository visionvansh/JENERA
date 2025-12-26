// src/components/brand/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HiOutlineShoppingBag, HiOutlineUser, HiOutlineSearch } from "react-icons/hi";
import { HiXMark, HiBars3 } from "react-icons/hi2";
import Image from "next/image";
import { useCart } from '@/contexts/CartContext';
import { CartDrawer } from '@/components/brand/CartDrawer';

const NAV_LINKS = [
  { id: "new", label: "New Arrivals", href: "#new" },
  { id: "collections", label: "Collections", href: "#collections" },
  { id: "lookbook", label: "Lookbook", href: "#lookbook" },
  { id: "about", label: "About", href: "#about" },
];

export function Navbar() {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Left - Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-xs font-medium tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <HiXMark size={24} /> : <HiBars3 size={24} />}
            </button>

            {/* Center - Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group"
              aria-label="JENERA Home"
            >
              <div className="relative flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="JENERA Logo"
                  width={120}
                  height={40}
                  priority
                  className="object-contain"
                />

                {/* Luxury hover underline */}
                <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>

            {/* Right - Navigation Links (Desktop) & Icons */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {NAV_LINKS.slice(2).map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-xs font-medium tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Search"
              >
                <HiOutlineSearch size={20} />
              </button>
              <Link
                href="/account"
                className="w-10 h-10 hidden sm:flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Account"
              >
                <HiOutlineUser size={20} />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors relative"
                aria-label="Shopping bag"
              >
                <HiOutlineShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center gap-8">
                {NAV_LINKS.map((link, index) => (
                  <m.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase text-white hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </m.div>
                ))}
              </nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:text-white/70 transition-colors"
              aria-label="Close search"
            >
              <HiXMark size={28} />
            </button>
            <div className="w-full max-w-2xl">
              <m.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-white py-4 text-2xl sm:text-3xl text-white placeholder-white/30 outline-none text-center tracking-wider"
                  autoFocus
                />
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}