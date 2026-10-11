import React, { useEffect, useState, useRef } from "react";
import { cn } from "../lib/utils";

export interface InfiniteMovingItem {
  quote?: string;
  name?: string;
  title?: string;
  icon?: React.ReactNode;
  image?: string;
  badge?: string;
  [key: string]: any;
}

export interface InfiniteMovingCardsProps {
  items: InfiniteMovingItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  renderItem?: (item: InfiniteMovingItem, idx: number) => React.ReactNode;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  itemClassName,
  renderItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate elements to create continuous loop
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              "w-[340px] max-w-full relative rounded-2xl border border-white/10 flex-shrink-0 bg-white/[0.03] px-6 py-5 md:w-[420px] backdrop-blur-md transition-all hover:border-white/20",
              itemClassName
            )}
          >
            {renderItem ? (
              renderItem(item, idx)
            ) : (
              <blockquote>
                {item.quote && (
                  <p className="relative z-20 text-sm leading-relaxed text-zinc-300 font-normal italic">
                    "{item.quote}"
                  </p>
                )}
                {(item.name || item.title || item.image) && (
                  <div className="relative z-20 mt-4 flex flex-row items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name || "Avatar"}
                        className="w-10 h-10 rounded-full object-cover border border-white/15"
                      />
                    )}
                    <span className="flex flex-col">
                      {item.name && (
                        <span className="text-sm font-semibold text-white">
                          {item.name}
                        </span>
                      )}
                      {item.title && (
                        <span className="text-xs text-zinc-400">
                          {item.title}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </blockquote>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
