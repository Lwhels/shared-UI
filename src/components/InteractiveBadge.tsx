import React from "react";
import { cn } from "../lib/utils";

export interface GlowingBadgeProps {
  children: React.ReactNode;
  variant?: "amber" | "emerald" | "indigo" | "rose" | "neutral";
  className?: string;
  pulse?: boolean;
}

export const GlowingBadge: React.FC<GlowingBadgeProps> = ({
  children,
  variant = "amber",
  className,
  pulse = true,
}) => {
  const variantStyles = {
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    rose: "border-rose-500/30 bg-rose-500/10 text-rose-300",
    neutral: "border-white/20 bg-white/5 text-zinc-300",
  };

  const dotStyles = {
    amber: "bg-amber-400",
    emerald: "bg-emerald-400",
    indigo: "bg-indigo-400",
    rose: "bg-rose-400",
    neutral: "bg-zinc-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md transition-all",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              dotStyles[variant]
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              dotStyles[variant]
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
};

export const StatusDot: React.FC<{
  status?: "online" | "busy" | "away" | "offline";
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ status = "online", size = "md", className }) => {
  const sizeMap = {
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3.5 w-3.5",
  };

  const statusMap = {
    online: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    busy: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
    away: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    offline: "bg-zinc-500",
  };

  return (
    <span
      className={cn("rounded-full inline-block shrink-0", sizeMap[size], statusMap[status], className)}
    />
  );
};
