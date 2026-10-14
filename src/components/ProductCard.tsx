import React, { useState } from 'react';
import { Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, isInWishlist, toggleWishlist, setSelectedProduct } = useShop();
  const [imageError, setImageError] = useState(false);
  const isFavorite = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white rounded-lg border border-stone-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Product Image Frame (3:4 ratio for South Asian fashion attire) */}
      <div className="relative aspect-[3/4] w-full bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500 p-4 text-center">
            <Sparkles className="w-8 h-8 text-amber-700/60 mb-2" />
            <span className="text-xs font-serif">{product.name}</span>
          </div>
        )}

        {/* Subtle Badge (Quiet text badge, not garish pill) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 rounded">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorite ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-red-600 transition-colors shadow-sm cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full bg-stone-950/95 hover:bg-stone-900 text-white text-xs font-medium py-2.5 px-3 rounded shadow-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Customize & View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
          <span className="font-medium text-amber-900/90 uppercase tracking-wider">{product.collection}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{product.pieces.split('(')[0].trim()}</span>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => setSelectedProduct(product)}
          className="font-serif text-base font-semibold text-stone-900 hover:text-amber-900 transition-colors line-clamp-1 cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Fabric & Technique snippet */}
        <p className="text-xs text-stone-500 line-clamp-1">
          {product.fabric} &middot; {product.embroideryTechnique.split(',')[0]}
        </p>

        {/* Price & Stitching Option baseline */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono tabular-nums text-sm font-semibold text-stone-950">
              {formatPrice(product.pricePKR)}
            </span>
            {product.originalPricePKR && (
              <span className="font-mono tabular-nums text-xs text-stone-400 line-through">
                {formatPrice(product.originalPricePKR)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-stone-500">
            Unstitched / Stitched
          </span>
        </div>
      </div>
    </div>
  );
};
