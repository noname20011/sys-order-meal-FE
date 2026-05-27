import Button from "@/components/common/Button";
import { PageWrapper } from "@/components/common/Layout";
import { USER_CHOOSE_PACKAGE } from "@/constants";
import { UserChoosePackage } from "@/types";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CreditCard,
  FileText,
  Loader2,
  Phone,
  ShoppingBag,
  Truck,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface SuccessStepProps {
  orderId?: string;
  fullName?: string;
  mealPackage?: string;
  phoneNumber?: string;
  shipFee?: number;
  totalPrice?: number;
  paymentMethod?: "cod" | "transfer";
  setOrderSuccessId: (v: string | null) => void;
  setCurrentPage: (v: number) => void;
  userChoosePackage: UserChoosePackage;
}

export const SuccessStep = ({
  orderId,
  fullName,
  mealPackage,
  phoneNumber,
  shipFee,
  totalPrice,
  paymentMethod,
  setOrderSuccessId,
  setCurrentPage,
  userChoosePackage,
}: SuccessStepProps) => {
  const { orderId: routeOrderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const [localOrder, setLocalOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeOrderId = orderId || routeOrderId || "";

  // Map display values preferring props, falling back to fetched localOrder
  const displayFullName = fullName || localOrder?.fullName || "";
  const displayMealPackage = mealPackage || localOrder?.mealPackage || "";
  const displayPhoneNumber = phoneNumber || localOrder?.phoneNumber || "";
  const displayShipFee =
    shipFee !== undefined ? shipFee : localOrder?.shipFee || 0;
  const displayPackagePrice =
    (
      USER_CHOOSE_PACKAGE.find(
        (pack) =>
          pack.idMeal === userChoosePackage.idMeal &&
          pack.idDay === userChoosePackage.idDay &&
          pack.idWeek === userChoosePackage.idWeek,
      ) as UserChoosePackage
    )?.price?.toLocaleString("vi-NV") || 0;
  const displayTotalPrice =
    totalPrice !== undefined ? totalPrice : localOrder?.totalPrice || 0;
  const displayPaymentMethod =
    paymentMethod || localOrder?.paymentMethod || "cod";

  // Format receipt generation timestamp stably
  const formattedDate = useMemo(() => {
    const rawDate = localOrder?.orderDate
      ? new Date(localOrder.orderDate)
      : new Date();
    return rawDate.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }, [localOrder?.orderDate]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-xl mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
          <p className="text-brand-gray-900/60 font-bold text-lg animate-pulse">
            Đang tải thông tin hóa đơn...
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-500 shadow-lg shadow-red-500/10">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-display font-black text-brand-black tracking-tight mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-brand-gray-900/60 font-medium text-sm max-w-md mx-auto mb-8">
            {error}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 rounded-full bg-brand-orange text-white font-bold inline-flex items-center gap-2 shadow-xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto px-4 pb-16 pt-6 font-sans relative">
        {/* Premium Receipt Ticket Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative bg-white rounded-3xl shadow-2xl shadow-brand-black/5 border border-brand-gray-100 overflow-hidden"
        >
          {/* Top Edge Decorative Color */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-linear-to-r from-brand-orange-light via-brand-orange to-brand-orange-light" />

          {/* Ticket Body Content */}
          <div className="p-8 md:p-10 space-y-8">
            {/* Center-aligned Bank-Style Success Header inside the Receipt */}
            <div className="flex flex-col items-center text-center pb-2 border-b-2 border-brand-gray-100 border-dashed relative">
              <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-[#0068ff]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange font-bold uppercase tracking-wider mb-3 text-lg">
                  <Camera className="w-3.5 h-3.5 animate-pulse" />
                  <span>Chụp ảnh hóa đơn & gửi Zalo</span>
                </div>
              </div>
              {/* Pulsing Success Badge */}
              <div className="relative mb-4">
                <span className="absolute -inset-2 rounded-full bg-emerald-100/60" />
                <div className="relative w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                  <Check className="w-9 h-9 stroke-3" />
                </div>
              </div>
              <p className="text-md text-brand-gray-900/50 font-semibold uppercase tracking-widest">
                Gác Bếp • {activeOrderId}
              </p>
            </div>

            {/* List of Details with Beautiful Label/Values */}
            <div className="space-y-5">
              {/* Created Time */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-gray-50 flex items-center justify-center text-brand-gray-900/40 opacity-80">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-brand-gray-900/60">
                    Thời gian tạo đơn
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-black/80">
                  {formattedDate}
                </span>
              </div>

              <div className="h-px bg-brand-gray-100" />

              {/* Full Name */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-gray-50 flex items-center justify-center text-brand-gray-900/40 opacity-80">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-brand-gray-900/60">
                    Họ và tên
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-black">
                  {displayFullName || "Khách hàng"}
                </span>
              </div>

              {/* Phone Number */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-gray-50 flex items-center justify-center text-brand-gray-900/40 opacity-80">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-brand-gray-900/60">
                    Số điện thoại
                  </span>
                </div>
                <span className="text-sm font-bold font-mono text-brand-black">
                  {displayPhoneNumber || "Không có"}
                </span>
              </div>

              {/* Meal Package */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-gray-55 flex items-center justify-center text-brand-gray-900/40 shrink-0 opacity-80">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-brand-gray-900/60">
                    Gói bữa ăn
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-black text-right max-w-60 leading-snug">
                  {displayMealPackage}
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-gray-50 flex items-center justify-center text-brand-gray-900/40 opacity-80">
                    {displayPaymentMethod === "transfer" ? (
                      <CreditCard className="w-4 h-4" />
                    ) : (
                      <Wallet className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-brand-gray-900/60">
                    Hình thức thanh toán
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-black">
                  {displayPaymentMethod === "transfer"
                    ? "Chuyển khoản"
                    : "Thanh toán COD"}
                </span>
              </div>

              <div className="h-px bg-brand-gray-100" />

              {/* Ship Fee */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-gray-50 flex items-center justify-center text-brand-gray-900/40 opacity-80">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-brand-gray-900/60">
                    Gói bữa ăn (Tổng)
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-black">
                  {displayPackagePrice.toLocaleString("vi-VN")}₫
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-gray-50 flex items-center justify-center text-brand-gray-900/40 opacity-80">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-brand-gray-900/60">
                    Phí giao hàng (Tổng)
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-black">
                  {(displayShipFee || 0).toLocaleString("vi-VN")}₫
                </span>
              </div>

              {/* Total Price with Highlights */}
              <div className="pt-4 pb-2 border-t border-dashed border-brand-gray-100 flex justify-between items-center">
                <span className="text-brand-gray-900/80 font-extrabold uppercase tracking-widest text-xs">
                  Tổng số tiền
                </span>
                <span className="text-3xl font-display font-black text-brand-orange">
                  {(displayTotalPrice || 0).toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>

            {/* Decorative Barcode / Authentic Scan feel */}
            {/* <div className="pt-4 border-t border-brand-gray-100 flex flex-col items-center justify-center">
              <div className="flex items-center gap-[1.5px] h-10 mb-2 opacity-80">
                {[1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 1, 3, 4, 2, 1, 2, 3, 1, 2].map((w, i) => (
                  <span key={i} className="bg-brand-black block h-full select-none" style={{ width: `${w}px` }} />
                ))}
              </div>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-brand-black/30">H-BOX-{activeOrderId}</span>
            </div> */}
          </div>

          {/* Side Ticket Notches (Cutout Effect) */}
          <div className="absolute left-0 bottom-16 -translate-x-1/2 w-6 h-6 rounded-full bg-brand-gray-50 border border-brand-gray-100" />
          <div className="absolute right-0 bottom-16 translate-x-1/2 w-6 h-6 rounded-full bg-brand-gray-50 border border-brand-gray-100" />

          {/* Ticket Bottom Serration / Jagged Notched paper Edge */}
          <div className="flex justify-between items-center w-full overflow-hidden h-3 bg-white mt-1 select-none">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-brand-gray-50 shrink-0 -mt-2 border border-brand-gray-50 shadow-inner"
              />
            ))}
          </div>
        </motion.div>

        {/* Tip: Please take a Screenshot of this receipt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Fixed Sticky Footer Navigation for Meal Selection */}
          <a
            href="https://zalo.me/0938582015" 
            target="_blank"
            onClick={() => {
              setCurrentPage(1);
              setOrderSuccessId(null);
            }}
            className="fixed bottom-4 left-0 right-0 w-11/12 md:w-8/12 mx-auto px-4 py-3 rounded-full bg-[#0068ff] text-white flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all text-md uppercase tracking-wider md:text-xl font-semibold"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
              className="w-10 h-10"
              alt="Zalo"
            />

            <span>Gửi bill qua Zalo</span>
          </a>
        </motion.div>
      </div>
    </PageWrapper>
  );
};
