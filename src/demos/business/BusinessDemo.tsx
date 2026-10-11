import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { processPayment } from "../../services/paymentService";
import { sendEmail } from "../../services/emailService";
import {
  Zap,
  BarChart3,
  Cpu,
  Shield,
  Layers,
  ArrowRight,
  Check,
  TrendingUp,
  Sliders,
  Sparkles,
  Server,
  Users,
  AlertTriangle,
  Play,
  RotateCcw,
  Calendar,
  X,
  Lock,
  CheckCircle2,
  Terminal,
  Activity,
  Globe,
  Radio,
  Copy,
  ExternalLink,
  ChevronRight,
  HardDrive,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BusinessDemo: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [monthlyRequestsMillions, setMonthlyRequestsMillions] = useState<number>(5);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"throughput" | "regions" | "chaos">("throughput");
  const [activeCliTab, setActiveCliTab] = useState<"curl" | "typescript" | "python" | "go">("curl");
  const [cliRunning, setCliRunning] = useState(false);
  const [cliOutput, setCliOutput] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live Simulated Telemetry Dashboard State
  const [qps, setQps] = useState(14820);
  const [errorRate, setErrorRate] = useState(0.012);
  const [latencyP99, setLatencyP99] = useState(11);
  const [isAttackSimulated, setIsAttackSimulated] = useState(false);
  const [isAutoRemediating, setIsAutoRemediating] = useState(false);

  // Enterprise Pilot Modal
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("David Henderson");
  const [leadEmail, setLeadEmail] = useState("d.henderson@hyperion.io");
  const [companyName, setCompanyName] = useState("Hyperion Autonomous Systems");
  const [selectedCloud, setSelectedCloud] = useState("AWS (Multi-Region US/EU)");
  const [pilotCompliance, setPilotCompliance] = useState<string[]>(["SOC2 Type II", "HIPAA"]);
  const [isDeployingPilot, setIsDeployingPilot] = useState(false);
  const [pilotConfirmed, setPilotConfirmed] = useState<any>(null);

  // Fluctuate telemetry values smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAttackSimulated) {
        setQps((prev) => Math.floor(prev + (Math.random() * 120 - 60)));
        setErrorRate((prev) => Math.max(0.005, +(prev + (Math.random() * 0.004 - 0.002)).toFixed(3)));
        setLatencyP99((prev) => Math.max(8, Math.floor(prev + (Math.random() * 2 - 1))));
      }
    }, 1800);
    return () => clearInterval(timer);
  }, [isAttackSimulated]);

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSimulateAttack = () => {
    setIsAttackSimulated(true);
    setQps(94200);
    setErrorRate(3.84);
    setLatencyP99(184);
  };

  const handleAutoRemediate = () => {
    setIsAutoRemediating(true);
    setTimeout(() => {
      setIsAttackSimulated(false);
      setIsAutoRemediating(false);
      setErrorRate(0.008);
      setLatencyP99(9);
      setQps(15200);
    }, 1400);
  };

  const handleExecuteCli = () => {
    setCliRunning(true);
    setCliOutput(null);
    setTimeout(() => {
      setCliRunning(false);
      setCliOutput(
        JSON.stringify(
          {
            status: "success",
            deploymentId: "dpl_98a7f10b3e",
            cluster: "kronos-edge-eu-central",
            coldStartTimeMs: 0.84,
            routingStrategy: "anycast-optimal-latency",
            certificate: "auto-issued-lets-encrypt",
            url: "https://fabric-98a7.edge.kronos.io",
            edgeReplicas: 48,
          },
          null,
          2
        )
      );
    }, 850);
  };

  const handlePilotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeployingPilot(true);

    const token = `KRN_PILOT_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

    try {
      await sendEmail({
        to: leadEmail,
        subject: `Enterprise Fabric Cluster Provisioned: ${token}`,
        template: "order_confirmation",
        data: {
          customerName: leadName,
          shippingAddress: `${companyName} · ${selectedCloud}`,
          amountPaid: "30-Day Dedicated Enterprise Pilot (Zero Charge)",
          chargeId: token,
          last4: "SOC2-ENT",
          items: [
            "48 Dedicated Global Edge Anycast PoPs",
            "Hardware Security Module (HSM) Key Isolation",
            "24/7 Dedicated Staff Site Reliability Engineer",
          ],
        },
      });

      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6366F1", "#06B6D4", "#10B981", "#FFFFFF"],
      });

      setPilotConfirmed({
        token,
        company: companyName,
        email: leadEmail,
        cloud: selectedCloud,
      });

      setIsDeployingPilot(false);
    } catch (err: any) {
      setIsDeployingPilot(false);
      alert(err.message || "Failed to schedule enterprise review");
    }
  };

  // Pricing calculations
  const basePriceMultiplier = billingCycle === "annual" ? 0.8 : 1.0;
  const devPlanPrice = Math.round(49 * basePriceMultiplier);
  const teamPlanPrice = Math.round((199 + monthlyRequestsMillions * 18) * basePriceMultiplier);
  const calculatedSavings = Math.round(monthlyRequestsMillions * 1400 * (billingCycle === "annual" ? 12 : 1));

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Live Global Fabric Status Ribbon */}
      <div className="bg-[#0B101D] border-b border-slate-800 text-xs font-mono px-4 sm:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <strong className="tracking-wide">ALL 48 GLOBAL POPS HEALTHY</strong>
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">
            Global P99: <strong className="text-slate-200">{latencyP99}ms</strong>
          </span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">
            Telemetry Ingest: <strong className="text-cyan-400">{qps.toLocaleString()} rps</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span className="hidden sm:inline">Fabric Engine v4.18.2-lts</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px]">
            SOC2 TYPE II
          </span>
        </div>
      </div>

      {/* Enterprise Platform Header */}
      <header className="sticky top-0 z-40 bg-[#070A12]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-lg shadow-indigo-500/20">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base">Kronos Fabric</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  Enterprise
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-500">Autonomous Edge Cloud</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-400">
            <a href="#telemetry" className="hover:text-white transition-colors">Live Telemetry</a>
            <a href="#cli" className="hover:text-white transition-colors">CLI Sandbox</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing Matrix</a>
            <a href="#compliance" className="hover:text-white transition-colors">SLA & Security</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPilotModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2"
            >
              <span>Provision Pilot</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* Command Center Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            <Activity size={13} className="text-cyan-400" />
            <span>SUB-MILLISECOND COLD STARTS ACROSS 48 REGIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            The Sovereign Edge Compute Fabric <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
              For Mission-Critical Systems.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate server management, DNS routing latency, and cloud lock-in. Deploy distributed state machines, AI inference proxies, and WebAssembly containers in a single shell command.
          </p>

          {/* CLI One-Liner Box */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-3 bg-[#0E1526] border border-slate-700/80 rounded-xl px-4 py-3 font-mono text-xs text-slate-200 shadow-2xl">
              <span className="text-indigo-400">$</span>
              <span>curl -fsSL https://get.kronos.io | sh && kronos deploy</span>
              <button
                onClick={() =>
                  copySnippet(
                    "curl -fsSL https://get.kronos.io | sh && kronos deploy",
                    "hero-cli"
                  )
                }
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy Command"
              >
                {copiedCode === "hero-cli" ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            <button
              onClick={() => setIsPilotModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold transition-colors border border-slate-700 flex items-center gap-2"
            >
              <Calendar size={13} className="text-cyan-400" />
              <span>Book Architecture Call</span>
            </button>
          </div>
        </div>
      </section>

      {/* Live Interactive Telemetry Console */}
      <section id="telemetry" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="bg-[#0B101D] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Console Header Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E1424]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="font-mono text-xs font-bold text-slate-200 ml-2">
                kronos-telemetry-engine://global-mesh
              </span>
            </div>

            {/* Console Switch Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveConsoleTab("throughput")}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  activeConsoleTab === "throughput"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Throughput Waveform
              </button>
              <button
                onClick={() => setActiveConsoleTab("regions")}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  activeConsoleTab === "regions"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Edge PoP Latency
              </button>
              <button
                onClick={() => setActiveConsoleTab("chaos")}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                  activeConsoleTab === "chaos"
                    ? "bg-indigo-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Chaos Simulator
              </button>
            </div>
          </div>

          {/* Metric KPI Gauges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-800 border-b border-slate-800 font-mono">
            <div className="p-5">
              <span className="text-[11px] text-slate-400 block mb-1">TOTAL INGESTION</span>
              <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                <span>{qps.toLocaleString()}</span>
                <span className="text-xs text-cyan-400">rps</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">▲ +14.2% week-over-week</span>
            </div>

            <div className="p-5">
              <span className="text-[11px] text-slate-400 block mb-1">GLOBAL P99 LATENCY</span>
              <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                <span className={latencyP99 > 50 ? "text-red-400" : "text-white"}>
                  {latencyP99}
                </span>
                <span className="text-xs text-slate-400">ms</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Zero cold start jitter</span>
            </div>

            <div className="p-5">
              <span className="text-[11px] text-slate-400 block mb-1">ERROR BUDGET CONSUMED</span>
              <div className="text-2xl font-bold text-white flex items-baseline gap-2">
                <span className={errorRate > 1.0 ? "text-red-400" : "text-emerald-400"}>
                  {errorRate}%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Target: &lt; 0.05% SLA</span>
            </div>

            <div className="p-5">
              <span className="text-[11px] text-slate-400 block mb-1">ACTIVE RUNTIME REPLICAS</span>
              <div className="text-2xl font-bold text-cyan-300">
                1,420
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">● 100% healthy nodes</span>
            </div>
          </div>

          {/* Console Main Canvas */}
          <div className="p-6">
            {activeConsoleTab === "throughput" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>REAL-TIME INGRESS TRAFFIC SPECTRUM (60 SECONDS)</span>
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE TELEMETRY STREAM
                  </span>
                </div>

                {/* Animated SVG Wave Chart */}
                <div className="h-56 w-full rounded-xl bg-[#070D18] p-4 relative overflow-hidden border border-slate-800">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 150">
                    <defs>
                      <linearGradient id="grad-wave" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q50,40 100,75 T200,60 T300,90 T400,45 T500,70 T600,55 L600,150 L0,150 Z"
                      fill="url(#grad-wave)"
                    />
                    <path
                      d="M0,80 Q50,40 100,75 T200,60 T300,90 T400,45 T500,70 T600,55"
                      fill="none"
                      stroke="#818CF8"
                      strokeWidth="2.5"
                    />
                    {/* Pulsing point */}
                    <circle cx="500" cy="70" r="4" fill="#06B6D4" />
                    <circle cx="500" cy="70" r="8" fill="#06B6D4" opacity="0.3" className="animate-ping" />
                  </svg>

                  <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-500">
                    Min: 12.8k rps · Max: 18.4k rps · Median: 14.8k rps
                  </div>
                </div>
              </div>
            )}

            {activeConsoleTab === "regions" && (
              <div className="space-y-4 font-mono text-xs">
                <span className="text-slate-400 block">GLOBAL EDGE POP RESPONSE MATRIX</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { region: "us-east (Ashburn, VA)", ping: "4ms", rps: "4,820", status: "Optimal" },
                    { region: "eu-central (Frankfurt)", ping: "9ms", rps: "3,910", status: "Optimal" },
                    { region: "ap-east (Tokyo)", ping: "14ms", rps: "2,400", status: "Optimal" },
                    { region: "us-west (San Jose)", ping: "7ms", rps: "2,190", status: "Optimal" },
                    { region: "sa-east (São Paulo)", ping: "28ms", rps: "980", status: "Healthy" },
                    { region: "ap-south (Singapore)", ping: "16ms", rps: "1,220", status: "Optimal" },
                  ].map((pop) => (
                    <div
                      key={pop.region}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <strong className="text-slate-200 block">{pop.region}</strong>
                        <span className="text-[11px] text-slate-500">{pop.rps} req/sec</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold block">{pop.ping}</span>
                        <span className="text-[10px] text-slate-400">{pop.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeConsoleTab === "chaos" && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs font-mono text-amber-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={18} className="text-amber-400" />
                    <span>
                      Chaos Injection Suite: Test autonomous self-healing, automatic BGP DNS failover, and DDoS scrubbing.
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 font-mono">
                  <button
                    onClick={handleSimulateAttack}
                    disabled={isAttackSimulated}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    Simulate 400Gbps SYN Flood
                  </button>

                  <button
                    onClick={handleAutoRemediate}
                    disabled={!isAttackSimulated || isAutoRemediating}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isAutoRemediating ? (
                      <span>Autonomous BGP Scrubbing in Progress...</span>
                    ) : (
                      <>
                        <Shield size={14} />
                        <span>Trigger Autonomous Scrubbing & Failover</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Developer CLI & API Sandbox */}
      <section id="cli" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              ZERO-CONFIGURATION RUNTIME
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Instant Deployment <br />
              In Less Than 800ms.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Kronos packages your serverless TypeScript, Rust, or Python functions into isolated microVMs replicated globally. Test our live API right from this terminal console.
            </p>
            <div className="pt-2">
              <button
                onClick={handleExecuteCli}
                disabled={cliRunning}
                className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-cyan-600/20 disabled:opacity-50"
              >
                <Play size={13} />
                <span>{cliRunning ? "Executing Request..." : "Send Test API Request"}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0B101D] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
            {/* Terminal Header */}
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-cyan-400" />
                <span className="text-slate-300 font-bold">kronos-cli // interactive runner</span>
              </div>

              <div className="flex gap-1">
                {(["curl", "typescript", "python", "go"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCliTab(tab)}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      activeCliTab === tab ? "bg-indigo-600 text-white font-bold" : "text-slate-400"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-[#070D18] text-slate-300 overflow-x-auto space-y-3">
              {activeCliTab === "curl" && (
                <pre className="text-indigo-300">
                  {`curl -X POST https://api.kronos.io/v1/edge/deploy \\
  -H "Authorization: Bearer krn_live_sec_9918" \\
  -H "Content-Type: application/json" \\
  -d '{"entrypoint": "./src/worker.ts", "anycast": true}'`}
                </pre>
              )}
              {activeCliTab === "typescript" && (
                <pre className="text-cyan-300">
                  {`import { KronosClient } from "@kronos/sdk";

