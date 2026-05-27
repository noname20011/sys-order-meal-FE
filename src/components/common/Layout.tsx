import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.3, ease: "circOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

export const Layout = ({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: "customer" | "admin";
  onTabChange: (tab: "customer" | "admin") => void;
  children: React.ReactNode;
}) => (
  <div className="min-h-screen bg-brand-gray-50 relative font-sans text-brand-black overflow-hidden">
    {/* Underlay Premium Hand-Picked Appetite-Inducing Food Graphic */}
    {activeTab === "customer" && (
      <>
        {/* Soft high-key gourmet background photo (delicious fresh salad ingredients) */}
        <div
          className="absolute inset-0 md:bg-contain bg-cover bg-center bg-no-repeat pointer-events-none transition-all duration-1000 select-none"
          style={{
            backgroundImage: `url('https://img.magnific.com/premium-photo/healthy-vegetarian-food-concept-quinoa-with-vegetables-seeds-herbs-white-wooden-background-top-view-copy-space_254005-838.jpg')`,
          }}
        />
        {/* Radial vignette fade to keep center content ultra-legible & high contrast on any monitor/screen */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(249,250,251,0.95)_100%)] pointer-events-none select-none" />
        {/* Fine vertical gradient to anchor the layout smoothly */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand-gray-50/40 to-brand-gray-50 pointer-events-none select-none" />
      </>
    )}

    {activeTab === "admin" && (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_20%,rgba(34,197,94,0.03)_0%,transparent_50%)] pointer-events-none select-none" />
    )}

    <nav className="fixed top-0 left-0 w-full h-16 md:h-20 bg-white/80 backdrop-blur-xl z-50 border-b border-brand-gray-100 flex items-center justify-between px-4 md:px-12 print:hidden shadow-sm">
      <div className="flex items-center gap-2 py-1">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="h-auto w-9/12 md:w-11/12"
        />
      </div>

      <div className="flex gap-1 bg-brand-gray-100 p-1.5 rounded-full shrink-0">
        <button
          onClick={() => onTabChange("customer")}
          className={cn(
            "px-4 md:px-8 py-2 rounded-full text-xs font-bold transition-all",
            activeTab === "customer"
              ? "bg-white text-brand-orange shadow-sm"
              : "text-brand-gray-900/40 hover:text-brand-gray-900",
          )}
        >
          ORDER
        </button>
        <button
          onClick={() => onTabChange("admin")}
          className={cn(
            "px-4 md:px-8 py-2 rounded-full text-xs font-bold transition-all",
            activeTab === "admin"
              ? "bg-white text-brand-orange shadow-sm"
              : "text-brand-gray-900/40 hover:text-brand-orange",
          )}
        >
          ADMIN
        </button>
      </div>
    </nav>
    <div className="max-w-350 mx-auto px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-20 relative z-10">
      {children}
    </div>
  </div>
);
