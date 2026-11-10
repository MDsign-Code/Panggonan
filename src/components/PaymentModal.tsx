import React, { useState, useEffect } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { PaymentMethod } from '../types/restaurant';
import { formatRupiah } from '../utils/formatters';
import { RESTAURANT_INFO } from '../data/initialData';
import { 
  X, 
  QrCode, 
  Wallet, 
  CreditCard, 
  Receipt, 
  CheckCircle, 
  Clock, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    cartTotal,
    cartSubtotal,
    cartTotalQuantity,
    selectedTable,
    placeOrder,
    setActiveOrderForReceipt
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<PaymentMethod>('qris');
  const [selectedEwallet, setSelectedEwallet] = useState<'gopay' | 'ovo' | 'dana' | 'shopeepay'>('gopay');
  const [phoneNumber, setPhoneNumber] = useState('0812-9876-5432');
  const [copiedVa, setCopiedVa] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(15 * 60);

  // Countdown timer for QRIS
  useEffect(() => {
    if (!isPaymentModalOpen) return;
    const interval = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaymentModalOpen]);

  if (!isPaymentModalOpen) return null;

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleSimulatePayment = (method: PaymentMethod) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Finalize order in state
      const createdOrder = placeOrder(
        'Tamu ' + selectedTable,
        phoneNumber,
        method,
        selectedTable === 'Takeaway' ? 'takeaway' : 'dine_in'
      );

      // Open receipt & tracking after slight pause
      setTimeout(() => {
        setIsPaymentModalOpen(false);
        setPaymentSuccess(false);
        setActiveOrderForReceipt(createdOrder);
      }, 1200);
    }, 900);
  };

  const handleCopyVa = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedVa(true);
    setTimeout(() => setCopiedVa(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 mb-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-medium">Gateway Pembayaran Resmi Panggonan</span>
            </div>
            <h3 className="font-display text-lg font-bold text-stone-100">
              Selesaikan Pembayaran Meja
            </h3>
          </div>

          <button
            onClick={() => setIsPaymentModalOpen(false)}
            disabled={isProcessing}
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation Overlay */}
        {paymentSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-display text-2xl font-bold text-stone-900">
              Pembayaran Berhasil!
            </h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Pesanan Anda telah diteruskan ke dapur koki Panggonan Resto. Menyiapkan struk & pelacak pesanan...
            </p>
            <div className="font-mono text-base font-bold text-amber-800">
              {formatRupiah(cartTotal)} Lunas
            </div>
          </div>
        ) : (
          <div>
            {/* Amount Banner */}
            <div className="px-5 py-3.5 bg-amber-50 border-b border-amber-200/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-amber-900">Total Tagihan ({selectedTable}):</p>
                <p className="text-xl font-bold text-stone-900 font-mono">
                  {formatRupiah(cartTotal)}
                </p>
              </div>
              <div className="text-right text-xs text-amber-800">
                <span className="font-semibold">{cartTotalQuantity} Porsi Menu</span>
                <p className="text-[11px] text-stone-500">Termasuk PB1 & Servis</p>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-4 p-2 bg-stone-100 border-b border-stone-200 text-xs font-semibold text-center">
              <button
                type="button"
                onClick={() => setActiveTab('qris')}
                className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'qris'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <QrCode className="w-4 h-4 text-amber-600" />
                <span className="truncate w-full">QRIS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gopay')}
                className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  ['gopay', 'ovo', 'dana', 'shopeepay'].includes(activeTab)
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Wallet className="w-4 h-4 text-amber-600" />
                <span className="truncate w-full">E-Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bca_va')}
                className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'bca_va'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span className="truncate w-full">VA Bank</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cashier')}
                className={`py-2 px-1 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'cashier'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Receipt className="w-4 h-4 text-amber-600" />
                <span className="truncate w-full">Di Kasir</span>
              </button>
            </div>

            {/* Tab 1: Dynamic QRIS */}
            {activeTab === 'qris' && (
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 mb-3">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Selesaikan dalam:</span>
                  <span className="font-mono font-bold text-rose-600">
                    {formatCountdown(countdownSeconds)}
                  </span>
                </div>

                {/* Simulated High-Res QRIS Code with Panggonan Merchant Branding */}
                <div className="inline-block p-4 bg-white border-2 border-stone-900 rounded-xl shadow-md mb-3">
                  <div className="border border-stone-200 p-2 rounded-lg bg-stone-50">
                    <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-stone-700 pb-1 border-b border-stone-300 mb-1.5 font-mono">
                      <span>QRIS STANDAR</span>
                      <span className="text-amber-700">NMID: {RESTAURANT_INFO.qrisMerchantId.slice(0, 12)}</span>
                    </div>

                    {/* SVG Stylized QR Code Matrix */}
                    <svg
                      viewBox="0 0 160 160"
                      className="w-48 h-48 mx-auto"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Outer Background */}
                      <rect width="160" height="160" fill="white" />
                      
                      {/* Top-Left Position Detection Marker */}
                      <rect x="10" y="10" width="36" height="36" fill="#1c1917" rx="4" />
                      <rect x="16" y="16" width="24" height="24" fill="white" rx="2" />
                      <rect x="22" y="22" width="12" height="12" fill="#1c1917" rx="2" />

                      {/* Top-Right Position Detection Marker */}
                      <rect x="114" y="10" width="36" height="36" fill="#1c1917" rx="4" />
                      <rect x="120" y="16" width="24" height="24" fill="white" rx="2" />
                      <rect x="126" y="22" width="12" height="12" fill="#1c1917" rx="2" />

                      {/* Bottom-Left Position Detection Marker */}
                      <rect x="10" y="114" width="36" height="36" fill="#1c1917" rx="4" />
                      <rect x="16" y="120" width="24" height="24" fill="white" rx="2" />
                      <rect x="22" y="126" width="12" height="12" fill="#1c1917" rx="2" />

                      {/* Center Brand Badge */}
                      <rect x="62" y="62" width="36" height="36" fill="#f59e0b" rx="6" />
                      <text x="80" y="83" fill="#1c1917" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                        PGN
                      </text>

                      {/* Realistic Data Dots Grid */}
                      <g fill="#1c1917">
                        {/* Column bars & timing markers */}
                        <rect x="52" y="12" width="4" height="4" />
                        <rect x="60" y="12" width="8" height="4" />
                        <rect x="74" y="12" width="4" height="4" />
                        <rect x="84" y="12" width="12" height="4" />
                        <rect x="102" y="12" width="4" height="4" />

                        <rect x="52" y="22" width="12" height="4" />
                        <rect x="70" y="22" width="4" height="4" />
                        <rect x="80" y="22" width="4" height="4" />
                        <rect x="92" y="22" width="8" height="4" />

                        <rect x="52" y="32" width="4" height="4" />
                        <rect x="62" y="32" width="6" height="4" />
                        <rect x="74" y="32" width="16" height="4" />
                        <rect x="96" y="32" width="6" height="4" />

                        <rect x="12" y="52" width="6" height="4" />
                        <rect x="24" y="52" width="14" height="4" />
                        <rect x="44" y="52" width="4" height="4" />
                        <rect x="54" y="52" width="6" height="4" />
                        <rect x="104" y="52" width="8" height="4" />
                        <rect x="120" y="52" width="16" height="4" />
                        <rect x="142" y="52" width="6" height="4" />

                        <rect x="12" y="64" width="14" height="4" />
                        <rect x="34" y="64" width="6" height="4" />
                        <rect x="46" y="64" width="8" height="4" />
                        <rect x="106" y="64" width="4" height="4" />
                        <rect x="116" y="64" width="12" height="4" />
                        <rect x="136" y="64" width="14" height="4" />

                        <rect x="12" y="78" width="6" height="4" />
                        <rect x="26" y="78" width="8" height="4" />
                        <rect x="40" y="78" width="14" height="4" />
                        <rect x="106" y="78" width="14" height="4" />
                        <rect x="126" y="78" width="8" height="4" />
                        <rect x="140" y="78" width="8" height="4" />

                        <rect x="12" y="92" width="12" height="4" />
                        <rect x="30" y="92" width="4" height="4" />
                        <rect x="42" y="92" width="10" height="4" />
                        <rect x="104" y="92" width="6" height="4" />
                        <rect x="116" y="92" width="10" height="4" />
                        <rect x="132" y="92" width="16" height="4" />

                        <rect x="52" y="104" width="8" height="4" />
                        <rect x="66" y="104" width="12" height="4" />
                        <rect x="84" y="104" width="4" height="4" />
                        <rect x="94" y="104" width="12" height="4" />

                        <rect x="52" y="116" width="14" height="4" />
                        <rect x="72" y="116" width="6" height="4" />
                        <rect x="84" y="116" width="16" height="4" />
                        <rect x="106" y="116" width="6" height="4" />

                        <rect x="52" y="128" width="4" height="4" />
                        <rect x="62" y="128" width="14" height="4" />
                        <rect x="82" y="128" width="8" height="4" />
                        <rect x="96" y="128" width="12" height="4" />
                        <rect x="114" y="128" width="6" height="4" />

                        <rect x="52" y="142" width="12" height="4" />
                        <rect x="70" y="142" width="6" height="4" />
                        <rect x="82" y="142" width="14" height="4" />
                        <rect x="102" y="142" width="4" height="4" />
                        <rect x="112" y="142" width="14" height="4" />
                        <rect x="132" y="142" width="16" height="4" />
                      </g>
                    </svg>

                    <p className="text-[10px] text-stone-500 pt-1 font-mono">
                      PANGGONAN RESTO · {selectedTable}
                    </p>
                  </div>
                </div>

                {/* Supported Payment Logos */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-stone-500 mb-4">
                  <span className="font-semibold text-stone-700">Mendukung:</span>
                  <span className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-700 font-medium">BCA</span>
                  <span className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-700 font-medium">Mandiri</span>
                  <span className="px-1.5 py-0.5 bg-stone-100 rounded text-emerald-700 font-medium">GoPay</span>
                  <span className="px-1.5 py-0.5 bg-stone-100 rounded text-purple-700 font-medium">OVO</span>
                  <span className="px-1.5 py-0.5 bg-stone-100 rounded text-blue-700 font-medium">DANA</span>
                  <span className="px-1.5 py-0.5 bg-stone-100 rounded text-orange-700 font-medium">ShopeePay</span>
                </div>

                {/* Instant Simulation Action Button */}
                <button
                  type="button"
                  onClick={() => handleSimulatePayment('qris')}
                  disabled={isProcessing}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 active:scale-98 text-amber-400 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isProcessing ? 'Memverifikasi Pembayaran...' : 'Simulasikan Pembayaran QRIS Berhasil'}
                  </span>
                </button>
              </div>
            )}

            {/* Tab 2: E-Wallet Direct */}
            {['gopay', 'ovo', 'dana', 'shopeepay'].includes(activeTab) && (
              <div className="p-5 space-y-4">
                <p className="text-xs text-stone-600">
                  Pilih aplikasi e-wallet Anda. Notifikasi permintaan pembayaran instan akan dikirim ke akun Anda:
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'gopay', name: 'GoPay', color: 'text-emerald-700 border-emerald-300' },
                    { id: 'ovo', name: 'OVO', color: 'text-purple-700 border-purple-300' },
                    { id: 'dana', name: 'DANA', color: 'text-blue-700 border-blue-300' },
                    { id: 'shopeepay', name: 'ShopeePay', color: 'text-orange-700 border-orange-300' }
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => {
                        setSelectedEwallet(w.id as any);
                        setActiveTab(w.id as any);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedEwallet === w.id
                          ? 'border-amber-600 bg-amber-50/60 font-bold shadow-xs'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="font-semibold text-stone-800">{w.name}</span>
                      {selectedEwallet === w.id && (
                        <Check className="w-4 h-4 text-amber-700" />
                      )}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nomor Ponsel Akun {selectedEwallet.toUpperCase()}:
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full text-sm px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-mono focus:ring-1 focus:ring-amber-500"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Buka aplikasi {selectedEwallet.toUpperCase()} untuk menyetujui transaksi {formatRupiah(cartTotal)}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSimulatePayment(selectedEwallet)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-98 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'Menghubungkan ke E-Wallet...' : `Bayar via ${selectedEwallet.toUpperCase()} (${formatRupiah(cartTotal)})`}
                  </span>
                </button>
              </div>
            )}

            {/* Tab 3: Virtual Account Bank */}
            {activeTab === 'bca_va' && (
              <div className="p-5 space-y-4">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                    <span className="font-semibold text-stone-800">BCA Virtual Account</span>
                    <span>Panggonan Resto</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-lg font-bold text-stone-900 tracking-wider">
                      88099 0812 8829
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyVa('8809908128829')}
                      className="px-2.5 py-1 text-xs bg-white border border-stone-300 rounded hover:bg-stone-100 flex items-center gap-1 font-medium text-stone-700"
                    >
                      {copiedVa ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedVa ? 'Disalin' : 'Salin'}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                    <span className="font-semibold text-stone-800">Mandiri Virtual Account</span>
                    <span>Panggonan Resto</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-lg font-bold text-stone-900 tracking-wider">
                      70012 0812 8829
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyVa('7001208128829')}
                      className="px-2.5 py-1 text-xs bg-white border border-stone-300 rounded hover:bg-stone-100 flex items-center gap-1 font-medium text-stone-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-stone-500 space-y-1">
                  <p>1. Masuk ke m-Banking atau ATM Bank Anda.</p>
                  <p>2. Pilih Transfer Virtual Account dan masukkan nomor di atas.</p>
                  <p>3. Nominal otomatis sesuai tagihan {formatRupiah(cartTotal)}.</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSimulatePayment('bca_va')}
                  disabled={isProcessing}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 active:scale-98 text-amber-400 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isProcessing ? 'Mengecek Pembayaran...' : 'Simulasikan Transfer Selesai'}
                  </span>
                </button>
              </div>
            )}

            {/* Tab 4: Bayar di Kasir (Tunai / EDC Gesek) */}
            {activeTab === 'cashier' && (
              <div className="p-5 text-center space-y-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-stone-900">
                    Bayar di Kasir / Panggil Pelayan
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto leading-relaxed">
                    Pesanan Anda akan langsung dikirim ke dapur koki sekarang juga. Anda dapat membayar dengan tunai atau kartu debit/kredit di meja kasir setelah selesai bersantap.
                  </p>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-700">
                  Nomor Meja: <strong>{selectedTable}</strong> · Total: <strong>{formatRupiah(cartTotal)}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => handleSimulatePayment('cashier')}
                  disabled={isProcessing}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-98 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Kirim Pesanan ke Dapur & Bayar di Kasir</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
