import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bannerSlides } from "@/data/products";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-header">
      <div className="relative h-[200px] sm:h-[280px] md:h-[340px]">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${slide.gradient} flex items-center`}>
              <div className="container">
                <div className="max-w-lg">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-2 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-base text-primary-foreground/80 mb-4">
                    {slide.subtitle}
                  </p>
                  <Link
                    to="/products"
                    className="inline-block bg-card text-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-card/90 transition-colors"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 hover:bg-card p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary-foreground w-8" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
