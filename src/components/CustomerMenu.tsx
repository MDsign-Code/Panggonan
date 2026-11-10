import React, { useState, useMemo } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, MenuCategory } from '../types/restaurant';
import { formatRupiah } from '../utils/formatters';
import { heroRestoImg } from '../data/initialData';
import { 
  Search, 
  Flame, 
  Clock, 
  Star, 
  Sparkles, 
  Plus, 
  Minus, 
  X, 
  Check, 
  ShoppingBag, 
  Share2, 
  MessageSquare,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

export const CustomerMenu: React.FC = () => {
  const {
    menuItems,
    addToCart,
    selectedTable,
    setSelectedTable,
    cartTotalQuantity,
    cartTotal,
    setIsCartOpen,
    setIsReviewModalOpen,
    setIsSocialShareModalOpen,
    reviews
  } = useRestaurant();

  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'rekomendasi'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [spicyFilter, setSpicyFilter] = useState<'all' | 'mild' | 'spicy'>('all');

  // Customization Modal State
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [customQuantity, setCustomQuantity] = useState(1);
  const [customSpicyLevel, setCustomSpicyLevel] = useState(1);
  const [customNotes, setCustomNotes] = useState('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories: { key: MenuCategory | 'rekomendasi'; label: string }[] = [
    { key: 'semua', label: 'Semua Menu' },
    { key: 'rekomendasi', label: '⭐ Rekomendasi Koki' },
    { key: 'unggasan_daging', label: 'Unggas & Daging' },
    { key: 'sate_bakaran', label: 'Sate & Bakaran' },
    { key: 'sup_kuah', label: 'Sup & Berkuah' },
    { key: 'camilan', label: 'Camilan Tradisional' },
    { key: 'minuman', label: 'Minuman Segar' },
    { key: 'dessert', label: 'Hidangan Penutup' }
  ];

  // Filtered menu
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (activeCategory === 'rekomendasi') {
        if (!item.isChefRecommended) return false;
      } else if (activeCategory !== 'semua') {
        if (item.category !== activeCategory) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }

      // Spicy filter
      if (spicyFilter === 'mild' && item.spicyLevel > 0) return false;
      if (spicyFilter === 'spicy' && item.spicyLevel === 0) return false;

      return true;
    });
  }, [menuItems, activeCategory, searchQuery, spicyFilter]);

  const handleOpenCustomize = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setCustomQuantity(1);
    setCustomSpicyLevel(item.spicyLevel);
    setCustomNotes('');
  };

  const handleConfirmAddToCart = () => {
    if (!selectedMenuItem) return;
    addToCart(selectedMenuItem, customQuantity, customSpicyLevel, customNotes);
    
    // Quick notification toast
    setAddedNotice(`${customQuantity}x ${selectedMenuItem.name} ditambahkan`);
    setTimeout(() => setAddedNotice(null), 2500);

    setSelectedMenuItem(null);
  };

  return (
    <div className="pb-32 min-h-screen">
      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-stone-100 text-sm font-medium px-4 py-2.5 rounded-full shadow-lg border border-amber-500/40 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-amber-400" />
          <span>{addedNotice}</span>
        </div>
      )}

      {/* Atmospheric Hero Showcase */}
      <section className="relative bg-stone-900 text-stone-100 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={heroRestoImg}
            alt="Interior Panggonan Resto"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="max-w-2xl">
            {/* Table & Dining Badge */}
            <div className="flex items-center gap-3 text-xs text-amber-400 mb-3 tracking-wide">
              <span className="font-semibold uppercase bg-amber-500/20 px-2.5 py-1 rounded border border-amber-500/30">
                Pemesanan Meja Langsung
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-300">📍 Anda berada di <strong>{selectedTable}</strong></span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-300">100% Halal</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight leading-tight mb-3">
              Cita Rasa Tradisi, Pesan Mudah Langsung dari Meja
            </h1>
            
            <p className="text-sm sm:text-base text-stone-300 mb-6 leading-relaxed">
              Nikmati aneka sajian khas Nusantara warisan rempah alami. Cukup pilih hidangan, tentukan tingkat kepedasan, dan bayar praktis via QRIS atau kasir.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-stone-800/80 text-xs">
              <div>
                <p className="text-stone-400">Rerata Masak</p>
                <p className="font-semibold text-amber-300 font-mono text-sm">12 - 18 Mnt</p>
              </div>
              <div>
                <p className="text-stone-400">Metode Bayar</p>
                <p className="font-semibold text-stone-100 text-sm">QRIS & E-Wallet</p>
              </div>
              <div>
                <p className="text-stone-400">Voucher Diskon</p>
                <p className="font-semibold text-emerald-400 text-sm">PANGGONANHEMAT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Search & Spicy Filter Strip */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari bebek, sate, sop buntut, es kelapa..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Spicy / Mild Segmented Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg text-xs self-start sm:self-auto">
            <button
              onClick={() => setSpicyFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                spicyFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Semua Rasa
            </button>
            <button
              onClick={() => setSpicyFilter('mild')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                spicyFilter === 'mild' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tidak Pedas
            </button>
            <button
              onClick={() => setSpicyFilter('spicy')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium transition-colors ${
                spicyFilter === 'spicy' ? 'bg-white text-rose-700 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>Menu Pedas</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Buttons/Tabs Allowed as Interactive Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat.key
                  ? 'bg-stone-900 text-amber-400 shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <p className="text-base font-semibold text-stone-800 mb-1">Menu tidak ditemukan</p>
            <p className="text-xs text-stone-500 mb-4">Coba cari dengan kata kunci lain atau ubah filter kategori.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('semua');
                setSpicyFilter('all');
              }}
              className="px-4 py-2 text-xs font-semibold bg-stone-900 text-stone-100 rounded-lg hover:bg-stone-800"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Food Image Container */}
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient container if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Clean unboxed markers (Zero-Pill discipline) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {item.isChefRecommended && (
                      <span className="bg-stone-900/90 backdrop-blur-xs text-amber-400 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Pilihan Koki
                      </span>
                    )}
                    {item.spicyLevel > 0 && (
                      <span className="bg-stone-900/90 backdrop-blur-xs text-rose-400 text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-500" />
                        Level {item.spicyLevel}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-xs text-stone-200 text-[11px] px-2 py-0.5 rounded font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>~{item.prepTimeMinutes} mnt</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata separator */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                      <span>{item.portionSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-amber-700 font-medium">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {item.rating} ({item.reviewsCount})
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className={item.stock > 5 ? 'text-emerald-700' : 'text-amber-700 font-medium'}>
                        {item.stock > 0 ? `Sisa ${item.stock}` : 'Habis'}
                      </span>
                    </div>

                    <h3 className="font-semibold text-stone-900 text-base leading-snug mb-1 group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-stone-900 font-mono text-base">
                          {formatRupiah(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-stone-400 line-through font-mono">
                            {formatRupiah(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {item.isAvailable && item.stock > 0 ? (
                      <button
                        onClick={() => handleOpenCustomize(item)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 active:scale-95 text-amber-400 rounded-lg text-xs font-semibold transition-all shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Pesan</span>
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 font-medium px-3 py-1.5 bg-stone-100 rounded-lg">
                        Menu Habis
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Customer Reviews & Social Sharing Bar Section */}
        <section className="mt-16 pt-12 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-stone-900">
                Ulasan & Kepuasan Pelanggan
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Komentar nyata dari para penikmat kuliner Nusantara di Panggonan Resto.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-3.5 py-2 bg-stone-900 text-stone-100 hover:bg-stone-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Tulis Ulasan</span>
              </button>
              <button
                onClick={() => setIsSocialShareModalOpen(true)}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-stone-950" />
                <span>Bagikan ke Sosmed</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.slice(0, 3).map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.createdAt}</span>
                  </div>
                  <p className="text-xs text-stone-700 italic leading-relaxed mb-3">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-stone-900">{rev.customerName}</span>
                    {rev.tableNumber && (
                      <span className="text-stone-400 ml-1.5">· {rev.tableNumber}</span>
                    )}
                  </div>
                  {rev.verifiedDineIn && (
                    <span className="text-emerald-700 text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Tamu Terverifikasi
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Bottom Cart Bar (Sticky Mobile & Desktop Bar) */}
      {cartTotalQuantity > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 py-3 px-4 shadow-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-stone-950 font-mono shadow-sm">
                {cartTotalQuantity}
              </div>
              <div>
                <p className="text-xs text-stone-400">Total Pesanan {selectedTable}</p>
                <p className="text-base font-bold text-amber-400 font-mono">
                  {formatRupiah(cartTotal)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm rounded-lg transition-all shadow-md shadow-amber-500/20"
            >
              <span>Periksa Pesanan</span>
              <ChevronRight className="w-4 h-4 text-stone-950" />
            </button>
          </div>
        </div>
      )}

      {/* Item Customization Modal */}
      {selectedMenuItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header with Image */}
            <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
              <img
                src={selectedMenuItem.image}
                alt={selectedMenuItem.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedMenuItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 text-stone-200 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-xs text-amber-400 text-xs px-2.5 py-1 rounded font-mono font-bold">
                {formatRupiah(selectedMenuItem.price)}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-display text-xl font-bold text-stone-900 mb-1">
                {selectedMenuItem.name}
              </h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                {selectedMenuItem.description}
              </p>

              {/* Spicy Level Selector (if dish supports spice) */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  Tingkat Kepedasan Sambal:
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[
                    { lvl: 0, label: 'Tidak Pedas' },
                    { lvl: 1, label: 'Sedang' },
                    { lvl: 2, label: 'Pedas Mantap' },
                    { lvl: 3, label: 'Ekstra Pedas' }
                  ].map((s) => (
                    <button
                      key={s.lvl}
                      type="button"
                      onClick={() => setCustomSpicyLevel(s.lvl)}
                      className={`py-2 px-2 rounded-lg border text-center transition-all ${
                        customSpicyLevel === s.lvl
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-semibold shadow-xs'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions for Kitchen */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-stone-800 mb-1.5">
                  Catatan Khusus untuk Dapur (Opsional):
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Misal: Sambal dipisah, tanpa bawang goreng, es sedikit..."
                  maxLength={100}
                  className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Quantity Stepper & Price Calculation */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-stone-500">Jumlah Porsi</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      type="button"
                      onClick={() => setCustomQuantity(Math.max(1, customQuantity - 1))}
                      disabled={customQuantity <= 1}
                      className="w-8 h-8 rounded-lg border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-bold text-stone-900 text-base w-6 text-center">
                      {customQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomQuantity(Math.min(selectedMenuItem.stock, customQuantity + 1))}
                      disabled={customQuantity >= selectedMenuItem.stock}
                      className="w-8 h-8 rounded-lg border border-stone-300 text-stone-700 flex items-center justify-center hover:bg-stone-100 disabled:opacity-40 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[11px] text-stone-500">Subtotal Item</p>
                  <p className="font-mono font-bold text-lg text-stone-900">
                    {formatRupiah(selectedMenuItem.price * customQuantity)}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleConfirmAddToCart}
                className="w-full mt-5 py-3 bg-amber-500 hover:bg-amber-400 active:scale-98 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" />
                <span>Tambahkan ke Pesanan ({formatRupiah(selectedMenuItem.price * customQuantity)})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
