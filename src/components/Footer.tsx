import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsSizeGuideOpen } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-white uppercase block">
              Zehraan
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 block -mt-3">
              Haute Couture &middot; Lahore
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Dedicated to the fine preservation of Pakistani heritage needlecraft. Handcrafted festive lawn,
              zardozi formals, and bespoke tailoring designed in Lahore and cherished across the globe.
            </p>
            <div className="space-y-1.5 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Flagship Atelier: 18-C/II, M.M. Alam Road, Gulberg III, Lahore</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>UAN Concierge: +92 42 111-934-722 (Mon–Sat 10am–8pm PKT)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('festive-lawn')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Festive Eid Lawn &rsquo;26
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('luxury-pret')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Ready-to-Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('unstitched')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Unstitched 3-Piece
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('wedding-formals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wedding &amp; Festive Formals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('velvet-edit')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Velvet &amp; Shawl Edit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pakistani Standard Size Guide
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Cash on Delivery (COD) Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Custom Bespoke Tailoring Guide
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Worldwide DHL Express Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  14-Day Exchange &amp; Returns
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Fabric &amp; Dabka Care Manual
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Early Drops */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Private Salon Access
            </h4>
            <p className="text-xs text-stone-400">
              Receive private preview invitations before festive lawn launches and exclusive atelier drop announcements.
            </p>
            {subscribed ? (
              <div className="bg-stone-900 border border-amber-900/60 p-2.5 rounded text-xs text-amber-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are on the VIP Salon guestlist.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-stone-600"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-stone-800 hover:bg-stone-700 text-white rounded text-xs transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
            <div className="pt-2">
              <span className="text-[10px] text-stone-500 block uppercase tracking-wider mb-1">
                Accepted Payment Methods
              </span>
              <p className="text-[11px] text-stone-400 font-mono">
                Cash on Delivery &middot; Visa &middot; Mastercard &middot; JazzCash &middot; EasyPaisa &middot; Raast
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Zehraan Couture Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Terms &amp; Conditions</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-stone-400 cursor-pointer">Privacy Notice</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-stone-400 cursor-pointer">Ethical Artisan Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