const client = new KronosClient({ apiKey: process.env.KRONOS_KEY });
const deploy = await client.edge.deploy({
  regions: ["auto-global"],
  memoryMb: 256,
  timeoutMs: 5000,
});`}
                </pre>
              )}
              {activeCliTab === "python" && (
                <pre className="text-emerald-300">
                  {`from kronos import EdgeFabric

fabric = EdgeFabric()
instance = fabric.deploy_endpoint(
    handler="main.process_payload",
    isolated_memory="512MiB",
)`}
                </pre>
              )}
              {activeCliTab === "go" && (
                <pre className="text-yellow-300">
                  {`package main
import "github.com/kronos/edge-go"

func main() {
    cluster := edge.NewCluster("us-east-1")
    cluster.AutoHeal(true)
}`}
                </pre>
              )}

              {/* Real Output Block */}
              {cliOutput && (
                <div className="mt-4 pt-4 border-t border-slate-800 text-emerald-400">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">
                    HTTP/2 200 OK · Roundtrip: 12.4ms
                  </span>
                  <pre>{cliOutput}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Enterprise Pricing Matrix & Capacity Slider */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-slate-800">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
            TRANSPARENT SCALE-AS-YOU-GROW PRICING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Predictable Costs. Zero Bandwidth Surprises.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-light">
            Toggle between annual billing to save 20% across all tiers, or model your exact monthly request volumes.
          </p>

          {/* Billing Switch */}
          <div className="pt-2 flex justify-center items-center gap-3 font-mono text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-full transition-colors ${
                billingCycle === "monthly" ? "bg-white text-slate-900 font-bold" : "text-slate-400"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-indigo-600 text-white font-bold" : "text-slate-400"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-400 text-slate-950 text-[10px] font-bold">
                20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Capacity Slider */}
        <div className="max-w-3xl mx-auto mb-16 p-6 rounded-2xl bg-[#0B101D] border border-slate-800 font-mono space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-bold">MODEL YOUR MONTHLY EDGE VOLUMES:</span>
            <span className="text-cyan-400 text-sm font-bold">
              {monthlyRequestsMillions} Million Requests/Month
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={50}
            value={monthlyRequestsMillions}
            onChange={(e) => setMonthlyRequestsMillions(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            <span>Estimated Legacy Cloud Bill: ${(monthlyRequestsMillions * 850).toLocaleString()}</span>
            <span className="text-emerald-400 font-bold">
              Estimated Savings with Kronos: ${calculatedSavings.toLocaleString()}/yr
            </span>
          </div>
        </div>

        {/* 3-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <div className="p-8 rounded-2xl bg-[#0B101D] border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                DEVELOPER EDGE
              </span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-extrabold text-white">${devPlanPrice}</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                For independent engineers and early prototypes requiring global low-latency dispatch.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Up to 1M Monthly Requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>12 Anycast Global Regions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Auto-Renewing TLS Certificates</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsPilotModalOpen(true)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Tier 2 (Highlighted) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#131B32] to-[#0B101D] border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              MOST POPULAR
            </span>

            <div className="space-y-4">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                PRODUCTION CLUSTER
              </span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-extrabold text-white">${teamPlanPrice}</span>
                <span className="text-xs text-slate-500">/month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                For scaling venture-backed teams and SaaS applications requiring 99.99% uptime guarantees.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>{monthlyRequestsMillions}M Scaled Monthly Requests</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>All 48 Global Anycast PoPs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Automated DDoS Layer 7 Shield</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Slack & PagerDuty Integration</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsPilotModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
            >
              Start 14-Day Production Trial
            </button>
          </div>

          {/* Tier 3 */}
          <div className="p-8 rounded-2xl bg-[#0B101D] border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                ENTERPRISE SOVEREIGN
              </span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-4xl font-extrabold text-white">Custom</span>
                <span className="text-xs text-slate-500">SLA</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Dedicated infrastructure, air-gapped VPC clusters, and SOC2 / HIPAA compliance audits.
              </p>
              <ul className="space-y-2.5 text-xs font-mono text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Unlimited High-Volume Ingestion</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Dedicated VPC & Private Fiber Peering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>99.999% Financially-Backed SLA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Named Site Reliability Engineer (24/7)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsPilotModalOpen(true)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-colors"
            >
              Talk to Engineering Architect
            </button>
          </div>
        </div>
      </section>

      {/* Enterprise Pilot Provisioning Modal */}
      <AnimatePresence>
        {isPilotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !pilotConfirmed && setIsPilotModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0B101D] rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700 z-10 max-h-[92vh] overflow-y-auto text-slate-200 font-mono"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Enterprise Cluster Pilot</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Instant 30-day proof-of-concept cluster provisioning
                  </p>
                </div>
                {!pilotConfirmed && (
                  <button
                    onClick={() => setIsPilotModalOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {!pilotConfirmed ? (
                <form onSubmit={handlePilotSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Architect / Lead Name</label>
                      <input
                        type="text"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Work Email</label>
                      <input
                        type="email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Primary Cloud Mesh</label>
                    <select
                      value={selectedCloud}
                      onChange={(e) => setSelectedCloud(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="AWS (Multi-Region US/EU)">AWS (Multi-Region US/EU)</option>
                      <option value="Google Cloud Platform (GCP)">Google Cloud Platform (GCP)</option>
                      <option value="Microsoft Azure Fabric">Microsoft Azure Fabric</option>
                      <option value="Bare-Metal Equinix Metal">Bare-Metal Equinix Metal</option>
                    </select>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-[11px] text-slate-400">
                    <p className="font-bold text-slate-200">Included Pilot Provisions:</p>
                    <p>• 48 Global Anycast PoPs with instant routing</p>
                    <p>• Dedicated Slack channel with Lead Systems Architect</p>
                    <p>• Zero credit card required for 30-day POC</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isDeployingPilot}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wider transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
                  >
                    {isDeployingPilot ? "Spinning Up Dedicated VPC..." : "Provision Enterprise Pilot Token"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle2 size={32} />
                  </div>

                  <h4 className="text-xl font-bold text-white">
                    Cluster Token Generated
                  </h4>

                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your sandbox configuration has been deployed. Credentials and SLA agreement have been transmitted to{" "}
                    <strong className="text-white">{pilotConfirmed.email}</strong>.
                  </p>

                  <div className="bg-slate-900 p-4 rounded-xl text-left text-xs text-slate-300 space-y-1.5 border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cluster Token:</span>
                      <strong className="text-cyan-400">{pilotConfirmed.token}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Designated Mesh:</span>
                      <strong className="text-white">{pilotConfirmed.cloud}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPilotConfirmed(null);
                      setIsPilotModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                  >
                    Return to Telemetry Center
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
