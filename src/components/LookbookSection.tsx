import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const LookbookSection: React.FC = () => {
  const { setSelectedProduct, setSelectedCategory } = useShop();

  const looks = [
    {
      title: 'The Mughal Emerald Lawn',
      subtitle: 'Festive Eid Dawn to Dusk',
      image: '/src/assets/images/hero_festive_lawn_1791961781777.jpg',
      product: PRODUCTS[0],
      tag: 'Festive Lawn',
    },
    {
      title: 'The Scarlet Gharara Poise',
      subtitle: 'Heirloom Shehrzad Couture',
      image: '/src/assets/images/product_scarlet_rawsilk_1791961782324.jpg',
      product: PRODUCTS[1],
      tag: 'Wedding Formals',
    },
    {
      title: 'Ivory Shadow Chikankari',
      subtitle: 'Understated Summer Elegance',
      image: '/src/assets/images/product_ivory_chikankari_1791961782739.jpg',
      product: PRODUCTS[2],
      tag: 'Unstitched Luxury',
    },
  ];

  return (
    <section id="lookbook" className="py-16 sm:py-20 bg-[#faf8f5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
              Editorial Inspiration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-950">
              The Festive Lookbook
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mt-2 md:mt-0">
            Draping guides, silhouettes, and jewelry pairings curated by Zehraan stylists for Eid and wedding ceremonies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {looks.map((look, i) => (
            <div
              key={i}
              onClick={() => {
                if (look.product) setSelectedProduct(look.product);
              }}
              className="group relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={look.image}
                  alt={look.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300 mb-1">
                  {look.tag}
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold leading-tight">{look.title}</h3>
                    <p className="text-xs text-stone-300 mt-0.5">{look.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-stone-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
