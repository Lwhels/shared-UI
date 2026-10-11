import React, { useState } from "react";
import {
  Spotlight,
  ThreeDCard,
  CardContainer,
  CardBody,
  CardItem,
  MovingBorderButton,
  Carousel3D,
  InfiniteMovingCards,
  TextReveal,
  BubbleReveal,
  Magnetic,
  GlassCard,
  GlowingBadge,
} from "../../components";
import {
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  Video,
  Award,
  Eye,
  Camera,
  X,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PortfolioDemo: React.FC = () => {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const projects = [
    {
      id: "p1",
      title: "Apex GT Apex Tour",
      category: "Cinematography & Edit",
      year: "2026",
      views: "2.4M",
      description: "High-octane tracking shots through Alpine passes featuring precision stabilization and custom drone cinematography.",
      gradient: "from-amber-500/30 via-orange-600/20 to-zinc-900",
      stats: "4K HDR · 120fps",
    },
    {
      id: "p2",
      title: "Monolith Hypercar Debut",
      category: "Brand Launch Campaign",
      year: "2025",
      views: "5.1M",
      description: "Complete visual identity and launch sizzle reel capturing raw aerodynamic contours under dramatic studio lighting.",
      gradient: "from-purple-600/30 via-indigo-600/20 to-zinc-900",
      stats: "Commercial · Global",
    },
    {
      id: "p3",
      title: "Nocturne Track Sessions",
      category: "Documentary Short",
      year: "2025",
      views: "1.8M",
      description: "An intimate look into endurance racing mechanics under midnight sodium lights with spatial audio sound design.",
      gradient: "from-emerald-500/30 via-teal-700/20 to-zinc-900",
      stats: "Sound Design · Film",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center">
            <GlowingBadge variant="amber">
              AUTOMOTIVE & COMMERCIAL MEDIA STUDIO
            </GlowingBadge>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08]">
            Capturing Velocity with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              <TextReveal text="Unmatched Cinematic Vision" triggerOn="mount" />
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            We produce scroll-stopping video campaigns, commercial reels, and creative digital assets for elite brands worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => setActiveVideoModal("showreel")}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Play size={16} fill="currentColor" />
                <span>Watch 2026 Showreel</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all"
              >
                <span>Explore Works</span>
                <ArrowRight size={16} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">
            Scroll to explore
          </span>
          <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Infinite Client Ticker */}
      <section className="py-12 border-y border-white/10 bg-zinc-950/60 overflow-hidden">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest font-mono text-amber-400/80">
            Trusted by World-Class Marques & Creators
          </p>
        </div>
        <InfiniteMovingCards
          items={[
            { quote: "Vehicular Media delivered our fastest-selling vehicle launch film.", name: "Scuderia Heritage", title: "Brand Director" },
            { quote: "Every frame belongs in a gallery. True visual masters.", name: "Apex Dynamics", title: "Creative Lead" },
            { quote: "Over 12M organic views on our product release within 48 hours.", name: "Veloce Motors", title: "Head of Marketing" },
            { quote: "Flawless color science and sound design on every cut.", name: "Kinetix Studio", title: "Executive Producer" },
          ]}
          speed="normal"
        />
      </section>

      {/* 3D Perspective Project Showcase */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-display">
            Interactive 3D Project Cards
          </h2>
          <p className="text-sm text-zinc-400">
            Hover over each showcase to observe multi-layered perspective tilt with custom depth translation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <CardContainer key={proj.id} className="w-full">
              <CardBody className="bg-zinc-900/80 border border-white/10 hover:border-amber-500/40 w-full rounded-2xl p-6 backdrop-blur-xl group/card transition-shadow hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between h-[480px]">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <CardItem translateZ={30}>
                      <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {proj.category}
                      </span>
                    </CardItem>
                    <CardItem translateZ={20}>
                      <span className="text-xs text-zinc-500 font-mono">{proj.year}</span>
                    </CardItem>
                  </div>

                  <CardItem translateZ={50} className="w-full">
                    <h3 className="text-2xl font-bold font-display text-white mb-2 group-hover/card:text-amber-200 transition-colors">
                      {proj.title}
                    </h3>
                  </CardItem>

                  <CardItem translateZ={40} className="w-full">
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </CardItem>

                  {/* Visual canvas preview */}
                  <CardItem translateZ={80} rotateX={10} rotateZ={-3} className="w-full my-6">
                    <div className={`h-40 w-full rounded-xl bg-gradient-to-br ${proj.gradient} border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden group/visual`}>
                      <div className="w-12 h-12 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-amber-400 group-hover/visual:scale-110 transition-transform">
                        <Play size={18} fill="currentColor" />
                      </div>
                      <div className="absolute bottom-3 left-3 text-[11px] font-mono text-white/70">
                        {proj.stats}
                      </div>
                      <div className="absolute bottom-3 right-3 text-[11px] font-mono text-amber-300">
                        {proj.views} views
                      </div>
                    </div>
                  </CardItem>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <CardItem translateZ={30}>
                    <button
                      onClick={() => setActiveVideoModal(proj.title)}
                      className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1 group"
                    >
                      <span>Preview Reel</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </CardItem>
                  <CardItem translateZ={40}>
                    <span className="text-xs font-mono text-zinc-500">Case Study →</span>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Secret Lens: BubbleReveal Demonstration */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Color Grading Technology
          </span>
          <h2 className="text-3xl font-bold font-display">
            Interactive Bubble Reveal Lens
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            Hover your cursor across the canvas below to reveal raw log camera sensor data beneath final graded cinema footage.
          </p>
        </div>

        <div className="h-[420px] w-full rounded-2xl overflow-hidden border border-white/15 relative shadow-2xl bg-zinc-950">
          <BubbleReveal
            size={220}
            overlayContent={
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 text-center relative">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 animate-pulse">
                  <Eye size={24} />
                </div>
                <h3 className="text-2xl font-bold font-display text-white mb-2">
                  FINAL CINEMA COLOR GRADE
                </h3>
                <p className="text-sm text-zinc-400 max-w-md">
                  Move your cursor around to peer into the underlying RAW camera sensor log footage.
                </p>
                <div className="mt-4 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono border border-amber-500/30">
                  ARRI Alexa Mini LF · Rec.709 Master
                </div>
              </div>
            }
          >
            <div className="w-full h-full bg-gradient-to-r from-emerald-950 via-teal-900 to-amber-950 flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-3xl font-bold font-display text-white mb-2">
                UNGRADED S-LOG3 SENSOR
              </h3>
              <p className="text-sm text-white/80 max-w-md">
                14+ stops of dynamic range captured flat for non-destructive dynamic range sculpting.
              </p>
              <div className="mt-4 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono">
                LogC3 Flat Profile · 3200K ISO 800
              </div>
            </div>
          </BubbleReveal>
        </div>
      </section>

      {/* 3D Cylindrical Reel Carousel */}
      <section className="py-20 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="text-center mb-6 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Production Pillars
          </span>
          <h2 className="text-3xl font-bold font-display">
            3D Rotating Cylinder Carousel
          </h2>
          <p className="text-sm text-zinc-400">
            Rotate through core production disciplines in a realistic 3D cylinder.
          </p>
        </div>

        <Carousel3D
          cards={[
            {
              title: "Pursuit Vehicle Tracking",
              subtitle: "High Speed Stabilization",
              badge: "Equipment",
              content: "Customized Porsche Cayenne pursuit platform with stabilized 3-axis gyro head for zero-shake tracking up to 130 mph.",
            },
            {
              title: "Cinematic FPV Piloting",
              subtitle: "Aerial Immersion",
              badge: "Drones",
              content: "Licensed FPV drone operators capturing inches-close trajectory passes through obstacles and over vehicle hoods.",
            },
            {
              title: "Spatial Sound Design",
              subtitle: "Acoustic Fidelity",
              badge: "Post-Production",
              content: "Bespoke exhaust note telemetry recording and Dolby Atmos mastering for hair-raising engine acoustics.",
            },
            {
              title: "Color Science & LUTs",
              subtitle: "Custom Look Profiles",
              badge: "Grading",
              content: "Proprietary film emulation profiles engineered for high-contrast automotive paints and moody night horizons.",
            },
          ]}
        />
      </section>

      {/* Spotlight Services Grid */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Capabilities
          </span>
          <h2 className="text-3xl font-bold font-display">
            Radial Spotlight Grid
          </h2>
          <p className="text-sm text-zinc-400">
            Hover to inspect reactive radial lighting mapped to real-time mouse position.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Video, title: "Commercial Production", desc: "Turnkey visual storytelling from storyboard to final cinema deliverables." },
            { icon: Camera, title: "Editorial Photography", desc: "Medium-format stills for print, billboards, and high-res digital campaigns." },
            { icon: Layers, title: "Motion & VFX", desc: "Photorealistic 3D car models, holographic overlays, and compositing." },
            { icon: Award, title: "Social Campaign Strategy", desc: "Platform-optimized vertical formats engineered for viral watch completion." },
          ].map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <Spotlight key={idx} className="p-6 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold font-display text-white mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-amber-400">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </Spotlight>
            );
          })}
        </div>
      </section>

      {/* Moving Border Contact CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <GlassCard className="p-12 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-6">
            <GlowingBadge variant="amber">NEW COMMISSIONS OPEN</GlowingBadge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display">
              Ready to elevate your brand's visual story?
            </h2>
            <p className="text-sm text-zinc-400">
              Let's craft cinema-grade automotive and commercial films that leave an indelible impression.
            </p>

            <div className="pt-4 flex justify-center">
              {contactSubmitted ? (
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-semibold">
                  <CheckCircle2 size={16} />
                  <span>Inquiry Received! We'll reply within 24 hours.</span>
                </div>
              ) : (
                <MovingBorderButton
                  onClick={() => setContactSubmitted(true)}
                  duration={3500}
                  className="font-bold text-amber-300"
                >
                  Initiate Project Inquiry →
                </MovingBorderButton>
              )}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Video Modal Preview */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden p-6 shadow-2xl">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GlowingBadge variant="amber">SHOWREEL PLAYER</GlowingBadge>
                  <span className="text-sm font-display font-bold text-white">
                    {activeVideoModal}
                  </span>
                </div>

                <div className="aspect-video w-full rounded-xl bg-zinc-900 border border-white/10 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-zinc-900 to-black" />
                  <div className="relative z-10 space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-amber-500 flex items-center justify-center text-zinc-950 shadow-xl shadow-amber-500/40">
                      <Play size={24} fill="currentColor" />
                    </div>
                    <p className="text-lg font-bold text-white">
                      Playing Simulated 4K Reel: {activeVideoModal}
                    </p>
                    <p className="text-xs text-zinc-400 font-mono">
                      Mastered at 3840x2160 · 24.000 fps · ProRes 422 HQ
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 font-mono">
                  <span>Vehicular Media Production Archive</span>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="hover:text-white"
                  >
                    Close Preview [ESC]
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDemo;
