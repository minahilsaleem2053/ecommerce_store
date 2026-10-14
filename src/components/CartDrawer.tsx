import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotalPKR,
    cartTotalPKR,
    discountPKR,
    appliedPromo,
    applyPromo,
    removePromo,
    updateQuantity,
    removeFromCart,
    formatPrice,
    setIsCheckoutOpen,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD_PKR = 6000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_PKR - cartSubtotalPKR);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotalPKR / FREE_SHIPPING_THRESHOLD_PKR) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-950" />
              <h2 className="font-serif text-xl font-bold text-stone-950">
                Your Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator for Pakistan */}
          <div className="bg-[#fcfaf7] px-6 py-3 border-b border-stone-200 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-stone-700 font-medium">
                  Add <span className="font-bold text-amber-800 font-mono tabular-nums">{formatPrice(remainingForFreeShipping)}</span> more for Free Delivery in Pakistan!
                </p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-amber-700 h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>You unlocked Complimentary Nationwide Delivery!</span>
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 stroke-1" />
                <p className="font-serif text-lg font-medium text-stone-800">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs">
                  Discover our festive lawn, unstitched couture suites, and hand-embroidered velvet formals.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-stone-950 text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-stone-100 last:border-0"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-24 object-cover object-top rounded bg-stone-100 shrink-0 border border-stone-200"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-semibold text-stone-900 leading-snug">
                          {item.product.name.split('—')[0]}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          aria-label={`Remove ${item.product.name} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Stitching & Size specification tag */}
                      <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                        <p className="font-medium text-amber-900">
                          {item.stitchingType === 'unstitched'
                            ? 'Unstitched 3-Piece'
                            : item.stitchingType === 'stitched-standard'
                            ? `Stitched Ready (Size ${item.selectedSize})`
                            : `Bespoke Stitching (${item.customMeasurements?.trouserStyle})`}
                        </p>
                        {item.selectedColor && (
                          <p>Color: {item.selectedColor}</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 text-stone-600 hover:text-stone-950 text-xs font-bold cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 text-stone-600 hover:text-stone-950 text-xs font-bold cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono tabular-nums text-sm font-semibold text-stone-950">
                        {formatPrice(item.totalPricePKR)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#fdfbf7] space-y-4">
              {/* Promo Code Input */}
              <div>
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. EID26)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-stone-200 rounded focus:outline-stone-900 uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-stone-800 text-white text-xs px-3 py-2 rounded hover:bg-stone-950 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-3 py-2 rounded text-xs text-amber-900">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>{appliedPromo.code} Applied ({appliedPromo.discountPercent}% Off)</span>
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-stone-500 hover:text-stone-900 underline text-[11px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoFeedback && (
                  <p
                    className={`text-[11px] mt-1 ${
                      promoFeedback.success ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-950">{formatPrice(cartSubtotalPKR)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-amber-800 font-medium">
                    <span>Discount ({appliedPromo.discountPercent}%)</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-stone-500">
                    {cartSubtotalPKR >= FREE_SHIPPING_THRESHOLD_PKR ? 'Free in Pakistan' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums">{formatPrice(cartTotalPKR)}</span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-stone-950 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold py-3.5 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-400">
                Cash on Delivery (COD) & Online Cards accepted across all cities in Pakistan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
