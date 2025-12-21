//Volumes/vision/codes/jenara/my-app/app/refund-policy/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/brand/Navbar";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
        
        {/* Background Pattern (Consistent with other pages) */}
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
              REFUND <span className="font-extralight text-white/60">POLICY</span>
            </h1>
            <p className="text-white/40 text-xs sm:text-sm tracking-widest uppercase">
              Shipping & Returns
            </p>
          </motion.div>

          {/* Main Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-neutral-900/30 border border-white/5 p-6 sm:p-10 md:p-14 backdrop-blur-sm rounded-sm">
              
              <div className="prose prose-invert max-w-none text-white/70 text-sm sm:text-base leading-relaxed space-y-8 font-light">
                
                {/* Order Cancellations */}
                <div>
                  <SectionHeader title="Order Cancellations" />
                  <p>
                    Once an order has been placed and processed, it cannot be cancelled under any circumstances. Please ensure all details and selections are correct before completing your purchase.
                  </p>
                </div>

                {/* All Sales Are Final */}
                <div>
                  <SectionHeader title="All Sales Are Final" />
                  <p>
                    We do not accept returns or issue refunds unless your item meets the refund eligibility criteria below.
                  </p>
                </div>

                {/* 30-Day Return Policy */}
                <div>
                  <SectionHeader title="30-Day Return Policy" />
                  <p>
                    You have <strong className="text-white font-medium">30 days from the date you received your item</strong> to request a return.
                  </p>
                </div>

                {/* Refund Eligibility */}
                <div>
                  <SectionHeader title="Refund Eligibility" />
                  <p className="mb-4">Refunds will only be issued if:</p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                    <li>The item received is <strong className="text-white font-medium">faulty or defective</strong>;</li>
                    <li>The item received is <strong className="text-white font-medium">incorrect</strong> (not what was ordered); or</li>
                    <li>The item was <strong className="text-white font-medium">damaged during shipping</strong> (photo/video proof required).</li>
                  </ul>
                  <p className="mt-4 text-white/50 italic border-l-2 border-white/20 pl-4 py-2">
                    Refunds are <strong>not</strong> granted for personal preference, style, or sizing, as a detailed size chart is provided to guide your purchase.
                  </p>
                </div>

                {/* Eligibility for Returns */}
                <div>
                  <SectionHeader title="Eligibility for Returns" />
                  <p className="mb-4">To qualify for a return:</p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                    <li>Items must be in the <strong className="text-white font-medium">same condition as received</strong>: unworn, unused, with tags attached, and in the <strong className="text-white font-medium">original packaging</strong>;</li>
                    <li>Refunds are issued <strong className="text-white font-medium">only after</strong> the item is returned in its original packaging, including all components and any free gifts;</li>
                    <li>Failure to return any items (including free gifts) may result in a reduction of the refund or a claim for compensation;</li>
                    <li>The customer is <strong className="text-white font-medium">responsible for return shipping costs</strong>.</li>
                  </ul>
                </div>

                {/* How to Initiate a Return */}
                <div>
                  <SectionHeader title="How to Initiate a Return" />
                  <p className="mb-4">
                    Email <a href="mailto:verseandme@gmail.com" className="text-white hover:text-white/70 underline decoration-white/30 transition-colors">verseandme@gmail.com</a> with:
                  </p>
                  <ul className="list-decimal pl-5 space-y-1 marker:text-white/40 mb-6">
                    <li>Your order number,</li>
                    <li>A photo of the item, and</li>
                    <li>A short description of the issue.</li>
                  </ul>
                  <p>Our team will review and provide next steps.</p>

                  {/* Return Address Box */}
                  <div className="mt-8 bg-white/5 border border-white/10 p-6 rounded-sm">
                    <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Return Address (after consultation only)</h3>
                    <address className="not-italic text-white/80 space-y-1 block">
                      <p><span className="text-white/40 w-24 inline-block">Name:</span> Liang Biyi</p>
                      <p><span className="text-white/40 w-24 inline-block">Street:</span> No. 1-1, Huan Gang N. Road, 5 Heng Road, Kwan Wo Street</p>
                      <p><span className="text-white/40 w-24 inline-block">Postal:</span> 510451</p>
                      <p><span className="text-white/40 w-24 inline-block">District:</span> Baiyun</p>
                      <p><span className="text-white/40 w-24 inline-block">City:</span> Guangzhou</p>
                      <p><span className="text-white/40 w-24 inline-block">Province:</span> Guangdong</p>
                      <p><span className="text-white/40 w-24 inline-block">Country:</span> China</p>
                    </address>
                  </div>
                </div>

                {/* Damage and Problems */}
                <div>
                  <SectionHeader title="Damage and Problems" />
                  <p>
                    Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or incorrect. We'll evaluate and resolve the issue promptly.
                  </p>
                </div>

                {/* Exceptions / Non-Returnable Items */}
                <div>
                  <SectionHeader title="Exceptions / Non-Returnable Items" />
                  <p className="mb-4">
                    The following are <strong className="text-white font-medium">not eligible</strong> for return or refund (except where the item is defective, damaged, or incorrect):
                  </p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                    <li><strong className="text-white font-medium">Discounted or sale items</strong> (including promotional events such as Black Friday, bundles, and other marked-down offers);</li>
                    <li><strong className="text-white font-medium">Custom-made</strong> or personalized items;</li>
                    <li><strong className="text-white font-medium">Personal care</strong> items (e.g., beauty products);</li>
                    <li>Hazardous materials, flammable liquids, or gases.</li>
                  </ul>
                </div>

                {/* Exchanges */}
                <div>
                  <SectionHeader title="Exchanges" />
                  <p>
                    We don't offer direct exchanges. If you want a different item, please follow the return process (if eligible) and place a <strong className="text-white font-medium">new order</strong>.
                  </p>
                </div>

                {/* Refunds */}
                <div>
                  <SectionHeader title="Refunds" />
                  <p>
                    Once we receive and inspect your return, we'll notify you whether it's approved. If approved, your refund will be issued to your original payment method within <strong className="text-white font-medium">10 business days</strong>. Your bank or card provider may require additional time to post the refund. If 15 business days have passed since approval, please contact <a href="mailto:verseandme@gmail.com" className="text-white hover:text-white/70 underline decoration-white/30 transition-colors">verseandme@gmail.com</a>.
                  </p>
                </div>

                {/* Important Note Callout */}
                <div className="mt-12 border border-white/20 bg-white/[0.02] p-6 sm:p-8 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-white transition-all duration-500 group-hover:w-full group-hover:opacity-5" />
                  <h3 className="text-white font-bold tracking-widest uppercase mb-3 relative z-10">Important Note</h3>
                  <p className="relative z-10 text-white/80">
                    Refunds are <strong className="text-white">only granted</strong> if items are defective, damaged, or incorrect. Returns based on personal preference, style, or sizing are <strong className="text-white">not eligible</strong>.
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
function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-8 sm:mt-12 mb-4 tracking-tight border-b border-white/10 pb-4 inline-block w-full">
      {title}
    </h2>
  );
}