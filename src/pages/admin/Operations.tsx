import { PageWrapper } from '@/src/components/common/Layout';
import { Clock, Info, MapPin, Phone, Printer } from 'lucide-react';
import { Order } from '../../types';

export const Operations = ({ orders }: { orders: Order[] }) => {
  return (
    <PageWrapper>
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 print:hidden font-sans">
          <div>
             <h2 className="text-5xl md:text-6xl font-serif text-brand-green italic uppercase tracking-tighter shadow-brand-green/20">UNIT OPERATIONS</h2>
             <p className="text-white/40 font-black italic text-xs md:text-sm uppercase tracking-[0.3em] mt-2 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" /> PROTOCOL DATE: {new Date().toLocaleDateString('vi-VN')}
             </p>
          </div>
          <button 
            onClick={() => window.print()}
            className="w-full md:w-auto px-12 py-5 rounded-sm bg-brand-green text-black font-black flex items-center justify-center gap-3 neon-glow hover:scale-[1.05] active:scale-95 transition-all text-xl font-serif italic tracking-tight"
          >
             <Printer className="w-6 h-6" /> PRINT LOGISTICS LOG
          </button>
       </div>

       <div className="space-y-8 font-sans print:hidden">
          {orders.map((order) => (
             <div key={order.orderId} className="paper-texture rounded-sm p-10 border-l-[16px] border-brand-green shadow-2xl relative group overflow-hidden break-inside-avoid ring-1 ring-white/10">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                   <Clock className="w-48 h-48 text-brand-green" />
                </div>
                
                <div className="flex flex-wrap items-start justify-between gap-6 relative z-10 text-left">
                   <div className="space-y-4 max-w-xl flex-1">
                      <div className="flex items-center gap-3">
                         <span className="bg-brand-green text-white px-3 py-1 rounded-lg text-xs font-bold font-mono">#{order.orderId}</span>
                         <span className="text-slate-300">|</span>
                         <span className="text-sm font-bold text-brand-orange uppercase tracking-widest">{order.status}</span>
                      </div>
                      <h3 className="text-4xl font-serif text-brand-green italic">{order.fullName}</h3>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm font-medium">
                         <div className="flex items-center gap-3 text-slate-600">
                            <Phone className="w-5 h-5 text-brand-orange" /> {order.phone}
                         </div>
                         <div className="flex items-center gap-3 text-slate-600">
                            <MapPin className="w-5 h-5 text-brand-orange" /> {order.address}, {order.district}
                         </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-500 border border-slate-100 italic">
                         Note: {order.note || "N/A"}
                      </div>
                   </div>

                   <div className="paper-texture p-6 rounded-2xl border-l-4 border-brand-orange shadow-sm min-w-[280px]">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Meal Allocation</p>
                      <ul className="space-y-2">
                         {Object.entries(order.orderDetails).map(([rawKey, id]) => {
                           const [day, type] = rawKey.split('-');
                           return (
                             <li key={rawKey} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                   <div className="w-6 h-6 rounded bg-brand-green/10 flex items-center justify-center font-bold text-brand-green text-[10px]">{day}</div>
                                   <span className="text-slate-400 italic">{type}</span>
                                </div>
                                <span className="font-bold text-slate-700">Món #{id}</span>
                             </li>
                           );
                         })}
                      </ul>
                   </div>
                </div>

                <div className="mt-10 pt-10 border-t border-dashed border-white/10 flex flex-col sm:flex-row items-center justify-between gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
                   <div className="flex items-center gap-8">
                      <span className="text-white/30">PAYMENT TOTAL:</span>
                      <span className="text-brand-orange text-3xl font-serif italic tracking-tighter">{order.totalAmount?.toLocaleString('vi-VN')}Đ</span>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-white/40">{order.paymentMethod || 'UNKNOWN'}</span>
                   </div>
                   <div className="flex gap-4 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none px-6 py-3 rounded-sm bg-brand-green text-black font-black hover:neon-glow transition-all active:scale-95 italic font-serif text-sm">ARCHIVE COMPLETE</button>
                      <button className="flex-1 sm:flex-none px-6 py-3 rounded-sm border border-brand-orange/40 text-brand-orange hover:bg-brand-orange hover:text-white transition-all active:scale-95 italic font-serif text-sm uppercase">ABORT UNIT</button>
                   </div>
                </div>
             </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-40 paper-texture rounded-3xl border-2 border-dashed border-slate-200">
               <Info className="w-16 h-16 text-slate-300 mx-auto mb-4" />
               <p className="text-slate-400 font-bold italic">Không có lệnh vận hành nào cho hôm nay</p>
            </div>
          )}
       </div>

       {/* Print View Table */}
       <div className="hidden print:block font-sans text-left">
          <div className="text-center mb-10 border-b-8 border-double border-black pb-8">
             <h1 className="text-5xl font-black uppercase tracking-tighter font-serif italic text-black">TITAN LOGISTICS LOG</h1>
             <p className="text-sm font-black uppercase tracking-widest mt-3 text-black">DEPLOYMENT DATE: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>
          
          <table className="w-full border-collapse border border-black">
             <thead>
                <tr className="bg-black text-[10px] uppercase font-black tracking-widest text-white">
                   <th className="border border-black p-4 text-left w-1/4">OPERATOR ID / NAME</th>
                   <th className="border border-black p-4 text-left w-1/4">DEPLOYMENT COORDS</th>
                   <th className="border border-black p-4 text-left">ALLOCATION SPECS</th>
                   <th className="border border-black p-4 text-center w-28">TREASURY</th>
                </tr>
             </thead>
             <tbody>
                {orders.map((order) => (
                   <tr key={order.orderId} className="text-[11px] font-bold text-black border-black">
                      <td className="border border-black p-4">
                         <div className="bg-black text-white px-2 py-1 inline-block text-[8px] mb-2 font-black">#{order.orderId}</div>
                         <div className="text-lg font-black uppercase italic font-serif leading-none tracking-tight text-black">{order.fullName}</div>
                         <div className="text-[9px] text-black/40 mt-2 italic font-medium leading-tight">NOTES: {order.note || 'NO INTEL'}</div>
                      </td>
                      <td className="border border-black p-4">
                         <div className="font-black text-xs mb-1 text-black">{order.phone}</div>
                         <div className="text-[10px] font-medium leading-tight text-black">{order.address}, {order.district}</div>
                      </td>
                      <td className="border border-black p-4">
                         <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                            {Object.entries(order.orderDetails).map(([rawKey, id]) => (
                               <div key={rawKey} className="flex justify-between items-center border-b border-black/10 last:border-0 pb-1">
                                  <span className="text-[8px] font-black uppercase text-black/40 tracking-widest">{rawKey}:</span>
                                  <span className="font-black text-[9px] uppercase tracking-tighter text-black">MEAL #{id}</span>
                                </div>
                            ))}
                         </div>
                      </td>
                      <td className="border border-black p-4 text-center">
                         <div className="text-sm font-black italic font-serif tracking-tighter leading-none text-black">{order.totalAmount?.toLocaleString('vi-VN')}Đ</div>
                         <div className="text-[8px] uppercase mt-1 opacity-50 font-black text-black">{order.paymentMethod}</div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>

       <style>{`
          @media print {
            @page { margin: 1cm; size: landscape; }
            body { background: white !important; font-size: 10pt; color: black !important; }
            .print\\:hidden { display: none !important; }
            #root { padding: 0 !important; }
            table { border-collapse: collapse; width: 100%; border: 3px solid black !important; }
            th, td { border: 1px solid black !important; padding: 12px; text-align: left; color: black !important; }
            tr { page-break-inside: avoid; }
            * { color: black !important; text-shadow: none !important; box-shadow: none !important; }
          }
       `}</style>
    </PageWrapper>
  );
};
