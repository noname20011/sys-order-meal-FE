import { GlassAlert } from "@/components/common/Alert";
import Button from "@/components/common/Button";
import { Header } from "@/components/common/Header";
import Input from "@/components/common/Input";
import InputNumber from "@/components/common/InputNumber";
import InputTime from "@/components/common/InputTime";
import InputTimeAutoFill from "@/components/common/InputTimeAutoFill";
import Select from "@/components/common/Select";
import TextArea from "@/components/common/TextErea";
import { TIME_DELIVERY, USER_CHOOSE_PACKAGE } from "@/constants";
import { useFetchData } from "@/hooks/useBaseQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import customerService from "@/services/customerService";
import { Customer, District, UserChoosePackage } from "@/types";
import {
  Banknote,
  MapPin,
  Phone,
  Ship,
  ShoppingBag,
  Truck,
  User,
} from "lucide-react";
import { env } from "process";
import { useEffect, useState } from "react";

interface CheckoutFormProps {
  userChoosePackage: UserChoosePackage;
  customerData: Customer;
  setCustomerData: (data: Customer) => void;
  allCustomers: Customer[];
  districts: District[];
  weeksCount: number;
  setWeeksCount: (count: number) => void;
  note: string;
  setNote: (note: string) => void;
  paymentMethod: "transfer" | "cod";
  setPaymentMethod: (method: "transfer" | "cod") => void;
}

