import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { formatRupiah } from '../utils/formatters';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  ShoppingBag,
  Utensils
} from 'lucide-react';

export const CartCheckoutDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartItemQty,
    removeFromCart,
    clearCart,
    cartTotalQuantity,
    cartSubtotal,
    cartTax,
    cartServiceFee,
    cartDiscount,
    appliedPromoCode,
    applyPromoCode,
    removePromoCode,
    cartTotal,
    selectedTable,
    setSelectedTable,
    setIsPaymentModalOpen
  } = useRestaurant();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToPayment = () => {
    // Open payment modal
    setIsCartOpen(false);
    setIsPaymentModalOpen(true);
  };

  const tables = [
    'Meja 01', 'Meja 02', 'Meja 03', 'Meja 04', 'Meja 05',
    'Meja 06', 'Meja 07', 'Meja 08', 'Meja 09', 'Meja 10',
    'Meja VIP 1', 'Meja VIP 2'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-stone-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="font-semibold text-base text-stone-100">Daftar Pesanan Meja</h2>
                <p className="text-[11px] text-stone-400 font-mono">
                  {cartTotalQuantity} item · {selectedTable}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* Table & Order Type Selector */}
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-stone-800">Tipe Layanan:</span>
                <div className="flex items-center gap-1 p-0.5 bg-stone-200/80 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine_in')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      orderType === 'dine_in' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    Makan di Meja
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      orderType === 'takeaway' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    Bungkus (Takeaway)
                  </button>
                </div>
              </div>

              {orderType === 'dine_in' ? (
                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-stone-600">Nomor Meja Pelanggan:</span>
                  <select
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="font-semibold bg-white border border-stone-300 rounded px-2.5 py-1 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    {tables.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="text-stone-500 pt-1 text-[11px]">
                  Pesanan akan disiapkan dalam kemasan ramah lingkungan untuk dibawa pulang.
                </div>
              )}
            </div>

            {/* Customer Contact (Optional) */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Nama Pemesan (Opsional)</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">No. WhatsApp (Struk Digital)</label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="0812xxxx"
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-12 text-stone-500">
                <Utensils className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                <p className="text-sm font-semibold text-stone-800">Keranjang masih kosong</p>
                <p className="text-xs text-stone-500 mt-1">Silakan pilih menu Nusantara lezat di daftar makanan.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Daftar Hidangan</span>
                  <button
                    onClick={clearCart}
                    className="text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    Kosongkan
                  </button>
                </div>

                {cart.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-stone-900 text-xs sm:text-sm">
                        {c.menuItem.name}
                      </h4>
                      <p className="text-xs font-mono font-medium text-amber-800 mt-0.5">
                        {formatRupiah(c.menuItem.price)} / porsi
                      </p>

                      {/* Customization Details */}
                      <div className="mt-1 flex flex-wrap gap-1 text-[11px]">
                        {c.spicyLevel > 0 && (
                          <span className="text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                            Pedas Lv.{c.spicyLevel}
                          </span>
                        )}
                        {c.notes && (
                          <span className="text-stone-600 italic bg-white px-1.5 py-0.2 rounded border border-stone-200">
                            "{c.notes}"
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Total */}
                    <div className="flex flex-col items-end justify-between self-stretch">
                      <p className="font-mono font-bold text-xs sm:text-sm text-stone-900">
                        {formatRupiah(c.itemTotal)}
                      </p>

                      <div className="flex items-center gap-1.5 mt-2">
                        <button
                          onClick={() => updateCartItemQty(c.id, -1)}
                          className="w-6 h-6 rounded bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-stone-800 w-5 text-center">
                          {c.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQty(c.id, 1)}
                          className="w-6 h-6 rounded bg-white border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(c.id)}
                          className="w-6 h-6 ml-1 text-stone-400 hover:text-rose-600 flex items-center justify-center"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Voucher Promo Section */}
            {cart.length > 0 && (
              <div className="pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Kode Promo: PANGGONANHEMAT"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Pasang
                  </button>
                </form>

                {appliedPromoCode && (
                  <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Voucher <strong>{appliedPromoCode}</strong> aktif ({formatRupiah(cartDiscount)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-stone-700 text-[11px] underline"
                    >
                      Hapus
                    </button>
                  </div>
                )}

                {promoMessage && !appliedPromoCode && (
                  <div className={`mt-2 p-2 rounded-lg flex items-center gap-1.5 text-xs ${promoMessage.isError ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700'}`}>
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{promoMessage.text}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Financial Breakdown */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-2.5">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartTotalQuantity} porsi)</span>
                  <span className="font-mono text-stone-800">{formatRupiah(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Diskon Voucher</span>
                    <span className="font-mono">- {formatRupiah(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pajak Restoran (PB1 10%)</span>
                  <span className="font-mono text-stone-800">{formatRupiah(cartTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Layanan (5%)</span>
                  <span className="font-mono text-stone-800">{formatRupiah(cartServiceFee)}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-stone-900 text-sm sm:text-base">
                  <span>Total Tagihan Meja</span>
                  <span className="font-mono text-amber-700 text-lg sm:text-xl">
                    {formatRupiah(cartTotal)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToPayment}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 active:scale-98 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Lanjut ke Pembayaran QRIS / E-Wallet</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
