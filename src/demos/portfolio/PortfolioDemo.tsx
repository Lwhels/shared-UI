import React, { useState } from "react";
import confetti from "canvas-confetti";
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
  Volume2,
  VolumeX,
  Clock,
  Globe,
  SlidersHorizontal,
  Maximize2,
  Cpu,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  client: string;
  discipline: "automotive" | "spatial" | "ai" | "fashion";
  year: string;
  award: string;
  cameraSpecs: string;
  description: string;
  colorPalette: string[];
  deliverables: string[];
  gearManifest: string[];
  clientQuote: string;
}

export const PortfolioDemo: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [activeScrubberIndex, setActiveScrubberIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [isAudioAmbienceActive, setIsAudioAmbienceActive] = useState<boolean>(false);
  const [sensorGradeSlider, setSensorGradeSlider] = useState<number>(50);

  // Proposal Calculator State
  const [scopeType, setScopeType] = useState<"film" | "web3d" | "full-brand">("film");
  const [productionDays, setProductionDays] = useState<number>(3);
  const [boltMotionControl, setBoltMotionControl] = useState<boolean>(true);
  const [spatialAudioMaster, setSpatialAudioMaster] = useState<boolean>(true);
  const [droneHeavyLifter, setDroneHeavyLifter] = useState<boolean>(true);

  // Proposal Submission State
  const [clientName, setClientName] = useState("Marcus Sterling");
  const [clientEmail, setClientEmail] = useState("m.sterling@atelier-brands.com");
  const [clientCompany, setClientCompany] = useState("Porsche Design Group");
  const [timelineWeeks, setTimelineWeeks] = useState("6-8 Weeks");
  const [isSubmittingProposal, setIsSubmittingProposal] = useState(false);
  const [proposalConfirmed, setProposalConfirmed] = useState<any>(null);

  const projects: ProjectCaseStudy[] = [
    {
      id: "p1",
      index: "01",
      title: "Apex GT Alpine Velocity",
      client: "Porsche Motorsport Europe",
      discipline: "automotive",
      year: "2026",
      award: "FWA of the Month · Awwwards SOTD",
      cameraSpecs: "ARRI Alexa Mini LF · Cooke Anamorphic /i 2x",
      description: "High-octane tracking cinematography through the Swiss Furka Pass at 2,400m altitude. Custom gyro-stabilized pursuit camera chasing the 911 GT3 RS through sub-zero alpine blizzards.",
      colorPalette: ["#0C1014", "#E63946", "#F1FAEE", "#457B9D"],
      deliverables: ["90s Broadcast Sizzle Reel", "5x 9:16 Vertical Social Masters", "40 Medium-Format Hero Stills", "Dolby Atmos 7.1.4 Sound Master"],
      gearManifest: ["ARRI Alexa Mini LF", "Cooke Anamorphic /i 35mm & 65mm", "Shotover F1 Gyro Rig", "Custom FPV 6S Heavy-Lifter"],
      clientQuote: "Kronos captured the mechanical violence and aerodynamic precision of the GT3 RS with unprecedented sensory weight.",
    },
    {
      id: "p2",
      index: "02",
      title: "Monolith Hypercar World Premiere",
      client: "Rimac Automobili",
      discipline: "automotive",
      year: "2026",
      award: "Cannes Corporate Gold Dolphin",
      cameraSpecs: "RED V-Raptor XL 8K · Bolt X High-Speed Motion Arm",
      description: "Global brand launch film produced in an acoustic airplane hangar with a 30-meter curved LED volume simulating hyper-velocity horizon lights under dramatic high-contrast chiaroscuro.",
      colorPalette: ["#0A0A0C", "#8B5CF6", "#06B6D4", "#E2E8F0"],
      deliverables: ["Keynote Reveal Film", "Press Kit 8K Volumetric Renders", "Worldwide Interactive Web Configurator", "Soundtrack by Nils Frahm"],
      gearManifest: ["RED V-Raptor XL 8K", "Bolt X High-Speed Robotic Arm", "Leitz Prime T1.8 Glass", "Arri Skypanel X23 Array"],
      clientQuote: "The film set a new global benchmark for electric hypercar debuts, generating 14 million impressions in 24 hours.",
    },
    {
      id: "p3",
      index: "03",
      title: "Acoustic Silence & Form",
      client: "Bang & Olufsen Denmark",
      discipline: "spatial",
      year: "2025",
      award: "D&AD Black Pencil Nominee",
      cameraSpecs: "Phantom Flex 4K (1000fps) · Macro Probe Lenses",
      description: "Extreme slow-motion study of anodized aluminium acoustic diaphragms oscillating in micro-gravity. Every milled perforation and spun volume wheel rendered as tactile architectural sculpture.",
      colorPalette: ["#141416", "#D4AF37", "#C0C0C0", "#FAF8F5"],
      deliverables: ["60s Scandinavian Cinema Ad", "Interactive 3D Web Audio Sandbox", "Acoustic Frequency Spec Book"],
      gearManifest: ["Phantom Flex 4K High-Speed", "Laowa 24mm f/14 2X Macro Probe", "Motion Control Slider Kazu", "Binaural Dummy-Head Mics"],
      clientQuote: "An exquisite visual distillation of our 100-year Danish sound craftsmanship.",
    },
    {
      id: "p4",
      index: "04",
      title: "Zero Gravity Monolith Capsule",
      client: "Balenciaga Paris Archive",
      discipline: "fashion",
      year: "2025",
      award: "Webby Winner: Best Visual Design",
      cameraSpecs: "Sony Venice 2 8K · Hawk V-Lite Anamorphics",
      description: "A brutalist digital runway exhibition set inside a decommissioned concrete subterranean cooling tower in Berlin. Real-time motion capture models draped in sculpted carbon-fiber outerwear.",
      colorPalette: ["#050505", "#CCFF00", "#52525B", "#E4E4E7"],
      deliverables: ["Virtual Runway Experience", "Spatial Video Vision Pro App", "Photogrammetry Asset Vault"],
      gearManifest: ["Sony Venice 2 8K Full-Frame", "Hawk V-Lite 45mm Anamorphic", "Xsens MVN Motion Capture Suit", "Unreal Engine 5.4 Live Stage"],
      clientQuote: "Radical, unapologetic, and completely singular. Kronos operates in a creative category of their own.",
    },
  ];

  const filteredProjects = projects.filter(
    (p) => selectedDiscipline === "all" || p.discipline === selectedDiscipline
  );

  const activeScrubberProject = projects[activeScrubberIndex] || projects[0];

  // Proposal Calculator calculation
  const baseDayRate = scopeType === "film" ? 14000 : scopeType === "web3d" ? 9500 : 22000;
  const productionSubtotal = baseDayRate * productionDays;
  const boltCost = boltMotionControl ? 8500 : 0;
  const audioCost = spatialAudioMaster ? 4500 : 0;
  const droneCost = droneHeavyLifter ? 5500 : 0;
  const estimatedProposalTotal = productionSubtotal + boltCost + audioCost + droneCost;

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingProposal(true);

    const dossierRef = `KRN-ATELIER-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    try {
      await sendEmail({
        to: clientEmail,
        subject: `Commission Dossier Confirmed: ${dossierRef} — Kronos Atelier`,
        template: "order_confirmation",
        data: {
          customerName: clientName,
          shippingAddress: `${clientCompany} · Scope: ${scopeType.toUpperCase()}`,
          amountPaid: `Estimated Commission: $${estimatedProposalTotal.toLocaleString()}`,
          chargeId: dossierRef,
          last4: "COMMISSION",
          items: [
            `${productionDays} Production Days (${scopeType.toUpperCase()})`,
            boltMotionControl ? "Bolt X High-Speed Motion Control Arm" : "",
            spatialAudioMaster ? "Dolby Atmos 7.1.4 Spatial Audio Master" : "",
            droneHeavyLifter ? "Sub-Zero Heavy-Lifter Gyro FPV Drone" : "",
          ].filter(Boolean),
        },
      });

      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#CCFF00", "#FFFFFF", "#333333", "#888888"],
      });

      setProposalConfirmed({
        ref: dossierRef,
        name: clientName,
        email: clientEmail,
        company: clientCompany,
        total: estimatedProposalTotal,
      });

      setIsSubmittingProposal(false);
    } catch (err: any) {
      setIsSubmittingProposal(false);
      alert(err.message || "Proposal submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#060709] text-white font-sans selection:bg-[#CCFF00] selection:text-[#060709]">
      {/* Studio Worldwide Clocks & Telemetry Header */}
      <div className="bg-[#090B0E] border-b border-white/10 px-4 sm:px-8 py-2.5 text-[11px] font-mono tracking-widest flex items-center justify-between text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#CCFF00] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>KRONOS // ATELIER · TOKYO & NYC</span>
          </span>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span className="hidden md:inline">TYO 18:45 JST</span>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span className="hidden md:inline">NYC 05:45 EDT</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Audio Telemetry Synthesizer Toggle */}
          <button
            onClick={() => {
              setIsAudioAmbienceActive(!isAudioAmbienceActive);
            }}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
          >
            {isAudioAmbienceActive ? (
              <>
                <Volume2 size={13} className="text-[#CCFF00]" />
                <span className="text-[10px] text-[#CCFF00] font-bold">AUDIO TELEMETRY: ON</span>
              </>
            ) : (
              <>
                <VolumeX size={13} className="text-zinc-500" />
                <span className="text-[10px] text-zinc-500">SOUND: OFF</span>
              </>
            )}
          </button>

          <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-bold">
            BOOKING Q4 2026
          </span>
        </div>
      </div>

      {/* Brutalist Brand Header */}
      <header className="sticky top-0 z-40 bg-[#060709]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter text-white uppercase">
              Kronos
            </h1>
            <span className="text-xs font-mono text-[#CCFF00] font-bold tracking-widest">
              [ATELIER]
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest text-zinc-400">
            <a href="#reel" className="hover:text-white transition-colors">01 // REEL SCRUBBER</a>
            <a href="#works" className="hover:text-white transition-colors">02 // ARCHIVE INDEX</a>
            <a href="#lab" className="hover:text-white transition-colors">03 // COLOR SENSOR</a>
            <a href="#commission" className="hover:text-white transition-colors">04 // PROPOSAL</a>
          </nav>

          <button
            onClick={() => {
              const el = document.getElementById("commission");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-2.5 rounded-full bg-[#CCFF00] hover:bg-[#b8e600] text-[#060709] font-mono text-xs font-bold tracking-widest uppercase transition-transform active:scale-95 shadow-lg shadow-[#CCFF00]/10"
          >
            Initiate Project
          </button>
        </div>
      </header>

      {/* Monolithic Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-8 border-b border-white/10 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-[#CCFF00]">●</span>
            <span>AWARDED INDEPENDENT PRODUCTION STUDIO OF THE YEAR</span>
          </div>

          <h2 className="font-display text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.95] text-white">
            Sculpting Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-[#CCFF00]">
              Artifacts at the Edge
            </span>{" "}
            of Sensation.
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-light leading-relaxed font-mono">
            We partner with sovereign luxury automotive marques, haute horlogerie houses, and frontier AI systems to author visual experiences with raw physical mass.
          </p>
        </div>
      </section>

      {/* Interactive Horizontal Project Scrubber / Reel Preview */}
      <section id="reel" className="border-b border-white/10 bg-[#090B0E] py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400 pb-4 border-b border-white/10">
            <span>INTERACTIVE SIZZLE REEL SCRUBBER // HOVER INDEX TO LOAD TELEMETRY</span>
            <span className="text-[#CCFF00] font-bold">
              {activeScrubberProject.index} OF {projects.length.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Large Dynamic Preview Canvas */}
          <div className="relative rounded-2xl bg-[#0F131A] border border-white/15 overflow-hidden p-8 sm:p-12 shadow-2xl min-h-[380px] flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-[#CCFF00] uppercase tracking-widest block mb-1">
                  {activeScrubberProject.client}
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
                  {activeScrubberProject.title}
                </h3>
              </div>

              <div className="text-right font-mono text-xs space-y-1">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-bold block">
                  {activeScrubberProject.award}
                </span>
                <span className="text-zinc-400 text-[11px] block">
                  {activeScrubberProject.cameraSpecs}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 font-light max-w-2xl leading-relaxed my-6 font-mono">
              {activeScrubberProject.description}
            </p>

            {/* Bottom Project Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
                  Color Palette:
                </span>
                <div className="flex gap-1.5">
                  {activeScrubberProject.colorPalette.map((hex) => (
                    <div
                      key={hex}
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(activeScrubberProject)}
                className="px-5 py-2.5 rounded-full bg-white text-[#060709] font-bold text-xs tracking-wider uppercase hover:bg-[#CCFF00] transition-colors flex items-center gap-2"
              >
                <span>Examine Full Case File</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Interactive Index Scrubber Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onMouseEnter={() => setActiveScrubberIndex(idx)}
                onClick={() => setActiveScrubberIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeScrubberIndex === idx
                    ? "border-[#CCFF00] bg-white/10 text-white shadow-lg shadow-[#CCFF00]/10"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30"
                }`}
              >
                <span className="text-[#CCFF00] font-bold block text-sm mb-1">
                  // {proj.index}
                </span>
                <strong className="block text-white leading-tight font-sans">
                  {proj.client}
                </strong>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  {proj.year} · {proj.discipline}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Project Showcase Index */}
      <section id="works" className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-10 font-mono">
          <div className="space-y-1">
            <span className="text-xs text-[#CCFF00] uppercase tracking-widest">
              COMMISSION ARCHIVE (2025 — 2026)
            </span>
            <h3 className="font-display text-3xl font-extrabold uppercase text-white tracking-tight">
              Selected Works
            </h3>
          </div>

          {/* Discipline Filter */}
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Disciplines" },
              { id: "automotive", label: "Automotive" },
              { id: "spatial", label: "Spatial & Sound" },
              { id: "fashion", label: "Fashion & 3D" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDiscipline(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  selectedDiscipline === tab.id
                    ? "bg-[#CCFF00] text-[#060709] font-bold"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Rows */}
        <div className="divide-y divide-white/10">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="py-8 group cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] px-4 rounded-xl transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
                  <span className="text-[#CCFF00] font-bold">// {p.index}</span>
                  <span>{p.client}</span>
                  <span>•</span>
                  <span>{p.year}</span>
                </div>

                <h4 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-white group-hover:text-[#CCFF00] transition-colors tracking-tight">
                  {p.title}
                </h4>

                <p className="text-xs font-mono text-zinc-400 max-w-xl line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-bold">
                  {p.award}
                </span>
                <span className="text-zinc-500 text-[11px]">
                  {p.cameraSpecs.split("·")[0]}
                </span>
                <span className="text-[#CCFF00] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Dossier</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Color Sensor & RAW Film Grading Lab */}
      <section id="lab" className="border-t border-b border-white/10 bg-[#090B0E] py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 font-mono">
            <span className="text-xs text-[#CCFF00] uppercase tracking-widest">
              OPTICAL COLOR SCIENCE // LAB SIMULATOR
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
              Log-C RAW vs ACES 1.3 Film Grade
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Slide the optical sensor calibration threshold to compare flat sensor Log latitude against final mastered print emulation.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#0F131A] p-6 sm:p-8 space-y-6">
            {/* Visual Grade Box */}
            <div
              className="h-64 sm:h-80 w-full rounded-xl relative overflow-hidden flex items-center justify-center border border-white/20 transition-all"
              style={{
                filter: `contrast(${1 + sensorGradeSlider * 0.015}) saturate(${sensorGradeSlider * 0.02})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-900" />
              <div className="relative text-center p-6 space-y-2 font-mono">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#CCFF00]/10 border border-[#CCFF00] text-[#CCFF00] flex items-center justify-center mb-2">
                  <Camera size={28} />
                </div>
                <h4 className="text-xl font-bold text-white">ARRI ALEXA LF LOG-C4</h4>
                <p className="text-xs text-zinc-400">
                  Dynamic Range: 17 Stops · Wide Gamut 4
                </p>
              </div>

              <div className="absolute bottom-4 left-4 font-mono text-[11px] text-zinc-400 bg-black/60 px-3 py-1 rounded backdrop-blur">
                Sensor Level: {sensorGradeSlider}% (Raw to Master)
              </div>
            </div>

            {/* Slider Bar */}
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-zinc-400">
                <span>0% — RAW ARRI LOG-C FLAT</span>
                <span className="text-[#CCFF00] font-bold">
                  {sensorGradeSlider}% CALIBRATED
                </span>
                <span>100% — MASTERED ACES PRINT</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sensorGradeSlider}
                onChange={(e) => setSensorGradeSlider(Number(e.target.value))}
                className="w-full accent-[#CCFF00] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Production Proposal Builder */}
      <section id="commission" className="max-w-5xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center space-y-3 mb-12 font-mono">
          <span className="text-xs text-[#CCFF00] uppercase tracking-widest">
            COMMISSION PROPOSAL ENGINE
          </span>
          <h3 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            Calculate Project Scope
          </h3>
          <p className="text-xs text-zinc-400 max-w-lg mx-auto">
            Configure your technical deliverables, crew scale, and hardware package for transparent upfront budgeting.
          </p>
        </div>

        <div className="bg-[#090B0E] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl font-mono space-y-8">
          {/* Scope Selector */}
          <div className="space-y-3">
            <span className="text-xs uppercase text-zinc-400 tracking-wider block">
              1. Primary Discipline Scope:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "film", label: "Commercial Cinematic Spot", rate: "$14k/day" },
                { id: "web3d", label: "Interactive 3D Web Engine", rate: "$9.5k/day" },
                { id: "full-brand", label: "Full Global Brand Launch", rate: "$22k/day" },
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setScopeType(tier.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    scopeType === tier.id
                      ? "border-[#CCFF00] bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <strong className="block text-white text-xs mb-1 font-sans">
                    {tier.label}
                  </strong>
                  <span className="text-[11px] text-[#CCFF00]">{tier.rate}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Days Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">2. Production / Engineering Days:</span>
              <strong className="text-white text-sm">{productionDays} Days Selected</strong>
            </div>
            <input
              type="range"
              min={1}
              max={7}
              value={productionDays}
              onChange={(e) => setProductionDays(Number(e.target.value))}
              className="w-full accent-[#CCFF00] cursor-pointer"
            />
          </div>

          {/* Hardware & Sound Packages */}
          <div className="space-y-3">
            <span className="text-xs uppercase text-zinc-400 tracking-wider block">
              3. Specialized Hardware Modules:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer">
                <div>
                  <strong className="block text-white">Bolt X Robot Rig</strong>
                  <span className="text-[11px] text-zinc-400">+$8,500</span>
                </div>
                <input
                  type="checkbox"
                  checked={boltMotionControl}
                  onChange={(e) => setBoltMotionControl(e.target.checked)}
                  className="w-4 h-4 accent-[#CCFF00]"
                />
              </label>

              <label className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer">
                <div>
                  <strong className="block text-white">Dolby Atmos Master</strong>
                  <span className="text-[11px] text-zinc-400">+$4,500</span>
                </div>
                <input
                  type="checkbox"
                  checked={spatialAudioMaster}
                  onChange={(e) => setSpatialAudioMaster(e.target.checked)}
                  className="w-4 h-4 accent-[#CCFF00]"
                />
              </label>

              <label className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer">
                <div>
                  <strong className="block text-white">FPV Heavy-Lifter Drone</strong>
                  <span className="text-[11px] text-zinc-400">+$5,500</span>
                </div>
                <input
                  type="checkbox"
                  checked={droneHeavyLifter}
                  onChange={(e) => setDroneHeavyLifter(e.target.checked)}
                  className="w-4 h-4 accent-[#CCFF00]"
                />
              </label>
            </div>
          </div>

          {/* Form and Submission */}
          <form onSubmit={handleProposalSubmit} className="pt-6 border-t border-white/10 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CCFF00]"
                  required
                />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Corporate Email</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CCFF00]"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">
                  Estimated Production Budget:
                </span>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#CCFF00]">
                  ${estimatedProposalTotal.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmittingProposal}
                className="px-6 py-3.5 rounded-full bg-[#CCFF00] hover:bg-[#b8e600] text-[#060709] font-bold text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-xl shadow-[#CCFF00]/10 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmittingProposal ? "Compiling Dossier..." : "Submit Production Dossier"}
                <ArrowRight size={13} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Case File Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#090B0E] border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto space-y-6 text-xs"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[#CCFF00] font-bold block mb-0.5">
                    // CASE FILE {selectedProject.index}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-zinc-500 uppercase tracking-widest text-[10px] block">
                  Client & Accolades:
                </span>
                <strong className="text-white text-sm block">{selectedProject.client}</strong>
                <span className="text-[#CCFF00]">{selectedProject.award}</span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {selectedProject.description}
              </p>

              {/* Gear Manifest */}
              <div className="space-y-2">
                <span className="text-zinc-400 uppercase tracking-wider block">
                  Camera & Grip Manifest:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                  {selectedProject.gearManifest.map((g) => (
                    <li key={g} className="flex items-center gap-1.5 bg-white/5 p-2 rounded-lg border border-white/10">
                      <Check size={12} className="text-[#CCFF00]" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <blockquote className="p-4 rounded-xl bg-[#CCFF00]/5 border-l-2 border-[#CCFF00] text-zinc-200 italic">
                « {selectedProject.clientQuote} »
              </blockquote>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full bg-white text-[#060709] font-bold"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmed Proposal Modal */}
      <AnimatePresence>
        {proposalConfirmed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProposalConfirmed(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-[#090B0E] border border-[#CCFF00] rounded-2xl shadow-2xl p-6 text-center space-y-4 z-10 text-xs"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[#CCFF00]/10 border border-[#CCFF00] text-[#CCFF00] flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>

              <h4 className="font-display text-2xl font-extrabold uppercase text-white">
                Dossier Received
              </h4>

              <p className="text-zinc-400">
                Your commission proposal #{proposalConfirmed.ref} has been routed to Executive Creative Director. A confirmation packet has been dispatched to{" "}
                <strong className="text-white">{proposalConfirmed.email}</strong>.
              </p>

              <button
                onClick={() => setProposalConfirmed(null)}
                className="w-full py-3 rounded-full bg-[#CCFF00] text-[#060709] font-bold uppercase tracking-wider"
              >
                Return to Studio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
