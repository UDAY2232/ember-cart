export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: string;
  features?: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Sports",
  "Beauty",
  "Toys",
  "Automotive",
];

export const products: Product[] = [
  {
    id: "1",
    title: "Wireless Noise-Cancelling Headphones Pro",
    description: "Premium over-ear headphones with active noise cancellation, 40-hour battery life, and Hi-Res Audio. Features adaptive sound control, multipoint connection, and ultra-comfortable ear pads for all-day wear.",
    price: 249.99,
    originalPrice: 349.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600",
    ],
    category: "Electronics",
    rating: 4.7,
    reviewCount: 2341,
    inStock: true,
    badge: "Best Seller",
    features: ["Active Noise Cancellation", "40hr Battery", "Hi-Res Audio", "Multipoint Connection"],
  },
  {
    id: "2",
    title: "Smart Watch Ultra Series 5",
    description: "Advanced smartwatch with always-on display, health monitoring, GPS, and 7-day battery life. Water resistant to 100m with titanium case.",
    price: 399.99,
    originalPrice: 499.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600",
    ],
    category: "Electronics",
    rating: 4.5,
    reviewCount: 1892,
    inStock: true,
    badge: "Deal of the Day",
    features: ["Always-On Display", "Health Monitoring", "GPS", "7-Day Battery"],
  },
  {
    id: "3",
    title: "Premium Cotton Crew Neck T-Shirt",
    description: "Ultra-soft premium cotton t-shirt with a modern fit. Pre-shrunk fabric, reinforced seams, and available in 12 colors.",
    price: 29.99,
    originalPrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
    ],
    category: "Fashion",
    rating: 4.3,
    reviewCount: 5621,
    inStock: true,
    features: ["100% Premium Cotton", "Pre-Shrunk", "Modern Fit"],
  },
  {
    id: "4",
    title: "Professional Chef Knife Set - 8 Piece",
    description: "Hand-forged German steel knife set with ergonomic handles. Includes chef's knife, bread knife, utility knife, paring knife, and more.",
    price: 129.99,
    originalPrice: 189.99,
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600",
    ],
    category: "Home & Kitchen",
    rating: 4.8,
    reviewCount: 3456,
    inStock: true,
    badge: "Top Rated",
    features: ["German Steel", "Ergonomic Handles", "8 Pieces", "Lifetime Warranty"],
  },
  {
    id: "5",
    title: "Bestselling Fiction Novel - The Last Horizon",
    description: "A gripping tale of adventure and self-discovery across uncharted territories. New York Times #1 Bestseller for 12 consecutive weeks.",
    price: 14.99,
    originalPrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
    ],
    category: "Books",
    rating: 4.6,
    reviewCount: 8934,
    inStock: true,
    badge: "#1 Best Seller",
  },
  {
    id: "6",
    title: "Yoga Mat Premium - Extra Thick 6mm",
    description: "Eco-friendly TPE yoga mat with alignment lines, non-slip texture, and carrying strap. Perfect for yoga, pilates, and floor exercises.",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
    ],
    category: "Sports",
    rating: 4.4,
    reviewCount: 2156,
    inStock: true,
    features: ["Eco-Friendly TPE", "Non-Slip", "6mm Thick", "Carrying Strap"],
  },
  {
    id: "7",
    title: "Organic Skincare Gift Set",
    description: "Luxurious 5-piece organic skincare set including cleanser, toner, serum, moisturizer, and eye cream. Cruelty-free and dermatologist tested.",
    price: 79.99,
    originalPrice: 119.99,
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600",
    ],
    category: "Beauty",
    rating: 4.6,
    reviewCount: 1567,
    inStock: true,
    badge: "Limited Time Deal",
  },
  {
    id: "8",
    title: "Wireless Bluetooth Speaker - Waterproof",
    description: "Portable Bluetooth speaker with 360° surround sound, 24-hour playtime, and IP67 waterproof rating. Perfect for outdoor adventures.",
    price: 59.99,
    originalPrice: 89.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    ],
    category: "Electronics",
    rating: 4.5,
    reviewCount: 4523,
    inStock: true,
    features: ["360° Sound", "24hr Battery", "IP67 Waterproof", "Bluetooth 5.3"],
  },
  {
    id: "9",
    title: "Running Shoes - CloudFoam Ultra",
    description: "Lightweight running shoes with responsive CloudFoam cushioning, breathable mesh upper, and durable rubber outsole.",
    price: 89.99,
    originalPrice: 129.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    ],
    category: "Fashion",
    rating: 4.4,
    reviewCount: 3890,
    inStock: true,
    badge: "Best Value",
  },
  {
    id: "10",
    title: "Robot Vacuum Cleaner - Smart Navigation",
    description: "AI-powered robot vacuum with LiDAR navigation, 3000Pa suction, self-emptying base, and app control. Maps your home for efficient cleaning.",
    price: 299.99,
    originalPrice: 449.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600",
    ],
    category: "Home & Kitchen",
    rating: 4.7,
    reviewCount: 2678,
    inStock: true,
    badge: "33% Off",
    features: ["LiDAR Navigation", "3000Pa Suction", "Self-Emptying", "App Control"],
  },
  {
    id: "11",
    title: "STEM Building Blocks - 500 Piece Set",
    description: "Educational building blocks set for ages 6+. Encourages creativity, problem-solving, and STEM learning through play.",
    price: 44.99,
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
    ],
    category: "Toys",
    rating: 4.8,
    reviewCount: 1234,
    inStock: true,
  },
  {
    id: "12",
    title: "Car Dash Cam - 4K Ultra HD",
    description: "4K dash camera with night vision, GPS tracking, parking mode, and 170° wide-angle lens. Includes 64GB SD card.",
    price: 69.99,
    originalPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600",
    ],
    category: "Automotive",
    rating: 4.3,
    reviewCount: 890,
    inStock: false,
  },
];

export const reviews: Review[] = [
  { id: "r1", userId: "u1", userName: "Alex M.", rating: 5, comment: "Absolutely amazing quality! The noise cancellation is the best I've ever experienced. Worth every penny.", date: "2024-03-15", helpful: 234 },
  { id: "r2", userId: "u2", userName: "Sarah K.", rating: 4, comment: "Great product overall. Battery life is impressive. Only wish the carrying case was included.", date: "2024-03-10", helpful: 156 },
  { id: "r3", userId: "u3", userName: "James R.", rating: 5, comment: "These exceeded my expectations. The sound quality is incredible and they're very comfortable for long listening sessions.", date: "2024-03-08", helpful: 89 },
  { id: "r4", userId: "u4", userName: "Maria L.", rating: 3, comment: "Good quality but a bit pricey. The app could use some improvements.", date: "2024-02-28", helpful: 45 },
  { id: "r5", userId: "u5", userName: "David P.", rating: 5, comment: "Best purchase I've made this year! Highly recommend to anyone looking for premium headphones.", date: "2024-02-20", helpful: 312 },
];

export const bannerSlides = [
  {
    id: 1,
    title: "Summer Sale — Up to 60% Off",
    subtitle: "Shop electronics, fashion, home & more",
    gradient: "from-primary/90 to-primary/60",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "New Arrivals in Electronics",
    subtitle: "Discover the latest gadgets and tech",
    gradient: "from-header to-header/80",
    cta: "Explore",
  },
  {
    id: 3,
    title: "Free Delivery on Orders Over $50",
    subtitle: "Fast & reliable shipping to your doorstep",
    gradient: "from-success to-success/70",
    cta: "Learn More",
  },
];
