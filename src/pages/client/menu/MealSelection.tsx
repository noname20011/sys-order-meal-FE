import Button from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import { PageWrapper } from "@/components/common/Layout";
import { Check, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { MENU_COORDINATES, WEEKDAYS } from "@/constants";
import { cn } from "@/lib/utils";
import { MealType, MenuItem, Weekday } from "@/types";

interface MealSelectionProps {
  menu: MenuItem[];
  selectedMeals: Record<string, number>;
  handleMealToggle: (day: Weekday, type: MealType) => void;
  handleMealIncrement: (day: Weekday, type: MealType) => void;
  handleMealDecrement: (day: Weekday, type: MealType) => void;
  selectedPlan: number;
  selectedWeek: number;
  selectedMealCount: number;
  onBack: () => void;
  onNext: () => void;
}

export const MealSelection = ({
  menu,
  selectedMeals,
  handleMealToggle,
  handleMealIncrement,
  handleMealDecrement,
  selectedWeek,
  selectedPlan,
  selectedMealCount,
  onBack,
  onNext,
}: MealSelectionProps) => {

  const getDaySelectionCount = (day: Weekday) => {
    return Object.entries(selectedMeals)
      .filter(([k]) => k.startsWith(day))
      .reduce((sum, [_, qty]) => sum + qty, 0);
  };

  const isDayFullySelected = (day: Weekday) => {
    return getDaySelectionCount(day) >= selectedMealCount;
  };

  const selectedCount = Object.values(selectedMeals).reduce((sum, qty) => sum + qty, 0);
  const totalRequired = selectedPlan * selectedMealCount;

  console.log(menu);
  return (
    <PageWrapper>
      <Header
        title="Chọn bữa ăn"
        subtitle={`Gói ${selectedWeek} tuần x ${selectedPlan} ngày × ${selectedMealCount} món/ngày.`}
      />

      <div className="max-w-5xl mx-auto px-4 pb-10">
        {/* Selection Info Card */}
        <div className="sticky top-22 z-50 mb-10 bg-white p-3 rounded-xl card-shadow border border-brand-gray-100 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-row gap-4 w-full items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-orange-light rounded-2xl flex items-center justify-center text-brand-orange shadow-inner">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-md font-display font-semibold text-brand-black tracking-tight">
                  {`${selectedPlan} ngày × ${selectedMealCount} món/ngày.`}
                </h3>
                <p className="text-brand-gray-900/40 font-bold uppercase tracking-widest text-[10px]">
                  {selectedCount} trên {totalRequired} món được chọn
                </p>
              </div>
            </div>

            <div className="w-full md:w-64 h-3 bg-brand-gray-50 rounded-full overflow-hidden border border-brand-gray-100 flex-1">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(selectedCount / totalRequired) * 100}%` }}
                className="h-full bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.3)]"
              />
            </div>
          </div>

          {/* Legend */}
          <div className="p-2 bg-brand-gray-50 border border-brand-gray-100 rounded-4xl flex items-center justify-center gap-8 text-xs font-bold md:w-3/12">
            <div className="flex items-center gap-2 text-brand-gray-900/40">
              <div className="w-4 h-4 rounded border-2 border-brand-gray-100" />{" "}
              Trống
            </div>
            <div className="flex items-center gap-2 text-brand-orange">
              <div className="w-4 h-4 rounded bg-brand-orange-light border-2 border-brand-orange flex items-center justify-center">
                <Check size={20} />
              </div>
              Đã chọn
            </div>
          </div>
        </div>

        {/* Coordinate Interactive Layout */}
        <div className="relative aspect-auto w-full md:h-300 bg-brand-gray-50 rounded-2xl overflow-hidden card-shadow border-white ring-1 ring-brand-gray-100 group">
          <img
            src="/assets/bg-menu-meal.png"
            className="w-full h-full object-contain md:object-fill"
            alt="Healthy Box Menu"
          />

          {/* Row Overlays (Matte Layer for fully selected days) */}
          {WEEKDAYS.map((day, idx) => {
            const fullySelected = isDayFullySelected(day);
            const rowTop = `${22 + idx * 10.9}%`;
            const rowHeight = "10.4%";

            if (!fullySelected) return null;

            return (
              <div
                key={`overlay-${day}`}
                className="absolute left-0 ml-2 md:ml-4 w-[95%] bg-black/20 backdrop-blur-[.7px] transition-all duration-500 z-30 flex items-center justify-center pointer-events-none rounded-xl"
                style={{ top: rowTop, height: rowHeight }}
              >
                <div className="bg-brand-orange text-white md:p-2 p-1 rounded-full md:scale-110 shadow-xl shadow-brand-orange/30 border-2 border-white absolute top-[0%] left-[0%]">
                  <Check className="w-2 h-2" />
                </div>
              </div>
            );
          })}

          {/* Interactive Overlay Zones */}
          {menu.map((meal, idx) => {
            const key = `${meal.weekday}-${meal.mealType}`;
            const coord = MENU_COORDINATES.find(
              (coord) =>
                meal.weekday === coord.day &&
                meal.mealType === (coord.meal as MealType),
            );
            const isSelected = !!selectedMeals[key];
            const dayFullySelected = isDayFullySelected(
              meal.weekday as Weekday,
            );
            const qty = selectedMeals[key] || 0;
            return (
              <div
                key={`${coord!.day}-${coord!.meal}-${idx}`}
                onClick={() =>
                  coord &&
                  handleMealToggle(
                    coord.day as Weekday,
                    coord.meal as MealType
                  )
                }
                style={{
                  top: coord!.top,
                  left: coord!.left,
                  width: coord!.width,
                  height: coord!.height,
                }}
                className={cn(
                  "absolute transition-all duration-300 border-2 flex items-center justify-center overflow-hidden group/zone z-40 cursor-pointer",
                  isSelected
                    ? "border-brand-orange shadow-[inset_0_0_30px_rgba(255,107,0,0.2)] rounded-lg"
                    : dayFullySelected
                      ? "border-transparent opacity-40 hover:opacity-100"
                      : "bg-transparent border-transparent hover:bg-brand-orange/5 hover:border-brand-orange/30 rounded-lg",
                )}
              >
                <motion.div
                  initial={false}
                  animate="opacity"
                  className={cn(
                    "w-full h-full flex items-center justify-start p-1 transition-opacity group-hover/zone:opacity-100",
                  )}
                >
                  <img
                    src={meal.image}
                    className="w-auto h-14 md:h-36 object-cover mb-0.5 md:mb-1"
                    alt="dish"
                  />
                  <p className="absolute top-[12%] right-[5%] md:right-[12%] font-meal text-[8px] sm:text-xl text-brand-black h-fit max-w-8 sm:max-w-16 sm:leading-tight sm:tracking-wider font-light">
                    {meal.dishName}
                  </p>
                </motion.div>
                {isSelected && (
                  <div className="absolute top-1 left-1 bg-brand-orange backdrop-blur-[1px] text-white p-0.5 rounded-full shadow-md z-30 ring-1 ring-white">
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  </div>
                )}
                {/* Quantity control */}
                <div
                  className="flex items-center gap-2 z-10 absolute left-4 right-0 bottom-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {qty > 0 ? (
                    <div className="flex items-center gap-2 bg-white border border-brand-orange/20 px-2 md:py-0.5 rounded-full shadow-sm w-11/12 justify-between  ">
                      <button
                        type="button"
                        onClick={() =>
                          handleMealDecrement(
                            coord!.day as Weekday,
                            coord!.meal as MealType,
                          )
                        }
                        className="h-3 w-3 md:w-5 md:h-5 rounded-full bg-brand-gray-50 hover:bg-brand-gray-100 flex items-center justify-center text-brand-black font-extrabold text-[12px] transition-transform active:scale-95"
                      >
                        -
                      </button>
                      <span className="font-display font-black text-brand-black md:text-sm text-[10px] w-4 text-center select-none">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleMealIncrement(
                            coord!.day as Weekday,
                            coord!.meal as MealType,
                          )
                        }
                        disabled={dayFullySelected}
                        className={cn(
                          "h-3 w-3 md:w-5 md:h-5 rounded-full flex items-center justify-center text-white font-extrabold text-[12px] transition-transform",
                          dayFullySelected
                            ? "bg-brand-gray-200 cursor-not-allowed text-brand-gray-400"
                            : "bg-brand-orange hover:bg-brand-orange/90 active:scale-95",
                        )}
                      >
                        +
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Fixed Sticky Footer Navigation for Meal Selection */}
        <Button
          isHasBackButton={true}
          handleBack={onBack}
          text="Thanh toán"
          onClick={() => {
            if (selectedCount >= totalRequired) onNext();
            else
              alert(
                `Please select ${totalRequired} meals to proceed with your plan.`,
              );
          }}
          className={
            selectedCount < totalRequired
              ? "opacity-50 cursor-not-allowed filter grayscale"
              : "cursor-pointer bg-brand-orange text-white hover:scale-[1.02] active:scale-95 transition-all"
          }
          disableMainBtn={selectedCount < totalRequired}
        >
          {selectedCount < totalRequired && (
            <p className="text-center mt-3 text-[10px] font-bold text-brand-orange uppercase tracking-widest animate-pulse">
              Không hợp lệ: Còn {totalRequired - selectedCount} chưa được chọn
            </p>
          )}
        </Button>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </PageWrapper>
  );
};
