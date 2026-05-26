import { ArrowLeft, Check, Image as ImageIcon, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Header } from '../../../components/common/Header';
import { cn } from '../../../lib/utils';

interface PaymentStepProps {
  totalAmount: number;
  phone: string;
  paymentMethod: 'transfer' | 'cod';
  paymentProof: File | null;
  setPaymentProof: (proof: File) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  onBack: () => void;
}

export const PaymentStep = ({ 
  totalAmount, phone, paymentMethod, paymentProof, setPaymentProof, onSubmit, isSubmitting, onBack 
}: PaymentStepProps) => {
   
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // tạo preview URL từ file
  useEffect(() => {
    if (!paymentProof) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(paymentProof);
    setPreviewUrl(url);

    // cleanup memory leak
    return () => URL.revokeObjectURL(url);
  }, [paymentProof]);

  const content = paymentMethod === 'cod' ? (
    <div className="max-w-xl mx-auto bg-white p-12 rounded-[2.5rem] text-center card-shadow border border-brand-gray-100 font-sans relative">
       <div className="w-20 h-20 bg-brand-orange-light rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Truck className="w-10 h-10 text-brand-orange" />
       </div>
       <h2 className="text-4xl font-display text-brand-black font-extrabold mb-4 tracking-tight">Xác nhận đơn hàng</h2>
       <p className="text-brand-gray-900/60 font-medium mb-10 leading-relaxed">
         Bạn đã chọn phương thức <strong className="text-brand-orange">Thanh toán khi nhận hàng (COD)</strong>. 
         Vui lòng nhấn xác nhận để hoàn tất đặt hàng.
       </p>
       
       <div className="p-8 bg-brand-gray-50 rounded-2xl border border-brand-gray-100 mb-10 flex justify-between items-center">
          <span className="text-brand-gray-900/40 font-bold uppercase tracking-widest text-xs">Tổng số tiền</span>
          <span className="text-3xl font-display font-extrabold text-brand-orange">{totalAmount.toLocaleString('vi-VN')}₫</span>
       </div>
    </div>
  ) : (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start font-sans pb-10">
       <div className="text-center space-y-8">
          <div className="p-6 bg-white rounded-4xl shadow-xl border border-brand-gray-100 inline-block relative">
             <img 
                src={`${import.meta.env.VITE_MY_BANK}?amount=${totalAmount}&addInfo=DH${phone}`} 
                alt="QR Code" 
                className="w-72 h-72 mx-auto"
             />
          </div>
          <div className="bg-white p-8 rounded-4xl border border-brand-gray-100 card-shadow">
             <p className="font-display text-2xl text-brand-black font-extrabold mb-2 tracking-tight">Thông tin chuyển khoản</p>
             <p className="text-brand-gray-900/40 font-bold tracking-widest text-[10px] uppercase mb-4">Chủ tài khoản: NGUYỄN HÙNG HẢI</p>
             <div className="p-4 bg-brand-orange-light rounded-xl border border-brand-orange/10">
                <p className="text-brand-orange font-bold text-xl font-mono tracking-wider">1999 0917 999 - MBBANK</p>
             </div>
             <p className="text-xs text-brand-gray-900/40 mt-4 font-medium italic">Nội dung chuyển khoản: Số điện thoại của bạn</p>
          </div>
       </div>

       <div className="bg-white p-10 rounded-[2.5rem] card-shadow border border-brand-gray-100 relative">
          <h4 className="text-2xl font-display text-brand-black font-extrabold mb-8 flex items-center gap-3 tracking-tight">
             <ImageIcon className="w-6 h-6 text-brand-orange" /> Tải lên hình ảnh thanh toán
          </h4>
          
          <div className="relative group">
      {/* INPUT FILE */}
      <input
        type="file"
        className="hidden"
        id="bill"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setPaymentProof(file);
          }
        }}
      />

      {/* LABEL UI */}
      <label
        htmlFor="bill"
        className={cn(
          "flex flex-col items-center justify-center gap-6 py-12 px-8 rounded-[2rem] border-2 border-dashed transition-all cursor-pointer",
          paymentProof
            ? "border-brand-orange bg-brand-orange-light"
            : "border-brand-gray-100 hover:border-brand-orange/30 hover:bg-brand-gray-50"
        )}
      >
        {previewUrl ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-brand-orange/20">
            <img
              src={previewUrl}
              className="w-full h-full object-cover"
              alt="Payment Proof"
            />

            <div className="absolute inset-0 bg-brand-orange/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white font-bold uppercase text-sm">
                Thay đổi hình ảnh
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-brand-gray-50 rounded-2xl flex items-center justify-center text-brand-orange/40 border border-brand-gray-100 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8" />
            </div>

            <div className="text-center">
              <p className="font-bold text-brand-gray-900/60 uppercase tracking-widest text-[10px]">
                Nhấn để tải lên ảnh chụp màn hình
              </p>
              <p className="text-[10px] text-brand-gray-900/20 mt-2 font-medium">
                JPEG, PNG hoặc WEBP tối đa 5MB
              </p>
            </div>
          </>
        )}
      </label>
    </div>
       </div>
    </div>
  );

  return (
    <div className="px-4 pb-32">
       <Header title="Thanh toán" subtitle={paymentMethod === 'cod' ? 'Xác nhận đơn hàng' : 'Quét mã QR để thanh toán'} />
       
       {content}

       {/* Fixed Sticky Footer for Step 4 */}
       <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-brand-gray-100 z-50">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
             <button 
               onClick={onBack}
               className="flex-[1] py-5 rounded-full border-2 border-brand-gray-100 text-brand-gray-900/60 font-bold flex items-center justify-center gap-2 hover:bg-brand-gray-50 transition-all uppercase tracking-widest text-xs"
             >
                <ArrowLeft className="w-5 h-5" /> Back
             </button>
             <button 
               onClick={onSubmit}
               disabled={isSubmitting || (paymentMethod === 'transfer' && !paymentProof)}
               className="flex-[2] py-5 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-95 transition-all text-lg disabled:opacity-50 disabled:grayscale disabled:scale-100"
             >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận & Hoàn tất"} 
                {isSubmitting ? null : <Check className="w-6 h-6 stroke-[3]" />}
             </button>
          </div>
       </div>
    </div>
  );
};
