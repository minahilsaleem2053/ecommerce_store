import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const sizeChart = [
    { size: 'XS', chest: 34, waist: 28, hip: 38, shoulder: 13.5, length: 41, sleeve: 20.5, trouser: 37 },
    { size: 'S', chest: 36, waist: 30, hip: 40, shoulder: 14.0, length: 42, sleeve: 21.0, trouser: 38 },
    { size: 'M', chest: 39, waist: 33, hip: 43, shoulder: 14.5, length: 43, sleeve: 21.5, trouser: 38 },
    { size: 'L', chest: 42, waist: 36, hip: 46, shoulder: 15.0, length: 44, sleeve: 22.0, trouser: 39 },
    { size: 'XL', chest: 45, waist: 39, hip: 49, shoulder: 15.5, length: 45, sleeve: 22.5, trouser: 39 },
  ];

  const convert = (valInches: number) => {
    if (unit === 'inches') return valInches.toFixed(1);
    return (valInches * 2.54).toFixed(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={() => setIsSizeGuideOpen(false)} />
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 p-6 overflow-y-auto max-h-[90vh] z-10 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Standard Pakistani Size Chart
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 rounded text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-stone-500">
            Garment measurements when laid flat. For loose relaxed fit, allow +1 inch ease.
          </p>
          <div className="flex items-center bg-stone-100 p-1 rounded-md text-xs font-medium">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                unit === 'inches' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-500'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                unit === 'cm' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-500'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto border border-stone-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50 text-stone-700 font-semibold uppercase tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Bust / Chest</th>
                <th className="py-2.5 px-3">Waist</th>
                <th className="py-2.5 px-3">Hips</th>
                <th className="py-2.5 px-3">Shoulder</th>
                <th className="py-2.5 px-3">Shirt Length</th>
                <th className="py-2.5 px-3">Sleeve</th>
                <th className="py-2.5 px-3">Trouser</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {sizeChart.map((row) => (
                <tr key={row.size} className="hover:bg-amber-50/30">
                  <td className="py-2.5 px-3 font-bold text-stone-950">{row.size}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{convert(row.chest)}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{convert(row.waist)}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{convert(row.hip)}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{convert(row.shoulder)}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{convert(row.length)}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{convert(row.sleeve)}</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{convert(row.trouser)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Guide Advice */}
        <div className="bg-stone-50 p-4 rounded-lg text-xs space-y-2 border border-stone-200">
          <span className="font-semibold text-stone-900 block">How to Measure Your Best-Fitting Kurta:</span>
          <p className="text-stone-600">
            <strong>Bust / Chest:</strong> Measure across the garment 1 inch below the armhole seam, then double the figure.
          </p>
          <p className="text-stone-600">
            <strong>Shirt Length:</strong> Measure from high-point shoulder down to the daman scalloped lace border.
          </p>
          <p className="text-stone-600">
            <strong>Bespoke Stitching:</strong> Need special calf allowance or floor-length gharara flare? Choose &ldquo;Bespoke Fit&rdquo; on the product screen.
          </p>
        </div>
      </div>
    </div>
  );
};
