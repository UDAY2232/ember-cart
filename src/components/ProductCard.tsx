import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-300"
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-deal text-deal-foreground text-[10px] font-bold px-2 py-1 rounded-lg">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          className="absolute top-2 right-2 p-1.5 bg-card/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-card"
        >
          <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-deal text-deal" : "text-muted-foreground"}`} />
        </button>
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-1">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-star text-star" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-xs font-semibold text-success">-{discount}%</span>
            </>
          )}
        </div>

        {/* Stock & Add to cart */}
        <div className="flex items-center justify-between">
          <span className={`text-xs ${product.inStock ? "text-success" : "text-deal"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
