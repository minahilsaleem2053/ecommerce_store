import React, { useState } from 'react';
import { X, Check, Ruler, Truck, ShieldCheck, Heart, Sparkles, Scissors, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StitchingType, StandardSize, TrouserStyle, CustomMeasurements } from '../types';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsSizeGuideOpen,
  } = useShop();

  if (!selectedProduct) return null;

  const [stitchingType, setStitchingType] = useState<StitchingType>('unstitched');
  const [selectedSize, setSelectedSize] = useState<StandardSize>('M');
  const [selectedColor, setSelectedColor] = useState<string>(selectedProduct.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);

  // Custom measurements state
  const [customMeasurements, setCustomMeasurements] = useState<CustomMeasurements>({
    shirtLength: 42,
    bust: 38,
    waist: 32,
    hips: 41,
    shoulder: 14.5,
    sleeveLength: 21,
    armhole: 8.5,
    trouserLength: 38,
    trouserStyle: 'Straight Pant',
    specialInstructions: '',
  });

  const trouserStyles: TrouserStyle[] = [
    'Straight Pant',
    'Flared Gharara',
    'Classic Shalwar',
    'Tulip Shalwar',
    'Culottes',
  ];

  const standardSizes: StandardSize[] = ['XS', 'S', 'M', 'L', 'XL'];

  const stitchingAddOn = stitchingType === 'unstitched' ? 0 : selectedProduct.stitchingPricePKR;
  const currentItemPricePKR = selectedProduct.pricePKR + stitchingAddOn;
  const isFavorite = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(
      selectedProduct,
      stitchingType,
      stitchingType === 'stitched-standard' ? selectedSize : undefined,
      stitchingType === 'stitched-custom' ? customMeasurements : undefined,
      selectedColor,
      quantity
    );
    setSelectedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs">
      {/* Background backdrop click */}
      <div className="fixed inset-0" onClick={() => setSelectedProduct(null)} />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden my-auto z-10 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-950 transition-colors shadow-xs cursor-pointer"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Gallery / High-Res View (5 cols) */}
        <div className="md:w-1/2 bg-stone-100 relative min-h-[360px] md:min-h-full">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] bg-stone-950/80 backdrop-blur-md text-white font-mono px-2.5 py-1 rounded">
              SKU: {selectedProduct.sku}
            </span>
            <span className="text-[11px] bg-white/90 text-stone-900 font-medium px-2.5 py-1 rounded shadow-xs">
              {selectedProduct.pieces}
            </span>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (7 cols) */}
        <div className="md:w-1/2 p-6 overflow-y-auto max-h-[92vh] space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span className="font-semibold text-amber-800 uppercase tracking-widest">
                {selectedProduct.collection}
              </span>
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="flex items-center gap-1 text-stone-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            <h2 className="font-serif text-2xl font-bold text-stone-950 leading-tight">
              {selectedProduct.name}
            </h2>

            {/* Price display with stitching breakdown */}
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-mono tabular-nums text-2xl font-bold text-stone-950">
                {formatPrice(currentItemPricePKR)}
              </span>
              {selectedProduct.originalPricePKR && (
                <span className="font-mono tabular-nums text-sm text-stone-400 line-through">
                  {formatPrice(selectedProduct.originalPricePKR + stitchingAddOn)}
                </span>
              )}
              {stitchingType !== 'unstitched' && (
                <span className="text-xs text-amber-800 font-medium">
                  (Includes {formatPrice(selectedProduct.stitchingPricePKR)} Tailoring)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Color Selection */}
          {selectedProduct.colors.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-stone-900 block mb-2">
                Colorway: <span className="font-normal text-stone-600">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2">
                {selectedProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                      selectedColor === c.name
                        ? 'border-stone-950 scale-110 shadow-sm ring-2 ring-stone-300'
                        : 'border-white hover:scale-105'
                    }`}
                    title={c.name}
                    aria-label={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className={`w-3.5 h-3.5 mx-auto ${c.hex === '#fdfbf7' || c.hex === '#6ee7b7' ? 'text-stone-900' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stitching Selection (Pakistani Fashion Standard) */}
          <div className="border border-stone-200 rounded-lg p-3.5 bg-stone-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-amber-800" />
                <span>Stitching & Finish Choice</span>
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-amber-800 hover:text-amber-950 underline flex items-center gap-1 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Chart</span>
              </button>
            </div>

            {/* Radio / Segmented options */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setStitchingType('unstitched')}
                className={`py-2 px-2 text-center rounded border text-xs transition-colors cursor-pointer ${
                  stitchingType === 'unstitched'
                    ? 'border-stone-950 bg-white font-semibold text-stone-950 shadow-xs'
                    : 'border-stone-200 bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span className="block font-medium">Unstitched</span>
                <span className="text-[10px] text-stone-500">Fabric Only</span>
              </button>

              <button
                onClick={() => setStitchingType('stitched-standard')}
                className={`py-2 px-2 text-center rounded border text-xs transition-colors cursor-pointer ${
                  stitchingType === 'stitched-standard'
                    ? 'border-stone-950 bg-white font-semibold text-stone-950 shadow-xs'
                    : 'border-stone-200 bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span className="block font-medium">Standard Ready</span>
                <span className="text-[10px] text-stone-500">+{formatPrice(selectedProduct.stitchingPricePKR)}</span>
              </button>

              <button
                onClick={() => setStitchingType('stitched-custom')}
                className={`py-2 px-2 text-center rounded border text-xs transition-colors cursor-pointer ${
                  stitchingType === 'stitched-custom'
                    ? 'border-stone-950 bg-white font-semibold text-stone-950 shadow-xs'
                    : 'border-stone-200 bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span className="block font-medium">Bespoke Fit</span>
                <span className="text-[10px] text-stone-500">Custom Cut</span>
              </button>
            </div>

            {/* Standard Size Selector */}
            {stitchingType === 'stitched-standard' && (
              <div className="pt-2">
                <span className="text-xs font-medium text-stone-700 block mb-1.5">Select Ready Size:</span>
                <div className="flex items-center gap-2">
                  {standardSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        selectedSize === size
                          ? 'bg-stone-950 text-white'
                          : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 mt-2">
                  Stitched ready-to-wear includes full inner slip lining, thread-work finishing, and matching trouser cut.
                </p>
              </div>
            )}

            {/* Custom Measurements Form */}
            {stitchingType === 'stitched-custom' && (
              <div className="pt-2 space-y-3 border-t border-stone-200">
                <p className="text-[11px] text-stone-600">
                  Provide your exact measurements in inches. Our Lahore master karigars will cut and sew accordingly.
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-stone-500 uppercase block">Length (&quot;)</label>
                    <input
                      type="number"
                      value={customMeasurements.shirtLength}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, shirtLength: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-200 rounded p-1.5 text-center font-mono text-xs focus:outline-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 uppercase block">Bust / Chest (&quot;)</label>
                    <input
                      type="number"
                      value={customMeasurements.bust}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, bust: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-200 rounded p-1.5 text-center font-mono text-xs focus:outline-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 uppercase block">Waist (&quot;)</label>
                    <input
                      type="number"
                      value={customMeasurements.waist}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, waist: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-200 rounded p-1.5 text-center font-mono text-xs focus:outline-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 uppercase block">Hips (&quot;)</label>
                    <input
                      type="number"
                      value={customMeasurements.hips}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, hips: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-200 rounded p-1.5 text-center font-mono text-xs focus:outline-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 uppercase block">Shoulder (&quot;)</label>
                    <input
                      type="number"
                      value={customMeasurements.shoulder}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, shoulder: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-200 rounded p-1.5 text-center font-mono text-xs focus:outline-stone-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 uppercase block">Sleeve (&quot;)</label>
                    <input
                      type="number"
                      value={customMeasurements.sleeveLength}
                      onChange={(e) => setCustomMeasurements({ ...customMeasurements, sleeveLength: Number(e.target.value) })}
                      className="w-full bg-white border border-stone-200 rounded p-1.5 text-center font-mono text-xs focus:outline-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-stone-500 uppercase block mb-1">Trouser Style Preference</label>
                  <select
                    value={customMeasurements.trouserStyle}
                    onChange={(e) => setCustomMeasurements({ ...customMeasurements, trouserStyle: e.target.value as TrouserStyle })}
                    className="w-full bg-white border border-stone-200 rounded p-1.5 text-xs focus:outline-stone-900 cursor-pointer"
                  >
                    {trouserStyles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Inclusions Box */}
          <div className="border-t border-stone-200 pt-4">
            <h4 className="text-xs font-semibold text-stone-900 mb-2">Package Inclusions (3-Piece):</h4>
            <ul className="text-xs text-stone-600 space-y-1">
              {selectedProduct.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery & Dispatch Note */}
          <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-100 p-2.5 rounded">
            <Truck className="w-4 h-4 text-stone-700 shrink-0" />
            <span>
              {stitchingType === 'unstitched'
                ? 'Dispatches in 24-48 hours. Express delivery across Pakistan.'
                : 'Custom stitching takes 7-10 business days prior to dispatch.'}
            </span>
          </div>

          {/* Action Row: Quantity + Primary CTA */}
          <div className="flex items-center gap-3 pt-2">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-10 text-stone-600 hover:text-stone-900 transition-colors text-sm font-semibold cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-mono font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-10 text-stone-600 hover:text-stone-900 transition-colors text-sm font-semibold cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add To Bag Primary CTA */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-stone-950 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm py-3 px-6 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Add to Bag</span>
              <span aria-hidden="true">&middot;</span>
              <span className="font-mono tabular-nums">{formatPrice(currentItemPricePKR * quantity)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
