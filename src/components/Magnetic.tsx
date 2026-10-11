import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  active?: boolean;
}

/**
 * Magnetic component gently pulls its child toward the mouse cursor on hover.
 * Extracted and enhanced from vehicularmedia.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.25,
  className = "",
  active = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
      className={cn("inline-block relative", className)}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
