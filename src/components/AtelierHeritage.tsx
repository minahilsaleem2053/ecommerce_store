import React from 'react';
import { Sparkles, Feather, HeartHandshake } from 'lucide-react';

export const AtelierHeritage: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-[#141210] text-stone-200 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Craftsmanship Image (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900">
              <img
                src="/src/assets/images/atelier_karigar_craft_1791961783839.jpg"
                alt="Master Pakistani karigar handcrafting zardozi embroidery in Lahore atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-300 flex items-center justify-between">
                <span>The Walled City Atelier &middot; Lahore</span>
                <span className="font-mono text-amber-300">40+ Hours per Ensemble</span>
              </div>
            </div>
          </div>

          {/* Editorial Craft Narrative (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400">
                The Karigar Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white leading-tight">
                Preserving 400 Years of Subcontinental Zardozi & Marori
              </h2>
            </div>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Every Zehraan design begins in our Lahore workshop, where seasoned master artisans —
              some carrying ancestral needlecraft knowledge through three generations — mount hand-spun silk
              onto traditional wooden <em>addas</em>.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Genuine Metallic Tilla & Dabka</h4>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    We exclusively source untarnished coiled wire and hand-cut gota patti to ensure your formals retain their regal lustre for generations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Pure Supima Lawn & 80g Raw Silk</h4>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    Zero synthetic blended synthetics. Breathable high-thread-count lawn suited for summer festivities and plush micro-velvet 9000 for winter soirees.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0 text-amber-400">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Ethical Artisan Empowerment</h4>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                    Fair wages, comfortable ergonomic workshops, and pride in preserving Pakistan&apos;s rich sartorial identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
