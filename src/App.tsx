/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Navigation } from './components/Navigation';
import { CustomerMenu } from './components/CustomerMenu';
import { KitchenKDS } from './components/KitchenKDS';
import { AdminDashboard } from './components/AdminDashboard';
import { OwnerAnalytics } from './components/OwnerAnalytics';
import { CartCheckoutDrawer } from './components/CartCheckoutDrawer';
import { PaymentModal } from './components/PaymentModal';
import { OrderTrackerReceiptModal } from './components/OrderTrackerReceiptModal';
import { ReviewSocialModal } from './components/ReviewSocialModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { currentView } = useRestaurant();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation */}
      <Navigation />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'customer' && <CustomerMenu />}
        {currentView === 'kitchen' && <KitchenKDS />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'owner' && <OwnerAnalytics />}
      </main>

      {/* Global Interactive Overlays */}
      <CartCheckoutDrawer />
      <PaymentModal />
      <OrderTrackerReceiptModal />
      <ReviewSocialModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <AppContent />
    </RestaurantProvider>
  );
}
