import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { RESTAURANT_INFO } from '../data/initialData';
import { UtensilsCrossed, Phone, MapPin, Clock, Instagram, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useRestaurant();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-bold">
                <UtensilsCrossed className="w-4 h-4 text-stone-950" />
              </div>
              <span className="font-display text-xl font-bold text-stone-100">
                {RESTAURANT_INFO.name}
              </span>
            </div>

            <p className="text-stone-400 text-xs max-w-md leading-relaxed">
              {RESTAURANT_INFO.tagline}. Menyajikan menu kuliner warisan rempah Indonesia dengan bahan berkualitas tinggi dalam atmosfer pendopo joglo tradisional.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Halal Certified · Higienis & Bersih</span>
            </div>
          </div>

          {/* Col 2: Restaurant Info */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-100 text-xs uppercase tracking-wider">
              Lokasi & Jam Buka
            </h4>
            <div className="space-y-2 text-stone-400 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}, {RESTAURANT_INFO.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Buka Setiap Hari: {RESTAURANT_INFO.openHours}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-100 text-xs uppercase tracking-wider">
              Akses Sistem
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('customer');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Menu Pelanggan
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('kitchen');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Layar Dapur (KDS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Admin Kasir & Stok
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('owner');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Analitik Penjualan Pemilik
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.instagram}</span>
            </a>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{RESTAURANT_INFO.website}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
