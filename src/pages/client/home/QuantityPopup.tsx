import { UserChoosePackage } from "@/types";
import { AnimatePresence, motion } from "motion/react";

interface QuantityPopupProps {
  setIsQuantityPopupOpen: (open: boolean) => void;
  packageQuantity: number;
  setUserChoosePackage: (
      value: UserChoosePackage | ((prev: UserChoosePackage) => UserChoosePackage),
    ) => void;
  selectedMealCount: number;
  onNext: () => void;
}

const QuantityPopup = (props: QuantityPopupProps) => {
  const {
    setIsQuantityPopupOpen,
    packageQuantity,
    setUserChoosePackage,
    selectedMealCount,
    onNext,
  } = props;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
        {/* Backdrop with elegant blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsQuantityPopupOpen(false)}
          className="absolute inset-0 bg-brand-black/40 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] border border-brand-gray-100 shadow-2xl relative overflow-hidden p-8 flex flex-col items-center text-center z-10"
        >
          {/* Decorative subtle background gradient blur */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none" />

          <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-4 shrink-0 shadow-inner">
            {/* simple shopping bag svg */}
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 10a4 4 0 0 0-8 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-extrabold text-brand-black tracking-tight mb-2">
            Chọn số lượng gói đặt
          </h3>
          <p className="text-sm text-brand-gray-900/60 font-semibold mb-6 max-w-xs">
            Bạn muốn đặt kèm bao nhiêu gói ăn chuẩn Healthy Box này?
          </p>

          {/* Quantity Counter */}
          <div className="flex items-center gap-6 bg-brand-gray-50 border border-brand-gray-100 p-4 rounded-3xl mb-6">
            <button
              type="button"
              onClick={() =>
                setUserChoosePackage((prev) => ({
                  ...prev,
                  quantity: Math.max(1, (prev.quantity ?? 1) - 1),
                }))
              }
              className="w-12 h-12 rounded-full bg-white hover:bg-brand-gray-100 flex items-center justify-center text-brand-black font-extrabold text-xl shadow-sm border border-brand-gray-100/90 transition-all active:scale-95 text-center shrink-0"
            >
              -
            </button>
            <div className="flex flex-col min-w-17.5">
              <span className="font-black text-brand-black text-3xl">
                {packageQuantity}
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest text-brand-gray-900/40 text-center mt-1">
                Gói
              </span>
            </div>
            <button
              type="button"
              onClick={() => setUserChoosePackage((prev) => ({ ...prev, quantity: prev.quantity ?? 1 + 1 }))}
              className="w-12 h-12 rounded-full bg-brand-orange hover:bg-brand-orange/90 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-brand-orange/25 transition-all active:scale-95 text-center shrink-0"
            >
              +
            </button>
          </div>

          {/* Meal Summary Calculation */}
          <div className="w-full bg-brand-orange-light/40 border border-brand-orange/10 p-5 rounded-2xl mb-8 text-left">
            <div className="flex justify-between items-center text-xs font-bold text-brand-gray-900/40 uppercase tracking-widest mb-2">
              <span>Cách tính số bữa</span>
              <span className="text-brand-orange font-black">Mỗi ngày</span>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="text-sm font-semibold text-brand-gray-900">
                {packageQuantity} gói × {selectedMealCount} bữa
              </p>
              <p className="text-xl font-black text-brand-orange">
                {packageQuantity * selectedMealCount} bữa
              </p>
            </div>
            <p className="text-[11px] text-brand-gray-900/50 mt-2 font-medium leading-relaxed">
              * Số lượng món ăn lựa chọn trong ngày sẽ được tự động cập nhật là{" "}
              <strong className="text-brand-black font-bold">
                {packageQuantity * selectedMealCount} món
              </strong>{" "}
              để bạn tự do điều phối!
            </p>
          </div>

          {/* Control Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => {
                setIsQuantityPopupOpen(false);
                onNext();
              }}
              className="w-full py-4 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/20 hover:scale-[1.01] active:scale-[0.99] transition-all text-base"
            >
              Xác nhận & Chọn món
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsQuantityPopupOpen(false)}
              className="w-full py-4 rounded-full border border-brand-gray-100 text-brand-gray-900/60 font-bold transition-all hover:bg-brand-gray-50 active:scale-[0.99] tracking-wider uppercase text-xs"
            >
              Hủy bỏ
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuantityPopup;
