//Volumes/vision/codes/jenara/my-app/app/shipping-policy/page.tsx
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/brand/Navbar";

export default function ShippingPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none fixed">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-light block mb-4 uppercase">
              Customer Care
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              SHIPPING <span className="font-extralight text-white/60">POLICY</span>
            </h1>
            <p className="text-white/40 text-xs sm:text-sm tracking-widest uppercase">
              Delivery & Handling
            </p>
          </motion.div>

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-neutral-900/30 border border-white/5 p-6 sm:p-10 md:p-14 backdrop-blur-sm rounded-sm">
              
              <div className="prose prose-invert max-w-none text-white/70 text-sm sm:text-base leading-relaxed space-y-12 font-light">
                
                {/* 1. Shipping Costs */}
                <div>
                  <SectionHeader number="01" title="Shipping Costs" />
                  <div className="grid sm:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                      <h3 className="text-white font-medium mb-2 uppercase tracking-wide text-sm">United Kingdom</h3>
                      <p className="text-2xl font-light text-white">£0</p>
                      <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Standard Shipping</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                      <h3 className="text-white font-medium mb-2 uppercase tracking-wide text-sm">International</h3>
                      <p className="text-white/80">Calculated at checkout</p>
                      <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Based on location</p>
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Times */}
                <div>
                  <SectionHeader number="02" title="Delivery Times" />
                  <div className="space-y-4 mt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4">
                      <span className="text-white font-medium">United Kingdom</span>
                      <span className="text-white/60 mt-1 sm:mt-0">5 - 10 working days</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4">
                      <span className="text-white font-medium">EU Countries</span>
                      <span className="text-white/60 mt-1 sm:mt-0">10 - 14 working days</span>
                    </div>
                  </div>
                  <p className="mt-6 text-white/50 text-sm italic border-l-2 border-white/20 pl-4">
                    <strong className="text-white/70 not-italic">Note:</strong> In exceptional cases, shipping may be delayed due to high order volumes (e.g. during holidays or sales).
                  </p>
                </div>

                {/* 3. Shipment Tracking */}
                <div>
                  <SectionHeader number="03" title="Shipment Tracking" />
                  <p>
                    Once your order has been shipped, you will receive an email with the tracking number (tracking link), if available. Order processing typically takes <strong className="text-white font-medium">1-3 business days</strong> before shipment occurs.
                  </p>
                </div>

                {/* 4. Shipping Service Provider */}
                <div>
                  <SectionHeader number="04" title="Shipping Service Provider" />
                  <p>
                    Shipping is carried out by DHL, Hermes, DPD, or another service provider. We reserve the right to choose an alternative shipping partner in individual cases to ensure the fastest delivery for your location.
                  </p>
                </div>

                {/* 5. Undeliverable Shipments */}
                <div>
                  <SectionHeader number="05" title="Undeliverable Shipments" />
                  <p>
                    If a shipment cannot be delivered due to an incorrect delivery address or non-acceptance, the shipping service provider will keep it in a warehouse to prepare it for re-shipment. Additional fees may apply for re-shipment attempts.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Footer Accent */}
          <div className="mt-16 sm:mt-24 border-t border-white/5 pt-8 text-center">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/20 uppercase">JENERA &copy; 2025</span>
          </div>

        </div>
      </main>
    </>
  );
}

// Helper Component for consistent section headers
function SectionHeader({ number, title }: { number: string, title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-white/10 pb-4">
      <span className="text-xs font-mono text-white/30">{number}</span>
      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
        {title}
      </h2>
    </div>
  );
}