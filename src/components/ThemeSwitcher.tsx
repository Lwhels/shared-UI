import React, { useState, useRef, useEffect } from "react";
import { useTheme, ThemeStyle } from "../context/ThemeContext";
import { Palette, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

const THEMES: { id: ThemeStyle; name: string; color: string; desc: string }[] = [
  { id: "obsidian", name: "Obsidian Amber", color: "#f59e0b", desc: "Dark automotive luxury" },
  { id: "champagne", name: "Champagne Gold", color: "#eab308", desc: "Warm fine dining & luxury" },
  { id: "indigo", name: "Cyber Indigo", color: "#6366f1", desc: "High-tech futuristic SaaS" },
  { id: "emerald", name: "Deep Emerald", color: "#10b981", desc: "Organic eco-luxe & finance" },
  { id: "rose", name: "Vibrant Rose", color: "#f43f5e", desc: "Editorial fashion & social" },
];

export const ThemeSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme, themeMeta } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative z-50", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        title="Switch UI Style & Palette"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shadow-sm"
          style={{ backgroundColor: themeMeta.primaryColor }}
        />
        <span className="hidden sm:inline">{themeMeta.name}</span>
        <Palette size={13} className="text-white/60" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 rounded-2xl bg-zinc-950/95 border border-white/15 p-2 shadow-2xl backdrop-blur-2xl"
          >
            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                <Sparkles size={12} className="text-amber-400" />
                <span>Select Component Style</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Applies tokens across all components & demos
              </p>
            </div>

            <div className="space-y-1">
              {THEMES.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors",
                      isSelected
                        ? "bg-white/10 text-white font-medium"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: t.color }}
                      />
                      <div>
                        <div className="text-white font-medium">{t.name}</div>
                        <div className="text-[10px] text-zinc-500">{t.desc}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={14} className="text-white shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
