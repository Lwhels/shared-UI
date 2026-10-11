import React, { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "../lib/utils";

const DEFAULT_CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export interface TextRevealProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  chars?: string;
  triggerOn?: "inView" | "hover" | "mount";
  preserveSpaces?: boolean;
}

/**
 * TextReveal component decrypts text with a high-tech scramble animation.
 * Extracted and enhanced from vehicularmedia with multi-trigger support and custom character banks.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  scrambleSpeed = 30,
  chars = DEFAULT_CHARS,
  triggerOn = "inView",
  preserveSpaces = true,
}) => {
  const [output, setOutput] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const animatingRef = useRef(false);

  const triggerAnimation = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((letter, index) => {
            if (preserveSpaces && letter === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        animatingRef.current = false;
        setOutput(text);
      }

      iteration += 1 / 2.5;
    }, scrambleSpeed);

    return () => {
      clearInterval(interval);
      animatingRef.current = false;
    };
  }, [text, chars, scrambleSpeed, preserveSpaces]);

  useEffect(() => {
    if (triggerOn === "mount") {
      triggerAnimation();
    } else if (triggerOn === "inView" && isInView) {
      triggerAnimation();
    }
  }, [isInView, triggerOn, triggerAnimation]);

  const handleMouseEnter = () => {
    if (triggerOn === "hover") {
      triggerAnimation();
    }
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={cn("inline-block font-mono tracking-tight", className)}
    >
      {output}
    </span>
  );
};

export default TextReveal;
