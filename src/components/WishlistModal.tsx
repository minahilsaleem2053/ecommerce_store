import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistModal: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    formatPrice,
    setSelectedProduct,
    addToCart,
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-red-600" />
              <h2 className="font-serif text-xl font-bold text-stone-950">
                Your Saved Pieces ({savedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <Heart className="w-12 h-12 text-stone-300 stroke-1" />
                <p className="font-serif text-lg font-medium text-stone-800">Your wishlist is empty</p>
                <p className="text-xs text-stone-500 max-w-xs">
                  Save pieces from our festive collections to revisit or customize later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 bg-stone-950 text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 pb-4 border-b border-stone-100 last:border-0 items-center justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover rounded bg-stone-100 shrink-0 border border-stone-200"
                  />

                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1">
                      {product.name.split('—')[0]}
                    </h4>
                    <p className="text-xs font-mono tabular-nums font-medium text-stone-800 mt-0.5">
                      {formatPrice(product.pricePKR)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setSelectedProduct(product);
                        }}
                        className="text-[11px] font-medium text-amber-800 hover:text-amber-950 underline cursor-pointer"
                      >
                        Customize & Stitch
                      </button>
                      <span className="text-stone-300">&middot;</span>
                      <button
                        onClick={() => {
                          addToCart(product, 'unstitched');
                          toggleWishlist(product.id);
                        }}
                        className="text-[11px] font-medium text-stone-900 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
