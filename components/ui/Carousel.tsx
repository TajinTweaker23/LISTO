import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  itemsPerView?: number;
  spacing?: number;
  className?: string;
  variant?: "default" | "cards" | "full-width";
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  loop = true,
  itemsPerView = 1,
  spacing = 16,
  className = "",
  variant = "default",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalItems = children.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (loop) {
          return (prev + 1) % totalItems;
        }
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isDragging, loop, maxIndex, totalItems]);

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(loop ? totalItems - 1 : 0);
    } else if (index >= totalItems) {
      setCurrentIndex(loop ? 0 : maxIndex);
    } else {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const handleDragEnd = (info: any) => {
    setIsDragging(false);
    const threshold = 50;
    
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  const variants = {
    default: "overflow-hidden",
    cards: "overflow-visible px-4",
    "full-width": "w-full",
  };

  const itemWidth = variant === "cards" 
    ? `calc((100% - ${(itemsPerView - 1) * spacing}px) / ${itemsPerView})`
    : `calc(100% / ${itemsPerView})`;

  return (
    <div className={`relative ${variants[variant]} ${className}`}>
      {/* Main carousel container */}
      <div className="relative" ref={containerRef}>
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => handleDragEnd(info)}
          animate={{
            x: variant === "cards" 
              ? `calc(-${currentIndex} * (${itemWidth} + ${spacing}px))`
              : `calc(-${currentIndex} * ${itemWidth})`,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          style={{
            gap: variant === "cards" ? `${spacing}px` : 0,
          }}
        >
          {children.map((child, index) => {
            // Try to use child's key if available, otherwise fallback to index (not recommended)
            const childKey =
              (React.isValidElement(child) && child.key != null)
                ? child.key
                : `carousel-item-${index}`;
            return (
              <motion.div
                key={childKey}
                className="flex-shrink-0"
                style={{ width: itemWidth }}
                initial={variant === "cards" ? { scale: 0.9, opacity: 0.7 } : false}
                animate={{
                  scale: variant === "cards" && index === currentIndex ? 1 : 0.9,
                  opacity: variant === "cards" && index === currentIndex ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                {child}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation arrows */}
      {showArrows && totalItems > itemsPerView && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-sage-600 hover:text-sage-700 transition-colors"
            disabled={!loop && currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-sage-600 hover:text-sage-700 transition-colors"
            disabled={!loop && currentIndex >= maxIndex}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && totalItems > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {children.map((child, index) => {
            const childKey =
              (React.isValidElement(child) && child.key != null)
                ? child.key
                : `carousel-dot-${index}`;
            return (
              <motion.button
                key={childKey}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-sage-600 w-6"
                    : "bg-sage-300 hover:bg-sage-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

// Image carousel specifically for galleries
interface ImageCarouselProps {
  images: { src: string; alt?: string; caption?: string }[];
  className?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <Carousel
        className={className}
        showArrows={true}
        showDots={true}
        variant="cards"
      >
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            className="relative cursor-pointer group"
            onClick={() => {
              setCurrentIndex(index);
              setIsFullscreen(true);
            }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-2xl"
            />
            
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-sage-600 text-lg">🔍</span>
              </div>
            </div>
          </motion.div>
        ))}
      </Carousel>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="w-full h-full object-contain rounded-2xl"
              />
              
              {images[currentIndex].caption && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-white text-center">{images[currentIndex].caption}</p>
                </div>
              )}
              
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Carousel;
