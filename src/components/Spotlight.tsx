import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  size?: number;
  borderGlow?: boolean;
}

/**
 * Spotlight component creates a dynamic radial illumination effect that follows mouse movement.
 * Extracted from vehicularmedia and enhanced with customizable radius, colors, and border highlighting.
 */
export const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(245, 158, 11, 0.18)",
  size = 600,
  borderGlow = true,
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-white/20",
        className
      )}
      {...props}
    >
      {/* Radial spotlight gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${size}px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 75%
            )
          `,
        }}
      />

      {borderGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${size / 2}px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.08),
                transparent 80%
              )
            `,
          }}
        />
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default Spotlight;
