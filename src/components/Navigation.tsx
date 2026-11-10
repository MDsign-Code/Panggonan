import React from 'react';
import { useRestaurant, AppView } from '../context/RestaurantContext';
import { UtensilsCrossed, ChefHat, LayoutDashboard, LineChart, ShoppingBag, Bell, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

export const Navigation: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedTable,
    setSelectedTable,
    cartTotalQuantity,
    setIsCartOpen,
    activeKitchenOrdersCount,
    unpaidOrdersCount,
    kitchenSoundMuted,
    setKitchenSoundMuted,
    playKitchenChime
  } = useRestaurant();

  const tables = [
    'Meja 01', 'Meja 02', 'Meja 03', 'Meja 04', 'Meja 05',
    'Meja 06', 'Meja 07', 'Meja 08', 'Meja 09', 'Meja 10',
    'Meja VIP 1', 'Meja VIP 2', 'Takeaway'
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-sm transition-all">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <button
            onClick={() => setCurrentView('customer')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-600/20 group-hover:bg-amber-500 transition-colors">
              <UtensilsCrossed className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-100 whitespace-nowrap block">
                {RESTAURANT_INFO.name}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (single-line, clean unboxed text) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
            <button
              onClick={() => setCurrentView('customer')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${currentView === 'customer' ? 'text-amber-400 font-semibold' : ''}`}
            >
              Menu Digital
            </button>
            <button
              onClick={() => setCurrentView('kitchen')}
              className={`relative hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${currentView === 'kitchen' ? 'text-amber-400 font-semibold' : ''}`}
            >
              <span>Dapur (KDS)</span>
              {activeKitchenOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-500 text-stone-950 text-xs font-bold rounded-full">
                  {activeKitchenOrdersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`relative hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${currentView === 'admin' ? 'text-amber-400 font-semibold' : ''}`}
            >
              <span>Kasir & Stok</span>
              {unpaidOrdersCount > 0 && (
                <span className="px-1.5 py-0.2 bg-rose-500 text-white text-xs font-bold rounded-full">
                  {unpaidOrdersCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('owner')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${currentView === 'owner' ? 'text-amber-400 font-semibold' : ''}`}
            >
              Analitik Pemilik
            </button>
          </nav>

          {/* Zone 3: Primary Action & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Table Selector Dropdown */}
            <div className="relative hidden sm:block">
              <label htmlFor="table-select" className="sr-only">Pilih Meja</label>
              <select
                id="table-select"
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="bg-stone-800 text-stone-200 text-xs font-medium px-3 py-2 rounded-lg border border-stone-700 hover:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors cursor-pointer"
              >
                {tables.map((tbl) => (
                  <option key={tbl} value={tbl} className="bg-stone-800 text-stone-200">
                    📍 {tbl}
                  </option>
                ))}
              </select>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-500 rounded-lg hover:bg-amber-400 active:scale-95 transition-all shadow-sm shadow-amber-500/20 whitespace-nowrap shrink-0"
              aria-label="Keranjang Pesanan"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span className="hidden sm:inline">Pesanan Meja</span>
              {cartTotalQuantity > 0 ? (
                <span className="w-5 h-5 bg-stone-950 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold">
                  {cartTotalQuantity}
                </span>
              ) : (
                <span className="text-stone-900/80 font-mono text-xs">(0)</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Role / View Switcher Strip for Instant Demo Navigation */}
      <div className="bg-stone-950/90 border-t border-stone-800/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs overflow-x-auto no-scrollbar gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-stone-900 rounded-lg shrink-0">
            <button
              onClick={() => setCurrentView('customer')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                currentView === 'customer'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Pelanggan ({selectedTable})</span>
            </button>

            <button
              onClick={() => setCurrentView('kitchen')}
              className={`relative flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                currentView === 'kitchen'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Layar Dapur (KDS)</span>
              {activeKitchenOrdersCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                currentView === 'admin'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Kasir & Stok</span>
            </button>

            <button
              onClick={() => setCurrentView('owner')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
                currentView === 'owner'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Dashboard Pemilik</span>
            </button>
          </div>

          {/* Sound alert test & status toggle */}
          <div className="flex items-center gap-2 shrink-0 text-stone-400">
            <button
              onClick={() => setKitchenSoundMuted(!kitchenSoundMuted)}
              title={kitchenSoundMuted ? 'Nyalakan Bel Dapur' : 'Bisukan Bel Dapur'}
              className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-stone-800 text-stone-300 transition-colors"
            >
              {kitchenSoundMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden lg:inline text-[11px]">Audio Mati</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline text-[11px]">Bel Dapur Aktif</span>
                </>
              )}
            </button>
            <button
              onClick={() => playKitchenChime()}
              className="px-2 py-1 text-[11px] bg-stone-800 hover:bg-stone-700 text-amber-300 rounded transition-colors"
              title="Coba bunyi bel pesanan masuk"
            >
              Tes Bel
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
