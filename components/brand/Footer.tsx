// src/components/brand/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { useState } from "react";
import { 
  FaInstagram, 
  FaPinterestP, 
  FaTiktok, 
  FaXTwitter 
} from "react-icons/fa6";
import { HiChevronDown } from "react-icons/hi2";

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

function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/5 md:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 md:cursor-default"
        aria-expanded={isOpen}
      >
        <h4 className="text-[10px] tracking-[0.3em] uppercase font-semibold text-white/60">
          {title}
        </h4>
        <HiChevronDown 
          className={`w-4 h-4 text-white/40 transition-transform duration-300 md:hidden ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <m.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden md:!h-auto md:!opacity-100"
      >
        <div className="pb-4 md:pb-0">
          {children}
        </div>
      </m.div>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/5 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 opacity-[0.01]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative z-10"> 
        {/* TIGHT PADDING */}
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-12 mb-6 md:mb-8"> 
          
          <div className="md:col-span-5 lg:col-span-4 mb-6 md:mb-0">
            <Link href="/" className="inline-block mb-3 md:mb-4">
              <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.3em]">JENERA</span>
            </Link>
            <p className="text-[11px] sm:text-xs md:text-sm text-white/40 leading-relaxed mb-4 md:mb-6 max-w-xs">
              Timeless elegance meets modern craftsmanship.
            </p>

            <div className="flex items-center gap-2.5 md:gap-3">
              {SOCIAL_LINKS.map((social) => (
                <m.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 md:w-9 md:h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={13} className="md:w-[14px] md:h-[14px]" />
                </m.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-3">
            <CollapsibleSection title="Quick Links">
              <ul className="space-y-2 md:space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-white/40 hover:text-white transition-colors duration-300 inline-block hover:translate-x-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <CollapsibleSection title="Legal">
              <ul className="space-y-2 md:space-y-2.5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-white/40 hover:text-white transition-colors duration-300 inline-block hover:translate-x-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          </div>

          <div className="hidden md:block md:col-span-12 lg:col-span-2 lg:text-right">
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-white/60 hover:text-white transition-colors group"
            >
              <span>Subscribe</span>
              <span className="w-px h-3 bg-white/20 group-hover:bg-white/40 transition-colors" />
              <span className="text-white/40 group-hover:text-white/60 transition-colors">↑</span>
            </Link>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 mb-5 md:mb-6" />

        <div className="flex flex-col items-center gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-col items-center gap-2 md:gap-3 order-1 md:order-2 md:items-end w-full md:w-auto">
            <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-white/20 uppercase">
              Secure Payments
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {paymentIcons.map((icon) => (
                  <div
                    key={icon.name}
                    className="h-8 w-10 relative bg-white rounded p-1 shadow-sm"
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

          <p className="text-[9px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] text-white/30 uppercase order-2 md:order-1 text-center md:text-left">
            © {currentYear} Jenera. All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </footer>
  );
}