import React, { useState } from "react";
import confetti from "canvas-confetti";
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
import { sendEmail } from "../../services/emailService";
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
  Sliders,
  DollarSign,
  Send,
  Calendar,
  Film,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  views: string;
  description: string;
  gradient: string;
  stats: string;
  overview: string;
  deliverables: string[];
  gear: string[];
}

export const PortfolioDemo: React.FC = () => {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);

  // Quote Calculator State
  const [serviceTier, setServiceTier] = useState<"commercial" | "social" | "brand">("commercial");
  const [shootingDays, setShootingDays] = useState(2);
  const [droneIncluded, setDroneIncluded] = useState(true);
  const [soundDesign, setSoundDesign] = useState(true);
  const [colorGrading, setColorGrading] = useState(true);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactBudget, setContactBudget] = useState("$25k - $50k");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const projects: ProjectCaseStudy[] = [
    {
      id: "p1",
      title: "Apex GT Alpine Expedition",
      client: "Porsche Motorsport Europe",
      category: "Commercial Film & Stills",
      year: "2026",
      views: "2.4M",
      description: "High-octane tracking shots through Alpine passes featuring precision gyro stabilization and custom drone cinematography.",
      gradient: "from-amber-500/30 via-orange-600/20 to-zinc-900",
      stats: "4K HDR · 120fps",
      overview: "Shot across 4 days in the Swiss Furka Pass at 2,400m altitude. Required custom heated battery enclosures for the pursuit camera vehicle and sub-zero drone flight permissions.",
      deliverables: ["90s Cinematic Broadcast Spot", "5x 9:16 Vertical Social Cutdowns", "40 Medium Format Hero Stills", "Dolby Atmos Exhaust Audio Master"],
      gear: ["ARRI Alexa Mini LF", "Cooke Anamorphic /i Full Frame Plus", "Shotover F1 Gyro Head", "Custom FPV 6S Cinelifter"],
    },
    {
      id: "p2",
      title: "Monolith Hypercar Global Debut",
      client: "Rimac Automobili",
      category: "Global Brand Launch",
      year: "2025",
      views: "5.1M",
      description: "Complete visual identity and launch sizzle reel capturing raw aerodynamic contours under dramatic studio lighting.",
      gradient: "from-purple-600/30 via-indigo-600/20 to-zinc-900",
      stats: "Commercial · Worldwide",
      overview: "Filmed in an airplane hangar in Valencia with robotic motion control arms and a 30-meter curved LED volume simulating hyper-velocity horizon lights.",
      deliverables: ["Keynote Reveal Film", "Press Kit 8K Renders", "Worldwide Social Campaign", "B-Roll Engineering Archive"],
      gear: ["RED V-Raptor XL 8K", "Bolt X High Speed Motion Control Rig", "Leitz Prime Lenses"],
    },
    {
      id: "p3",
      title: "Nocturne Endurance Sessions",
      client: "Scuderia Corse",
      category: "Documentary Short",
      year: "2025",
      views: "1.8M",
      description: "An intimate look into endurance racing mechanics under midnight sodium lights with spatial audio sound design.",
      gradient: "from-emerald-500/30 via-teal-700/20 to-zinc-900",
      stats: "Film Festival Selection",
      overview: "An unfiltered 15-minute documentary covering the 24 Hours of Nürburgring. Captured entirely handheld and from hot pit lanes amidst screaming V8s and tire smoke.",
      deliverables: ["15-Minute Short Film", "Festival 4K DCP Print", "Original Vinyl Soundtrack"],
      gear: ["Sony FX9 with Raw Back", "Fujinon Premista Zooms", "Sound Devices 833 8-Channel Recorder"],
    },
  ];

  // Dynamic Quote Calculation
  const baseRate = serviceTier === "commercial" ? 18000 : serviceTier === "brand" ? 12000 : 7500;
  const dayRate = 4500 * shootingDays;
  const droneFee = droneIncluded ? 3500 : 0;
  const soundFee = soundDesign ? 2500 : 0;
  const colorFee = colorGrading ? 3000 : 0;
  const estimatedTotal = baseRate + dayRate + droneFee + soundFee + colorFee;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;

    setIsSubmitting(true);
    await sendEmail({
      to: contactEmail,
      subject: `Project Inquiry Received: ${contactName || "Client"} · Vehicular Media`,
      template: "contact_proposal",
      data: {
        clientName: contactName,
        budgetRange: contactBudget,
        message: contactMessage,
        estimatedQuote: `$${estimatedTotal.toLocaleString()}`,
        serviceTier,
        shootingDays,
      },
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });

    setIsSubmitting(false);
    setContactSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
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
            We produce scroll-stopping commercial campaigns, automotive films, and creative digital assets for elite brands worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => setActiveVideoModal("2026 Showreel Reel")}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Play size={16} fill="currentColor" />
                <span>Watch 2026 Showreel</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#calculator"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all"
              >
                <Sliders size={16} />
                <span>Estimate Production Cost</span>
              </a>
            </Magnetic>
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
            Hover over each showcase to observe multi-layered perspective tilt. Click "Case Study" to inspect technical shooting breakdowns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <CardContainer key={proj.id} className="w-full">
              <CardBody className="bg-zinc-900/80 border border-white/10 hover:border-amber-500/40 w-full rounded-2xl p-6 backdrop-blur-xl group/card transition-shadow hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between h-[490px]">
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
                    <div className={`h-40 w-full rounded-xl bg-gradient-to-br ${proj.gradient} border border-white/10 flex flex-col items-center justify-center p-4 relative overflow-hidden group/visual cursor-pointer`}
                      onClick={() => setActiveVideoModal(proj.title)}
                    >
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
                    <button
                      onClick={() => setSelectedCaseStudy(proj)}
                      className="text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4"
                    >
                      Case Study →
                    </button>
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

      {/* Production Cylinder Carousel */}
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

      {/* Interactive Production Quote & Budget Estimator */}
      <section id="calculator" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Instant Scoping
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Interactive Production Budget Estimator
          </h2>
          <p className="text-sm text-zinc-400">
            Customize scope, production days, and post-production modules to generate a real-time transparent estimate.
          </p>
        </div>

        <GlassCard className="p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Campaign Scope Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "commercial", label: "Commercial Spot", desc: "$18k Base" },
                    { id: "brand", label: "Brand Film", desc: "$12k Base" },
                    { id: "social", label: "Social Suite", desc: "$7.5k Base" },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setServiceTier(tier.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        serviceTier === tier.id
                          ? "bg-amber-500/20 border-amber-500 text-white"
                          : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className="text-xs font-bold">{tier.label}</div>
                      <div className="text-[10px] text-amber-400 font-mono mt-0.5">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-2">
                  <span>Shooting Days: <strong className="text-amber-400">{shootingDays} Days</strong></span>
                  <span className="text-zinc-500 font-mono">$4,500 / day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={shootingDays}
                  onChange={(e) => setShootingDays(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <span className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Add-on Modules
                </span>
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer text-xs">
                  <span>Licensed FPV Pursuit Drone (+$3,500)</span>
                  <input
                    type="checkbox"
                    checked={droneIncluded}
                    onChange={(e) => setDroneIncluded(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer text-xs">
                  <span>Spatial Audio & Dolby Master (+$2,500)</span>
                  <input
                    type="checkbox"
                    checked={soundDesign}
                    onChange={(e) => setSoundDesign(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer text-xs">
                  <span>Custom Look LUT & Color Grading (+$3,000)</span>
                  <input
                    type="checkbox"
                    checked={colorGrading}
                    onChange={(e) => setColorGrading(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                </label>
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-8 rounded-2xl bg-zinc-950 border border-amber-500/30 flex flex-col justify-between text-center space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Estimated Production Budget
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white mt-2">
                  ${estimatedTotal.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Includes full director treatment, raw camera packages, location scouting, and multi-format master exports.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setContactMessage(`Hi Vehicular Media team, I would like to move forward with a ${serviceTier} package spanning ${shootingDays} days with estimated budget $${estimatedTotal.toLocaleString()}.`);
                    const formEl = document.getElementById("contact");
                    formEl?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-transform active:scale-95"
                >
                  Lock in this Estimate →
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Production Inquiry Form with Mock Resend Integration */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
        <GlassCard className="p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-6 text-center">
            <GlowingBadge variant="amber">COMMISSIONS OPEN</GlowingBadge>
            <h2 className="text-3xl sm:text-4xl font-bold font-display">
              Initiate a Project Commission
            </h2>
            <p className="text-sm text-zinc-400">
              Submit your project brief below. Our team dispatches an automated proposal receipt to your email via the integrated email service.
            </p>

            {contactSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 size={36} className="mx-auto text-emerald-400" />
                <h4 className="text-lg font-bold text-white">Proposal Dispatched!</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  A receipt has been dispatched to <strong className="text-white">{contactEmail}</strong>. You can inspect the email payload in the floating "API Setup" drawer!
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Christian Von Koenigsegg"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-zinc-300">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@marquecars.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-300">Project Brief & Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe vehicle type, target shoot locations, visual reference films, and target delivery deadline..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-transform active:scale-95"
                  >
                    {isSubmitting ? "Transmitting Proposal..." : "Submit Project Commission →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </GlassCard>
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl relative my-8 space-y-6"
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                    {selectedCaseStudy.client}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{selectedCaseStudy.year}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
                  {selectedCaseStudy.title}
                </h2>

                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedCaseStudy.overview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-amber-400 mb-2 font-semibold">
                      Deliverables Provided
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {selectedCaseStudy.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase text-amber-400 mb-2 font-semibold">
                      Production Camera Package
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {selectedCaseStudy.gear.map((g, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Film size={13} className="text-amber-400 shrink-0" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs text-zinc-400 font-mono">
                  <span>Vehicular Media Production Archive · Case Study #{selectedCaseStudy.id}</span>
                  <button
                    onClick={() => setActiveVideoModal(selectedCaseStudy.title)}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400"
                  >
                    Play Reel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Modal Preview */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden p-6 shadow-2xl space-y-4">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

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
                    Playing Master 4K Cinema Reel: {activeVideoModal}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDemo;
