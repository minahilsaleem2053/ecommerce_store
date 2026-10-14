import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, ChevronDown, Menu } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CurrencyCode, Category } from '../types';

export const Header: React.FC = () => {
  const {
    cartCount,
    cartSubtotalPKR,
    formatPrice,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    currency,
    setCurrency,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const currencies: CurrencyCode[] = ['PKR', 'USD', 'GBP', 'AED', 'CAD', 'SAR'];

  const navLinks: { label: string; category: Category }[] = [
    { label: 'Festive Lawn', category: 'festive-lawn' },
    { label: 'Luxury Pret', category: 'luxury-pret' },
    { label: 'Unstitched', category: 'unstitched' },
    { label: 'Wedding Formals', category: 'wedding-formals' },
    { label: 'Velvet Edit', category: 'velvet-edit' },
  ];

  const handleNavClick = (cat: Category) => {
    setSelectedCategory(cat);
    setIsMobileMenuOpen(false);
    const catalogSection = document.getElementById('catalog-section');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200">
      {/* Promotional Top Bar */}
      {isBannerVisible && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex-1 text-center font-medium tracking-wide">
            <span>Complimentary delivery across Pakistan on orders over ₨ 6,000</span>
            <span className="mx-2 text-stone-500">·</span>
            <span className="hidden sm:inline">Worldwide Express via DHL</span>
            <span className="mx-2 text-stone-500 hidden sm:inline">·</span>
            <span className="text-amber-300 font-medium">Use code EID26 for 10% off</span>
          </div>
          <button
            onClick={() => setIsBannerVisible(false)}
            aria-label="Dismiss announcement"
            className="text-stone-400 hover:text-white transition-colors p-0.5 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in editorial display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-800 hover:text-stone-950 transition-colors cursor-pointer"
            aria-label="Toggle mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex flex-col items-start leading-none shrink-0"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-stone-950 uppercase whitespace-nowrap">
              Zehraan
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-stone-500 font-sans mt-0.5 whitespace-nowrap">
              Couture &middot; Lahore
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 Nav Links (Single line, text with subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-stone-700">
          {navLinks.map((link) => (
            <button
              key={link.category}
              onClick={() => handleNavClick(link.category)}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors relative cursor-pointer ${
                selectedCategory === link.category
                  ? 'text-stone-950 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-stone-950'
                  : 'hover:text-stone-950 hover:underline hover:underline-offset-4 decoration-stone-300'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#craftsmanship"
            className="whitespace-nowrap shrink-0 py-1 hover:text-stone-950 hover:underline hover:underline-offset-4 decoration-stone-300 transition-colors"
          >
            Our Atelier
          </a>
          <a
            href="#lookbook"
            className="whitespace-nowrap shrink-0 py-1 hover:text-stone-950 hover:underline hover:underline-offset-4 decoration-stone-300 transition-colors"
          >
            Lookbook
          </a>
        </nav>

        {/* Zone 3: Primary Action & Controls Area */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-stone-950 px-2 py-1.5 rounded border border-stone-200 hover:border-stone-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>
            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-white border border-stone-200 rounded-lg shadow-lg py-1 z-50">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      currency === c ? 'bg-stone-100 font-semibold text-stone-950' : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-stone-700 hover:text-stone-950 transition-colors relative cursor-pointer"
            aria-label={`Wishlist (${wishlist.length} items)`}
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-semibold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button (1 Primary Action) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-stone-950 hover:bg-stone-800 text-white text-xs font-medium px-3.5 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            aria-label="Open shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums px-1.5 py-0.2 bg-stone-800 rounded text-[11px] font-semibold">
              {cartCount}
            </span>
            {cartCount > 0 && (
              <span className="hidden lg:inline text-stone-300 font-mono tabular-nums text-[11px]">
                {formatPrice(cartSubtotalPKR)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Search Input Bar (Inline expandable) */}
      {isSearchOpen && (
        <div className="bg-white border-b border-stone-200 px-4 py-3 max-w-4xl mx-auto flex items-center gap-3">
          <Search className="w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by article name, lawn, chikankari, raw silk, zardozi, or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm text-stone-900 focus:outline-none placeholder:text-stone-400"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#faf8f5] border-b border-stone-200 px-6 py-4 space-y-3">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-widest pb-1 border-b border-stone-200">
            Collections
          </div>
          {navLinks.map((link) => (
            <button
              key={link.category}
              onClick={() => handleNavClick(link.category)}
              className="block w-full text-left py-1.5 text-sm font-medium text-stone-800 hover:text-stone-950 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#craftsmanship"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-stone-800 hover:text-stone-950"
          >
            The Atelier & Karigars
          </a>
          <a
            href="#lookbook"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-1.5 text-sm font-medium text-stone-800 hover:text-stone-950"
          >
            Festive Lookbook
          </a>
        </div>
      )}
    </div>
  );
};
