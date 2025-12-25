"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { 
  FaInstagram, 
  FaPinterestP, 
  FaTiktok, 
  FaXTwitter,
  FaPlus,
  FaMinus
} from "react-icons/fa6";

const QUICK_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Service", href: "/policies/terms" },
  { label: "Shipping Policy", href: "/policies/shipping" },
];

const SOCIAL_LINKS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaPinterestP, href: "https://pinterest.com", label: "Pinterest" },
  { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
];

const paymentIcons = [
  {
    name: "Klarna",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Klarna_Wordmark_Transparent_And_Black_v2.svg/2560px-Klarna_Wordmark_Transparent_And_Black_v2.svg.png",
  },
  {
    name: "Visa",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
  },
  {
    name: "Mastercard",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png",
  },
  {
    name: "Maestro",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Maestro_2016.svg/1280px-Maestro_2016.svg.png",
  },
  {
    name: "Apple Pay",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png",
  },
  {
    name: "Google Pay",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
  },
  {
    name: "Amex",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // State for mobile collapsible sections
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-black text-white border-t border-white/5 relative overflow-hidden" role="contentinfo">
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="relative w-[70vw] h-[70vw] md:w-[22vw] md:h-[22vw] opacity-[0.03] grayscale contrast-125">
             <Image 
                src="/logo2.png" 
                alt="Fear Yah Watermark" 
                fill 
                className="object-contain"
                priority
             />
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10"> 
        
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-12 gap-y-6 gap-x-4 md:gap-12 mb-6 md:mb-10"> 
          
          {/* BRAND COLUMN */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4">
            <Link href="/" className="inline-block mb-2 md:mb-4 group">
               <span className="text-2xl md:text-3xl font-black tracking-[0.2em] uppercase text-white group-hover:text-white/80 transition-colors">
                 Fear Yah
               </span>
            </Link>
            
            <p className="text-[10px] sm:text-xs text-white/40 leading-relaxed mb-3 md:mb-4 max-w-xs">
              Timeless elegance meets modern craftsmanship.
              <br />Bow to none but one.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <m.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 rounded-sm"
                  aria-label={social.label}
                >
                  <social.icon size={12} />
                </m.a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS (Collapsible on Mobile) */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3 border-t border-white/5 md:border-none pt-4 md:pt-0">
            <button 
                onClick={() => toggleSection('quick-links')}
                className="w-full flex items-center justify-between md:hidden group"
            >
                <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/60">
                    Quick Links
                </h4>
                <span className="text-white/40 group-hover:text-white transition-colors">
                    {openSection === 'quick-links' ? <FaMinus size={10} /> : <FaPlus size={10} />}
                </span>
            </button>

            {/* Desktop Title (Hidden on Mobile) */}
            <h4 className="hidden md:block text-[10px] tracking-[0.3em] uppercase font-bold text-white/60 mb-6">
                Quick Links
            </h4>

            {/* Content Wrapper */}
            <div className={`${openSection === 'quick-links' ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
                <ul className="space-y-3 md:space-y-3">
                {QUICK_LINKS.map((link) => (
                    <li key={link.label}>
                    <Link
                        href={link.href}
                        className="text-[11px] md:text-sm text-white/40 hover:text-white transition-colors duration-300 inline-block hover:translate-x-0.5"
                    >
                        {link.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
          </div>

          {/* LEGAL (Collapsible on Mobile) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 border-t border-white/5 md:border-none pt-4 md:pt-0">
            <button 
                onClick={() => toggleSection('legal')}
                className="w-full flex items-center justify-between md:hidden group"
            >
                <h4 className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/60">
                    Legal
                </h4>
                <span className="text-white/40 group-hover:text-white transition-colors">
                    {openSection === 'legal' ? <FaMinus size={10} /> : <FaPlus size={10} />}
                </span>
            </button>

            {/* Desktop Title */}
            <h4 className="hidden md:block text-[10px] tracking-[0.3em] uppercase font-bold text-white/60 mb-6">
                Legal
            </h4>

            {/* Content Wrapper */}
            <div className={`${openSection === 'legal' ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
                <ul className="space-y-3 md:space-y-3">
                {LEGAL_LINKS.map((link) => (
                    <li key={link.label}>
                    <Link
                        href={link.href}
                        className="text-[11px] md:text-sm text-white/40 hover:text-white transition-colors duration-300 inline-block hover:translate-x-0.5"
                    >
                        {link.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
          </div>

          {/* SUBSCRIBE */}
          <div className="col-span-12 lg:col-span-2 lg:text-right mt-2 lg:mt-0 border-t border-white/5 md:border-none pt-4 md:pt-0">
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-semibold text-white/60 hover:text-white transition-colors group"
            >
              <span>Subscribe</span>
              <span className="w-px h-3 bg-white/20 group-hover:bg-white/40 transition-colors" />
              <span className="text-white/40 group-hover:text-white/60 transition-colors">↑</span>
            </Link>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 mb-4 md:mb-8" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-col items-center gap-2 order-1 md:order-2 md:items-end w-full md:w-auto">
            <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-white/20 uppercase">
              Secure Payments
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
                {paymentIcons.map((icon) => (
                  <div
                    key={icon.name}
                    className="h-6 w-8 md:h-8 md:w-10 relative bg-white rounded-[2px] p-0.5 shadow-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <img
                      src={icon.src}
                      alt={icon.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
          </div>

          <p className="text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] text-white/30 uppercase order-2 md:order-1 text-center md:text-left font-medium">
            © {currentYear} Fear Yah. All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </footer>
  );
}