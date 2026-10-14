import React from 'react';
import { CheckCircle2, PackageCheck, MessageCircle, ArrowRight, Printer, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderConfirmationModal: React.FC = () => {
  const { recentOrder, setRecentOrder, formatPrice } = useShop();

  if (!recentOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Zehraan Atelier! I would like to inquire about my order #${recentOrder.orderId} for ${recentOrder.customer.fullName}.`
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setRecentOrder(null)} />

      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-auto z-10 p-6 sm:p-8 space-y-6">
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs font-semibold text-amber-800 tracking-widest uppercase">
            Shukriya &middot; Order Confirmed
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
            Your Zehraan Pieces Are Being Prepared
          </h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            A confirmation receipt has been generated. Our master tailoring team in Lahore has queued your dispatch.
          </p>
        </div>

        {/* Tracking Details Banner */}
        <div className="bg-[#fcfaf7] border border-stone-200 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-stone-400 text-[10px] uppercase font-mono block">Order Reference</span>
            <span className="font-bold text-stone-900 font-mono text-sm">{recentOrder.orderId}</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase font-mono block">Estimated Courier</span>
            <span className="font-semibold text-stone-900">{recentOrder.estimatedDelivery}</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase font-mono block">Tracking #</span>
            <span className="font-mono text-stone-800">{recentOrder.trackingNumber}</span>
          </div>
          <div>
            <span className="text-stone-400 text-[10px] uppercase font-mono block">Payment Status</span>
            <span className="font-semibold text-amber-800 uppercase text-[11px]">
              {recentOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Paid'}
            </span>
          </div>
        </div>

        {/* Shipping Address Summary */}
        <div className="text-xs space-y-1 bg-stone-50 p-3 rounded border border-stone-200">
          <span className="font-semibold text-stone-900 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-stone-600" />
            <span>Delivery Destination:</span>
          </span>
          <p className="text-stone-700 pl-5">
            {recentOrder.customer.fullName} &middot; {recentOrder.customer.phone}
          </p>
          <p className="text-stone-500 pl-5">
            {recentOrder.customer.address}, {recentOrder.customer.city}, {recentOrder.customer.postalCode}, Pakistan
          </p>
        </div>

        {/* Itemized Snapshot */}
        <div className="space-y-2 border-t border-stone-200 pt-4">
          <h4 className="text-xs font-semibold text-stone-900">Ordered Articles:</h4>
          <div className="divide-y divide-stone-100 max-h-40 overflow-y-auto pr-1">
            {recentOrder.items.map((item, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-stone-900">{item.product.name.split('—')[0]}</span>
                  <span className="text-stone-500 text-[11px] block">
                    {item.stitchingType === 'unstitched'
                      ? 'Unstitched 3-Piece'
                      : `Stitched (${item.selectedSize || 'Bespoke'})`} &middot; Qty: {item.quantity}
                  </span>
                </div>
                <span className="font-mono tabular-nums font-semibold text-stone-950">
                  {formatPrice(item.totalPricePKR)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm font-bold text-stone-950 pt-3 border-t border-stone-200">
            <span>Total Payable Amount</span>
            <span className="font-mono tabular-nums">{formatPrice(recentOrder.totalPKR)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleWhatsAppHelp}
            className="w-full sm:w-1/2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Track via WhatsApp Concierge</span>
          </button>

          <button
            onClick={() => setRecentOrder(null)}
            className="w-full sm:w-1/2 bg-stone-950 hover:bg-stone-800 text-white text-xs font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
