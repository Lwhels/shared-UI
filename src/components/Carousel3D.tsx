import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export interface CarouselCard {
  id?: string | number;
  title: string;
  subtitle?: string;
  badge?: string;
  content?: React.ReactNode;
  image?: string;
  color?: string;
}

export interface Carousel3DProps {
  cards: CarouselCard[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  onSelect?: (card: CarouselCard, index: number) => void;
}

export const Carousel3D: React.FC<Carousel3DProps> = ({
  cards,
  className,
  autoPlay = false,
  autoPlayInterval = 4000,
  showArrows = true,
  showDots = true,
  onSelect,
}) => {
  const [active, setActive] = useState(0);
  const count = cards.length;
  const theta = 360 / Math.max(count, 1);
  const radius = Math.round(280 / Math.tan(Math.PI / Math.max(count, 1)));

  const nextCard = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const prevCard = useCallback(() => {
    setActive((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    const timer = setInterval(nextCard, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, count, nextCard]);

  // Handle keyboard arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === "ArrowRight") nextCard();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevCard, nextCard]);

  if (count === 0) return null;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center py-12 w-full overflow-hidden select-none",
        className
      )}
      style={{ perspective: "1200px" }}
    >
      {/* 3D Cylindrical Container */}
      <div
        className="relative w-[300px] sm:w-[340px] h-[360px] transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateZ(-${radius}px) rotateY(${-active * theta}deg)`,
        }}
      >
        {cards.map((card, index) => {
          const angle = theta * index;
          const isActive = index === active;

          return (
            <div
              key={card.id || index}
              onClick={() => {
                setActive(index);
                onSelect?.(card, index);
              }}
              className={cn(
                "absolute inset-0 rounded-2xl p-6 transition-all duration-500 cursor-pointer flex flex-col justify-between border backdrop-blur-xl",
                isActive
                  ? "bg-zinc-900/90 border-amber-500/40 shadow-2xl shadow-amber-500/10 scale-105 z-20"
                  : "bg-zinc-950/70 border-white/10 opacity-60 hover:opacity-90 z-10"
              )}
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: "visible",
              }}
            >
              <div>
                {card.badge && (
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-amber-400 mb-3 border border-white/5">
                    {card.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold font-display text-white mb-2">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="text-sm text-zinc-400 font-medium">
                    {card.subtitle}
                  </p>
                )}
              </div>

              {card.image && (
                <div className="relative h-28 my-3 rounded-xl overflow-hidden bg-zinc-800/50">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="text-zinc-300 text-sm">
                {card.content}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-zinc-500">
                <span>Card {index + 1} of {count}</span>
                {isActive && <span className="text-amber-400 font-medium">Active</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      {showArrows && (
        <div className="flex items-center gap-6 mt-12 z-30">
          <button
            onClick={prevCard}
            aria-label="Previous card"
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          {showDots && (
            <div className="flex gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === active
                      ? "w-8 bg-amber-400"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          <button
            onClick={nextCard}
            aria-label="Next card"
            className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel3D;
