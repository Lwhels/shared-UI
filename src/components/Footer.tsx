import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextReveal } from "./TextReveal";
import { Magnetic } from "./Magnetic";
import { Github, Twitter, Linkedin, Heart, ArrowUpRight, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl mt-24">
      {/* Subtle top ambient glow */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                shared-UI
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Extracted and distilled from real production applications like Vehicular Media.
              Engineered with Framer Motion, Tailwind CSS, and zero superfluous dependencies.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Magnetic strength={0.3}>
                <a
                  href="https://github.com/Lwhels/shared-UI"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors inline-flex"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors inline-flex"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors inline-flex"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
              Demo Websites
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link to="/demos/portfolio" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Portfolio</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/ecommerce" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>E-Commerce</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/restaurant" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Restaurant</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/business" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Business SaaS</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/blog" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Blog Editorial</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/booking" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Booking Stays</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/social" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Social Feed</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/chat" className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>Chat Messenger</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Component list */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-mono">
              Core Components
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li className="font-mono">SpotlightCard</li>
              <li className="font-mono">ThreeDCard (Tilt & Depth)</li>
              <li className="font-mono">MovingBorderButton</li>
              <li className="font-mono">Carousel3D (Cylinder)</li>
              <li className="font-mono">InfiniteMovingCards</li>
              <li className="font-mono">TextReveal (Matrix)</li>
              <li className="font-mono">BubbleReveal (Mask)</li>
              <li className="font-mono">Magnetic Physics</li>
              <li className="font-mono">GlassCard & Badges</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} shared-UI. Crafted with care for modern React developers.</p>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Powered by</span>
            <TextReveal text="Vite + React + Tailwind + Framer Motion" className="text-amber-400 font-mono" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
