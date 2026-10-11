import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { sendEmail } from "../../services/emailService";
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
  Search,
  MessageSquare,
  Send,
  Eye,
  Sun,
  Moon,
  Type,
  SlidersHorizontal,
  Quote,
  CheckCircle2,
  Heart,
  Feather,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: string;
}

interface Article {
  id: string;
  title: string;
  leadExcerpt: string;
  rubric: string;
  readTimeMin: number;
  date: string;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
    bio: string;
  };
  pullQuote: string;
  claps: number;
  bodyParagraphs: string[];
  comments: Comment[];
  isCoverStory?: boolean;
}

export const BlogDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [showBookmarksDrawer, setShowBookmarksDrawer] = useState(false);

  // Reading Experience Preferences
  const [readerTheme, setReaderTheme] = useState<"paper" | "midnight">("paper");
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<"normal" | "large" | "grand">("normal");

  // Comments & Reader
  const [newCommentAuthor, setNewCommentAuthor] = useState("Julius Sterling");
  const [newCommentRole, setNewCommentRole] = useState("Staff Design Technologist");
  const [newCommentText, setNewCommentText] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

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

  const showNotification = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const [articles, setArticles] = useState<Article[]>([
    {
      id: "art-1",
      title: "The Physics of Delight: Engineering Tactile Spring Interfaces in Modern React",
      leadExcerpt: "How sub-pixel mouse velocity interpolation and damped harmonic oscillators transform utilitarian browser surfaces into visceral sensory objects.",
      rubric: "THEORY & MOTION",
      readTimeMin: 7,
      date: "OCTOBER 11, 2026",
      isCoverStory: true,
      author: {
        name: "Elena Rostova",
        role: "Principal Interaction Designer",
        avatarInitials: "ER",
        bio: "Previously lead interaction researcher at Bell Labs and Apple. Investigating human-machine haptics and browser physics.",
      },
      pullQuote: "When latency drops below 8 milliseconds, software ceases to feel like pixels and begins behaving like physical matter.",
      claps: 482,
      comments: [
        {
          id: "c1",
          author: "Kaelen Voss",
          role: "Design Technologist at Linear",
          text: "The damping ratio equations you cited completely eliminated our mobile scroll micro-stutters. Essential reading.",
          timestamp: "2 hours ago",
        },
        {
          id: "c2",
          author: "Dr. Aris Thorne",
          role: "Cognitive Ergonomist",
          text: "Hardware-accelerated sub-pixel spring models match ocular saccade timing with remarkable fidelity.",
          timestamp: "5 hours ago",
        },
      ],
      bodyParagraphs: [
        "The modern graphical interface has spent three decades trapped inside the metaphor of flat office stationary. We push rectangular sheets of digital paper across glassy panes, expecting human delight from what is essentially a glorified spreadsheet.",
        "Yet when an element responds not with linear transitions, but with inertial mass, friction, and harmonic restitution, our neurological perception shifts instantaneously. The object takes on mass, density, and tangible presence.",
        "In our experiments with sixty-frame-per-second touch displays, the decisive threshold was found at twelve milliseconds of response latency. Below this boundary, users describe the software not as 'fast', but as 'alive'. By coupling WebGL fragment shaders with spring oscillators, we simulate the micro-resistance of anodized aluminium under fingertips.",
        "True craftsmanship in software design is not measured by the absence of bugs, but by the presence of intentional soul.",
      ],
    },
    {
      id: "art-2",
      title: "Monolithic Simplicity: Why Modern Microservices Are Collapsing Under Their Own Weight",
      leadExcerpt: "The quiet counter-revolution returning high-throughput systems to modular monoliths, single-binary deploys, and SQLite on NVMe drives.",
      rubric: "SYSTEM ARCHITECTURE",
      readTimeMin: 9,
      date: "OCTOBER 08, 2026",
      author: {
        name: "Marcus Vance",
        role: "Chief Architect, Distributed Systems",
        avatarInitials: "MV",
        bio: "Builder of distributed consensus engines. Author of 'The Fallacy of Distributed Orthogonality'.",
      },
      pullQuote: "We traded a single stack trace for fifty-two network boundaries and called it enterprise agility.",
      claps: 615,
      comments: [
        {
          id: "c3",
          author: "Simone Leclerc",
          role: "VP Engineering",
          text: "We eliminated 14 Kubernetes clusters and merged into 2 monolithic binaries. AWS bill dropped 73% and developer happiness doubled.",
          timestamp: "Yesterday",
        },
      ],
      bodyParagraphs: [
        "A decade ago, the tech industry fell under the spell of hyper-fragmentation. Every database query was quarantined behind an RPC boundary; every state transition required an asynchronous message broker.",
        "The consequence was not speed, but systemic entropy. Distributed transactions introduced partial failures, schema divergence, and observability nightmares that required armies of platform engineers to diagnose.",
        "Today, modern NVMe SSDs deliver millions of random IOPS, and single-socket CPUs boast 128 cores. A well-architected modular monolith running on bare metal can effortlessly saturate a 10Gbps fiber pipe while running with sub-millisecond p99 latency.",
      ],
    },
    {
      id: "art-3",
      title: "The Typography of Solitude: Typefaces Formulated for 10,000-Word Immersion",
      leadExcerpt: "An investigation into serif optical sizes, stroke modulation, and rhythmic letterspacing designed to sustain uninterrupted human concentration.",
      rubric: "EDITORIAL DESIGN",
      readTimeMin: 6,
      date: "OCTOBER 04, 2026",
      author: {
        name: "Aura Lindqvist",
        role: "Typeface Historian & Book Designer",
        avatarInitials: "AL",
        bio: "Specialising in Scandinavian book typography, Renaissance proportions, and optical size interpolation.",
      },
      pullQuote: "A magnificent text typeface does not draw attention to itself; it dissolves into the reader's subconscious voice.",
      claps: 320,
      comments: [
        {
          id: "c4",
          author: "Nathaniel Grey",
          role: "Publisher",
          text: "The notes on x-height proportion relative to line-length are masterclass caliber.",
          timestamp: "3 days ago",
        },
      ],
      bodyParagraphs: [
        "Reading long-form prose is an act of neurological communion. When the typographic rhythm falters—whether through uneven word spacing or an aggressive x-height—the eye stumbles, breaking the spell of sustained contemplation.",
        "In designing type for deep reading, our priority is optical balance. The serifs act as railway tracks guiding saccadic eye movements across the measure, while open counters prevent ink clogging on high-resolution Retina displays.",
      ],
    },
    {
      id: "art-4",
      title: "Silicon & Clay: The Resurgence of Tactile Hardware in a Screen-Saturated Age",
      leadExcerpt: "Why younger digital natives are abandoning frictionless touchscreens in favor of mechanical dials, rotary encoders, and mechanical switches.",
      rubric: "MATERIAL CULTURE",
      readTimeMin: 5,
      date: "SEPTEMBER 29, 2026",
      author: {
        name: "Tobias Sterling",
        role: "Industrial Design Critic",
        avatarInitials: "TS",
        bio: "Writing on the intersection of physical manufacture, analogue craft, and electronic computation.",
      },
      pullQuote: "Friction is not the enemy of experience; it is the tactile evidence of physical agency.",
      claps: 290,
      comments: [],
      bodyParagraphs: [
        "The promised utopia of total smoothness has produced sensory malnutrition. We crave the detent click of a machined knurled knob, the weighted resistance of a hydraulic slider, and the audible snap of a mechanical toggle.",
        "Physical resistance reminds the human nervous system that actions have consequences. When everything is frictionless, nothing feels real.",
      ],
    },
  ]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showNotification("Removed article from reading list.");
      } else {
        next.add(id);
        showNotification("Saved article to reading list.");
      }
      return next;
    });
  };

  const handleClap = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, claps: a.claps + 1 } : a))
    );
    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle((prev) => (prev ? { ...prev, claps: prev.claps + 1 } : null));
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle || !newCommentText.trim()) return;

    const commentObj: Comment = {
      id: `c_${Date.now()}`,
      author: newCommentAuthor,
      role: newCommentRole,
      text: newCommentText.trim(),
      timestamp: "Just now",
    };

    setArticles((prev) =>
      prev.map((a) =>
        a.id === selectedArticle.id ? { ...a, comments: [commentObj, ...a.comments] } : a
      )
    );

    setSelectedArticle((prev) =>
      prev ? { ...prev, comments: [commentObj, ...prev.comments] } : null
    );

    setNewCommentText("");
    showNotification("Comment published to dispatch conversation.");
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await sendEmail({
        to: newsletterEmail,
        subject: "Welcome to The Monolith Review — Autumn Dispatch No. 88",
        template: "newsletter_welcome",
        data: {
          recipientEmail: newsletterEmail,
          issueNumber: "No. 88 (Autumn 2026)",
          curatedArticles: articles.map((a) => a.title).join(", "),
        },
      });

      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#B45309", "#1A1817", "#D4AF37", "#E8E2D8"],
      });

      setNewsletterSubscribed(true);
    } catch {
      setNewsletterSubscribed(true);
    }
  };

  const filteredArticles = articles.filter((a) => {
    const matchesCat = selectedCategory === "all" || a.rubric.toLowerCase().includes(selectedCategory);
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.leadExcerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const coverStory = articles.find((a) => a.isCoverStory) || articles[0];
  const bookmarkedArticles = articles.filter((a) => bookmarkedIds.has(a.id));

  // Determine palette styles based on reading theme
  const isMidnight = readerTheme === "midnight";
  const bgRoot = isMidnight ? "bg-[#111010] text-[#E8E2D8]" : "bg-[#FAF8F5] text-[#1A1817]";
  const borderTone = isMidnight ? "border-stone-800" : "border-[#E8E2D8]";
  const cardBg = isMidnight ? "bg-[#181615]" : "bg-white";
  const mutedText = isMidnight ? "text-stone-400" : "text-stone-600";

  return (
    <div className={`min-h-screen ${bgRoot} font-serif selection:bg-amber-600/30 selection:text-amber-900 transition-colors duration-300`}>
      {/* Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Notification */}
      <AnimatePresence>
        {copiedNotification && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-stone-900 text-stone-100 text-xs font-sans tracking-wide shadow-2xl border border-stone-700 flex items-center gap-2"
          >
            <CheckCircle2 size={14} className="text-amber-500" />
            <span>{copiedNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newspaper Top Masthead Bar */}
      <div className={`border-b ${borderTone} px-4 sm:px-8 py-2 text-[11px] font-sans tracking-widest uppercase flex items-center justify-between`}>
        <div className="hidden sm:flex items-center gap-3 text-stone-500">
          <span>THE MONOLITH REVIEW</span>
          <span>•</span>
          <span>AUTUMN QUADRENNIAL 2026</span>
          <span>•</span>
          <span>ISSUE NO. 88</span>
        </div>

        <div className="text-center flex-1 sm:flex-initial text-stone-500 font-medium">
          CIRCULATION: 48,000 ARCHITECTS GLOBALLY
        </div>

        {/* Reader Preferences Bar */}
        <div className="flex items-center gap-4">
          {/* Night Mode Toggle */}
          <button
            onClick={() => setReaderTheme(isMidnight ? "paper" : "midnight")}
            className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors"
            title="Toggle Reading Mode"
          >
            {isMidnight ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} />}
            <span className="hidden md:inline">{isMidnight ? "Paper Ivory" : "Midnight Ink"}</span>
          </button>

          {/* Reading List Drawer Button */}
          <button
            onClick={() => setShowBookmarksDrawer(true)}
            className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Bookmark size={13} className={bookmarkedIds.size > 0 ? "fill-amber-600 text-amber-600" : ""} />
            <span>Saved ({bookmarkedIds.size})</span>
          </button>
        </div>
      </div>

      {/* Grand Title Masthead */}
      <header className={`border-b ${borderTone} py-8 px-4 sm:px-8 text-center`}>
        <div className="max-w-7xl mx-auto space-y-3">
          <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-amber-700">
            A Journal of Systems, Interface Dynamics & Material Thought
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-none text-current italic font-serif">
            The Monolith Review
          </h1>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-sans text-stone-500 tracking-wider">
            <span>Editor-in-Chief: Julian S. Moreau</span>
            <span>•</span>
            <span>London · Paris · San Francisco · Kyoto</span>
            <span>•</span>
            <span>Published Quarterly</span>
          </div>
        </div>
      </header>

      {/* Search & Rubric Navigation Bar */}
      <nav className={`border-b ${borderTone} sticky top-0 z-40 ${isMidnight ? "bg-[#111010]/95" : "bg-[#FAF8F5]/95"} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Rubrics */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 w-full md:w-auto">
            {[
              { id: "all", label: "All Dispatches" },
              { id: "theory", label: "Theory & Motion" },
              { id: "system", label: "Systems Architecture" },
              { id: "editorial", label: "Editorial Design" },
              { id: "material", label: "Material Culture" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? isMidnight
                      ? "bg-stone-200 text-stone-900 font-bold"
                      : "bg-stone-900 text-stone-100 font-bold"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search essays, authors, archives..."
              className={`w-full text-xs font-sans pl-9 pr-4 py-1.5 rounded-full border ${borderTone} ${
                isMidnight ? "bg-stone-900 text-stone-200" : "bg-white text-stone-800"
              } focus:outline-none focus:border-amber-600`}
            />
          </div>
        </div>
      </nav>

      {/* Main Newspaper Front Page Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Cover Story Feature (Full-Width Lead Editorial) */}
        {selectedCategory === "all" && !searchQuery && (
          <section className={`border-b ${borderTone} pb-12 mb-12`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Editorial Text */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3 text-xs font-sans tracking-widest text-amber-700 font-bold uppercase">
                  <span>LEAD COVER ESSAY</span>
                  <span>•</span>
                  <span>{coverStory.rubric}</span>
                </div>

                <h2
                  onClick={() => setSelectedArticle(coverStory)}
                  className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight hover:text-amber-700 cursor-pointer transition-colors"
                >
                  {coverStory.title}
                </h2>

                <p className={`text-base sm:text-lg ${mutedText} font-light leading-relaxed font-serif italic`}>
                  {coverStory.leadExcerpt}
                </p>

                {/* Author Byline */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center font-sans text-xs font-bold shadow-md">
                      {coverStory.author.avatarInitials}
                    </div>
                    <div>
                      <strong className="text-xs font-sans block text-current">
                        By {coverStory.author.name}
                      </strong>
                      <span className="text-[11px] font-sans text-stone-500">
                        {coverStory.author.role} · {coverStory.readTimeMin} min read
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(coverStory.id)}
                      className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                      title="Save to Reading List"
                    >
                      <Bookmark
                        size={16}
                        className={bookmarkedIds.has(coverStory.id) ? "fill-amber-600 text-amber-600" : ""}
                      />
                    </button>
                    <button
                      onClick={() => setSelectedArticle(coverStory)}
                      className="px-4 py-2 rounded-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-sans font-semibold tracking-wider transition-transform active:scale-95"
                    >
                      Read Full Essay
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Pull Quote & Graphic Frame */}
              <div className="lg:col-span-5">
                <div className={`p-8 rounded-2xl border ${borderTone} ${cardBg} shadow-lg space-y-6 relative overflow-hidden`}>
                  <Quote size={40} className="text-amber-700/20 absolute -top-2 -left-2" />
                  <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-current font-light pt-4">
                    « {coverStory.pullQuote} »
                  </p>
                  <div className="text-[11px] font-sans text-stone-500 uppercase tracking-widest pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-between">
                    <span>Excerpt from Section II</span>
                    <span className="text-amber-700 font-semibold">{coverStory.claps} Readers Applauded</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Secondary Column Articles Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-stone-500">
              CURRENT DISPATCHES & ARCHIVE
            </span>
            <span className="text-xs font-sans text-stone-500">
              Showing {filteredArticles.length} curated essays
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => {
              const isSaved = bookmarkedIds.has(art.id);

              return (
                <article
                  key={art.id}
                  className={`flex flex-col justify-between p-6 rounded-2xl border ${borderTone} ${cardBg} shadow-sm hover:shadow-xl transition-all duration-300 space-y-6`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-sans text-stone-500 uppercase tracking-wider">
                      <span className="text-amber-700 font-bold">{art.rubric}</span>
                      <span>{art.readTimeMin} MIN READ</span>
                    </div>

                    <h3
                      onClick={() => setSelectedArticle(art)}
                      className="text-xl sm:text-2xl font-normal leading-snug hover:text-amber-700 cursor-pointer transition-colors"
                    >
                      {art.title}
                    </h3>

                    <p className={`text-xs sm:text-sm ${mutedText} leading-relaxed font-light line-clamp-3 italic`}>
                      {art.leadExcerpt}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center font-sans text-[10px] font-bold">
                        {art.author.avatarInitials}
                      </div>
                      <span className="text-xs font-sans text-stone-500">
                        {art.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleBookmark(art.id)}
                        className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
                        title="Save Article"
                      >
                        <Bookmark
                          size={14}
                          className={isSaved ? "fill-amber-600 text-amber-600" : ""}
                        />
                      </button>

                      <button
                        onClick={() => setSelectedArticle(art)}
                        className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
                        title="Read Dispatch"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Newsletter Subscription Spread */}
        <section className={`mt-20 p-8 sm:p-12 rounded-2xl border ${borderTone} ${cardBg} text-center space-y-6 max-w-3xl mx-auto shadow-xl`}>
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-700/10 text-amber-700 flex items-center justify-center">
            <Feather size={24} />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-normal text-current">
              The Sunday Dispatch
            </h3>
            <p className={`text-sm ${mutedText} max-w-lg mx-auto font-light leading-relaxed`}>
              Every Sunday morning, we transmit a single curated long-form essay directly to your personal reading device. Free of advertisements and algorithmic noise.
            </p>
          </div>

          {!newsletterSubscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="reader@atelier.com"
                className={`flex-1 px-4 py-2.5 rounded-full border ${borderTone} text-xs font-sans focus:outline-none focus:border-amber-600 ${
                  isMidnight ? "bg-stone-900 text-white" : "bg-white text-stone-900"
                }`}
                required
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-sans font-semibold tracking-wider transition-transform active:scale-95 shadow-md"
              >
                Join Dispatch
              </button>
            </form>
          ) : (
            <div className="text-xs font-sans text-emerald-600 font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              <span>Subscription confirmed. Check your inbox for the welcome issue.</span>
            </div>
          )}
        </section>
      </main>

      {/* In-Depth Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className={`relative w-full max-w-3xl ${
                isMidnight ? "bg-[#141212] text-[#E8E2D8]" : "bg-[#FAF8F5] text-[#1A1817]"
              } rounded-2xl shadow-2xl border ${borderTone} z-10 max-h-[92vh] overflow-y-auto p-6 sm:p-10 flex flex-col justify-between`}
            >
              {/* Reader Top Controls */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-700">
                    {selectedArticle.rubric}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-xs font-sans text-stone-500">
                    {selectedArticle.readTimeMin} min read
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleClap(selectedArticle.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/10 text-amber-700 text-xs font-sans font-bold hover:bg-amber-600/20 transition-colors"
                  >
                    <Heart size={13} className="fill-amber-600" />
                    <span>{selectedArticle.claps}</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(selectedArticle.id)}
                    className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
                  >
                    <Bookmark
                      size={16}
                      className={bookmarkedIds.has(selectedArticle.id) ? "fill-amber-600 text-amber-600" : ""}
                    />
                  </button>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Essay Content */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-5xl font-normal leading-tight">
                  {selectedArticle.title}
                </h2>

                {/* Author Card in Reader */}
                <div className="flex items-center gap-4 py-4 border-y border-stone-200 dark:border-stone-800 font-sans text-xs">
                  <div className="w-11 h-11 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-sm">
                    {selectedArticle.author.avatarInitials}
                  </div>
                  <div>
                    <strong className="block text-current text-sm">
                      {selectedArticle.author.name}
                    </strong>
                    <span className="text-stone-500">{selectedArticle.author.bio}</span>
                  </div>
                </div>

                {/* Article Prose with Drop-Cap on first paragraph */}
                <div className="space-y-6 text-base sm:text-lg leading-relaxed font-serif font-light pt-4">
                  {selectedArticle.bodyParagraphs.map((para, i) => (
                    <p key={i}>
                      {i === 0 ? (
                        <>
                          <span className="float-left text-5xl font-serif leading-none pr-3 pt-1 text-amber-700 font-normal">
                            {para.charAt(0)}
                          </span>
                          {para.slice(1)}
                        </>
                      ) : (
                        para
                      )}
                    </p>
                  ))}
                </div>

                {/* Pull Quote Box */}
                <blockquote className="my-8 p-6 rounded-xl bg-amber-600/5 border-l-4 border-amber-600 italic text-xl sm:text-2xl text-current font-serif font-light">
                  « {selectedArticle.pullQuote} »
                </blockquote>

                {/* Reader Comments Section */}
                <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-normal text-current">
                      Discussions ({selectedArticle.comments.length})
                    </h4>
                    <span className="text-xs font-sans text-stone-500">
                      Peer-reviewed responses
                    </span>
                  </div>

                  {/* Add Comment Box */}
                  <form onSubmit={handleAddComment} className="space-y-3 font-sans">
                    <textarea
                      rows={3}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Add an architectural contribution or perspective..."
                      className={`w-full p-3 rounded-xl border ${borderTone} text-xs focus:outline-none focus:border-amber-600 ${
                        isMidnight ? "bg-stone-900 text-white" : "bg-white text-stone-900"
                      }`}
                      required
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-stone-500">
                        Posting as: <strong>{newCommentAuthor}</strong>
                      </span>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold"
                      >
                        Publish Contribution
                      </button>
                    </div>
                  </form>

                  {/* Comment List */}
                  <div className="space-y-4 pt-4">
                    {selectedArticle.comments.map((c) => (
                      <div
                        key={c.id}
                        className={`p-4 rounded-xl border ${borderTone} ${cardBg} space-y-1.5 font-sans`}
                      >
                        <div className="flex justify-between items-baseline">
                          <strong className="text-xs text-current">{c.author}</strong>
                          <span className="text-[10px] text-stone-400">{c.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-stone-500">{c.role}</p>
                        <p className="text-xs text-current font-serif font-light pt-1 leading-relaxed">
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reading List Drawer */}
      <AnimatePresence>
        {showBookmarksDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookmarksDrawer(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className={`absolute right-0 top-0 bottom-0 w-full max-w-md ${
                isMidnight ? "bg-[#141212] text-[#E8E2D8]" : "bg-[#FAF8F5] text-[#1A1817]"
              } border-l ${borderTone} shadow-2xl p-6 flex flex-col justify-between`}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <Bookmark size={18} className="text-amber-600" />
                    <h3 className="font-serif text-xl">Personal Reading List</h3>
                  </div>
                  <button
                    onClick={() => setShowBookmarksDrawer(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[75vh]">
                  {bookmarkedArticles.length === 0 ? (
                    <p className="text-xs text-stone-500 italic py-12 text-center font-serif">
                      No dispatches currently saved to your queue.
                    </p>
                  ) : (
                    bookmarkedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          setSelectedArticle(art);
                          setShowBookmarksDrawer(false);
                        }}
                        className={`p-4 rounded-xl border ${borderTone} ${cardBg} cursor-pointer hover:border-amber-600 transition-colors space-y-1`}
                      >
                        <span className="text-[10px] uppercase font-bold text-amber-700">
                          {art.rubric}
                        </span>
                        <h4 className="font-serif text-base font-normal leading-snug">
                          {art.title}
                        </h4>
                        <span className="text-[11px] text-stone-500 block">
                          {art.readTimeMin} min read · {art.author.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowBookmarksDrawer(false)}
                className="w-full py-3 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold"
              >
                Close Queue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
