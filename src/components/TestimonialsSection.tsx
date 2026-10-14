import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Fatima Qureshi',
      location: 'Lahore, Pakistan',
      outfit: 'Zahra Gulbano — Emerald Festive Lawn',
      rating: 5,
      review:
        'The precision of the marori tilla on the lawn front is breathtaking. I opted for custom bespoke stitching, and the shirt length and flared trouser fit were tailored to perfection for Eid brunch.',
      verified: true,
    },
    {
      name: 'Zainab Tariq',
      location: 'London, United Kingdom',
      outfit: 'Shehrzad — Scarlet Raw Silk Gharara',
      rating: 5,
      review:
        'Living abroad, finding genuine heavy dabka handwork without plastic sequins is so rare. The DHL parcel reached South Kensington in 4 days. The raw silk fall and gotta work exceeded all expectations.',
      verified: true,
    },
    {
      name: 'Dr. Samina Raza',
      location: 'Karachi, Pakistan',
      outfit: 'Nazneen — Sage & Ivory Chikankari',
      rating: 5,
      review:
        'The sheer lightweight Swiss lawn feels like a breeze in Karachi humidity, yet the delicate pearl cutwork makes it look royal. The organza dupatta finishing with scalloped lace is top-tier atelier work.',
      verified: true,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-100/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-800 block mb-1">
            Client Diaries & Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-950">
            Adored by Discerning Women Worldwide
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Over 14,000 festive suites tailored and shipped across Pakistan, the UK, US, and GCC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-xl border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-600">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300 stroke-1" />
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{t.name}</h4>
                    <span className="text-[11px] text-stone-500">{t.location}</span>
                  </div>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Order</span>
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-amber-900 font-mono mt-1">
                  {t.outfit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
