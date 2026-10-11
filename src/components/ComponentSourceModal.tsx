import React, { useState } from "react";
import { Code2, Copy, Check, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const COMPONENT_SOURCES: Record<string, { title: string; filename: string; code: string }> = {
  Spotlight: {
    title: "Spotlight Component",
    filename: "Spotlight.tsx",
    code: `import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../lib/utils";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  size?: number;
  borderGlow?: boolean;
}

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
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate\`
            radial-gradient(
              \${size}px circle at \${mouseX}px \${mouseY}px,
              \${spotlightColor},
              transparent 75%
            )
          \`,
        }}
      />
      {borderGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate\`
              radial-gradient(
                \${size / 2}px circle at \${mouseX}px \${mouseY}px,
                rgba(255, 255, 255, 0.08),
                transparent 80%
              )
            \`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default Spotlight;`,
  },
  ThreeDCard: {
    title: "3D Perspective Card",
    filename: "ThreeDCard.tsx",
    code: `import React, { createContext, useState, useContext, useRef, useEffect } from "react";
import { cn } from "../lib/utils";

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined);

export const CardContainer: React.FC<{ children?: React.ReactNode; className?: string; rotationIntensity?: number }> = ({
  children,
  className,
  rotationIntensity = 25,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / rotationIntensity;
    const y = (e.clientY - top - height / 2) / rotationIntensity;
    containerRef.current.style.transform = \`rotateY(\${x}deg) rotateX(\${y * -1}deg)\`;
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div className="flex items-center justify-center py-6" style={{ perspective: "1000px" }}>
        <div
          ref={containerRef}
          onMouseEnter={() => setIsMouseEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative transition-all duration-200 ease-out", className)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("h-auto w-auto [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>
    {children}
  </div>
);

export const CardItem: React.FC<{
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}> = ({ as: Tag = "div", children, className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(MouseEnterContext);
  const isMouseEntered = context ? context[0] : false;

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = \`translateX(\${translateX}px) translateY(\${translateY}px) translateZ(\${translateZ}px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) rotateZ(\${rotateZ}deg)\`;
    } else {
      ref.current.style.transform = "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return <Tag ref={ref} className={cn("w-fit transition-all duration-300 ease-out", className)} {...rest}>{children}</Tag>;
};

export const ThreeDCard = CardContainer;
export default CardContainer;`,
  },
  MovingBorder: {
    title: "Moving Border Button",
    filename: "MovingBorder.tsx",
    code: `import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const MovingBorder: React.FC<{ children: React.ReactNode; duration?: number; rx?: string; ry?: string }> = ({
  children,
  duration = 2500,
  rx = "30%",
  ry = "30%",
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
        } catch {}
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration]);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%">
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform: \`translate3d(\${coords.x}px, \${coords.y}px, 0) translateX(-50%) translateY(-50%)\`,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MovingBorderButton: React.FC<{
  borderRadius?: string;
  children: React.ReactNode;
  duration?: number;
  className?: string;
  [key: string]: any;
}> = ({ borderRadius = "1.5rem", children, duration = 3000, className, ...otherProps }) => (
  <button
    className="bg-transparent relative h-12 min-w-[140px] px-6 py-2 p-[1px] overflow-hidden group active:scale-95 transition-transform"
    style={{ borderRadius }}
    {...otherProps}
  >
    <div className="absolute inset-0" style={{ borderRadius: \`calc(\${borderRadius} * 0.96)\` }}>
      <MovingBorder duration={duration} rx="30%" ry="30%">
        <div className="h-20 w-20 opacity-90 bg-[radial-gradient(var(--accent,_#f59e0b)_40%,transparent_65%)]" />
      </MovingBorder>
    </div>
    <div
      className={cn(
        "relative bg-zinc-950/90 border border-white/10 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm font-medium antialiased group-hover:bg-zinc-900/90",
        className
      )}
      style={{ borderRadius: \`calc(\${borderRadius} * 0.96)\` }}
    >
      {children}
    </div>
  </button>
);`,
  },
  BubbleReveal: {
    title: "Bubble Reveal Lens",
    filename: "BubbleReveal.tsx",
    code: `import React, { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export const BubbleReveal: React.FC<{
  children: React.ReactNode;
  overlayContent: React.ReactNode;
  size?: number;
  ringColor?: string;
  className?: string;
}> = ({ children, overlayContent, className, size = 190, ringColor = "rgba(255, 255, 255, 0.3)" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(-size);
  const rawY = useMotionValue(-size);
  const x = useSpring(rawX, { stiffness: 140, damping: 22 });
  const y = useSpring(rawY, { stiffness: 140, damping: 22 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [rawX, rawY]);

  const maskX = useTransform(x, (v: number) => \`\${v - size / 2}px\`);
  const maskY = useTransform(y, (v: number) => \`\${v - size / 2}px\`);
  const maskPos = useMotionTemplate\`\${maskX} \${maskY}\`;
  const ringX = useTransform(x, (v: number) => v - size / 2);
  const ringY = useTransform(y, (v: number) => v - size / 2);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative h-full w-full overflow-hidden cursor-crosshair rounded-xl", className)}
    >
      <div className="absolute inset-0 z-10 w-full h-full select-none">{overlayContent}</div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 z-20 pointer-events-none select-none w-full h-full"
            style={{
              maskImage: "radial-gradient(circle, black 35%, rgba(0,0,0,0.5) 65%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(circle, black 35%, rgba(0,0,0,0.5) 65%, transparent 85%)",
              maskSize: \`\${size}px \${size}px\`,
              WebkitMaskSize: \`\${size}px \${size}px\`,
              maskPosition: maskPos as any,
              WebkitMaskPosition: maskPos as any,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute z-30 pointer-events-none rounded-full"
            style={{ width: size, height: size, x: ringX, y: ringY, border: \`1.5px solid \${ringColor}\`, boxShadow: \`0 0 25px \${ringColor}\` }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BubbleReveal;`,
  },
  TextReveal: {
    title: "Text Reveal Scramble Decryptor",
    filename: "TextReveal.tsx",
    code: `import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "../lib/utils";

const DEFAULT_CHARS = "-_~\`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const TextReveal: React.FC<{
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOn?: "inView" | "hover" | "mount";
}> = ({ text, className = "", scrambleSpeed = 30, triggerOn = "inView" }) => {
  const [output, setOutput] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const triggerAnimation = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) return text[index];
            return DEFAULT_CHARS[Math.floor(Math.random() * DEFAULT_CHARS.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2.5;
    }, scrambleSpeed);
    return () => clearInterval(interval);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    if (triggerOn === "mount" || (triggerOn === "inView" && isInView)) {
      triggerAnimation();
    }
  }, [isInView, triggerOn, triggerAnimation]);

  return <span ref={ref} className={cn("inline-block font-mono tracking-tight", className)}>{output}</span>;
};

export default TextReveal;`,
  },
};

export const ComponentSourceModal: React.FC<{
  componentName: string | null;
  onClose: () => void;
}> = ({ componentName, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!componentName || !COMPONENT_SOURCES[componentName]) return null;
  const current = COMPONENT_SOURCES[componentName];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-zinc-950 border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[85vh]"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-amber-400" />
            <h3 className="font-bold text-sm text-white font-mono">{current.filename}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? "Copied Source!" : "Copy Code"}</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        <pre className="p-4 rounded-xl bg-black/70 border border-white/5 font-mono text-xs text-zinc-300 overflow-y-auto flex-1 mt-4 leading-relaxed selection:bg-amber-500/30">
          <code>{current.code}</code>
        </pre>
      </motion.div>
    </div>
  );
};
