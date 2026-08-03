import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { Filter, ArrowUpDown } from "lucide-react";
export const ProductGrid = ({
  products,
  selectedCategory,
  searchQuery,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  wishlistIds,
  cartIds,
  onResetFilters
}) => {
  const [activeSubTab, setActiveSubTab] = useState("ALL");
  const [sortBy, setSortBy] = useState("POPULAR");
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== "ALL" && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchBrand = p.brand.toLowerCase().includes(query);
        const matchCat = p.category.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCat) return false;
      }
      if (activeSubTab === "FEATURED" && !p.isHot) return false;
      if (activeSubTab === "DISCOUNTS" && !p.discountPercent) return false;
      if (activeSubTab === "BEST_SELLERS" && p.rating < 4.8) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "PRICE_LOW") return a.price - b.price;
      if (sortBy === "PRICE_HIGH") return b.price - a.price;
      if (sortBy === "RATING") return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, activeSubTab, sortBy]);
  return <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      
      {
    /* Top Filter Bar */
  }
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        
        {
    /* Title & Active Category */
  }
        <div>
          <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>{selectedCategory === "ALL" ? "Featured Products" : selectedCategory}</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
              {filteredProducts.length} Items
            </span>
          </h3>
          {searchQuery && <p className="text-xs text-gray-500 mt-1">
              Showing search results for &quot;<span className="font-bold text-gray-800">{searchQuery}</span>&quot;
            </p>}
        </div>

        {
    /* Filter Controls & Sort */
  }
        <div className="flex flex-wrap items-center gap-3">
          
          {
    /* Subtabs */
  }
          <div className="bg-gray-100 p-1 rounded-lg flex items-center text-xs font-bold text-gray-600">
            <button
    onClick={() => setActiveSubTab("ALL")}
    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeSubTab === "ALL" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"}`}
  >
              All
            </button>
            <button
    onClick={() => setActiveSubTab("FEATURED")}
    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeSubTab === "FEATURED" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"}`}
  >
              Featured
            </button>
            <button
    onClick={() => setActiveSubTab("DISCOUNTS")}
    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${activeSubTab === "DISCOUNTS" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"}`}
  >
              Discounts (-30%)
            </button>
          </div>

          {
    /* Sort Dropdown */
  }
          <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-semibold shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="bg-transparent focus:outline-hidden cursor-pointer"
  >
              <option value="POPULAR">Sort: Popularity</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
              <option value="RATING">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {
    /* Product Cards Grid */
  }
      {filteredProducts.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => <ProductCard
    key={product.id}
    product={product}
    onAddToCart={onAddToCart}
    onAddToWishlist={onAddToWishlist}
    onQuickView={onQuickView}
    isWishlisted={wishlistIds.includes(product.id)}
    isInCart={cartIds.includes(product.id)}
  />)}
        </div> : <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h4 className="text-base font-bold text-gray-800">No products found</h4>
          <p className="text-xs text-gray-500 mt-1 mb-4">
            Try adjusting your search criteria or clear your category selection.
          </p>
          <button
    onClick={onResetFilters}
    className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-2 rounded-md transition-colors cursor-pointer"
  >
            Clear All Filters
          </button>
        </div>}

    </section>;
};
