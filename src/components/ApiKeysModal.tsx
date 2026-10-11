import React, { useState, useEffect } from "react";
import {
  getApiConfig,
  saveApiConfig,
  getEmailOutbox,
  clearEmailOutbox,
  ApiConfigState,
  DispatchedEmail,
} from "../services/apiConfig";
import { STRIPE_SERVER_TEMPLATES } from "../integrations/stripe/serverTemplates";
import { SUPABASE_SQL_SCHEMA } from "../integrations/supabase/supabaseSchema";
import { STRIPE_TEST_CARDS } from "../integrations/stripe/stripeClient";
import {
  Key,
  CreditCard,
  Bot,
  Mail,
  Database,
  MapPin,
  Check,
  X,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Sliders,
  Trash2,
  Inbox,
  Code2,
  Copy,
  Terminal,
  Server,
  Layers,
  FileCode,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ApiKeysModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"keys" | "stripe-backend" | "supabase-sql" | "outbox">("keys");
  const [config, setConfig] = useState<ApiConfigState>(getApiConfig());
  const [outbox, setOutbox] = useState<DispatchedEmail[]>(getEmailOutbox());
  const [saveToast, setSaveToast] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeBackendTemplate, setActiveBackendTemplate] = useState<"nextjs" | "express" | "supabase">("nextjs");

  useEffect(() => {
    const handleConfigChange = (e: any) => setConfig(e.detail);
    const handleOutboxChange = (e: any) => setOutbox(e.detail);
    window.addEventListener("api-config-changed", handleConfigChange);
    window.addEventListener("email-outbox-updated", handleOutboxChange);
    return () => {
      window.removeEventListener("api-config-changed", handleConfigChange);
      window.removeEventListener("email-outbox-updated", handleOutboxChange);
    };
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveApiConfig(config);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const copySnippet = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 border border-white/20 text-xs font-semibold text-white/90 shadow-2xl backdrop-blur-xl hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all group"
          title="Open Production Integrations & API Skeletons Hub"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Server size={13} className="text-amber-400" />
          <span className="hidden sm:inline">Production Skeletons & APIs</span>
          {outbox.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono">
              {outbox.length}
            </span>
          )}
        </button>
      </div>

      {/* Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-3xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Server size={18} className="text-amber-400" />
                    <h3 className="font-bold font-display text-lg text-white">
                      Production Integrations & Backend Skeletons
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Turnkey Stripe payments, Supabase SQL schema, and serverless handlers ready for production deployment.
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 text-xs font-mono shrink-0">
                <button
                  onClick={() => setActiveTab("keys")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === "keys"
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Key size={13} />
                  <span>API Keys & Endpoints</span>
                </button>

                <button
                  onClick={() => setActiveTab("stripe-backend")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === "stripe-backend"
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <CreditCard size={13} />
                  <span>Stripe Serverless Skeleton</span>
                </button>

                <button
                  onClick={() => setActiveTab("supabase-sql")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === "supabase-sql"
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Database size={13} />
                  <span>Supabase SQL Schema</span>
                </button>

                <button
                  onClick={() => setActiveTab("outbox")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === "outbox"
                      ? "bg-amber-500 text-zinc-950 font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Inbox size={13} />
                  <span>Dispatched Outbox ({outbox.length})</span>
                </button>
              </div>

              {/* Tab 1: API Keys & Mode Config */}
              {activeTab === "keys" && (
                <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-6 pr-1">
                  {/* Mode Toggle Banner */}
                  <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${config.isMockMode ? "bg-amber-400" : "bg-emerald-400"}`} />
                        <span className="font-semibold text-xs text-white">
                          Execution Mode: {config.isMockMode ? "Local Turnkey Sandbox (Simulated)" : "Live Production Endpoints"}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        In Sandbox mode, payments & emails simulate real network roundtrips with test data. In Live mode, calls dispatch to your configured backend & keys.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setConfig({ ...config, isMockMode: !config.isMockMode })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                        config.isMockMode
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {config.isMockMode ? "Switch to Live" : "Switch to Mock"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    {/* Stripe Publishable Key */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <CreditCard size={13} className="text-amber-400" />
                        <span>Stripe Publishable Key</span>
                      </label>
                      <input
                        type="text"
                        placeholder="pk_test_51..."
                        value={config.stripeKey}
                        onChange={(e) => setConfig({ ...config, stripeKey: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                    </div>

                    {/* Backend API Endpoint */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <Server size={13} className="text-cyan-400" />
                        <span>Backend Server URL</span>
                      </label>
                      <input
                        type="text"
                        placeholder="http://localhost:3001 or https://api.myapp.com"
                        value={config.backendApiUrl}
                        onChange={(e) => setConfig({ ...config, backendApiUrl: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                    </div>

                    {/* Resend API Key */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <Mail size={13} className="text-purple-400" />
                        <span>Resend Email API Key</span>
                      </label>
                      <input
                        type="password"
                        placeholder="re_..."
                        value={config.resendKey}
                        onChange={(e) => setConfig({ ...config, resendKey: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                    </div>

                    {/* AI Key */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <Bot size={13} className="text-emerald-400" />
                        <span>OpenAI or Gemini API Key</span>
                      </label>
                      <input
                        type="password"
                        placeholder="sk-..."
                        value={config.openaiKey}
                        onChange={(e) => setConfig({ ...config, openaiKey: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                    </div>

                    {/* Supabase URL */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <Database size={13} className="text-emerald-400" />
                        <span>Supabase Project URL</span>
                      </label>
                      <input
                        type="text"
                        placeholder="https://xyzcompany.supabase.co"
                        value={config.supabaseUrl}
                        onChange={(e) => setConfig({ ...config, supabaseUrl: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                    </div>

                    {/* Supabase Anon Key */}
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <Database size={13} className="text-emerald-400" />
                        <span>Supabase Anon Public Key</span>
                      </label>
                      <input
                        type="password"
                        placeholder="ey..."
                        value={config.supabaseKey}
                        onChange={(e) => setConfig({ ...config, supabaseKey: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      Keys are saved locally in your browser's encrypted localStorage.
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono tracking-wider transition-transform active:scale-95 shadow-md flex items-center gap-1.5"
                    >
                      {saveToast ? <Check size={14} /> : <Sparkles size={14} />}
                      <span>{saveToast ? "Configuration Saved!" : "Save Credentials"}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Stripe Serverless Backend Skeletons */}
              {activeTab === "stripe-backend" && (
                <div className="flex-1 overflow-y-auto space-y-6 font-mono text-xs pr-1">
                  {/* Template Picker */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveBackendTemplate("nextjs")}
                        className={`px-3 py-1.5 rounded-lg ${
                          activeBackendTemplate === "nextjs"
                            ? "bg-amber-500 text-zinc-950 font-bold"
                            : "bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        Next.js App Router
                      </button>
                      <button
                        onClick={() => setActiveBackendTemplate("express")}
                        className={`px-3 py-1.5 rounded-lg ${
                          activeBackendTemplate === "express"
                            ? "bg-amber-500 text-zinc-950 font-bold"
                            : "bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        Node.js / Express
                      </button>
                      <button
                        onClick={() => setActiveBackendTemplate("supabase")}
                        className={`px-3 py-1.5 rounded-lg ${
                          activeBackendTemplate === "supabase"
                            ? "bg-amber-500 text-zinc-950 font-bold"
                            : "bg-white/5 text-zinc-400 hover:text-white"
                        }`}
                      >
                        Supabase Edge (Deno)
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        copySnippet(
                          activeBackendTemplate === "nextjs"
                            ? STRIPE_SERVER_TEMPLATES.nextjsAppRouter.code
                            : activeBackendTemplate === "express"
                            ? STRIPE_SERVER_TEMPLATES.expressNode.code
                            : STRIPE_SERVER_TEMPLATES.supabaseEdge.code,
                          "stripe-active-snippet"
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                    >
                      {copiedCodeId === "stripe-active-snippet" ? (
                        <Check size={13} className="text-emerald-400" />
                      ) : (
                        <Copy size={13} />
                      )}
                      <span>Copy Endpoint Code</span>
                    </button>
                  </div>

                  {/* Active Code Display */}
                  <div className="space-y-4">
                    {activeBackendTemplate === "nextjs" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                          <span>File: {STRIPE_SERVER_TEMPLATES.nextjsAppRouter.filename}</span>
                          <span>Dependencies: npm i stripe</span>
                        </div>
                        <pre className="p-4 rounded-xl bg-black border border-white/10 text-amber-200 overflow-x-auto text-[11px] max-h-60">
                          {STRIPE_SERVER_TEMPLATES.nextjsAppRouter.code}
                        </pre>

                        <div className="flex justify-between items-center text-zinc-400 text-[11px] pt-3 border-t border-white/10">
                          <span>Webhook Handler: {STRIPE_SERVER_TEMPLATES.nextjsAppRouter.webhookFilename}</span>
                          <button
                            onClick={() =>
                              copySnippet(STRIPE_SERVER_TEMPLATES.nextjsAppRouter.webhookCode, "next-webhook")
                            }
                            className="text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <Copy size={11} />
                            <span>Copy Webhook Code</span>
                          </button>
                        </div>
                        <pre className="p-4 rounded-xl bg-black border border-white/10 text-purple-200 overflow-x-auto text-[11px] max-h-48">
                          {STRIPE_SERVER_TEMPLATES.nextjsAppRouter.webhookCode}
                        </pre>
                      </div>
                    )}

                    {activeBackendTemplate === "express" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                          <span>File: {STRIPE_SERVER_TEMPLATES.expressNode.filename}</span>
                          <span>Dependencies: npm i express cors stripe dotenv</span>
                        </div>
                        <pre className="p-4 rounded-xl bg-black border border-white/10 text-cyan-200 overflow-x-auto text-[11px] max-h-80">
                          {STRIPE_SERVER_TEMPLATES.expressNode.code}
                        </pre>
                      </div>
                    )}

                    {activeBackendTemplate === "supabase" && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-zinc-400 text-[11px]">
                          <span>File: {STRIPE_SERVER_TEMPLATES.supabaseEdge.filename}</span>
                          <span>Deploy: supabase functions deploy stripe-checkout</span>
                        </div>
                        <pre className="p-4 rounded-xl bg-black border border-white/10 text-emerald-200 overflow-x-auto text-[11px] max-h-80">
                          {STRIPE_SERVER_TEMPLATES.supabaseEdge.code}
                        </pre>
                      </div>
                    )}

                    {/* Test Cards Reference Table */}
                    <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
                      <span className="text-zinc-300 font-bold block">
                        Stripe Test Card Numbers (Built-in Simulator):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {STRIPE_TEST_CARDS.map((c) => (
                          <div key={c.number} className="p-2 rounded bg-black/60 border border-white/5">
                            <strong className="text-amber-400 font-mono block">{c.number}</strong>
                            <span className="text-zinc-400">{c.brand} · {c.outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Supabase SQL Schema */}
              {activeTab === "supabase-sql" && (
                <div className="flex-1 overflow-y-auto space-y-4 font-mono text-xs pr-1">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <span className="text-white font-bold block">PostgreSQL Database DDL Schema</span>
                      <span className="text-[11px] text-zinc-400">
                        Orders, Reservations, Stays, Chat, and Social tables with RLS and Realtime
                      </span>
                    </div>

                    <button
                      onClick={() => copySnippet(SUPABASE_SQL_SCHEMA, "supabase-schema-copy")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold"
                    >
                      {copiedCodeId === "supabase-schema-copy" ? (
                        <Check size={13} />
                      ) : (
                        <Copy size={13} />
                      )}
                      <span>Copy Full SQL Schema</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-black border border-white/10 text-emerald-300 overflow-x-auto text-[11px] max-h-96">
                    {SUPABASE_SQL_SCHEMA}
                  </pre>
                </div>
              )}

              {/* Tab 4: Dispatched Outbox */}
              {activeTab === "outbox" && (
                <div className="flex-1 overflow-y-auto space-y-4 font-mono text-xs pr-1">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <span className="text-white font-bold block">Transactional Event Outbox</span>
                      <span className="text-[11px] text-zinc-400">
                        Live & simulated emails, booking receipts, and payment authorizations
                      </span>
                    </div>

                    {outbox.length > 0 && (
                      <button
                        onClick={() => {
                          clearEmailOutbox();
                          setOutbox([]);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 hover:text-red-300 text-zinc-400 transition-colors"
                      >
                        <Trash2 size={12} />
                        <span>Clear Outbox</span>
                      </button>
                    )}
                  </div>

                  {outbox.length === 0 ? (
                    <div className="text-center py-16 space-y-2 text-zinc-500">
                      <Inbox size={32} className="mx-auto text-zinc-600" />
                      <p>No transactional dispatches recorded yet.</p>
                      <p className="text-[11px]">
                        Checkout on the E-Commerce site or reserve a table at the Restaurant to inspect payloads here!
                      </p>
                    </div>
                  ) : (
                    outbox.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-white text-sm block">{item.subject}</strong>
                            <span className="text-[11px] text-zinc-400">To: {item.to}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                              item.status === "delivered"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-black/60 border border-white/5 space-y-1 text-[11px] text-zinc-300">
                          {Object.entries(item.data || {}).map(([key, val]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-zinc-500">{key}:</span>
                              <span className="text-zinc-200 truncate max-w-xs">{String(val)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-[10px] text-zinc-500 flex justify-between pt-1">
                          <span>Template: {item.template}</span>
                          <span>Timestamp: {item.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ApiKeysModal;
