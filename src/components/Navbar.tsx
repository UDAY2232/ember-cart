import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, MapPin, Menu, X, ChevronDown, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

const Navbar = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main navbar */}
      <div className="bg-header">
        <div className="container flex items-center gap-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-2xl font-bold text-header-foreground hover:opacity-90 transition-opacity">
            Shop<span className="text-primary">Hub</span>
          </Link>

          {/* Location - hidden on mobile */}
          <button className="hidden lg:flex items-center gap-1 text-header-secondary text-xs hover:text-header-foreground transition-colors">
            <MapPin className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] leading-none">Deliver to</div>
              <div className="font-bold text-sm text-header-foreground leading-tight">Select Location</div>
            </div>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full rounded-lg overflow-hidden hover-glow">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-secondary text-secondary-foreground text-xs px-3 border-r border-border focus:outline-none"
              >
                <option>All</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, and more..."
                className="flex-1 px-4 py-2.5 text-sm bg-card text-foreground focus:outline-none"
              />
              <button type="submit" className="bg-primary px-4 hover:bg-primary/90 transition-colors">
                <Search className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto">
            <Link to="/wishlist" className="hidden sm:flex items-center gap-1 px-3 py-2 text-header-secondary hover:text-header-foreground transition-colors rounded-lg hover:bg-header-foreground/5">
              <Heart className="w-5 h-5" />
            </Link>

            <Link to="/account" className="hidden sm:flex items-center gap-1 px-3 py-2 text-header-secondary hover:text-header-foreground transition-colors rounded-lg hover:bg-header-foreground/5">
              <User className="w-5 h-5" />
              <span className="text-xs hidden lg:block">Account</span>
            </Link>

            <Link to="/cart" className="relative flex items-center gap-1 px-3 py-2 text-header-secondary hover:text-header-foreground transition-colors rounded-lg hover:bg-header-foreground/5">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
              <span className="text-xs hidden lg:block">Cart</span>
            </Link>

            <button
              className="md:hidden p-2 text-header-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-2">
          <form onSubmit={handleSearch} className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2.5 text-sm bg-card text-foreground focus:outline-none"
            />
            <button type="submit" className="bg-primary px-4">
              <Search className="w-5 h-5 text-primary-foreground" />
            </button>
          </form>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-header/95 border-t border-header-foreground/10 overflow-x-auto scrollbar-hide">
        <div className="container flex items-center gap-1 py-1">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="flex-shrink-0 px-3 py-1.5 text-xs text-header-secondary hover:text-header-foreground transition-colors rounded hover:bg-header-foreground/5"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <div className="container py-4 space-y-3">
            <Link to="/account" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              <User className="w-5 h-5" /> Account
            </Link>
            <Link to="/wishlist" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
              <Heart className="w-5 h-5" /> Wishlist
            </Link>
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground px-2 mb-2">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/products?category=${encodeURIComponent(cat)}`}
                  className="block p-2 text-sm rounded-lg hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
