import { PageWrapper } from "@/components/common/Layout";
import {
  Activity,
  Calendar,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

export const Analytics = ({ analytics }: { analytics: any }) => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 font-sans">
        <div>
          <h2 className="text-5xl md:text-6xl font-serif text-brand-green italic uppercase tracking-tighter shadow-brand-green/20">
            REVENUE OPS
          </h2>
          <p className="text-white/40 font-black text-xs md:text-sm uppercase tracking-[0.3em] mt-2">
            DEEP ANALYTICS / HEALTHY PERFORMANCE PROTOCOL
          </p>
        </div>
        <div className="grid grid-cols-2 lg:flex gap-4">
          <div className="bg-white/5 p-6 rounded-sm shadow-2xl border border-white/10 text-center px-4 md:px-10 ring-1 ring-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-10">
              <Activity className="w-4 h-4 text-brand-green" />
            </div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">
              DAILY REVENUE
            </p>
            <p className="text-2xl md:text-3xl font-serif text-brand-green italic neon-text uppercase">
              4.2MĐ
            </p>
          </div>
          <div className="bg-white/5 p-6 rounded-sm shadow-2xl border border-white/10 text-center px-4 md:px-10 ring-1 ring-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-10">
              <ShoppingBag className="w-4 h-4 text-brand-orange" />
            </div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">
              MONTHLY UNITS
            </p>
            <p className="text-2xl md:text-3xl font-serif text-brand-orange italic uppercase tracking-tighter">
              342
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 font-sans">
        <div className="space-y-10">
          <div className="paper-texture p-8 rounded-sm shadow-2xl border-l-[12px] border-brand-green relative ring-1 ring-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
              <h3 className="font-serif text-3xl italic flex items-center gap-3 uppercase tracking-tight text-white">
                <TrendingUp className="w-7 h-7 text-brand-green" /> REVENUE FLOW
              </h3>
              <div className="flex bg-black/40 p-1.5 rounded-sm border border-white/10 w-full sm:w-auto">
                {(["day", "week", "month"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "flex-1 sm:flex-none px-6 py-2 rounded-sm text-[10px] font-black uppercase transition-all tracking-[0.2em]",
                      timeRange === range
                        ? "bg-brand-green text-black shadow-md neon-glow"
                        : "text-white/40 hover:text-white",
                    )}
                  >
                    {range === "day"
                      ? "DAILY"
                      : range === "week"
                        ? "WEEKLY"
                        : "MONTHLY"}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                {timeRange === "day" ? (
                  <AreaChart data={analytics?.dayData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#CCFF00"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#CCFF00"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "rgba(255,255,255,0.3)",
                        fontWeight: "bold",
                      }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#CCFF00"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={analytics?.dayData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "rgba(255,255,255,0.3)",
                        fontWeight: "bold",
                      }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#CCFF00"
                      radius={[2, 2, 0, 0]}
                      barSize={timeRange === "week" ? 50 : 20}
                    >
                      {analytics?.dayData?.map((entry: any, index: number) => (
                        <Cell
                          key={index}
                          fill={
                            index === analytics?.dayData?.length - 1
                              ? "#e07a5f"
                              : "#CCFF00"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="paper-texture p-8 rounded-sm shadow-2xl border-t-8 border-brand-orange ring-1 ring-white/10">
              <h3 className="font-serif text-2xl mb-8 italic flex items-center gap-3 uppercase tracking-tight text-white">
                <Calendar className="w-6 h-6 text-brand-orange" /> LOAD
                FREQUENCY
              </h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics?.dayData}>
                    <XAxis dataKey="date" hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "4px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#e07a5f"
                      strokeWidth={5}
                      dot={{
                        r: 6,
                        fill: "#e07a5f",
                        strokeWidth: 2,
                        stroke: "#1A1A1A",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="paper-texture p-8 rounded-sm shadow-2xl flex flex-col justify-center items-center text-center ring-1 ring-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-green/2 grid-pattern opacity-10 pointer-events-none" />
              <div className="w-16 h-16 bg-brand-green/10 rounded-sm flex items-center justify-center mb-6 rotate-3 border border-brand-green/30 neon-glow">
                <Zap className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="font-serif text-3xl mb-3 italic uppercase tracking-tighter text-brand-green">
                SMART TACTIC
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-bold uppercase tracking-widest px-4">
                WEDNESDAY LUNCH PEAK DETECTED. EXECUTE "MID-WEEK BOOST" PROTOCOL
                TO MAXIMIZE LOAD CAPACITY.
              </p>
            </div>
          </div>
        </div>

        <div className="paper-texture p-8 rounded-sm shadow-2xl border-l-[12px] border-brand-orange relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange opacity-5 rounded-full" />
          <h3 className="font-serif text-3xl text-brand-orange mb-10 italic flex items-center gap-4 uppercase tracking-tighter">
            <Sparkles className="w-7 h-7" /> TITAN DISHES
          </h3>
          <div className="space-y-8 relative z-10">
            {analytics?.topDishes?.map((dish: any, idx: number) => (
              <div key={idx} className="flex items-center gap-6 group">
                <div className="w-12 h-12 flex-shrink-0 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center font-black text-white/20 group-hover:bg-brand-orange group-hover:text-black transition-all transform group-hover:rotate-6 text-lg italic font-serif">
                  #{idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-black text-white uppercase tracking-widest">
                      {dish.name}
                    </p>
                    <span className="text-[10px] font-black text-brand-green tracking-[0.2em]">
                      {dish.sales} UNITS
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-sm overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(dish.sales / 160) * 100}%` }}
                      className="h-full bg-brand-green neon-glow"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-12 py-5 rounded-sm border-2 border-dashed border-white/10 text-white/30 font-black text-[10px] uppercase tracking-[0.3em] hover:border-brand-green hover:text-brand-green transition-all italic font-serif">
            VIEW ALL CLASSIFIED CATEGORIES
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};
