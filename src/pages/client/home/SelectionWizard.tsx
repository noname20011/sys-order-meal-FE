import { UserChoosePackage } from "@/types";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PageWrapper } from "@/components/common/Layout";
import {
  AVG_MEAL_PRICE,
  DURATIONS,
  MEAL_COUNTS,
  TIMEFRAMES,
  USER_CHOOSE_PACKAGE,
} from "@/constants";
import { cn } from "@/lib/utils";

interface SelectionWizardProps {
  userChoosePackage: UserChoosePackage;
  setUserChoosePackage: (
    value: UserChoosePackage | ((prev: UserChoosePackage) => UserChoosePackage),
  ) => void;
  selectedPlan: number;
  setSelectedPlan: (days: number) => void;
  selectedMealCount: number;
  setSelectedMealCount: (count: number) => void;
  weeksCount: number;
  setWeeksCount: (weeks: number) => void;
  onNext: () => void;
  resetMeals: () => void;
}

interface StepIndicatorTimeFrame {
  step: number;
  label: string;
}

export const SelectionWizard = ({
  userChoosePackage,
  setUserChoosePackage,
  selectedPlan,
  setSelectedPlan,
  selectedMealCount,
  setSelectedMealCount,
  weeksCount,
  setWeeksCount,
  onNext,
  resetMeals,
}: SelectionWizardProps) => {
  const [wizardStep, setWizardStep] = useState(0);

  const stepIndicatorTimeFrame: StepIndicatorTimeFrame[] = [
    { step: 1, label: "Tháng / Tuần" },
    { step: 2, label: "Ngày" },
    { step: 3, label: "Món ăn" },
  ];

  const handleNextStep = (step: StepIndicatorTimeFrame) => {
    if (wizardStep < step.step) setWizardStep(wizardStep + 1);
  };


  useEffect(() => {
    if (
      userChoosePackage.idDay !== "" &&
      userChoosePackage.idMeal !== "" &&
      userChoosePackage.idWeek !== ""
    ) {
      setWizardStep(3);
    }
  }, [userChoosePackage]);

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-brand-black tracking-tight mb-4">
            Chọn Gói
          </h2>
          <p className="text-brand-gray-900/60 font-medium font-sans">
            Bao gồm Tháng/Tuần - Ngày - Món ăn
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-2 mt-4"
          >
            <h3 className="text-brand-gray-900 text-xl font-medium font-sans">
              1. Tháng / Tuần
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => {
                    handleNextStep(stepIndicatorTimeFrame[0]);
                    setWeeksCount(tf.weeks);
                    setUserChoosePackage((userChoosePackage) => ({
                      ...userChoosePackage,
                      idWeek: tf.id,
                    }));
                    resetMeals();
                  }}
                  className={cn(
                    "w-full p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left group relative cursor-pointer",
                    weeksCount === tf.weeks
                      ? "border-brand-orange bg-brand-orange-light shadow-md shadow-brand-orange/5"
                      : "border-brand-gray-50 bg-white hover:border-brand-orange/20",
                  )}
                >
                  {/* Custom Radio Button */}
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                      weeksCount === tf.weeks
                        ? "border-brand-orange"
                        : "border-brand-gray-100/90",
                    )}
                  >
                    {weeksCount === tf.weeks && (
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-brand-black">
                      {tf.label}
                    </h3>
                    <p className="text-xs text-brand-gray-900/40 font-semibold mt-0.5">
                      {tf.description}
                    </p>
                  </div>
                  <Calendar
                    className={cn(
                      "w-5 h-5 shrink-0 transition-colors",
                      weeksCount === tf.weeks
                        ? "text-brand-orange"
                        : "text-brand-gray-900/20",
                    )}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Day */}
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-2 mt-10"
          >
            <h3 className="text-brand-gray-900 text-xl font-medium font-sans">
              2. Ngày
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
              {DURATIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    handleNextStep(stepIndicatorTimeFrame[1]);
                    setUserChoosePackage((userChoosePackage) => ({
                      ...userChoosePackage,
                      idDay: d.id,
                    }));
                    setSelectedPlan(d.days);
                    resetMeals();
                  }}
                  disabled={wizardStep < 1}
                  className={cn(
                    "w-full p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left group relative",
                    selectedPlan === d.days
                      ? "border-brand-orange bg-brand-orange-light shadow-md shadow-brand-orange/5"
                      : "border-brand-gray-50 bg-white hover:border-brand-orange/20",
                    wizardStep < 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:border-brand-orange/30",
                  )}
                >
                  {/* Custom Radio Button */}
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                      selectedPlan === d.days
                        ? "border-brand-orange"
                        : "border-brand-gray-100/90",
                    )}
                  >
                    {selectedPlan === d.days && (
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-brand-black">
                      {d.label}
                    </h3>
                    <p className="text-xs text-brand-gray-900/40 font-semibold mt-0.5">
                      {d.description}
                    </p>
                  </div>
                  <Clock
                    className={cn(
                      "w-5 h-5 shrink-0 transition-colors",
                      selectedPlan === d.days
                        ? "text-brand-orange"
                        : "text-brand-gray-900/20",
                    )}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-2 mt-10"
          >
            <h3 className="text-brand-gray-900 text-xl font-medium font-sans">
              3. Bữa ăn
            </h3>
            <div className="flex flex-col gap-3">
              {MEAL_COUNTS.map((m) => {
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      handleNextStep(stepIndicatorTimeFrame[2]);
                      setUserChoosePackage((userChoosePackage) => ({
                        ...userChoosePackage,
                        idMeal: m.id,
                      }));
                      setSelectedMealCount(m.count);
                      resetMeals();
                    }}
                    disabled={wizardStep < 2}
                    className={cn(
                      "w-full p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left group relative",
                      selectedMealCount === m.count
                        ? "border-brand-orange bg-brand-orange-light shadow-md shadow-brand-orange/5"
                        : "border-brand-gray-50 bg-white hover:border-brand-orange/20",
                      wizardStep < 2
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:border-brand-orange/30",
                    )}
                  >
                    {/* Custom Radio Button */}
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                        selectedMealCount === m.count
                          ? "border-brand-orange"
                          : "border-brand-gray-100/90",
                      )}
                    >
                      {selectedMealCount === m.count && (
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                      )}
                    </div>

                    <div className="flex-1 shrink-0 min-w-0">
                      <h3 className="text-base font-bold text-brand-black">
                        {m.label}
                      </h3>
                      <p className="text-xs text-brand-gray-900/40 font-semibold mt-0.5">
                        {m.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[9px] text-brand-gray-900/40 font-black uppercase tracking-wider mb-0.5">
                        Tổng cộng
                      </p>
                      <p
                        className={cn(
                          "text-base font-display font-extrabold",
                          selectedMealCount === m.count
                            ? "text-brand-orange"
                            : "text-brand-black",
                        )}
                      >
                        {(
                          USER_CHOOSE_PACKAGE.find(
                            (pack) =>
                              pack.idMeal === m.id &&
                              pack.idDay === userChoosePackage.idDay &&
                              pack.idWeek === userChoosePackage.idWeek,
                          ) as UserChoosePackage
                        )?.price?.toLocaleString("vi-NV") || 0}
                        ₫
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Sticky Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 pb-6 px-3 bg-white/80 backdrop-blur-xl border-t border-brand-gray-100 z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => wizardStep === 3 && onNext()}
            className={`flex-2 py-3 rounded-full ${wizardStep === 3 ? "bg-brand-orange text-white hover:scale-[1.02] active:scale-95 transition-all cursor-pointer" : "bg-[#e5e7eb] text-[#9ca3af] border-[solid_1px_#d1d5db] cursor-not-allowed opacity-70"} font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 text-lg`}
            disabled={wizardStep < 3}
          >
            {wizardStep === 3 ? "Tiếp theo" : "Chọn gói"}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};
