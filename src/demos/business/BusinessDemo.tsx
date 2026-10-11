import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Spotlight,
  ThreeDCard,
  CardContainer,
  CardBody,
  CardItem,
  MovingBorderButton,
  InfiniteMovingCards,
  GlassCard,
  Magnetic,
  GlowingBadge,
  TextReveal,
  StatusDot,
} from "../../components";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BusinessDemo: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [teamSize, setTeamSize] = useState<number>(25);

  // Live Simulated Telemetry Dashboard State
  const [qps, setQps] = useState(8420);
  const [errorRate, setErrorRate] = useState(0.02);
  const [latencyP99, setLatencyP99] = useState(14);
  const [isOutageActive, setIsOutageActive] = useState(false);
  const [remediating, setRemediating] = useState(false);

  // Modals
  const [selectedPlanModal, setSelectedPlanModal] = useState<any>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoLeadName, setDemoLeadName] = useState("Marcus Vance");
  const [demoLeadEmail, setDemoLeadEmail] = useState("m.vance@enterprise.com");
  const [demoCloud, setDemoCloud] = useState("AWS (Multi-Region)");
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Subscription Checkout State
  const [subscribing, setSubscribing] = useState(false);
  const [subConfirmed, setSubConfirmed] = useState(false);

  // Simulate real-time metric fluctuations
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isOutageActive) {
        setQps((prev) => Math.floor(prev + (Math.random() * 80 - 40)));
        setErrorRate((prev) => Math.max(0.01, +(prev + (Math.random() * 0.01 - 0.005)).toFixed(3)));
        setLatencyP99((prev) => Math.max(10, Math.floor(prev + (Math.random() * 4 - 2))));
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [isOutageActive]);

  // Inject Simulated Anomaly
  const triggerSimulatedOutage = () => {
    setIsOutageActive(true);
    setErrorRate(8.42);
    setLatencyP99(380);
  };

  // Autonomous Remediation
  const triggerAutonomousFix = () => {
    setRemediating(true);
    setTimeout(() => {
      setIsOutageActive(false);
      setRemediating(false);
      setErrorRate(0.015);
      setLatencyP99(12);
    }, 1500);
  };

  const hoursSavedPerEmployee = 6;
  const avgHourlyRate = 65;
  const annualSavings = Math.round(teamSize * hoursSavedPerEmployee * avgHourlyRate * 50);

  const pricingTiers = [
    {
      name: "Starter Pilot",
      price: billingCycle === "annual" ? 29 : 39,
      description: "For high-velocity seed teams needing unified pipeline telemetry.",
      features: [
        "Up to 10 event streams",
        "7-day data retention",
        "Automated root-cause analysis",
        "Standard Slack & Webhook alerts",
      ],
      cta: "Launch Starter Pilot",
      popular: false,
    },
    {
      name: "Growth Cloud",
      price: billingCycle === "annual" ? 89 : 109,
      description: "For scaling engineering orgs requiring autonomous AI incident triage.",
      features: [
        "Unlimited telemetry streams",
        "90-day cold storage archive",
        "Predictive anomaly prevention",
        "Sub-millisecond query indexing",
        "Custom Grafana & PagerDuty plugins",
      ],
      cta: "Start 14-Day Trial",
      popular: true,
    },
    {
      name: "Enterprise Dedicated",
      price: billingCycle === "annual" ? 249 : 299,
      description: "Custom VPC deployment, air-gapped security, and 24/7 dedicated SRE support.",
      features: [
        "Zero-egress VPC deployment",
        "Unlimited custom retention",
        "SOC2 Type II, HIPAA, ISO 27001",
        "Guaranteed 99.999% SLA",
        "Dedicated Solutions Architect",
      ],
      cta: "Deploy Enterprise VPC",
      popular: false,
    },
  ];

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);

    await processPayment({
      cardNumber: "4242 4242 4242 4242",
      cardHolder: "Engineering Lead",
      expiry: "12/28",
      cvv: "892",
      amount: selectedPlanModal.price,
      description: `ApexMetrics Subscription: ${selectedPlanModal.name}`,
      customerEmail: "devops@apexmetrics.dev",
    });

    await sendEmail({
      to: "devops@apexmetrics.dev",
      subject: `Subscription Provisioned: ${selectedPlanModal.name} · ApexMetrics`,
      template: "lead_demo",
      data: {
        planName: selectedPlanModal.name,
        price: `$${selectedPlanModal.price}/seat/mo`,
        workspaceUrl: "https://app.apexmetrics.dev/org/sandbox-99",
      },
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setSubscribing(false);
    setSubConfirmed(true);
  };

  const handleBookDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail({
      to: demoLeadEmail,
      subject: `Enterprise Architecture Demo Confirmed · ApexMetrics`,
      template: "lead_demo",
      data: {
        leadName: demoLeadName,
        cloudInfra: demoCloud,
        timeSlot: "Tuesday, Oct 20 at 10:00 AM PST",
        zoomLink: "https://apexmetrics.zoom.us/j/9482718",
      },
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });

    setDemoSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <GlowingBadge variant="indigo">
              APEXMETRICS CLOUD PLATFORM 3.0 · AUTONOMOUS OBSERVABILITY
            </GlowingBadge>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight leading-[1.08]">
            Telemetry that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-500">
              <TextReveal text="Predicts Outages Before" />
            </span>{" "}
            They Happen.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate alert fatigue. Our causal inference engine correlates billions of distributed traces in real time, auto-generating rollback fixes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MovingBorderButton
              onClick={() => setSelectedPlanModal(pricingTiers[1])}
              borderRadius="1.75rem"
              duration={2800}
              className="font-bold text-indigo-300 px-8"
            >
              Start Free 14-Day Trial →
            </MovingBorderButton>

            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  setDemoSuccess(false);
                  setDemoModalOpen(true);
                }}
                className="px-8 py-3.5 rounded-full border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all flex items-center gap-2"
              >
                <Calendar size={15} />
                <span>Book 30-Min Demo</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Live Interactive Metrics Telemetry Simulator */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <GlassCard className="p-8 border-indigo-500/20 bg-indigo-950/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase">
                <StatusDot status={isOutageActive ? "busy" : "online"} size="sm" />
                <span>Live Cluster Telemetry Engine</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mt-1">
                US-East-1 Production Service Graph
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {isOutageActive ? (
                <button
                  onClick={triggerAutonomousFix}
                  disabled={remediating}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-transform active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  <RotateCcw size={14} className={remediating ? "animate-spin" : ""} />
                  <span>{remediating ? "Rolling Back Canary..." : "Auto-Remediate Anomaly"}</span>
                </button>
              ) : (
                <button
                  onClick={triggerSimulatedOutage}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition-colors"
                >
                  <AlertTriangle size={14} />
                  <span>Inject Simulated Traffic Spike</span>
                </button>
              )}
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400">Total Throughput</span>
              <div className="text-3xl font-extrabold font-mono text-white">
                {qps.toLocaleString()} <span className="text-xs text-zinc-500">req/s</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">14 Pods Distributed</div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400">Error Rate (5xx)</span>
              <div className={`text-3xl font-extrabold font-mono ${isOutageActive ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>
                {errorRate}%
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">
                {isOutageActive ? "CRITICAL: Database connection exhaustion" : "Nominal baseline: <0.05%"}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <span className="text-[11px] font-mono text-zinc-400">P99 Latency SLA</span>
              <div className={`text-3xl font-extrabold font-mono ${isOutageActive ? "text-amber-400" : "text-indigo-400"}`}>
                {latencyP99}ms
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Target SLA: under 50ms</div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Enterprise Partner Ticker */}
      <section className="py-12 border-y border-indigo-950/60 bg-[#06080e] overflow-hidden">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest font-mono text-indigo-400/80">
            Deployed by DevOps Teams at Scale
          </p>
        </div>
        <InfiniteMovingCards
          items={[
            { quote: "Reduced our mean-time-to-resolution from 45 minutes to 90 seconds.", name: "CloudScale Systems", title: "VP Infrastructure" },
            { quote: "The predictive anomaly models prevented three major Black Friday outages.", name: "HyperTrade Global", title: "Chief Architect" },
            { quote: "Our engineering team recovered hundreds of engineering hours per sprint.", name: "DataMatrix Labs", title: "Head of DevOps" },
            { quote: "The cleanest observability UI in the industry. Hands down.", name: "AeroTech AI", title: "Principal Engineer" },
          ]}
          direction="right"
          speed="normal"
        />
      </section>

      {/* Interactive ROI Calculator Slider */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <GlassCard className="p-8 sm:p-12 border-indigo-500/20 bg-indigo-950/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-md">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase">
                <Sliders size={14} />
                <span>Interactive ROI Calculator</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Calculate your team's incident downtime recovery.
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Slide the control to match your engineering team headcount and preview projected annual productivity savings.
              </p>

              <div className="pt-2">
                <div className="flex justify-between text-xs text-zinc-400 font-mono mb-2">
                  <span>Engineers: {teamSize}</span>
                  <span>100 Engineers</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="w-full sm:w-auto p-6 rounded-2xl bg-indigo-900/20 border border-indigo-500/30 text-center space-y-2 shrink-0">
              <span className="text-[11px] font-mono text-indigo-300 uppercase">
                Estimated Annual Savings
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono text-indigo-300">
                ${annualSavings.toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-400">
                ~{(teamSize * hoursSavedPerEmployee * 50).toLocaleString()} engineering hrs saved/yr
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Pricing Section with 3D Tilt Cards */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
            Predictable Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display">
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm text-zinc-400">
            Switch between monthly and annual plans to save 20% on all tiers.
          </p>

          <div className="flex items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                billingCycle === "monthly" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-amber-400 text-zinc-950 font-bold px-1.5 py-0.2 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, idx) => (
            <CardContainer key={idx} className="w-full">
              <CardBody className={`w-full rounded-2xl p-6 backdrop-blur-xl border flex flex-col justify-between h-[520px] ${
                tier.popular
                  ? "bg-indigo-950/40 border-indigo-500/50 shadow-2xl shadow-indigo-500/10"
                  : "bg-zinc-950/60 border-white/10"
              }`}>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <CardItem translateZ={30}>
                      <h3 className="font-bold text-lg text-white font-display">
                        {tier.name}
                      </h3>
                    </CardItem>
                    {tier.popular && (
                      <CardItem translateZ={40}>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500 text-white font-bold">
                          MOST POPULAR
                        </span>
                      </CardItem>
                    )}
                  </div>

                  <CardItem translateZ={20}>
                    <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                      {tier.description}
                    </p>
                  </CardItem>

                  <CardItem translateZ={50} className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold font-mono text-white">
                        ${tier.price}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">/ seat / mo</span>
                    </div>
                  </CardItem>

                  <CardItem translateZ={30} className="w-full">
                    <div className="space-y-2.5 pt-4 border-t border-white/10">
                      {tier.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check size={14} className="text-indigo-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </CardItem>
                </div>

                <CardItem translateZ={40} className="w-full pt-6">
                  <button
                    onClick={() => {
                      setSubConfirmed(false);
                      setSelectedPlanModal(tier);
                    }}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                      tier.popular
                        ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Subscription Checkout Modal */}
      <AnimatePresence>
        {selectedPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-indigo-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-indigo-400" />
                  <h3 className="font-bold text-base text-white">
                    Subscribe to {selectedPlanModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedPlanModal(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {subConfirmed ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Workspace Provisioned!</h4>
                  <p className="text-xs text-zinc-400">
                    Your {selectedPlanModal.name} cluster is online. A receipt has been dispatched to your email outbox.
                  </p>
                  <button
                    onClick={() => setSelectedPlanModal(null)}
                    className="px-6 py-2 rounded-full bg-indigo-600 text-white text-xs font-semibold"
                  >
                    Enter Cluster Dashboard
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                  <div className="p-3 rounded-xl bg-white/5 text-xs flex justify-between font-mono">
                    <span>Plan Billing:</span>
                    <strong className="text-indigo-300">${selectedPlanModal.price}/seat/month</strong>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Organization Name"
                      defaultValue="Acme Robotics Labs"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Admin Billing Email"
                      defaultValue="devops@acmerobotics.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Card Number"
                      defaultValue="4242 4242 4242 4242"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={subscribing}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
                  >
                    {subscribing ? "Provisioning Cloud Sandbox..." : `Confirm Subscription · $${selectedPlanModal.price}/mo`}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Book Enterprise Demo Modal */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <h3 className="font-bold text-base text-white">Book Architecture Briefing</h3>
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {demoSuccess ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Briefing Scheduled!</h4>
                  <p className="text-xs text-zinc-400">
                    A calendar invite has been sent to {demoLeadEmail}. View the dispatched event in the floating API drawer!
                  </p>
                  <button
                    onClick={() => setDemoModalOpen(false)}
                    className="px-6 py-2 rounded-full bg-white/10 text-white text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookDemo} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={demoLeadName}
                    onChange={(e) => setDemoLeadName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email"
                    value={demoLeadEmail}
                    onChange={(e) => setDemoLeadEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <select
                    value={demoCloud}
                    onChange={(e) => setDemoCloud(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="AWS (Multi-Region)">AWS (Multi-Region)</option>
                    <option value="Google Cloud Platform">Google Cloud Platform (GCP)</option>
                    <option value="Microsoft Azure">Microsoft Azure</option>
                    <option value="On-Premises Kubernetes">On-Premises Airgapped K8s</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30"
                  >
                    Confirm Architecture Session →
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessDemo;
