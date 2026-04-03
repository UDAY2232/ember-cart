import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const dealsOnly = searchParams.get("deals") === "true";

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = products;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (dealsOnly) result = result.filter((p) => p.originalPrice);
    if (inStockOnly) result = result.filter((p) => p.inStock);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    result = result.filter((p) => p.rating >= minRating);

    switch (sortBy) {
      case "price-low": return [...result].sort((a, b) => a.price - b.price);
      case "price-high": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => b.rating - a.rating);
      case "reviews": return [...result].sort((a, b) => b.reviewCount - a.reviewCount);
      default: return result;
    }
  }, [searchQuery, selectedCategory, dealsOnly, priceRange, minRating, inStockOnly, sortBy]);

  const Filters = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-2">Category</h3>
        <div className="space-y-1">
          <button onClick={() => setSelectedCategory("")} className={`block text-sm w-full text-left px-2 py-1 rounded ${!selectedCategory ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>All Categories</button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`block text-sm w-full text-left px-2 py-1 rounded ${selectedCategory === cat ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-20 px-2 py-1 text-sm border border-border rounded bg-card text-foreground" placeholder="Min" />
          <span className="text-muted-foreground">—</span>
          <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-20 px-2 py-1 text-sm border border-border rounded bg-card text-foreground" placeholder="Max" />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-2">Min Rating</h3>
        {[4, 3, 2, 1].map((r) => (
          <button key={r} onClick={() => setMinRating(r)} className={`block text-sm w-full text-left px-2 py-1 rounded ${minRating === r ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {"★".repeat(r)}{"☆".repeat(5 - r)} & Up
          </button>
        ))}
        {minRating > 0 && <button onClick={() => setMinRating(0)} className="text-xs text-primary mt-1">Clear</button>}
      </div>

      {/* In Stock */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="rounded border-border" />
        <span className="text-sm text-foreground">In Stock Only</span>
      </label>
    </div>
  );

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory || "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden flex items-center gap-1 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground">
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Avg. Rating</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop filters */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-32 bg-card border border-border rounded-lg p-4">
            <Filters />
          </div>
        </aside>

        {/* Mobile filters */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-foreground/50" onClick={() => setFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-card p-6 overflow-y-auto animate-slide-in-right">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <Filters />
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
