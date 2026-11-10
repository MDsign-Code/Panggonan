import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { RESTAURANT_INFO, signatureDishImg } from '../data/initialData';
import { 
  X, 
  Star, 
  MessageSquare, 
  Share2, 
  Check, 
  Copy, 
  Sparkles, 
  Instagram, 
  Send,
  ShieldCheck,
  Heart
} from 'lucide-react';

export const ReviewSocialModal: React.FC = () => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    isSocialShareModalOpen,
    setIsSocialShareModalOpen,
    addReview,
    reviewTargetOrder,
    socialShareOrder,
    selectedTable,
    menuItems
  } = useRestaurant();

  // Review form state
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState('Tamu Meja ' + selectedTable);
  const [selectedDish, setSelectedDish] = useState(
    reviewTargetOrder?.items[0]?.menuItem.name || 'Bebek Crispy Panggonan (1/2 Ekor)'
  );
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Social share state
  const [copiedLink, setCopiedLink] = useState(false);
  const [storyTemplate, setStoryTemplate] = useState<'classic' | 'modern'>('classic');

  const ratingDescriptions: Record<number, string> = {
    1: 'Kurang Puas',
    2: 'Cukup',
    3: 'Biasa Saja',
    4: 'Enak & Memuaskan',
    5: 'Luar Biasa Istimewa!'
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      customerName: customerName.trim() || 'Tamu Panggonan',
      rating,
      comment: comment.trim(),
      dishName: selectedDish,
      tableNumber: reviewTargetOrder?.tableNumber || selectedTable,
      verifiedDineIn: true
    });

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setIsReviewModalOpen(false);
      setComment('');
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(RESTAURANT_INFO.website);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareTextWhatsApp = encodeURIComponent(
    `Hai! Saya baru saja menikmati kuliner lezat di ${RESTAURANT_INFO.name}. Menu Bebek Crispy & Sate Maranggi-nya luar biasa lezat dengan suasana joglo yang nyaman! Cek menu digitalnya di: ${RESTAURANT_INFO.website}/menu/`
  );

  return (
    <>
      {/* 1. Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-6"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 sm:p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Ulasan Bersantap</span>
                </div>
                <h3 className="font-display text-lg font-bold text-stone-100">
                  Bagikan Pengalaman Kuliner
                </h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-display text-xl font-bold text-stone-900">
                  Terima Kasih Banyak!
                </h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Ulasan Anda sangat berarti bagi tim dapur dan pelayanan Panggonan Resto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="p-5 space-y-4 text-xs">
                {/* Rating Stars */}
                <div className="text-center py-2">
                  <p className="text-xs font-semibold text-stone-700 mb-2">
                    Bagaimana kepuasan hidangan dan pelayanan kami?
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            (hoverRating || rating) >= star
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="font-semibold text-amber-800 text-xs mt-1.5 font-mono">
                    {ratingDescriptions[hoverRating || rating]}
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nama Anda / Inisial
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Hidangan yang Paling Disukai
                  </label>
                  <select
                    value={selectedDish}
                    onChange={(e) => setSelectedDish(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                  >
                    {menuItems.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Ulasan & Kesan Rasa
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ceritakan cita rasa, tingkat pedas sambal, atau suasana restoran..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ulasan akan ditandai sebagai Tamu Terverifikasi Meja.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-stone-950" />
                  <span>Kirim Ulasan Pelanggan</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. Social Media Share Modal */}
      {isSocialShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150 my-6"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-4 sm:p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-0.5">
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Media Sosial Terintegrasi</span>
                </div>
                <h3 className="font-display text-lg font-bold text-stone-100">
                  Bagikan Momen Bersantap
                </h3>
              </div>
              <button
                onClick={() => setIsSocialShareModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Instagram Story Preview Card Mockup */}
              <div className="relative aspect-9/16 max-w-xs mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-stone-900 bg-stone-950 text-stone-100 p-5 flex flex-col justify-between">
                {/* Story Image Backdrop */}
                <div className="absolute inset-0 z-0 opacity-60">
                  <img
                    src={signatureDishImg}
                    alt="Sajian Panggonan"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/50" />
                </div>

                {/* Top Story Brand */}
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-base font-bold text-amber-400">
                      {RESTAURANT_INFO.name}
                    </h4>
                    <p className="text-[10px] text-stone-300">📍 Kuliner Nusantara Tradisi</p>
                  </div>
                  <span className="text-[10px] bg-stone-900/80 px-2 py-0.5 rounded font-mono text-amber-300">
                    {socialShareOrder?.tableNumber || selectedTable}
                  </span>
                </div>

                {/* Bottom Story Quote & Stickers */}
                <div className="relative z-10 space-y-2">
                  <div className="bg-stone-900/90 backdrop-blur-md p-3.5 rounded-xl border border-stone-700/80">
                    <p className="text-[11px] font-bold text-stone-100 italic">
                      "Makan enak di Panggonan Resto! Bebek Crispy & sambal koreknya bikin nagih!"
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-amber-400">
                      <span className="font-mono">⭐⭐⭐⭐⭐ 5.0</span>
                      <span className="text-stone-300 font-semibold">{RESTAURANT_INFO.instagram}</span>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-stone-300 font-medium">
                    Order via: panggonanresto.com/menu/
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${shareTextWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Tersalin!' : 'Salin Tautan'}</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-stone-500">
                Tag akun kami di Instagram Story <strong>{RESTAURANT_INFO.instagram}</strong> untuk voucher bersantap berikutnya!
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