export const CheckoutForm = ({
  userChoosePackage,
  customerData,
  setCustomerData,
  districts,
  note,
  weeksCount,
  setNote,
  paymentMethod,
  setPaymentMethod,
}: CheckoutFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTimeReceive, setIsOpenTimeReceive] = useState(false);

  const debouncedPhone = useDebounce(customerData.phone);

  // Call API
  const { data, isLoading } = useFetchData<any>(
    ["customer", debouncedPhone],
    () => customerService.getCustomerById(debouncedPhone),
    {
      enabled: !!debouncedPhone, // Condition
    },
  );

  useEffect(() => {
    if (data?.data) {
      setCustomerData({
        ...customerData,
        fullName: data.data.fullName,
        address: data.data.address,
        district: data.data.district,
        timeReceive: data.data.timeReceive,
      });
    }
  }, [data]);

  return (
    <div className="p-2 md:p-6 rounded-xl md:rounded-[2.5rem] space-y-10 card-shadow border border-brand-gray-100 font-sans text-left relative overflow-hidden">
      <div className="grid md:grid-cols-2 gap-4 relative z-10">
        <Input
          icon={<Phone size={18} className="text-brand-orange" />}
          placeholder="Nhập sđt"
          value={customerData.phone}
          onChange={(e) =>
            setCustomerData({ ...customerData, phone: e.target.value })
          }
          label="Số điện thoại"
        />
        <Input
          icon={<User size={18} className="text-brand-orange" />}
          placeholder="Nhập họ tên"
          value={customerData.fullName}
          onChange={(e) =>
            setCustomerData({ ...customerData, fullName: e.target.value })
          }
          label="Họ tên"
        />
        <div className="space-y-3">
          <Select
            label="Chọn Quận"
            placeholder="Quận/Huyện"
            data={districts}
            value={customerData.district}
            onChange={(district) =>
              setCustomerData({ ...customerData, district: district.id })
            }
            isLoading={false}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            icon={<Truck size={18} className="text-brand-orange" />}
            heightOption="max-h-72"
          />
        </div>
        <TextArea
          icon={<MapPin size={18} className="text-brand-orange" />}
          placeholder="Số nhà, hẻm, đường..."
          value={customerData.address}
          onChange={(e) =>
            setCustomerData({ ...customerData, address: e.target.value })
          }
          label="Chi tiết địa chỉ"
        />
        <Select
          label="Giờ giao (7h-14h)"
          placeholder="Sáng/Trưa/Chiều"
          data={TIME_DELIVERY}
          value={customerData.timeReceive}
          onChange={(time) =>
            setCustomerData({ ...customerData, timeReceive: time.name })
          }
          isLoading={false}
          isOpen={isOpenTimeReceive}
          setIsOpen={setIsOpenTimeReceive}
          icon={<Truck size={18} className="text-brand-orange" />}
          heightOption="max-h-72"
        />
        <InputNumber
          icon={<Ship size={18} className="text-brand-orange" />}
          placeholder="Phí ship"
          value={(customerData.feeShip).toString()}
          onChange={(value) =>
            setCustomerData({ ...customerData, feeShip: value.toString() })
          }
          label="*Phí ship (cho 1 ngày)"
        />
        <InputTime
          icon={<Ship size={18} className="text-brand-orange" />}
          placeholder="Phí ship"
          value={customerData.startDate}
          onChange={(value) =>
            setCustomerData({ ...customerData, startDate: value })
          }
          label="*Ngày bắt đầu"
        />
        <InputTimeAutoFill
          infoPackage={userChoosePackage}
          placeholder="Phí ship"
          value={customerData.startDate.toString()}
          weeksCount={weeksCount}
          label="*Ngày kết thúc"
          onChange={(value) =>
            setCustomerData({ ...customerData, endDate: value })
          }
        />
        <div className="md:col-span-2 space-y-3">
          <label className="text-sm font-bold text-brand-gray-900/60 ml-1">
            *Ghi chú (bắt buộc)
          </label>
          <textarea
            required
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input-field h-22 resize-none"
            placeholder="Bạn không ăn được gì..."
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <label className="text-sm font-bold text-brand-gray-900/60 ml-1">
            Thanh toán
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod("transfer")}
              className={cn(
                "p-2 rounded-xl border-2 flex flex-col items-center gap-3 transition-all",
                paymentMethod === "transfer"
                  ? "border-brand-orange bg-brand-orange-light text-brand-orange"
                  : "border-brand-gray-100 bg-brand-gray-50 text-brand-gray-900/40 hover:border-brand-orange/30",
              )}
            >
              <Banknote className="w-6 h-6" />
              <span className="font-bold text-xs uppercase tracking-widest">
                Chuyển khoản
              </span>
            </button>
            {/* <button
              onClick={() => setPaymentMethod("cod")}
              className={cn(
                "p-2 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all",
                paymentMethod === "cod"
                  ? "border-brand-orange bg-brand-orange-light text-brand-orange"
                  : "border-brand-gray-100 bg-brand-gray-50 text-brand-gray-900/40 hover:border-brand-orange/30",
              )}
            >
              <Truck className="w-6 h-6" />
              <span className="font-bold text-xs uppercase tracking-widest">
                Thanh toán khi nhận hàng
              </span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Step3Information = ({
  userChoosePackage,
  customerData,
  setCustomerData,
  allCustomers,
  districts,
  weeksCount,
  setWeeksCount,
  note,
  setNote,
  paymentMethod,
  setPaymentMethod,
  totals,
  selectedMealCount,
  selectedPlan,
  onBack,
  onNext,
}: any) => {
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const district = (districts as District[]).find(
    (d) => customerData.district === d.id,
  );

  return (
    <div className="max-w-6xl mx-auto md:px-4 pb-32">
      <Header
        title="Thông tin đơn hàng"
        subtitle="Vui lòng cung cấp thông tin để chúng tôi phục vụ bạn tốt nhất"
      />

      <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
        <CheckoutForm
          userChoosePackage={userChoosePackage}
          customerData={customerData}
          setCustomerData={setCustomerData}
          allCustomers={allCustomers}
          districts={districts}
          weeksCount={weeksCount}
          setWeeksCount={setWeeksCount}
          note={note}
          setNote={setNote}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />

        <div className="sticky top-8">
          <PriceBreakdown
            totals={totals}
            selectedMealCount={selectedMealCount}
            customerData={customerData}
            selectedPlan={selectedPlan}
            weeksCount={weeksCount}
            userChoosePackage={userChoosePackage}
            setCustomerData={setCustomerData}
            district={district as District}
          />
        </div>
      </div>

      <Button
        onClick={() => {
          if (
            customerData.fullName &&
            customerData.phone &&
            customerData.address &&
            customerData.district &&
            customerData.timeReceive &&
            customerData.feeShip
          )
            onNext();
          else setIsAlert(true);
        }}
        isHasBackButton={true}
        text="Tiếp tục thanh toán"
        handleBack={onBack}
        className="cursor-pointer bg-brand-orange text-white hover:scale-[1.02] active:scale-95 transition-all"
      />
      <GlassAlert
        isOpen={isAlert}
        onClose={() => setIsAlert(false)}
        message="Các trường thông tin, phí ship không được bỏ trống"
      />
    </div>
  );
};

export const PriceBreakdown = ({
  userChoosePackage,
  totals,
  selectedMealCount,
  selectedPlan,
  weeksCount,
  district,
  customerData,
  setCustomerData
}: {
  userChoosePackage: UserChoosePackage;
  totals: any;
  selectedMealCount: number;
  selectedPlan: number;
  weeksCount: number;
  district: District;
  customerData: Customer;
  setCustomerData: (data: Customer) => void;
}) => {
  const [couponInput, setCouponInput] = useState<string>('');
  const [message, setMessageErr] = useState({success: "", err: ""});

  const handleApplyCoupon = () => {

    if (couponInput !== import.meta.env.VITE_PROMOTE_DISCOUNT_NUMBER && couponInput !== import.meta.env.VITE_PROMOTE_DISCOUNT_PERCENT) {
      setCustomerData({...customerData, promote: couponInput})
      setMessageErr({success: "", err: 'Mã giảm giá không chính xác'});
    } else {
      setCustomerData({...customerData, promote: couponInput})
      setMessageErr({success: "Áp mã giảm giá thành công", err: ''});
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] card-shadow border border-brand-gray-100 relative overflow-hidden">
      <ShoppingBag className="absolute -bottom-6 -right-6 w-32 h-32 text-brand-orange opacity-5" />
      <h3 className="text-3xl font-display text-brand-black font-extrabold mb-8 tracking-tight">
        Chi phí
      </h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center pb-5 border-b border-brand-gray-100">
          <div>
            <p className="text-brand-gray-900/40 text-xs font-bold uppercase tracking-widest mb-1">
              Gói bữa ăn
            </p>
            <p className="text-sm font-medium text-brand-black">
              {selectedPlan} ngày × {selectedMealCount} bữa × {weeksCount} tuần
            </p>
            <p className="text-brand-orange mt-2 text-xs font-bold uppercase tracking-widest mb-1">
              Số lượng gói: <strong> {userChoosePackage.quantity} </strong>
            </p>
          </div>
          <span className="font-bold text-lg text-brand-black">
            {(
              USER_CHOOSE_PACKAGE.find(
                (pack) =>
                  pack.idMeal === userChoosePackage.idMeal &&
                  pack.idDay === userChoosePackage.idDay &&
                  pack.idWeek === userChoosePackage.idWeek,
              ) as UserChoosePackage
            )?.price?.toLocaleString("vi-NV") || 0}
            ₫
          </span>
        </div>
        <div className="flex flex-col justify-between pb-5 border-b border-brand-gray-100">
          <p className="text-brand-gray-900/40 text-xs font-bold uppercase tracking-widest mb-1">
            Phí vận chuyển
          </p>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm font-medium text-brand-black">
              {district?.name || "Chưa chọn khu vực"}
            </p>
            <span className="font-bold text-lg text-brand-black">
              {(Number(customerData?.feeShip) < 1000 ? Number(customerData?.feeShip) * 1000 : Number(customerData?.feeShip) || 0).toLocaleString("vi-VN")}₫
            </span>
          </div>

          <div className="flex justify-between items-center w-full">
            <p className="text-sm font-medium text-brand-black">
              {weeksCount} tuần x {selectedPlan} ngày
            </p>
            <span className="font-bold text-lg text-brand-black">
              {totals.shipTotal.toLocaleString("vi-VN")}₫
            </span>
          </div>

          {/* Promotion / Discount Input box */}
          <div className="bg-brand-gray-50/50 p-4 rounded-xl border border-brand-gray-100">
            <p className="text-brand-gray-900/50 text-[11px] font-bold uppercase tracking-wider mb-2">Mã Khuyến Mãi</p>
            <div className="flex gap-2">
              <input 
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Nhập mã"
                className="flex-1 bg-white border border-brand-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange/30 disabled:bg-brand-gray-100 disabled:text-brand-gray-900/40 tracking-wide placeholder:normal-case placeholder:font-normal placeholder:text-brand-gray-900/30"
                />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-5 py-2.5 rounded-2xl bg-brand-orange text-white font-extrabold text-xs tracking-wider uppercase shadow-md shadow-brand-orange/15 hover:scale-[1.02] active:scale-95 transition-all shrink-0"
              >
                Dùng
              </button>
            </div>
            {message.err !== "" && <p className="text-[10px] text-brand-gray-900/45 mt-2 font-medium">
                <code className="font-mono text-red-600 font-bold bg-brand-orange/5 px-1 rounded">{message.err}</code>
            </p>}
            {message.success !== "" && <p className="text-[10px] text-brand-gray-900/45 mt-2 font-medium">
                <code className="font-mono text-green-600 font-bold bg-brand-orange/5 px-1 rounded">{message.success}</code>
            </p>}
          </div>

        </div>
        <div className="flex justify-between items-center pt-4">
          <span className="text-lg font-bold text-brand-gray-900">
            Tổng:
          </span>
          <span className="text-4xl font-display font-extrabold text-brand-orange">
            {!!totals.finalTotal ? totals.finalTotal.toLocaleString("vi-VN") : 0}₫
          </span>
        </div>
      </div>
    </div>
  );
};
