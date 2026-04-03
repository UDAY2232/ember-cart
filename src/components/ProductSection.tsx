import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const ProductSection = ({ title, products, viewAllLink = "/products" }: ProductSectionProps) => {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <Link to={viewAllLink} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
