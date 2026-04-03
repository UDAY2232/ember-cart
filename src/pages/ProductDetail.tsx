import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products, reviews } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Star, ShoppingCart, Heart, Truck, Shield, ChevronRight, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

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

      <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3 group">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 cursor-zoom-in"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-deal text-deal-foreground text-xs font-bold px-3 py-1 rounded">{product.badge}</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
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

          <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

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
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-muted transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={() => addToCart(product, quantity)} className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button onClick={() => setWishlisted(!wishlisted)} className={`p-3 rounded-lg border transition-colors ${wishlisted ? "bg-deal/10 border-deal text-deal" : "border-border hover:bg-muted"}`}>
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          )}

          {/* Delivery info */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Truck className="w-4 h-4 text-success" /> Free delivery on orders over $50</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Shield className="w-4 h-4 text-primary" /> 1 Year Warranty</div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-foreground mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-card border border-border rounded-lg p-4 animate-fade-in-up">
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
            </div>
          ))}
        </div>
      </section>

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
