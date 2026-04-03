import HeroCarousel from "@/components/HeroCarousel";
import ProductSection from "@/components/ProductSection";
import { products } from "@/data/products";
import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated support" },
];

const Index = () => {
  const deals = products.filter((p) => p.originalPrice);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const trending = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* Features bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3 animate-fade-in">
              <div className="p-2 rounded-lg bg-accent">
                <f.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <ProductSection title="🔥 Today's Deals" products={deals} viewAllLink="/products?deals=true" />
        <ProductSection title="⭐ Top Rated" products={topRated} />
        <ProductSection title="🔄 Trending Now" products={trending} />
      </div>
    </div>
  );
};

export default Index;
