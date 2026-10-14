import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CreditCard, Banknote, Smartphone, CheckCircle, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PAKISTANI_CITIES } from '../data/products';
import { Order, OrderCustomer } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotalPKR,
    discountPKR,
    cartTotalPKR,
    formatPrice,
    clearCart,
    setRecentOrder,
    currency,
  } = useShop();

  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    postalCode: '54000',
    country: 'Pakistan',
    notes: '',
    paymentMethod: 'cod',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen || cart.length === 0) return null;

  const shippingCostPKR = cartSubtotalPKR >= 6000 ? 0 : 350;
  const grandTotalPKR = cartTotalPKR + shippingCostPKR;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) errors.fullName = 'Full name is required';
    if (!customer.phone.trim()) errors.phone = 'Phone number is required for courier delivery';
    if (!customer.address.trim()) errors.address = 'Street address is required';
    if (!customer.city.trim()) errors.city = 'City is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `ZHR-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const newOrder: Order = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-PK', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [...cart],
        customer: { ...customer },
        subtotalPKR: cartSubtotalPKR,
        discountPKR: discountPKR,
        shippingPKR: shippingCostPKR,
        totalPKR: grandTotalPKR,
        currency: currency,
        status: 'Confirmed',
        trackingNumber: trackingNumber,
        estimatedDelivery: '3–5 Business Days',
      };

      setRecentOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-auto z-10 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1 rounded text-stone-500 hover:text-stone-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="font-serif text-xl font-bold text-stone-950">
              Checkout & Dispatch Order
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Column Form & Summary */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Form Fields (7 cols) */}
          <form onSubmit={handlePlaceOrder} id="checkout-form" className="lg:col-span-7 space-y-6">
            {/* Contact Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>01. Customer Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Malik"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className={`w-full p-2.5 bg-stone-50 border rounded text-xs focus:outline-stone-900 ${
                      formErrors.fullName ? 'border-red-500' : 'border-stone-200'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[10px] text-red-600 mt-0.5">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-medium">WhatsApp / Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567 or +92..."
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className={`w-full p-2.5 bg-stone-50 border rounded text-xs focus:outline-stone-900 ${
                      formErrors.phone ? 'border-red-500' : 'border-stone-200'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[10px] text-red-600 mt-0.5">{formErrors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-600 mb-1 font-medium">Email Address (For invoice & tracking)</label>
                  <input
                    type="email"
                    placeholder="ayesha@example.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded text-xs focus:outline-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address in Pakistan */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                02. Delivery Address
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1 font-medium">Street Address & Landmark *</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Apartment #, Street, Block, Phase or Sector"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className={`w-full p-2.5 bg-stone-50 border rounded text-xs focus:outline-stone-900 ${
                      formErrors.address ? 'border-red-500' : 'border-stone-200'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">City *</label>
                    <select
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded text-xs focus:outline-stone-900 cursor-pointer"
                    >
                      {PAKISTANI_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Postal Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 54000"
                      value={customer.postalCode}
                      onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded text-xs focus:outline-stone-900"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-stone-600 mb-1 font-medium">Country</label>
                    <input
                      type="text"
                      disabled
                      value={customer.country}
                      className="w-full p-2.5 bg-stone-100 border border-stone-200 rounded text-xs text-stone-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">Tailoring / Delivery Notes (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Deliver during daytime, extra cuff border lace attached"
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded text-xs focus:outline-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                03. Payment Method
              </h3>
              <div className="space-y-2">
                {/* Cash on Delivery */}
                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  customer.paymentMethod === 'cod'
                    ? 'border-stone-950 bg-amber-50/40 ring-1 ring-stone-950'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={customer.paymentMethod === 'cod'}
                    onChange={() => setCustomer({ ...customer, paymentMethod: 'cod' })}
                    className="mt-0.5 text-stone-950 focus:ring-stone-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-amber-800" />
                      <span className="text-xs font-semibold text-stone-900">Cash on Delivery (COD)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                        Popular in Pakistan
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Pay with cash directly to the courier upon delivery at your doorstep anywhere in Pakistan.
                    </p>
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  customer.paymentMethod === 'card'
                    ? 'border-stone-950 bg-amber-50/40 ring-1 ring-stone-950'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={customer.paymentMethod === 'card'}
                    onChange={() => setCustomer({ ...customer, paymentMethod: 'card' })}
                    className="mt-0.5 text-stone-950 focus:ring-stone-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-stone-700" />
                      <span className="text-xs font-semibold text-stone-900">Debit / Credit Card</span>
                      <span className="text-[10px] text-stone-500">Visa &middot; Mastercard &middot; UnionPay</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Encrypted 256-bit secure checkout for domestic and international bank cards.
                    </p>
                  </div>
                </label>

                {/* JazzCash / EasyPaisa */}
                <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  customer.paymentMethod === 'jazzcash_easypaisa'
                    ? 'border-stone-950 bg-amber-50/40 ring-1 ring-stone-950'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="jazzcash_easypaisa"
                    checked={customer.paymentMethod === 'jazzcash_easypaisa'}
                    onChange={() => setCustomer({ ...customer, paymentMethod: 'jazzcash_easypaisa' })}
                    className="mt-0.5 text-stone-950 focus:ring-stone-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-stone-700" />
                      <span className="text-xs font-semibold text-stone-900">JazzCash / EasyPaisa / Raast</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Direct mobile wallet payment instructions sent immediately via SMS upon confirmation.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </form>

          {/* Right: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 p-5 rounded-lg border border-stone-200 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-serif text-base font-bold text-stone-950 pb-3 border-b border-stone-200">
                Order Review ({cart.length} items)
              </h3>

              {/* Items preview list */}
              <div className="divide-y divide-stone-200 max-h-56 overflow-y-auto my-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-10 h-12 object-cover rounded bg-stone-200 border border-stone-200"
                      />
                      <div>
                        <p className="font-semibold text-stone-900 line-clamp-1">{item.product.name.split('—')[0]}</p>
                        <p className="text-[10px] text-stone-500">
                          Qty: {item.quantity} &middot; {item.stitchingType === 'unstitched' ? 'Unstitched' : item.selectedSize || 'Bespoke'}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums font-medium text-stone-900">
                      {formatPrice(item.totalPricePKR)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">{formatPrice(cartSubtotalPKR)}</span>
                </div>
                {discountPKR > 0 && (
                  <div className="flex justify-between text-amber-800 font-medium">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Nationwide Express)</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingCostPKR === 0 ? 'Complimentary' : formatPrice(shippingCostPKR)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Total Payable</span>
                  <span className="font-mono tabular-nums">{formatPrice(grandTotalPKR)}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-stone-950 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Dispatching Order...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Order ({formatPrice(grandTotalPKR)})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>Original Karigar Authentic Guarantee &middot; 14-Day Exchanges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
