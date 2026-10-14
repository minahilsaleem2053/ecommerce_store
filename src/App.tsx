import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { AtelierHeritage } from './components/AtelierHeritage';
import { LookbookSection } from './components/LookbookSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { notification } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <AtelierHeritage />
        <LookbookSection />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductModal />
      <SizeGuideModal />
      <CartDrawer />
      <WishlistModal />
      <CheckoutModal />
      <OrderConfirmationModal />

      {/* Ephemeral Feedback Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-950 text-white text-xs py-3 px-4 rounded-lg shadow-xl border border-stone-800 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}
