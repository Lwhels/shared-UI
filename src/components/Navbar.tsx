import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Magnetic } from "./Magnetic";
import {
  Menu,
  X,
  Layers,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Briefcase,
  UtensilsCrossed,
  Newspaper,
  CalendarCheck2,
  Users2,
  MessageSquare,
  Github,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export const DEMO_LINKS = [
  { path: "/demos/portfolio", label: "Portfolio", icon: Briefcase, tag: "Obsidian" },
  { path: "/demos/ecommerce", label: "E-Commerce", icon: ShoppingBag, tag: "Store" },
  { path: "/demos/restaurant", label: "Restaurant", icon: UtensilsCrossed, tag: "Dining" },
  { path: "/demos/business", label: "Business SaaS", icon: Sparkles, tag: "Enterprise" },
  { path: "/demos/blog", label: "Editorial Blog", icon: Newspaper, tag: "Articles" },
  { path: "/demos/booking", label: "Booking Retreat", icon: CalendarCheck2, tag: "Stays" },
  { path: "/demos/social", label: "Social Feed", icon: Users2, tag: "Community" },
  { path: "/demos/chat", label: "Chat Messenger", icon: MessageSquare, tag: "Messaging" },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demosDropdownOpen, setDemosDropdownOpen] = useState(false);

  const isDemoActive = DEMO_LINKS.some((d) => d.path === location.pathname);

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 backdrop-blur-xl bg-zinc-950/75 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center text-zinc-950 font-bold text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="font-display font-bold text-white text-base tracking-tight flex items-center gap-1.5">
              <span>Shared-UI</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300 font-mono">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Interactive Client UI Kit
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-2 py-1 rounded-full">
          <Link
            to="/"
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
              location.pathname === "/"
                ? "bg-white/15 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            Components & Playground
          </Link>

          {/* Demos Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDemosDropdownOpen(true)}
            onMouseLeave={() => setDemosDropdownOpen(false)}
          >
            <button
              onClick={() => setDemosDropdownOpen(!demosDropdownOpen)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                isDemoActive
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Compass size={13} />
              <span>Demo Websites (8)</span>
              <ChevronDown size={12} className={cn("transition-transform duration-200", demosDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {demosDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-zinc-950/95 border border-white/15 p-2 shadow-2xl backdrop-blur-2xl grid grid-cols-2 gap-1"
                >
                  {DEMO_LINKS.map((demo) => {
                    const Icon = demo.icon;
                    const isActive = location.pathname === demo.path;
                    return (
                      <Link
                        key={demo.path}
                        to={demo.path}
                        onClick={() => setDemosDropdownOpen(false)}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-xl text-xs transition-colors",
                          isActive
                            ? "bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30"
                            : "text-zinc-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-white/80">
                          <Icon size={14} />
                        </div>
                        <div className="truncate">
                          <div className="truncate font-medium">{demo.label}</div>
                          <span className="text-[10px] text-zinc-500 font-normal">
                            {demo.tag}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Magnetic strength={0.3}>
            <a
              href="https://github.com/Lwhels/shared-UI"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all hover:scale-105 active:scale-95"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
          </Magnetic>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 mt-3 pt-3 space-y-2"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-2 rounded-xl text-sm font-medium",
                location.pathname === "/"
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Components & Playground
            </Link>

            <div className="pt-2 border-t border-white/10">
              <p className="px-4 text-[11px] font-semibold tracking-wider text-amber-400 uppercase mb-2">
                Demo Websites
              </p>
              <div className="grid grid-cols-2 gap-1.5 px-2">
                {DEMO_LINKS.map((demo) => {
                  const Icon = demo.icon;
                  const isActive = location.pathname === demo.path;
                  return (
                    <Link
                      key={demo.path}
                      to={demo.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-xl text-xs",
                        isActive
                          ? "bg-amber-500/20 text-amber-300 font-semibold"
                          : "text-zinc-300 hover:bg-white/5"
                      )}
                    >
                      <Icon size={14} />
                      <span>{demo.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
