import React from "react";
import { motion } from "motion/react";
import { Activity } from "lucide-react";
import { cn } from "../../lib/utils";

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
  <div className="min-h-screen bg-brand-gray-50 relative font-sans text-brand-black">
    <nav className="fixed top-0 left-0 w-full h-16 md:h-20 bg-white/80 backdrop-blur-xl z-50 border-b border-brand-gray-100 flex items-center justify-between px-4 md:px-12 print:hidden shadow-sm">
      <div className="flex items-center gap-2 py-1">
        <img src="/assets/logo.png" alt="Logo" className="h-auto w-9/12 md:w-11/12" />
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
