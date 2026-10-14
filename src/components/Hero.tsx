import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Scissors, Globe } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleExplore = () => {
    setSelectedCategory('festive-lawn');
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#f5f0e8] overflow-hidden border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text / Editorial Content (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800">
                Festive Eid Edition '26
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-950 font-medium leading-[1.15] text-balance">
                Shahr-e-Gul: The Lahore Heritage Collection
              </h1>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Echoing the timeless grandeur of Mughal courtyards, our Eid collection weaves masterfully
              hand-embroidered marori tilla, delicate dabka, and gossamer organza dupattas onto pure Supima lawn
              and raw silks.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="inline-flex items-center gap-2 bg-stone-950 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-md transition-colors cursor-pointer shadow-sm group"
              >
                <span>Shop Festive Lawn</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#craftsmanship"
                className="inline-flex items-center gap-2 text-stone-800 hover:text-stone-950 text-xs sm:text-sm font-medium px-4 py-3 border border-stone-300 hover:border-stone-500 rounded-md transition-colors"
              >
                <span>The Karigar Story</span>
              </a>
            </div>

            {/* Quick Atelier Specs Strip */}
            <div className="pt-4 border-t border-stone-300/60 grid grid-cols-2 gap-4 text-xs text-stone-600">
              <div>
                <span className="font-semibold text-stone-900 block">Unstitched 3-Piece</span>
                <span className="text-stone-500 text-[11px]">With authentic patches & lace</span>
              </div>
              <div>
                <span className="font-semibold text-stone-900 block">Bespoke Stitching</span>
                <span className="text-stone-500 text-[11px]">Custom measurements & lining</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-stone-200 border border-stone-200">
              <img
                src="/src/assets/images/hero_festive_lawn_1791961781777.jpg"
                alt="Zehraan Couture Festive Lawn Collection in Mughal Lahore"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[11px] tracking-widest uppercase font-mono text-amber-200 block">
                    Article 01 &middot; Zahra Gulbano
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-medium">
                    Emerald Royale & Antique Tilla
                  </span>
                </div>
                <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded text-white font-mono tabular-nums">
                  Pure Supima Lawn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="bg-stone-100 border-t border-stone-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-stone-700">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-stone-900 leading-tight">100% Pure Fabric</p>
              <p className="text-[11px] text-stone-500">Supima Lawn, 80g Silk & Micro Velvet</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-stone-900 leading-tight">Master Atelier Tailoring</p>
              <p className="text-[11px] text-stone-500">Custom lengths, shalwar & gharara cuts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-stone-900 leading-tight">Nationwide & Global Dispatch</p>
              <p className="text-[11px] text-stone-500">COD in Pakistan & DHL Express abroad</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-stone-900 leading-tight">Artisanal Craftsmanship</p>
              <p className="text-[11px] text-stone-500">Handcrafted zardozi by Lahore karigars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
