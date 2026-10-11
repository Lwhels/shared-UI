import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import { cn } from "../lib/utils";

export interface BubbleRevealProps {
  children: React.ReactNode;
  overlayContent: React.ReactNode;
  className?: string;
  size?: number;
  ringColor?: string;
}

/**
 * BubbleReveal component reveals a hidden layer beneath an interactive magnifying bubble mask.
 * Extracted and enhanced from vehicularmedia.
 */
export const BubbleReveal: React.FC<BubbleRevealProps> = ({
  children,
  overlayContent,
  className,
  size = 190,
  ringColor = "rgba(255, 255, 255, 0.3)",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(-size);
  const rawY = useMotionValue(-size);

  const x = useSpring(rawX, { stiffness: 140, damping: 22 });
  const y = useSpring(rawY, { stiffness: 140, damping: 22 });

  const [isHovered, setIsHovered] = useState(false);

  const updateCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      rawX.set(clientX - rect.left);
      rawY.set(clientY - rect.top);
    },
    [rawX, rawY]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      updateCoordinates(e.clientX, e.clientY);
    },
    [updateCoordinates]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        setIsHovered(true);
        updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [updateCoordinates]
  );

  // Masks and offsets
  const maskX = useTransform(x, (v: number) => `${v - size / 2}px`);
  const maskY = useTransform(y, (v: number) => `${v - size / 2}px`);
  const maskPos = useMotionTemplate`${maskX} ${maskY}`;

  const ringX = useTransform(x, (v: number) => v - size / 2);
  const ringY = useTransform(y, (v: number) => v - size / 2);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsHovered(false)}
      className={cn(
        "relative h-full w-full overflow-hidden cursor-crosshair rounded-xl",
        className
      )}
    >
      {/* Base layer — default view */}
      <div className="absolute inset-0 z-10 w-full h-full select-none">
        {overlayContent}
      </div>

      {/* Bubble reveal layer — revealed under circular lens */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="bubble-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 z-20 pointer-events-none select-none w-full h-full"
            style={{
              maskImage:
                "radial-gradient(circle, black 35%, rgba(0,0,0,0.5) 65%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(circle, black 35%, rgba(0,0,0,0.5) 65%, transparent 85%)",
              maskSize: `${size}px ${size}px`,
              WebkitMaskSize: `${size}px ${size}px`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: maskPos as any,
              WebkitMaskPosition: maskPos as any,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle illuminated cursor indicator ring */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="ring-indicator"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 pointer-events-none rounded-full"
            style={{
              width: size,
              height: size,
              x: ringX,
              y: ringY,
              border: `1.5px solid ${ringColor}`,
              boxShadow: `0 0 25px ${ringColor}`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BubbleReveal;
