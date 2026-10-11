import React, { useState, useEffect } from "react";
import {
  Spotlight,
  MovingBorderButton,
  GlassCard,
  Magnetic,
  GlowingBadge,
  TextReveal,
} from "../../components";
import {
  BookOpen,
  Clock,
  Bookmark,
  Share2,
  ThumbsUp,
  ArrowRight,
  X,
  Sparkles,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  claps: number;
  content: string[];
}

export const BlogDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [clapCount, setClapCount] = useState<number>(42);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const articles: Article[] = [
    {
      id: "art-1",
      title: "The Physics of Delight: Engineering Tactile Spring Interfaces in Modern React",
      excerpt: "How sub-pixel mouse velocity interpolation and damped harmonic oscillators transform utilitarian user interfaces into visceral sensory objects.",
      category: "Motion UI",
      readTime: "7 min read",
      date: "Oct 10, 2026",
      author: {
        name: "Elena Rostova",
        role: "Principal Interaction Designer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      },
      claps: 342,
      content: [
        "In contemporary software design, animation is frequently treated as an afterthought—an aesthetic garnish dusted atop an otherwise rigid grid. However, human perceptual neuroscience demonstrates that our brains process tactile continuity and physical inertia far deeper than static geometry.",
        "When an interactive card tilts according to cursor proximity, or when a button generates subtle gravitational pull before the click register, the interface communicates affordance through natural physical metaphor.",
        "By harnessing Framer Motion springs with tuned stiffness and damping constants, we bridge the chasm between mechanical switches and digital pixels.",
      ],
    },
    {
      id: "art-2",
      title: "Beyond Flat Design: The Resurgence of Specular Lighting and 3D Perspective in Enterprise Tools",
      excerpt: "Why the modern developer ecosystem is abandoning sterile minimalism in favor of moody, glassmorphic depth and spatial illumination.",
      category: "Design Systems",
      readTime: "5 min read",
      date: "Oct 08, 2026",
      author: {
        name: "Marcus Vance",
        role: "Staff Design Technologist",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      },
      claps: 218,
      content: [
        "Minimalism achieved its historic goal of stripping away superfluous skeumorphic textures. But in doing so, it frequently eradicated hierarchy, making primary levers indistinguishable from background terrain.",
        "The new wave of dark spatial UI uses selective radial spotlights and 3D perspective transforms not to mimic physical wood or leather, but to simulate cinematic optic lenses.",
      ],
    },
    {
      id: "art-3",
      title: "Zero-Latency Client State: How Modern Component Libraries Eliminate Cold-Start Hydration Lag",
      excerpt: "Deconstructing why client-first motion components outshine heavy monolithic SSR frameworks for high-frequency interactive web apps.",
      category: "Engineering",
      readTime: "8 min read",
      date: "Oct 04, 2026",
      author: {
        name: "David Kim",
        role: "Frontend Architect",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      },
      claps: 412,
      content: [
        "Mouse trackers, WebGL shaders, and physics-driven gesture carousels have historically wrestled with Server-Side Rendering hydration mismatches. Modern bundlers like Vite pair with standalone client component libraries to deliver immediate interactive fidelity.",
      ],
    },
    {
      id: "art-4",
      title: "The Architecture of Vehicular Media: Extracting Production Design Systems into Shared Repos",
      excerpt: "A deep dive into how bespoke agency components can be generalized into scalable multi-theme component engines.",
      category: "Case Study",
      readTime: "6 min read",
      date: "Sep 29, 2026",
      author: {
        name: "Sarah Chen",
        role: "Creative Director",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      },
      claps: 512,
      content: [
        "When building Vehicular Media, every motion primitive was tuned for automotive majesty: high-contrast dark backdrops, amber headlights, and fluid speed. Extracting this into shared-UI required isolating the core mechanics while externalizing design tokens.",
      ],
    },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-200 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Header */}
      <section className="relative py-20 px-6 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          <GlowingBadge variant="amber">KINETIC JOURNAL · ISSUE 42</GlowingBadge>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight text-zinc-100">
            <TextReveal text="Chronicles of Modern Interaction" />
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Essays, architectural breakdowns, and design system philosophy from the forefront of digital craftsmanship.
          </p>
        </div>
      </section>

      {/* Filter and Article Feed */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        {/* Category selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Essays" },
              { id: "Motion UI", label: "Motion UI" },
              { id: "Design Systems", label: "Design Systems" },
              { id: "Engineering", label: "Engineering" },
              { id: "Case Study", label: "Case Study" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            {filteredArticles.length} Published Articles
          </div>
        </div>

        {/* Article Cards with Spotlight */}
        <div className="space-y-6">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarkedIds.has(article.id);
            return (
              <Spotlight
                key={article.id}
                onClick={() => {
                  setSelectedArticle(article);
                  setClapCount(article.claps);
                }}
                className="p-8 cursor-pointer transition-all hover:border-amber-500/40 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {article.category}
                      </span>
                      <span className="text-zinc-500 flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                      <span className="text-zinc-500">{article.date}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-amber-200 transition-colors">
                      {article.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Author block */}
                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-white/20"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-white">
                          {article.author.name}
                        </span>
                        <span className="text-zinc-500 ml-2">
                          {article.author.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 md:flex-col md:items-end shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                    <button
                      onClick={(e) => toggleBookmark(article.id, e)}
                      className={`p-2 rounded-full border transition-colors ${
                        isBookmarked
                          ? "bg-amber-500 text-zinc-950 border-amber-500"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                      aria-label="Bookmark article"
                    >
                      <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>

                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Essay</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Spotlight>
            );
          })}
        </div>
      </section>

      {/* Newsletter Signup Card */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <GlassCard className="p-10 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <GlowingBadge variant="amber">WEEKLY INTEL</GlowingBadge>
            <h3 className="text-2xl font-bold font-serif text-white">
              Never miss a design deep-dive.
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Join 18,000+ engineers, creative directors, and founders receiving our curated Sunday newsletter.
            </p>

            {newsletterSubscribed ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold py-3">
                <Check size={16} />
                <span>Subscription Confirmed. Welcome aboard!</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-2 pt-2"
              >
                <input
                  type="email"
                  required
                  placeholder="name@studio.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors shrink-0"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </GlassCard>
      </section>

      {/* Reader Modal Drawer */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-3xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl relative my-8"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                aria-label="Close reader"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {selectedArticle.category}
                  </span>
                  <span className="text-zinc-500">{selectedArticle.readTime}</span>
                  <span className="text-zinc-500">{selectedArticle.date}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-bold font-serif text-white leading-tight">
                  {selectedArticle.title}
                </h1>

                {/* Author card */}
                <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                  <img
                    src={selectedArticle.author.avatar}
                    alt={selectedArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {selectedArticle.author.name}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {selectedArticle.author.role}
                    </p>
                  </div>
                </div>

                {/* Body paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-zinc-300 font-serif leading-relaxed">
                  {selectedArticle.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Reader footer interactive claps */}
                <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setClapCount((c) => c + 1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-transform active:scale-90"
                  >
                    <ThumbsUp size={14} className="text-amber-400" />
                    <span>Applause ({clapCount})</span>
                  </button>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Finish Reading [ESC]
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogDemo;
