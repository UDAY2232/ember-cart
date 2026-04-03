import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, MapPin, Menu, X, Heart, ChevronDown, Package, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

const Navbar = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Main navbar */}
      <div className="bg-header backdrop-blur-md">
        <div className="container flex items-center gap-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-2xl font-bold text-header-foreground hover:opacity-90 transition-opacity">
            Shop<span className="text-primary">Hub</span>
          </Link>

          {/* Location */}
          <button className="hidden lg:flex items-center gap-1 text-header-secondary text-xs hover:text-header-foreground transition-colors">
            <MapPin className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] leading-none">Deliver to</div>
              <div className="font-bold text-sm text-header-foreground leading-tight">Select Location</div>
            </div>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full rounded-xl overflow-hidden ring-2 ring-transparent focus-within:ring-primary/50 transition-all">
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
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-primary px-4 hover:bg-primary/90 transition-colors"
              >
                <Search className="w-5 h-5 text-primary-foreground" />
              </motion.button>
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto">
            <Link to="/wishlist" className="hidden sm:flex items-center gap-1 px-3 py-2 text-header-secondary hover:text-header-foreground transition-colors rounded-lg hover:bg-header-foreground/5">
              <Heart className="w-5 h-5" />
            </Link>

            {/* Profile dropdown */}
            <div ref={profileRef} className="relative hidden sm:block">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1 px-3 py-2 text-header-secondary hover:text-header-foreground transition-colors rounded-lg hover:bg-header-foreground/5"
              >
                <User className="w-5 h-5" />
                <span className="text-xs hidden lg:block">Account</span>
                <ChevronDown className={`w-3 h-3 hidden lg:block transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <Link
                      to="/account"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" /> Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Package className="w-4 h-4 text-muted-foreground" /> Orders
                    </Link>
                    <div className="border-t border-border" />
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm text-deal hover:bg-muted transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/cart" className="relative flex items-center gap-1 px-3 py-2 text-header-secondary hover:text-header-foreground transition-colors rounded-lg hover:bg-header-foreground/5">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
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
          <form onSubmit={handleSearch} className="flex rounded-xl overflow-hidden">
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
      <div className="bg-header/95 backdrop-blur-sm border-t border-header-foreground/10 overflow-x-auto scrollbar-hide">
        <div className="container flex items-center gap-1 py-1">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="relative flex-shrink-0 px-3 py-1.5 text-xs text-header-secondary hover:text-header-foreground transition-colors rounded group"
            >
              {cat}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container py-4 space-y-3">
              <Link to="/account" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                <User className="w-5 h-5" /> Account
              </Link>
              <Link to="/orders" className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted" onClick={() => setMobileMenuOpen(false)}>
                <Package className="w-5 h-5" /> Orders
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
