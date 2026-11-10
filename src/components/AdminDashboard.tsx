import React, { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, MenuCategory, Order, PaymentStatus } from '../types/restaurant';
import { formatRupiah, formatShortTime } from '../utils/formatters';
import { 
  Package, 
  Receipt, 
  Plus, 
  Search, 
  Check, 
  X, 
  Edit3, 
  Trash2, 
  Printer, 
  AlertCircle, 
  CreditCard,
  DollarSign,
  TrendingUp,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    menuItems,
    toggleMenuAvailability,
    updateMenuStock,
    updateMenuPrice,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    orders,
    updatePaymentStatus,
    updateOrderStatus,
    cancelOrder,
    setActiveOrderForReceipt
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'stock' | 'orders'>('stock');
  const [stockSearch, setStockSearch] = useState('');
  const [stockCategoryFilter, setStockCategoryFilter] = useState<string>('all');
  
  // Orders filter
  const [ordersSearch, setOrdersSearch] = useState('');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<string>('all');

  // Add Menu Modal
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [newMenuForm, setNewMenuForm] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    category: 'unggasan_daging',
    price: 35000,
    image: '/src/assets/images/panggonan_signature_dish_1794295774678.jpg',
    isAvailable: true,
    stock: 20,
    spicyLevel: 1,
    isChefRecommended: false,
    isHalal: true,
    prepTimeMinutes: 12,
    portionSize: '1 Porsi',
    rating: 4.8,
    reviewsCount: 1
  });

  // Edit Menu Modal
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'unggasan_daging', label: 'Unggas & Daging' },
    { key: 'sate_bakaran', label: 'Sate & Bakaran' },
    { key: 'sup_kuah', label: 'Sup & Berkuah' },
    { key: 'camilan', label: 'Camilan Tradisional' },
    { key: 'minuman', label: 'Minuman Segar' },
    { key: 'dessert', label: 'Hidangan Penutup' }
  ];

  // Stock items filtered
  const filteredStockItems = menuItems.filter((item) => {
    if (stockCategoryFilter !== 'all' && item.category !== stockCategoryFilter) return false;
    if (stockSearch.trim()) {
      const q = stockSearch.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  // Orders filtered
  const filteredOrders = orders.filter((ord) => {
    if (orderPaymentFilter === 'unpaid' && ord.paymentStatus !== 'unpaid') return false;
    if (orderPaymentFilter === 'paid' && ord.paymentStatus !== 'paid') return false;
    if (orderPaymentFilter === 'cancelled' && ord.orderStatus !== 'cancelled') return false;

    if (ordersSearch.trim()) {
      const q = ordersSearch.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.tableNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuForm.name.trim()) return;
    addMenuItem(newMenuForm);
    setIsAddMenuModalOpen(false);
    setNewMenuForm({
      name: '',
      description: '',
      category: 'unggasan_daging',
      price: 35000,
      image: '/src/assets/images/panggonan_signature_dish_1794295774678.jpg',
      isAvailable: true,
      stock: 20,
      spicyLevel: 1,
      isChefRecommended: false,
      isHalal: true,
      prepTimeMinutes: 12,
      portionSize: '1 Porsi',
      rating: 4.8,
      reviewsCount: 1
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    editMenuItem(editingItem.id, editingItem);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 p-4 sm:p-6 lg:p-8">
      {/* Dashboard Top Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Panel Manajemen Restoran</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-amber-700">Panggonan Resto</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              Dashboard Admin & Kasir POS
            </h1>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200 rounded-lg text-xs self-start sm:self-auto font-medium">
            <button
              onClick={() => setActiveTab('stock')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition-all ${
                activeTab === 'stock'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Package className="w-4 h-4 text-amber-600" />
              <span>Kelola Stok & Menu ({menuItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md transition-all ${
                activeTab === 'orders'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Receipt className="w-4 h-4 text-amber-600" />
              <span>Riwayat Transaksi & Kasir ({orders.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Stock & Menu Management */}
        {activeTab === 'stock' && (
          <div className="mt-6 space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="flex flex-1 gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={stockSearch}
                    onChange={(e) => setStockSearch(e.target.value)}
                    placeholder="Cari menu untuk ubah stok atau harga..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <select
                  value={stockCategoryFilter}
                  onChange={(e) => setStockCategoryFilter(e.target.value)}
                  className="text-xs bg-white border border-stone-300 rounded-lg px-2.5 py-2 font-medium text-stone-700"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((c) => (
                    <option key={c.key} value={c.key}>{c.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsAddMenuModalOpen(true)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-400 text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Menu Baru</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Menu & Gambar</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Harga (Rp)</th>
                      <th className="py-3 px-4">Stok Real-Time</th>
                      <th className="py-3 px-4">Status Ketersediaan</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredStockItems.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                        {/* Name & Thumb */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <p className="font-semibold text-stone-900 text-xs sm:text-sm">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-stone-500 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 text-stone-600 capitalize whitespace-nowrap">
                          {item.category.replace('_', ' ')}
                        </td>

                        {/* Price with Inline Quick Editor */}
                        <td className="py-3 px-4 font-mono font-semibold text-stone-900 whitespace-nowrap">
                          <input
                            type="number"
                            step="1000"
                            value={item.price}
                            onChange={(e) => updateMenuPrice(item.id, Number(e.target.value))}
                            className="w-24 px-2 py-1 bg-stone-50 border border-stone-200 rounded font-mono text-xs focus:ring-1 focus:ring-amber-500"
                          />
                        </td>

                        {/* Stock with Increment / Decrement Stepper */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateMenuStock(item.id, item.stock - 1)}
                              className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.stock}
                              onChange={(e) => updateMenuStock(item.id, Number(e.target.value))}
                              className="w-14 text-center px-1.5 py-1 bg-stone-50 border border-stone-200 rounded font-mono font-bold text-xs"
                            />
                            <button
                              onClick={() => updateMenuStock(item.id, item.stock + 1)}
                              className="w-6 h-6 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Toggle Availability in 1 click */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleMenuAvailability(item.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                              item.isAvailable && item.stock > 0
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            {item.isAvailable && item.stock > 0 ? '✓ Siap / Tersedia' : '✕ Habis'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingItem(item)}
                              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
                              title="Edit Detail Menu"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Yakin ingin menghapus ${item.name}?`)) {
                                  deleteMenuItem(item.id);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                              title="Hapus Menu"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders & Cashier POS */}
        {activeTab === 'orders' && (
          <div className="mt-6 space-y-6">
            {/* Search & Status Filter */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={ordersSearch}
                  onChange={(e) => setOrdersSearch(e.target.value)}
                  placeholder="Cari no pesanan, meja, atau nama tamu..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-stone-200 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setOrderPaymentFilter('all')}
                  className={`px-3 py-1.5 rounded-md ${orderPaymentFilter === 'all' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'}`}
                >
                  Semua ({orders.length})
                </button>
                <button
                  onClick={() => setOrderPaymentFilter('unpaid')}
                  className={`px-3 py-1.5 rounded-md ${orderPaymentFilter === 'unpaid' ? 'bg-rose-500 text-white font-bold shadow-xs' : 'text-stone-600'}`}
                >
                  Belum Lunas ({orders.filter((o) => o.paymentStatus === 'unpaid').length})
                </button>
                <button
                  onClick={() => setOrderPaymentFilter('paid')}
                  className={`px-3 py-1.5 rounded-md ${orderPaymentFilter === 'paid' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-stone-600'}`}
                >
                  Lunas ({orders.filter((o) => o.paymentStatus === 'paid').length})
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">No. Order & Waktu</th>
                      <th className="py-3 px-4">Meja / Tamu</th>
                      <th className="py-3 px-4">Rincian Menu</th>
                      <th className="py-3 px-4">Total Tagihan</th>
                      <th className="py-3 px-4">Metode & Status Bayar</th>
                      <th className="py-3 px-4">Status Dapur</th>
                      <th className="py-3 px-4 text-right">Aksi Kasir</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                        {/* Order & Time */}
                        <td className="py-3 px-4">
                          <p className="font-bold text-stone-900 font-mono">{ord.orderNumber}</p>
                          <p className="text-[11px] text-stone-500">{formatShortTime(ord.createdAt)}</p>
                        </td>

                        {/* Table & Guest */}
                        <td className="py-3 px-4">
                          <p className="font-semibold text-stone-900">{ord.tableNumber}</p>
                          <p className="text-[11px] text-stone-500">{ord.customerName}</p>
                        </td>

                        {/* Items summary */}
                        <td className="py-3 px-4">
                          <div className="max-w-xs space-y-0.5">
                            {ord.items.map((it, i) => (
                              <p key={i} className="text-[11px] text-stone-700 truncate">
                                {it.quantity}x {it.menuItem.name}
                              </p>
                            ))}
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-3 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                          {formatRupiah(ord.total)}
                        </td>

                        {/* Payment Method & Status */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-mono font-semibold px-1.5 py-0.5 bg-stone-100 rounded text-stone-700">
                              {ord.paymentMethod}
                            </span>
                            <div>
                              {ord.paymentStatus === 'paid' ? (
                                <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Lunas
                                </span>
                              ) : ord.orderStatus === 'cancelled' ? (
                                <span className="text-stone-400 font-semibold text-xs">Dibatalkan</span>
                              ) : (
                                <span className="text-rose-600 font-bold text-xs flex items-center gap-1 animate-pulse">
                                  <AlertCircle className="w-3.5 h-3.5" /> Belum Bayar
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Kitchen Order Status */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            ord.orderStatus === 'cooking'
                              ? 'bg-amber-100 text-amber-800'
                              : ord.orderStatus === 'ready'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.orderStatus === 'served'
                              ? 'bg-stone-100 text-stone-700'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {ord.orderStatus}
                          </span>
                        </td>

                        {/* Cashier Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {ord.paymentStatus === 'unpaid' && ord.orderStatus !== 'cancelled' && (
                              <button
                                onClick={() => updatePaymentStatus(ord.id, 'paid')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs transition-colors shadow-xs"
                                title="Terima uang tunai/gesek dan tandai lunas"
                              >
                                Tandai Lunas
                              </button>
                            )}

                            <button
                              onClick={() => setActiveOrderForReceipt(ord)}
                              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded transition-colors"
                              title="Buka & Cetak Struk"
                            >
                              <Printer className="w-4 h-4" />
                            </button>

                            {ord.orderStatus !== 'cancelled' && (
                              <button
                                onClick={() => {
                                  if (confirm(`Batalkan pesanan ${ord.orderNumber}?`)) {
                                    cancelOrder(ord.id);
                                  }
                                }}
                                className="p-1.5 text-stone-400 hover:text-rose-600 rounded transition-colors"
                                title="Batalkan Pesanan"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Menu Item Modal */}
      {isAddMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-display text-lg font-bold text-stone-900">
                Tambah Menu Baru Panggonan Resto
              </h3>
              <button
                onClick={() => setIsAddMenuModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMenu} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Menu</label>
                <input
                  type="text"
                  required
                  value={newMenuForm.name}
                  onChange={(e) => setNewMenuForm({ ...newMenuForm, name: e.target.value })}
                  placeholder="Misal: Nasi Timbel Komplit Sambal Terasi"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kategori</label>
                  <select
                    value={newMenuForm.category}
                    onChange={(e) => setNewMenuForm({ ...newMenuForm, category: e.target.value as MenuCategory })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga Satuan (Rp)</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={newMenuForm.price}
                    onChange={(e) => setNewMenuForm({ ...newMenuForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stok Awal</label>
                  <input
                    type="number"
                    required
                    value={newMenuForm.stock}
                    onChange={(e) => setNewMenuForm({ ...newMenuForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tingkat Pedas Dasar (0-3)</label>
                  <select
                    value={newMenuForm.spicyLevel}
                    onChange={(e) => setNewMenuForm({ ...newMenuForm, spicyLevel: Number(e.target.value) as any })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                  >
                    <option value={0}>0 - Tidak Pedas</option>
                    <option value={1}>1 - Sedang</option>
                    <option value={2}>2 - Pedas Mantap</option>
                    <option value={3}>3 - Ekstra Pedas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Foto Menu</label>
                <select
                  value={newMenuForm.image}
                  onChange={(e) => setNewMenuForm({ ...newMenuForm, image: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                >
                  <option value="/src/assets/images/panggonan_signature_dish_1794295774678.jpg">Foto Bebek Crispy Panggonan</option>
                  <option value="/src/assets/images/panggonan_sate_maranggi_1794295776533.jpg">Foto Sate Maranggi Sapi</option>
                  <option value="/src/assets/images/panggonan_sop_buntut_1794295776801.jpg">Foto Sop Buntut Rempah</option>
                  <option value="/src/assets/images/panggonan_es_kelapa_jeruk_1794295776288.jpg">Foto Minuman Es Kelapa</option>
                  <option value="/src/assets/images/hero_panggonan_resto_1794295774747.jpg">Foto Suasana Restoran Joglo</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Deskripsi Hidangan</label>
                <textarea
                  rows={2}
                  required
                  value={newMenuForm.description}
                  onChange={(e) => setNewMenuForm({ ...newMenuForm, description: e.target.value })}
                  placeholder="Jelaskan bumbu, bahan utama, dan penyajian hidangan..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMenuModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold rounded-lg text-xs shadow-xs"
                >
                  Simpan Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Menu Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 my-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-display text-lg font-bold text-stone-900">
                Edit Menu: {editingItem.name}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Menu</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stok Tersedia</label>
                  <input
                    type="number"
                    required
                    value={editingItem.stock}
                    onChange={(e) => setEditingItem({ ...editingItem, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Deskripsi</label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs shadow-xs"
                >
                  Perbarui Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
