import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderStatus } from '../types/restaurant';
import { formatShortTime, getElapsedMinutes } from '../utils/formatters';
import { 
  ChefHat, 
  Clock, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Flame, 
  Utensils, 
  Filter, 
  BellRing,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const KitchenKDS: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    kitchenSoundMuted,
    setKitchenSoundMuted,
    playKitchenChime
  } = useRestaurant();

  const [statusFilter, setStatusFilter] = useState<'active' | 'received' | 'cooking' | 'ready' | 'all'>('active');
  const [stationFilter, setStationFilter] = useState<'all' | 'kitchen' | 'bar'>('all');

  // Active kitchen orders
  const filteredOrders = orders.filter((ord) => {
    if (ord.orderStatus === 'cancelled') return false;

    // Status filter
    if (statusFilter === 'active') {
      if (ord.orderStatus !== 'received' && ord.orderStatus !== 'cooking' && ord.orderStatus !== 'ready') {
        return false;
      }
    } else if (statusFilter !== 'all') {
      if (ord.orderStatus !== statusFilter) return false;
    }

    // Station filter
    if (stationFilter === 'kitchen') {
      const hasKitchenItems = ord.items.some((i) => i.menuItem.category !== 'minuman' && i.menuItem.category !== 'dessert');
      if (!hasKitchenItems) return false;
    } else if (stationFilter === 'bar') {
      const hasBarItems = ord.items.some((i) => i.menuItem.category === 'minuman' || i.menuItem.category === 'dessert');
      if (!hasBarItems) return false;
    }

    return true;
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return 'border-rose-500 bg-rose-950/20 text-rose-300';
      case 'cooking':
        return 'border-amber-500 bg-amber-950/20 text-amber-300';
      case 'ready':
        return 'border-emerald-500 bg-emerald-950/20 text-emerald-300';
      case 'served':
      case 'completed':
        return 'border-stone-700 bg-stone-900 text-stone-400';
      default:
        return 'border-stone-700 bg-stone-900 text-stone-400';
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return <span className="bg-rose-500 text-stone-950 px-2 py-0.5 rounded text-xs font-bold uppercase animate-pulse">Pesanan Baru</span>;
      case 'cooking':
        return <span className="bg-amber-500 text-stone-950 px-2 py-0.5 rounded text-xs font-bold uppercase">Sedang Dimasak</span>;
      case 'ready':
        return <span className="bg-emerald-500 text-stone-950 px-2 py-0.5 rounded text-xs font-bold uppercase">Siap Saji</span>;
      case 'served':
        return <span className="bg-stone-700 text-stone-300 px-2 py-0.5 rounded text-xs font-semibold">Telah Disajikan</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-6 lg:p-8">
      {/* Top Header Bar for Kitchen Display */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
            <ChefHat className="w-4 h-4 text-amber-400" />
            <span className="font-semibold uppercase tracking-wider">Kitchen Display System (KDS)</span>
            <span aria-hidden="true">·</span>
            <span>Dapur Utama & Bar Minuman</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
            Antrean Tiket Masak Real-Time
          </h1>
        </div>

        {/* Audio Alert Status & Test Sound */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setKitchenSoundMuted(!kitchenSoundMuted)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
              kitchenSoundMuted
                ? 'bg-stone-900 border-stone-800 text-stone-500'
                : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
            }`}
          >
            {kitchenSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{kitchenSoundMuted ? 'Suara Dapur Dinonaktifkan' : 'Notifikasi Suara Aktif'}</span>
          </button>

          <button
            onClick={playKitchenChime}
            className="flex items-center gap-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold transition-colors"
          >
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
            <span>Tes Bel Dapur</span>
          </button>
        </div>
      </div>

      {/* Control Strip & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-stone-800/80">
        {/* Status segmented buttons */}
        <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg text-xs">
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'active' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Aktif Diolah ({orders.filter((o) => o.orderStatus === 'received' || o.orderStatus === 'cooking' || o.orderStatus === 'ready').length})
          </button>
          <button
            onClick={() => setStatusFilter('received')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'received' ? 'bg-rose-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Baru Masuk ({orders.filter((o) => o.orderStatus === 'received').length})
          </button>
          <button
            onClick={() => setStatusFilter('cooking')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'cooking' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Sedang Dimasak ({orders.filter((o) => o.orderStatus === 'cooking').length})
          </button>
          <button
            onClick={() => setStatusFilter('ready')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'ready' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Siap Saji ({orders.filter((o) => o.orderStatus === 'ready').length})
          </button>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              statusFilter === 'all' ? 'bg-stone-800 text-stone-100' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Semua Riwayat
          </button>
        </div>

        {/* Station switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-lg text-xs">
          <button
            onClick={() => setStationFilter('all')}
            className={`px-2.5 py-1 rounded font-medium ${stationFilter === 'all' ? 'bg-stone-800 text-stone-100' : 'text-stone-400'}`}
          >
            Semua Bagian
          </button>
          <button
            onClick={() => setStationFilter('kitchen')}
            className={`px-2.5 py-1 rounded font-medium ${stationFilter === 'kitchen' ? 'bg-stone-800 text-stone-100' : 'text-stone-400'}`}
          >
            Dapur Makanan
          </button>
          <button
            onClick={() => setStationFilter('bar')}
            className={`px-2.5 py-1 rounded font-medium ${stationFilter === 'bar' ? 'bg-stone-800 text-stone-100' : 'text-stone-400'}`}
          >
            Bar Minuman & Dessert
          </button>
        </div>
      </div>

      {/* Ticket Cards Grid */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20 bg-stone-900/40 rounded-2xl border border-stone-800/80 my-8">
          <ChefHat className="w-12 h-12 mx-auto text-stone-600 mb-3" />
          <h3 className="font-display text-lg font-bold text-stone-300">
            Tidak ada tiket dalam antrean
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Pesanan masuk dari pelanggan akan langsung muncul di sini disertai bunyi bel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-6">
          {filteredOrders.map((ord) => {
            const elapsed = getElapsedMinutes(ord.createdAt);
            const isLate = elapsed > 15;

            return (
              <div
                key={ord.id}
                className={`rounded-2xl border-2 flex flex-col justify-between overflow-hidden shadow-lg transition-all ${getStatusColor(
                  ord.orderStatus
                )}`}
              >
                {/* Ticket Header */}
                <div className="p-4 bg-stone-900/90 border-b border-stone-800/80">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-xl text-stone-100 tracking-tight">
                          {ord.tableNumber}
                        </span>
                        <span className="text-xs font-mono text-stone-400">
                          {ord.orderNumber}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Pemesan: <strong className="text-stone-200">{ord.customerName}</strong>
                      </p>
                    </div>

                    <div>
                      {getStatusBadge(ord.orderStatus)}
                    </div>
                  </div>

                  {/* Timer & Meta */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-800/60 font-mono">
                    <span className="text-stone-400">Masuk: {formatShortTime(ord.createdAt)}</span>
                    <div className={`flex items-center gap-1 font-bold ${isLate ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{elapsed} mnt lalu</span>
                      {isLate && <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                    </div>
                  </div>
                </div>

                {/* Ticket Items List */}
                <div className="p-4 flex-1 space-y-3 bg-stone-900/50">
                  {ord.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded bg-amber-500 text-stone-950 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                        {item.quantity}x
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-stone-100">
                          {item.menuItem.name}
                        </p>

                        {/* Spicy badge & custom instructions for kitchen */}
                        <div className="mt-1 flex flex-wrap gap-1 text-[11px]">
                          {item.spicyLevel > 0 && (
                            <span className="text-rose-400 bg-rose-950/60 border border-rose-800 px-1.5 py-0.2 rounded font-medium flex items-center gap-0.5">
                              <Flame className="w-3 h-3 text-rose-500" />
                              Pedas Lv.{item.spicyLevel}
                            </span>
                          )}
                          {item.notes && (
                            <span className="text-amber-300 bg-amber-950/60 border border-amber-800 px-1.5 py-0.2 rounded font-medium italic">
                              ⚠️ Catatan: {item.notes}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ticket Actions */}
                <div className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
                  {ord.orderStatus === 'received' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'cooking')}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Flame className="w-4 h-4" />
                      <span>Mulai Masak Sekarang</span>
                    </button>
                  )}

                  {ord.orderStatus === 'cooking' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'ready')}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Tandai Siap Disajikan</span>
                    </button>
                  )}

                  {ord.orderStatus === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'served')}
                      className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Utensils className="w-4 h-4" />
                      <span>Selesai Antar ke Meja</span>
                    </button>
                  )}

                  {(ord.orderStatus === 'served' || ord.orderStatus === 'completed') && (
                    <div className="w-full flex items-center justify-between text-xs text-stone-400 px-2 py-1">
                      <span>Pesanan telah disajikan</span>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'cooking')}
                        className="text-[11px] text-stone-500 hover:text-amber-400 underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Ulang Masak
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
