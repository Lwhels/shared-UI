import React from "react";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

/**
 * GlassCard creates an interactive specular ambient glow effect over frosted glass.
 * Extracted and improved from vehicularmedia's card component.
 */
export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.12)",
  ...props
}) => {
  const mouseX = useSpring(0, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(280px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "overflow-hidden relative duration-500 border rounded-2xl bg-zinc-950/40 backdrop-blur-xl group hover:border-zinc-500/40 border-white/10 transition-colors",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-80 via-white/5 transition duration-500 group-hover:opacity-100"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-500 group-hover:opacity-100"
          style={{
            ...style,
            background: glowColor,
          }}
        />
      </div>

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default GlassCard;
