import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Spotlight,
  ThreeDCard,
  CardContainer,
  CardBody,
  CardItem,
  MovingBorder,
  MovingBorderButton,
  Carousel3D,
  InfiniteMovingCards,
  TextReveal,
  BubbleReveal,
  Magnetic,
  GlassCard,
  GlowingBadge,
  StatusDot,
  ThemeSwitcher,
  ComponentSourceModal,
} from "../components";
import { useTheme } from "../context/ThemeContext";
import { DEMO_LINKS } from "../components/Navbar";
import {
  Sparkles,
  Layers,
  Code2,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Laptop,
  Compass,
  Palette,
  Terminal,
  ChevronRight,
  Eye,
  Sliders,
} from "lucide-react";
import { motion } from "framer-motion";

export const HomeHub: React.FC = () => {
  const { theme, setTheme, themeMeta } = useTheme();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<string>("spotlight");
  const [sourceModalComponent, setSourceModalComponent] = useState<string | null>(null);
  const [scrambleCustomText, setScrambleCustomText] = useState("CRAFTING THE FUTURE");
  const [spotlightSize, setSpotlightSize] = useState(600);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const demosData = [
    {
      id: "portfolio",
      path: "/demos/portfolio",
      title: "Cinematic Brutalist Agency",
      style: "Obsidian & Electric Lime",
      desc: "Brutalist luxury creative agency with interactive audio synthesizer telemetry, horizontal project reel scrubber, RAW sensor grading slider, and production proposal builder.",
      gradient: "from-lime-500/20 via-zinc-900 to-black",
      badge: "Awwwards SOTD Style",
    },
    {
      id: "ecommerce",
      path: "/demos/ecommerce",
      title: "Scandinavian Minimalist Boutique",
      style: "Warm Alabaster & Bronze",
      desc: "Editorial luxury apparel store with real-time multi-currency conversion, quick-size hover selector, slide-out bag with courier progress bar, and turnkey Stripe checkout.",
      gradient: "from-amber-600/20 via-stone-800 to-stone-950",
      badge: "Editorial Boutique",
    },
    {
      id: "restaurant",
      path: "/demos/restaurant",
      title: "Gastronomic Michelin Atelier",
      style: "Imperial Velvet & Antique Gold",
      desc: "Michelin 3-Star Parisian atelier with interactive 4-chapter tasting menu book, sommelier wine pairing radar, floorplan table selector, and table booking engine.",
      gradient: "from-yellow-700/30 via-red-950/20 to-black",
      badge: "III Michelin Stars",
    },
    {
      id: "business",
      path: "/demos/business",
      title: "Enterprise Developer Command Center",
      style: "Cyber Indigo & Telemetry Cyan",
      desc: "High-density edge cloud platform featuring live animated SVG throughput waveforms, interactive CLI sandbox runner, dynamic capacity pricing slider, and pilot generator.",
      gradient: "from-indigo-600/30 via-cyan-950/20 to-black",
      badge: "Live Telemetry Grid",
    },
    {
      id: "blog",
      path: "/demos/blog",
      title: "Literary Journal & Long-Form Review",
      style: "Paper Ivory & Midnight Ink",
      desc: "Classical editorial publication with day/night reading mode toggle, literary drop-caps, front-page lead spread, and interactive peer discussion threads.",
      gradient: "from-amber-700/20 via-stone-900 to-black",
      badge: "Literary Journal",
    },
    {
      id: "booking",
      path: "/demos/booking",
      title: "Mediterranean Luxury Retreats",
      style: "Sun-Drenched Travertine & Azure",
      desc: "Private architectural villa sanctuary portal with interactive GPS coordinates map radar, luxury concierge add-ons (yacht & helicopter), and instant booking voucher engine.",
      gradient: "from-amber-600/20 via-orange-950/30 to-black",
      badge: "Architectural Villas",
    },
    {
      id: "social",
      path: "/demos/social",
      title: "High-Velocity Creator Network",
      style: "Midnight Graphite & Sky Blue",
      desc: "Authentic 3-column microblogging network with live character countdown, interactive animated poll voting, nested reply thread drawers, and audio spaces room.",
      gradient: "from-sky-600/30 via-purple-950/30 to-black",
      badge: "3-Column Network",
    },
    {
      id: "chat",
      path: "/demos/chat",
      title: "Dense Glass Collaboration Workspace",
      style: "Workspace Midnight & Purple",
      desc: "High-density 3-pane collaboration interface featuring workspace switcher rail, channel unread counters, live voice huddle, code blocks, and dedicated side thread drawer.",
      gradient: "from-purple-600/30 via-blue-950/30 to-black",
      badge: "3-Pane Workspace",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden border-b border-white/10">
        {/* Ambient background glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] blur-[160px] rounded-full pointer-events-none opacity-20"
          style={{ backgroundColor: themeMeta.primaryColor }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <GlowingBadge variant="amber">
              EXTRACTED FROM VEHICULAR MEDIA · PRODUCTION TESTED
            </GlowingBadge>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight leading-[1.06]">
            High-Performance Client UI Kit in{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeMeta.primaryColor}, #ffffff, ${themeMeta.primaryColor})`,
              }}
            >
              <TextReveal text="Many Different Styles." triggerOn="mount" />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Re-usable React + Tailwind + Framer Motion components extracted from real client projects.
            Includes 8 complete production-grade demo websites spanning Portfolio, E-Commerce, Restaurant, SaaS, Blog, Booking, Social, and Chat.
          </p>

          {/* Quick installation command banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-xs font-mono text-zinc-300 shadow-xl">
              <Terminal size={14} className="text-amber-400" />
              <span>npm install shared-ui</span>
              <button
                onClick={() => copyToClipboard("npm install shared-ui", "install")}
                className="p-1 hover:text-white transition-colors"
                title="Copy install command"
              >
                {copiedCode === "install" ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Magnetic strength={0.3}>
              <a
                href="#demos"
                className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                style={{ backgroundColor: themeMeta.primaryColor }}
              >
                <Compass size={16} />
                <span>Explore 8 Demo Websites</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#playground"
                className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all inline-flex items-center gap-2"
              >
                <Sliders size={16} />
                <span>Component Playground</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Demo Websites Catalog Section */}
      <section id="demos" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest">
            Full Experience Demos
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display">
            8 Tailored Demo Websites
          </h2>
          <p className="text-sm text-zinc-400">
            Each demo website features real state, domain interactions, custom micro-interactions, and distinct styling systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demosData.map((demo) => (
            <Link
              key={demo.id}
              to={demo.path}
              className="group block"
            >
              <Spotlight className="p-6 h-full flex flex-col justify-between transition-all group-hover:border-amber-500/40">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/5">
                      {demo.badge}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {demo.style}
                    </span>
                  </div>

                  {/* Thumbnail Banner */}
                  <div className={`h-36 w-full rounded-xl bg-gradient-to-br ${demo.gradient} border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-5 group-hover:scale-[1.03] transition-transform`}>
                    <span className="font-display font-bold text-white text-base text-center">
                      {demo.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono mt-1">
                      Click to Launch →
                    </span>
                  </div>

                  <h3 className="font-bold font-display text-lg text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {demo.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400">
                  <span>Open Demo</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Spotlight>
            </Link>
          ))}
        </div>
      </section>

      {/* Component Interactive Playground */}
      <section id="playground" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest">
            Laboratory
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display">
            Interactive Component Playground
          </h2>
          <p className="text-sm text-zinc-400">
            Experiment with each extracted component in isolation with real-time controls and live code snippets.
          </p>

          {/* Playground Tabs & Theme Selector */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 mt-6">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {[
                { id: "spotlight", label: "Spotlight" },
                { id: "threeDCard", label: "3D Perspective Card" },
                { id: "movingBorder", label: "Moving Border Button" },
                { id: "carousel3D", label: "3D Carousel Cylinder" },
                { id: "infiniteCards", label: "Infinite Moving Cards" },
                { id: "textReveal", label: "Text Scramble Reveal" },
                { id: "bubbleReveal", label: "Bubble Reveal Lens" },
                { id: "magnetic", label: "Magnetic Physics" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePlaygroundTab(tab.id)}
                  style={
                    activePlaygroundTab === tab.id
                      ? { backgroundColor: themeMeta.primaryColor }
                      : {}
                  }
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activePlaygroundTab === tab.id
                      ? "text-zinc-950 shadow-md font-bold"
                      : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5 shrink-0 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Component Theme:
              </span>
              <ThemeSwitcher />
            </div>
          </div>
        </div>

        {/* Playground Stage Area */}
        <div className="p-8 sm:p-12 rounded-2xl bg-zinc-950/80 border border-white/15 backdrop-blur-xl shadow-2xl">
          {/* TAB 1: SPOTLIGHT */}
          {activePlaygroundTab === "spotlight" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Spotlight Component</h3>
                  <p className="text-xs text-zinc-400">Reactive radial glow follows mouse position via Framer Motion useMotionTemplate.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSourceModalComponent("Spotlight")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                  >
                    <Code2 size={13} />
                    <span>View Raw File</span>
                  </button>
                  <label className="text-xs text-zinc-400 font-mono">Radius: {spotlightSize}px</label>
                  <input
                    type="range"
                    min="300"
                    max="900"
                    value={spotlightSize}
                    onChange={(e) => setSpotlightSize(Number(e.target.value))}
                    className="accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Spotlight
                  size={spotlightSize}
                  spotlightColor={`${themeMeta.primaryColor}2e`}
                  className="p-8 h-64 flex flex-col justify-between"
                >
                  <div>
                    <GlowingBadge
                      variant={
                        theme === "indigo"
                          ? "indigo"
                          : theme === "emerald"
                          ? "emerald"
                          : theme === "rose"
                          ? "rose"
                          : "amber"
                      }
                    >
                      {themeMeta.name}
                    </GlowingBadge>
                    <h4 className="text-lg font-bold text-white mt-3">Hover across this canvas</h4>
                    <p className="text-xs text-zinc-400 mt-2">Notice how the radial light gently illuminates the edges and background gradient.</p>
                  </div>
                  <span className="text-xs font-mono" style={{ color: themeMeta.primaryColor }}>
                    Position Tracking Active ({themeMeta.primaryColor}) →
                  </span>
                </Spotlight>

                <Spotlight
                  size={spotlightSize}
                  spotlightColor={`${themeMeta.primaryColor}3d`}
                  className="p-8 h-64 flex flex-col justify-between"
                >
                  <div>
                    <GlowingBadge
                      variant={
                        theme === "indigo"
                          ? "indigo"
                          : theme === "emerald"
                          ? "emerald"
                          : theme === "rose"
                          ? "rose"
                          : "amber"
                      }
                    >
                      Theme Preset
                    </GlowingBadge>
                    <h4 className="text-lg font-bold text-white mt-3">Smooth Motion Interpolation</h4>
                    <p className="text-xs text-zinc-400 mt-2">Zero jank or CSS lag on high refresh rate displays.</p>
                  </div>
                  <span className="text-xs font-mono" style={{ color: themeMeta.primaryColor }}>
                    Active Color: {themeMeta.primaryColor} →
                  </span>
                </Spotlight>
              </div>

              {/* Code Snippet */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`import { Spotlight } from "shared-ui";\n\n<Spotlight size={${spotlightSize}} spotlightColor="${themeMeta.primaryColor}2e">\n  <h3>Interactive Card</h3>\n</Spotlight>`}</code>
                <button
                  onClick={() => copyToClipboard(`<Spotlight size={${spotlightSize}} spotlightColor="${themeMeta.primaryColor}2e">\n  <h3>Interactive Card</h3>\n</Spotlight>`, "code-spotlight")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                  title="Copy snippet"
                >
                  {copiedCode === "code-spotlight" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: THREEDCARD */}
          {activePlaygroundTab === "threeDCard" && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">3D Perspective Tilt Card</h3>
                  <p className="text-xs text-zinc-400">True 3D perspective with independent translateZ layers and rotation dampeners.</p>
                </div>
                <button
                  onClick={() => setSourceModalComponent("ThreeDCard")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Code2 size={13} />
                  <span>View Raw File</span>
                </button>
              </div>

              <div className="flex justify-center">
                <CardContainer className="w-full max-w-md">
                  <CardBody className="bg-zinc-900 border border-white/10 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-between h-[420px] shadow-2xl">
                    <div>
                      <CardItem translateZ={30} className="mb-2">
                        <GlowingBadge variant="amber">3D PERSPECTIVE</GlowingBadge>
                      </CardItem>
                      <CardItem translateZ={50} className="w-full">
                        <h4 className="text-2xl font-bold font-display text-white mb-2">Float Anything in Space</h4>
                      </CardItem>
                      <CardItem translateZ={40} className="w-full">
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Hover your cursor over the card boundary to watch elements tilt and separate across the Z-axis.
                        </p>
                      </CardItem>

                      <CardItem translateZ={80} rotateX={12} rotateZ={-4} className="w-full my-6">
                        <div className="h-32 w-full rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center font-bold text-lg shadow-xl text-zinc-950">
                          translateZ: 80px
                        </div>
                      </CardItem>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <CardItem translateZ={30}>
                        <span className="text-xs font-mono text-zinc-400">CardContainer Hook</span>
                      </CardItem>
                      <CardItem translateZ={40}>
                        <button className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs">
                          Try Action
                        </button>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`<CardContainer>\n  <CardBody>\n    <CardItem translateZ={50}>Title</CardItem>\n    <CardItem translateZ={80}>Floating Graphic</CardItem>\n  </CardBody>\n</CardContainer>`}</code>
                <button
                  onClick={() => copyToClipboard(`<CardContainer>\n  <CardBody>\n    <CardItem translateZ={50}>Title</CardItem>\n    <CardItem translateZ={80}>Floating Graphic</CardItem>\n  </CardBody>\n</CardContainer>`, "code-3d")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCode === "code-3d" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: MOVING BORDER */}
          {activePlaygroundTab === "movingBorder" && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Moving Border Buttons</h3>
                  <p className="text-xs text-zinc-400">SVG path progress traced continuously with requestAnimationFrame glowing beam.</p>
                </div>
                <button
                  onClick={() => setSourceModalComponent("MovingBorder")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Code2 size={13} />
                  <span>View Raw File</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 py-12">
                <MovingBorderButton
                  duration={2500}
                  borderClassName={`bg-[radial-gradient(${themeMeta.primaryColor}_40%,transparent_60%)]`}
                  className="font-bold"
                  style={{ color: themeMeta.primaryColor }}
                >
                  {themeMeta.name} Active Beam
                </MovingBorderButton>

                <MovingBorderButton
                  duration={3500}
                  borderClassName="bg-[radial-gradient(var(--indigo-500,_#6366f1)_40%,transparent_60%)]"
                  className="font-bold text-indigo-300"
                >
                  Indigo Cyber Beam
                </MovingBorderButton>

                <MovingBorderButton
                  duration={2000}
                  borderRadius="0.75rem"
                  borderClassName="bg-[radial-gradient(var(--emerald-500,_#10b981)_40%,transparent_60%)]"
                  className="font-bold text-emerald-300"
                >
                  Emerald Precision
                </MovingBorderButton>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`import { MovingBorderButton } from "shared-ui";\n\n<MovingBorderButton duration={3000} borderRadius="1.5rem">\n  Initiate Action →\n</MovingBorderButton>`}</code>
                <button
                  onClick={() => copyToClipboard(`<MovingBorderButton duration={3000} borderRadius="1.5rem">\n  Initiate Action →\n</MovingBorderButton>`, "code-moving")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCode === "code-moving" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CAROUSEL 3D */}
          {activePlaygroundTab === "carousel3D" && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-xl font-bold font-display text-white">3D Cylinder Carousel</h3>
                <p className="text-xs text-zinc-400">Cards rotating in true 3D cylinder space with arrow keys and dot navigation.</p>
              </div>

              <Carousel3D
                cards={[
                  { title: "Strategy Phase", subtitle: "Architecture", badge: "01", content: "Comprehensive scoping, data architecture, and motion wireframes." },
                  { title: "Design Sprint", subtitle: "High Fidelity", badge: "02", content: "Tokenized dark theme layouts with custom specular highlights." },
                  { title: "Production Build", subtitle: "Zero Bloat", badge: "03", content: "Modular client component export with automated TypeScript types." },
                  { title: "Launch & Scale", subtitle: "Global CDN", badge: "04", content: "Static optimization with lightning-fast sub-second cold starts." },
                ]}
              />

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`import { Carousel3D } from "shared-ui";\n\n<Carousel3D cards={cardsArray} showArrows={true} showDots={true} />`}</code>
                <button
                  onClick={() => copyToClipboard(`<Carousel3D cards={cardsArray} showArrows={true} showDots={true} />`, "code-carousel")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCode === "code-carousel" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: INFINITE CARDS */}
          {activePlaygroundTab === "infiniteCards" && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-xl font-bold font-display text-white">Infinite Moving Cards</h3>
                <p className="text-xs text-zinc-400">Continuous endless marquee ticker with pause-on-hover and directional controls.</p>
              </div>

              <InfiniteMovingCards
                items={[
                  { quote: "Seamless physics and high FPS on every component.", name: "Vercel Alumni", title: "Principal Engineer" },
                  { quote: "Extracted perfectly from Vehicular Media into a reusable kit.", name: "Studio Director", title: "Agency Lead" },
                  { quote: "The 3D carousel cylinder blew our client away.", name: "Creative Technologist", title: "San Francisco" },
                  { quote: "Truly high-craft component architecture.", name: "Product Design VP", title: "New York" },
                ]}
                speed="normal"
              />

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`import { InfiniteMovingCards } from "shared-ui";\n\n<InfiniteMovingCards items={quotes} direction="left" speed="normal" pauseOnHover />`}</code>
                <button
                  onClick={() => copyToClipboard(`<InfiniteMovingCards items={quotes} direction="left" speed="normal" pauseOnHover />`, "code-inf")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCode === "code-inf" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: TEXT REVEAL */}
          {activePlaygroundTab === "textReveal" && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Text Scramble Matrix Reveal</h3>
                  <p className="text-xs text-zinc-400">Character bank randomizer decrypting sequentially into targeted strings.</p>
                </div>
                <button
                  onClick={() => setSourceModalComponent("TextReveal")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Code2 size={13} />
                  <span>View Raw File</span>
                </button>
              </div>

              <div className="text-center py-10 space-y-4">
                <div className="text-3xl sm:text-5xl font-mono text-amber-400 font-bold">
                  <TextReveal key={scrambleCustomText} text={scrambleCustomText} triggerOn="mount" />
                </div>

                <div className="max-w-md mx-auto pt-4 flex gap-2">
                  <input
                    type="text"
                    value={scrambleCustomText}
                    onChange={(e) => setScrambleCustomText(e.target.value)}
                    placeholder="Type to test scramble..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button
                    onClick={() => setScrambleCustomText((t) => t + " ")}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white"
                  >
                    Replay
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`import { TextReveal } from "shared-ui";\n\n<TextReveal text="SYSTEM.INITIALIZED" triggerOn="inView" scrambleSpeed={30} />`}</code>
                <button
                  onClick={() => copyToClipboard(`<TextReveal text="SYSTEM.INITIALIZED" triggerOn="inView" scrambleSpeed={30} />`, "code-text")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCode === "code-text" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: BUBBLE REVEAL */}
          {activePlaygroundTab === "bubbleReveal" && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Bubble Reveal Circular Lens</h3>
                  <p className="text-xs text-zinc-400">Spring follower mask revealing underlying canvas with illuminated perimeter ring.</p>
                </div>
                <button
                  onClick={() => setSourceModalComponent("BubbleReveal")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Code2 size={13} />
                  <span>View Raw File</span>
                </button>
              </div>

              <div className="h-[360px] w-full rounded-2xl overflow-hidden border border-white/15 relative shadow-2xl bg-zinc-950">
                <BubbleReveal
                  size={200}
                  overlayContent={
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-8 text-center">
                      <Eye size={28} className="text-amber-400 mb-3 animate-pulse" />
                      <h4 className="text-2xl font-bold font-display text-white mb-2">BASE MASK SURFACE</h4>
                      <p className="text-xs text-zinc-400 max-w-sm">Hover your cursor across the box to reveal the high-vibrancy layer underneath.</p>
                    </div>
                  }
                >
                  <div className="w-full h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 flex flex-col items-center justify-center p-8 text-center">
                    <h4 className="text-3xl font-bold font-display text-white drop-shadow-md">SECRET CHROMATIC REALM</h4>
                    <p className="text-xs text-white/90 max-w-sm mt-2">Dynamic maskPosition style updated without component re-renders.</p>
                  </div>
                </BubbleReveal>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`import { BubbleReveal } from "shared-ui";\n\n<BubbleReveal size={200} overlayContent={<BaseView />}>\n  <SecretView />\n</BubbleReveal>`}</code>
                <button
                  onClick={() => copyToClipboard(`<BubbleReveal size={200} overlayContent={<BaseView />}>\n  <SecretView />\n</BubbleReveal>`, "code-bubble")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCode === "code-bubble" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: MAGNETIC */}
          {activePlaygroundTab === "magnetic" && (
            <div className="space-y-8">
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-xl font-bold font-display text-white">Magnetic Physics Component</h3>
                <p className="text-xs text-zinc-400">Gently pulls DOM nodes toward cursor coordinates using spring damped harmonic oscillators.</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-12 py-16">
                <Magnetic strength={0.4}>
                  <button className="px-8 py-4 rounded-full bg-amber-500 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/30">
                    High Attraction (0.4)
                  </button>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <button className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm">
                    Subtle Attraction (0.2)
                  </button>
                </Magnetic>

                <Magnetic strength={0.6}>
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-xl shadow-indigo-600/30">
                    ⚡
                  </div>
                </Magnetic>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs flex justify-between items-center text-zinc-300">
                <code>{`import { Magnetic } from "shared-ui";\n\n<Magnetic strength={0.3}>\n  <button>Magnetic Button</button>\n</Magnetic>`}</code>
                <button
                  onClick={() => copyToClipboard(`<Magnetic strength={0.3}>\n  <button>Magnetic Button</button>\n</Magnetic>`, "code-mag")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {copiedCode === "code-mag" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Re-usable Component Index Table */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            API Documentation
          </span>
          <h2 className="text-3xl font-bold font-display">
            Exported Component Directory
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-zinc-400 font-mono uppercase tracking-wider">
              <tr>
                <th className="p-4">Component</th>
                <th className="p-4">Key Props</th>
                <th className="p-4">Underlying Mechanics</th>
                <th className="p-4">Primary Use Cases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="p-4 font-bold text-amber-400">Spotlight</td>
                <td className="p-4 text-zinc-300">size, spotlightColor, borderGlow</td>
                <td className="p-4 text-zinc-400">useMotionTemplate radial gradients</td>
                <td className="p-4 text-zinc-400">Card grids, feature spotlights, catalog items</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-amber-400">ThreeDCard</td>
                <td className="p-4 text-zinc-300">translateZ, rotateX, rotateY, rotateZ</td>
                <td className="p-4 text-zinc-400">preserve-3d CSS perspective & context</td>
                <td className="p-4 text-zinc-400">Pricing cards, project showcases, product heroes</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-amber-400">MovingBorder</td>
                <td className="p-4 text-zinc-300">duration, borderRadius, rx, ry</td>
                <td className="p-4 text-zinc-400">SVG getTotalLength() animation loop</td>
                <td className="p-4 text-zinc-400">High-conversion CTAs, glowing borders</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-amber-400">Carousel3D</td>
                <td className="p-4 text-zinc-300">cards, showArrows, showDots, autoPlay</td>
                <td className="p-4 text-zinc-400">Cylindrical tangent math & rotation matrix</td>
                <td className="p-4 text-zinc-400">Reels, testimonials, VIP concierge experiences</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-amber-400">InfiniteMovingCards</td>
                <td className="p-4 text-zinc-300">items, direction, speed, pauseOnHover</td>
                <td className="p-4 text-zinc-400">CSS animation ticker with duplicated node cloning</td>
                <td className="p-4 text-zinc-400">Customer logos, reviews, quote ticker</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-amber-400">TextReveal</td>
                <td className="p-4 text-zinc-300">text, triggerOn, scrambleSpeed, chars</td>
                <td className="p-4 text-zinc-400">Iterative matrix character randomizer</td>
                <td className="p-4 text-zinc-400">Hero titles, badges, secret codes</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-amber-400">BubbleReveal</td>
                <td className="p-4 text-zinc-300">size, ringColor, overlayContent</td>
                <td className="p-4 text-zinc-400">Radial gradient mask position spring tracker</td>
                <td className="p-4 text-zinc-400">Before/After comparisons, RAW color grade lens</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-amber-400">Magnetic</td>
                <td className="p-4 text-zinc-300">strength, active</td>
                <td className="p-4 text-zinc-400">Framer Motion spring physics & cursor bounds</td>
                <td className="p-4 text-zinc-400">Action buttons, navbar items, avatars</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <ComponentSourceModal
        componentName={sourceModalComponent}
        onClose={() => setSourceModalComponent(null)}
      />
    </div>
  );
};

export default HomeHub;
