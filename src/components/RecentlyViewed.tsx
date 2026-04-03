import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { products, Product } from "@/data/products";
import ProductCard from "./ProductCard";

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS = 6;

export const trackView = (productId: string) => {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];
  const updated = [productId, ...stored.filter((id) => id !== productId)].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const RecentlyViewed = ({ excludeId }: { excludeId?: string }) => {
  const [viewed, setViewed] = useState<Product[]>([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];
    const filtered = ids.filter((id) => id !== excludeId);
    const items = filtered.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
    setViewed(items);
  }, [excludeId]);

  if (viewed.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h2 className="text-xl font-bold text-foreground">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {viewed.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <ProductCard product={product} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
