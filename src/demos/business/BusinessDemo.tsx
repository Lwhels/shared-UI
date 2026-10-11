import React, { useState } from "react";
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
} from "../../components";
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
} from "lucide-react";
import { motion } from "framer-motion";

export const BusinessDemo: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [teamSize, setTeamSize] = useState<number>(25);
  const [trialModal, setTrialModal] = useState<boolean>(false);

  // Dynamic ROI calculation
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
      cta: "Launch Pilot",
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
      cta: "Contact Enterprise",
      popular: false,
    },
  ];

  const handleStartTrial = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTrialModal(true);
    setTimeout(() => setTrialModal(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* Futuristic indigo backdrop light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <GlowingBadge variant="indigo">
              APEXMETRICS CLOUD PLATFORM 3.0
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
            Eliminate alert fatigue. Our generative causal engine correlates billions of logs and traces in real time, auto-generating rollback fixes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MovingBorderButton
              onClick={handleStartTrial}
              borderRadius="1.75rem"
              duration={2800}
              className="font-bold text-indigo-300 px-8"
            >
              Start Free Trial →
            </MovingBorderButton>

            <Magnetic strength={0.3}>
              <a
                href="#pricing"
                className="px-8 py-3.5 rounded-full border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all"
              >
                Explore Pricing
              </a>
            </Magnetic>
          </div>
        </div>
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

      {/* Feature Spotlight Matrix */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
            Architecture
          </span>
          <h2 className="text-3xl font-bold font-display">
            Built for Sub-Millisecond Scale
          </h2>
          <p className="text-sm text-zinc-400">
            Interactive radial spotlight highlighting key system capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: "Zero-Latency Stream", desc: "Ingests up to 10M events per second with distributed Kafka and eBPF kernel hooks." },
            { icon: Cpu, title: "Causal Inference Engine", desc: "Pinpoints exact culprit PRs and commits causing service degradation in seconds." },
            { icon: Shield, title: "Zero-Trust Encryption", desc: "End-to-end envelope encryption for all logs, payloads, and telemetry traces." },
            { icon: Server, title: "Autonomous Remediation", desc: "Executes verified safe container rollbacks and canary traffic diverts automatically." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Spotlight
                key={i}
                spotlightColor="rgba(99, 102, 241, 0.22)"
                className="p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-base text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[11px] font-mono text-indigo-400 flex items-center justify-between">
                  <span>Architecture Docs</span>
                  <span>→</span>
                </div>
              </Spotlight>
            );
          })}
        </div>
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

          {/* Billing Switcher */}
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

                  {/* Features */}
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
                    onClick={handleStartTrial}
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

      {/* Trial confirmation notification */}
      {trialModal && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Sparkles size={16} />
          <span>Provisioning your sandbox workspace... Check your inbox!</span>
        </div>
      )}
    </div>
  );
};

export default BusinessDemo;
