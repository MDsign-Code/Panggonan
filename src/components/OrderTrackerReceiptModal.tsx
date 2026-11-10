import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { formatRupiah, formatShortTime, getElapsedMinutes } from '../utils/formatters';
import { RESTAURANT_INFO } from '../data/initialData';
import { 
  X, 
  Printer, 
  Share2, 
  Star, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  Utensils, 
  Check, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const OrderTrackerReceiptModal: React.FC = () => {
  const {
    activeOrderForReceipt,
    setActiveOrderForReceipt,
    setIsReviewModalOpen,
    setReviewTargetOrder,
    setIsSocialShareModalOpen,
    setSocialShareOrder
  } = useRestaurant();

  if (!activeOrderForReceipt) return null;

  const order = activeOrderForReceipt;
  const elapsed = getElapsedMinutes(order.createdAt);
  const remainingMinutes = Math.max(0, order.estimatedMinutes - elapsed);

  // Status mapping
  const steps = [
    { key: 'received', label: 'Pesanan Diterima', desc: 'Dapur telah mencetak tiket pesanan' },
    { key: 'cooking', label: 'Sedang Dimasak', desc: 'Koki meracik hidangan segar' },
    { key: 'ready', label: 'Siap Disajikan', desc: 'Pelayan menuju meja Anda' },
    { key: 'served', label: 'Selesai Dinikmati', desc: 'Selamat menikmati kuliner Nusantara' }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'received': return 0;
      case 'cooking': return 1;
      case 'ready': return 2;
      case 'served':
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(order.orderStatus);

  const handlePrint = () => {
    window.print();
  };

  const handleOpenReview = () => {
    setReviewTargetOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleOpenShare = () => {
    setSocialShareOrder(order);
    setIsSocialShareModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 mb-0.5">
              <span className="font-mono font-bold">{order.orderNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{order.tableNumber}</span>
            </div>
            <h3 className="font-display text-lg font-bold text-stone-100">
              Pelacak Pesanan & Struk Digital
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
              title="Cetak Struk Thermal"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveOrderForReceipt(null)}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Order Progress Steps Bar */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between text-xs mb-3">
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <ChefHat className="w-4 h-4 text-amber-600" />
                <span>Status Dapur Real-Time</span>
              </div>
              <div className="font-mono text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                {order.orderStatus === 'served' || order.orderStatus === 'completed' 
                  ? 'Sudah Disajikan' 
                  : remainingMinutes > 0 ? `Est. ~${remainingMinutes} Menit` : 'Segera Siap!'}
              </div>
            </div>

            {/* Step Indicators */}
            <div className="relative flex items-center justify-between">
              <div className="absolute top-3 left-3 right-3 h-0.5 bg-stone-200 -z-0" />
              <div 
                className="absolute top-3 left-3 h-0.5 bg-amber-500 transition-all duration-500 -z-0"
                style={{ width: `${(currentStepIdx / 3) * 100}%` }}
              />

              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                return (
                  <div key={step.key} className="flex flex-col items-center relative z-10">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-100'
                          : isPassed
                          ? 'bg-stone-900 text-amber-400'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <span className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${isCurrent ? 'text-stone-900 font-bold' : 'text-stone-500'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Printable Thermal Receipt Box */}
          <div 
            id="thermal-receipt"
            className="p-5 bg-stone-50/80 rounded-xl border border-dashed border-stone-300 font-mono text-xs text-stone-800 space-y-3"
          >
            {/* Receipt Header */}
            <div className="text-center pb-2 border-b border-stone-300">
              <h4 className="font-bold text-sm tracking-wide text-stone-900">{RESTAURANT_INFO.name}</h4>
              <p className="text-[10px] text-stone-600">{RESTAURANT_INFO.address}</p>
              <p className="text-[10px] text-stone-600">{RESTAURANT_INFO.city} · Tel: {RESTAURANT_INFO.phone}</p>
            </div>

            {/* Receipt Metadata */}
            <div className="text-[11px] space-y-0.5 text-stone-600">
              <div className="flex justify-between">
                <span>No. Pesanan:</span>
                <span className="font-bold text-stone-900">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Meja / Layanan:</span>
                <span className="font-bold text-stone-900">{order.tableNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Waktu Pesan:</span>
                <span>{formatShortTime(order.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span>Metode Bayar:</span>
                <span className="uppercase font-semibold">{order.paymentMethod} ({order.paymentStatus === 'paid' ? 'LUNAS' : 'BELUM BAYAR'})</span>
              </div>
            </div>

            {/* Itemized list */}
            <div className="pt-2 border-t border-dashed border-stone-300 space-y-1.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-[11px]">
                  <div className="flex-1 pr-2">
                    <span className="font-medium text-stone-900">
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    {item.notes && (
                      <p className="text-[10px] text-stone-500 italic">↳ {item.notes}</p>
                    )}
                  </div>
                  <span className="font-bold text-stone-900">
                    {formatRupiah(item.itemTotal)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial calculation */}
            <div className="pt-2 border-t border-dashed border-stone-300 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatRupiah(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Diskon Promo:</span>
                  <span>- {formatRupiah(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>PB1 Restoran (10%):</span>
                <span>{formatRupiah(order.tax)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Biaya Layanan (5%):</span>
                <span>{formatRupiah(order.serviceFee)}</span>
              </div>
              <div className="pt-1.5 border-t border-stone-300 flex justify-between font-bold text-sm text-stone-950">
                <span>TOTAL AKHIR:</span>
                <span>{formatRupiah(order.total)}</span>
              </div>
            </div>

            {/* Receipt Footer */}
            <div className="text-center pt-2 border-t border-stone-300 text-[10px] text-stone-500 space-y-0.5">
              <p>Terima kasih atas kunjungan Anda di Panggonan Resto!</p>
              <p>Kritik & saran: {RESTAURANT_INFO.instagram}</p>
            </div>
          </div>

          {/* Social Proof & Share Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleOpenReview}
              className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>{order.isReviewed ? 'Lihat Ulasan Saya' : 'Beri Ulasan Hidangan'}</span>
            </button>

            <button
              onClick={handleOpenShare}
              className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan ke Sosmed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
