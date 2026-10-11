import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}

export const MovingBorder: React.FC<MovingBorderProps> = ({
  children,
  duration = 2500,
  rx = "30%",
  ry = "30%",
  ...otherProps
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useRef<number>(0);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      progress.current = (progress.current + delta / duration) % 1;

      if (pathRef.current) {
        try {
          const totalLength = pathRef.current.getTotalLength();
          if (totalLength > 0) {
            const point = pathRef.current.getPointAtLength(totalLength * progress.current);
            setCoords({ x: point.x, y: point.y });
          }
        } catch {
          // Fallback if SVG measurement is unavailable
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0) translateX(-50%) translateY(-50%)`,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export interface MovingBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
}

export const MovingBorderButton: React.FC<MovingBorderButtonProps> = ({
  borderRadius = "1.5rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration = 3000,
  className,
  ...otherProps
}) => {
  return (
    <Component
      className={cn(
        "bg-transparent relative h-12 w-auto min-w-[140px] px-6 py-2 p-[1px] overflow-hidden group active:scale-95 transition-transform",
        containerClassName
      )}
      style={{
        borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-90 bg-[radial-gradient(var(--accent,_#f59e0b)_40%,transparent_65%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm font-medium antialiased transition-colors group-hover:bg-zinc-900/90",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default MovingBorderButton;
