import React, { useMemo } from 'react';
import { Filter, SlidersHorizontal, RefreshCw, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Category } from '../types';

export const ProductGrid: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedFabric,
    setSelectedFabric,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const categories: { label: string; id: Category }[] = [
    { label: 'All Collections', id: 'all' },
    { label: 'Festive Lawn', id: 'festive-lawn' },
    { label: 'Luxury Pret', id: 'luxury-pret' },
    { label: 'Unstitched 3-Piece', id: 'unstitched' },
    { label: 'Wedding Formals', id: 'wedding-formals' },
    { label: 'Velvet Edit', id: 'velvet-edit' },
  ];

  const fabrics = [
    { label: 'All Fabrics', value: 'all' },
    { label: 'Pure Lawn', value: 'Lawn' },
    { label: 'Raw Silk', value: 'Silk' },
    { label: 'Micro Velvet', value: 'Velvet' },
    { label: 'Crinkle Chiffon', value: 'Chiffon' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'all' && !product.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesWork = product.embroideryTechnique.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        return matchesName || matchesSku || matchesFabric || matchesWork || matchesDesc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }, [selectedCategory, selectedFabric, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold block mb-1">
            Handcrafted Masterpieces
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-stone-950">
            {selectedCategory === 'all'
              ? 'Complete Atelier Catalog'
              : categories.find((c) => c.id === selectedCategory)?.label || 'Collection'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Pure fabrics, authentic dabka embroidery, unstitched & ready-to-wear tailored finishes
          </p>
        </div>

        {/* Counter */}
        <div className="text-xs text-stone-500 font-mono tabular-nums">
          Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span> pieces
        </div>
      </div>

      {/* Interactive Controls Bar: Segmented Tabs & Filters */}
      <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-950 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dropdowns: Fabric & Sort */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Fabric filter */}
          <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-xs text-stone-700">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={selectedFabric}
              onChange={(e) => setSelectedFabric(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              {fabrics.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-xs text-stone-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-xs"
            >
              <option value="featured">Featured Edit</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Clear Filters if any applied */}
          {(selectedCategory !== 'all' || selectedFabric !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-stone-500 hover:text-stone-900 underline flex items-center gap-1 px-2 py-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Search pill if searching */}
      {searchQuery && (
        <div className="mt-4 flex items-center gap-2 text-xs text-stone-600 bg-amber-50/80 border border-amber-200/60 p-2.5 rounded-md">
          <span>Search results for: &ldquo;<strong className="text-stone-900">{searchQuery}</strong>&rdquo;</span>
          <button
            onClick={() => setSearchQuery('')}
            className="ml-auto text-stone-400 hover:text-stone-700 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Grid of Products */}
      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-12 py-16 text-center bg-white rounded-xl border border-dashed border-stone-300 p-8">
          <p className="font-serif text-xl font-medium text-stone-800">No articles match your selection</p>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
            Try resetting your fabric or category filters to explore the complete Zehraan festive lawn & couture edit.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 bg-stone-950 text-white text-xs font-medium px-5 py-2.5 rounded-md hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Show All Pieces</span>
          </button>
        </div>
      )}
    </section>
  );
};
