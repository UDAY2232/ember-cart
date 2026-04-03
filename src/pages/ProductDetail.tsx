import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, reviews } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, Heart, Truck, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import LearnBeforeYouBuy from "@/components/LearnBeforeYouBuy";
import RecentlyViewed from "@/components/RecentlyViewed";
import { trackView } from "@/components/RecentlyViewed";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "usage" | "projects">("description");

  useEffect(() => {
    if (id) trackView(id);
  }, [id]);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/products" className="text-primary mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const tabs = [
    { id: "description" as const, label: "Description" },
    { id: "usage" as const, label: "Usage" },
    { id: "projects" as const, label: "Projects" },
  ];

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/products?category=${product.category}`} className="hover:text-foreground">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-3 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 cursor-zoom-in"
              />
            </AnimatePresence>
            {product.badge && (
              <span className="absolute top-3 left-3 bg-deal text-deal-foreground text-xs font-bold px-3 py-1 rounded-lg">{product.badge}</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-star text-star" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-sm text-primary">{product.reviewCount.toLocaleString()} ratings</span>
          </div>

          {/* Price */}
          <div className="border-t border-b border-border py-3 mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-sm font-semibold text-success">Save {discount}%</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
          </div>

          {/* Tabs: Description / Usage / Projects */}
          <div className="flex gap-1 mb-4 bg-muted p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="product-tab-bg"
                    className="absolute inset-0 bg-card rounded-lg shadow-sm"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="mb-4"
            >
              {activeTab === "description" && (
                <p className="text-sm text-muted-foreground">{product.description}</p>
              )}
              {activeTab === "usage" && (
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">This product is commonly used in:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Professional audio production and mixing</li>
                    <li>Everyday commuting and travel</li>
                    <li>Gaming and virtual meetings</li>
                    <li>Fitness and outdoor activities</li>
                  </ul>
                </div>
              )}
              {activeTab === "projects" && (
                <div className="text-sm text-muted-foreground">
                  <p>Explore creative projects you can build with this product. Check the "Learn Before You Buy" section below for detailed tutorials and code.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Features */}
          {product.features && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-foreground mb-2">Key Features</h3>
              <ul className="grid grid-cols-2 gap-1">
                {product.features.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Availability */}
          <p className={`text-sm font-semibold mb-4 ${product.inStock ? "text-success" : "text-deal"}`}>
            {product.inStock ? "In Stock" : "Currently Unavailable"}
          </p>

          {/* Quantity + Add to cart */}
          {product.inStock && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-border rounded-xl">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-muted transition-colors rounded-l-xl"><Minus className="w-4 h-4" /></button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted transition-colors rounded-r-xl"><Plus className="w-4 h-4" /></button>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => addToCart(product, quantity)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setWishlisted(!wishlisted)}
                className={`p-3 rounded-xl border transition-colors ${wishlisted ? "bg-deal/10 border-deal text-deal" : "border-border hover:bg-muted"}`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
              </motion.button>
            </div>
          )}

          {/* Delivery info */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Truck className="w-4 h-4 text-success" /> Free delivery on orders over $50</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Shield className="w-4 h-4 text-primary" /> 1 Year Warranty</div>
          </div>
        </div>
      </motion.div>

      {/* Learn Before You Buy */}
      <LearnBeforeYouBuy productId={product.id} />

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{review.userName[0]}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{review.userName}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-star text-star" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
              <p className="text-xs text-muted-foreground mt-2">{review.helpful} people found this helpful</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed excludeId={product.id} />

      {/* Similar products */}
      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {similar.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
