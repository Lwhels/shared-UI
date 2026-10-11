import React, { useState, useEffect } from "react";
import {
  getApiConfig,
  saveApiConfig,
  getEmailOutbox,
  clearEmailOutbox,
  ApiConfigState,
  DispatchedEmail,
} from "../services/apiConfig";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ApiKeysModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"keys" | "outbox">("keys");
  const [config, setConfig] = useState<ApiConfigState>(getApiConfig());
  const [outbox, setOutbox] = useState<DispatchedEmail[]>(getEmailOutbox());
  const [saveToast, setSaveToast] = useState(false);

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

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 border border-white/20 text-xs font-semibold text-white/90 shadow-2xl backdrop-blur-xl hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all group"
          title="Open API Keys & Integrations Manager"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Key size={13} className="text-amber-400" />
          <span className="hidden sm:inline">API Setup & Integrations</span>
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
              className="w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Key size={18} className="text-amber-400" />
                    <h3 className="font-bold font-display text-lg text-white">
                      Integrations & API Key Configuration
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400">
                    All demo sites run in full turnkey mode out-of-the-box. Add your own API keys below to unlock live production endpoints!
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

              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 shrink-0">
                <button
                  onClick={() => setActiveTab("keys")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeTab === "keys"
                      ? "bg-amber-500 text-zinc-950"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  API Keys & Endpoints
                </button>
                <button
                  onClick={() => setActiveTab("outbox")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === "outbox"
                      ? "bg-amber-500 text-zinc-950"
                      : "bg-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Inbox size={13} />
                  <span>Outbox Inspector ({outbox.length})</span>
                </button>
              </div>

              {/* Tab 1: API Keys Settings */}
              {activeTab === "keys" && (
                <form onSubmit={handleSave} className="space-y-5 overflow-y-auto pr-2 flex-1">
                  {/* Mode Selector */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Execution Mode</div>
                      <p className="text-[11px] text-zinc-400">
                        {config.isMockMode
                          ? "Simulated Mock Mode (Realistic network delays, persisted state)"
                          : "Live API Mode (Direct HTTP requests to your configured services)"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setConfig((prev) => ({ ...prev, isMockMode: !prev.isMockMode }))
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        config.isMockMode
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      }`}
                    >
                      {config.isMockMode ? "Mock Mode Active" : "Live Mode Active"}
                    </button>
                  </div>

                  {/* Stripe API */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <CreditCard size={14} className="text-amber-400" />
                      <span>Stripe Secret or Publishable Key</span>
                      <span className="text-[10px] text-zinc-500 font-mono font-normal">
                        (Powers E-Commerce Checkout, Booking Deposits)
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="pk_test_... or sk_test_..."
                      value={config.stripeKey}
                      onChange={(e) =>
                        setConfig({ ...config, stripeKey: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* OpenAI / AI Key */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <Bot size={14} className="text-indigo-400" />
                      <span>OpenAI API Key (or Gemini)</span>
                      <span className="text-[10px] text-zinc-500 font-mono font-normal">
                        (Powers Chat Assistant, Smart Inquiries)
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="sk-proj-..."
                      value={config.openaiKey}
                      onChange={(e) =>
                        setConfig({ ...config, openaiKey: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Resend Key */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <Mail size={14} className="text-rose-400" />
                      <span>Resend or SendGrid API Key</span>
                      <span className="text-[10px] text-zinc-500 font-mono font-normal">
                        (Powers Order Receipts, Table Confirmations, Inquiries)
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="re_..."
                      value={config.resendKey}
                      onChange={(e) =>
                        setConfig({ ...config, resendKey: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Supabase / Database */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                        <Database size={14} className="text-emerald-400" />
                        <span>Supabase Project URL</span>
                      </label>
                      <input
                        type="text"
                        placeholder="https://xyz.supabase.co"
                        value={config.supabaseUrl}
                        onChange={(e) =>
                          setConfig({ ...config, supabaseUrl: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                        <Key size={14} className="text-emerald-400" />
                        <span>Supabase Anon Key</span>
                      </label>
                      <input
                        type="password"
                        placeholder="eyJhbGciOi..."
                        value={config.supabaseKey}
                        onChange={(e) =>
                          setConfig({ ...config, supabaseKey: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
                    {saveToast ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono">
                        <Check size={14} />
                        <span>Configuration Saved to LocalStorage!</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-zinc-500">
                        Keys are safely stored locally in your browser session.
                      </span>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setConfig(saveApiConfig({}))}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-400 hover:text-white"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                      >
                        Save & Apply
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Tab 2: Outbox Inspector */}
              {activeTab === "outbox" && (
                <div className="space-y-4 overflow-y-auto pr-2 flex-1">
                  <div className="flex items-center justify-between pb-2">
                    <p className="text-xs text-zinc-400">
                      Dispatched emails, receipts, and order tickets generated by your interactions:
                    </p>
                    {outbox.length > 0 && (
                      <button
                        onClick={clearEmailOutbox}
                        className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 size={12} />
                        <span>Clear History</span>
                      </button>
                    )}
                  </div>

                  {outbox.length === 0 ? (
                    <div className="py-16 text-center space-y-2">
                      <Mail size={32} className="mx-auto text-zinc-600" />
                      <p className="text-sm text-zinc-400 font-medium">Outbox is empty</p>
                      <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                        Submit a contact inquiry in Portfolio, complete a checkout in E-Commerce, or book a table in Restaurant to view rendered email receipts here!
                      </p>
                    </div>
                  ) : (
                    outbox.map((email) => (
                      <div
                        key={email.id}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{email.subject}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {email.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            {email.timestamp}
                          </span>
                        </div>

                        <div className="text-[11px] text-zinc-400 font-mono">
                          Recipient: <strong className="text-zinc-200">{email.to}</strong> · Template: {email.template}
                        </div>

                        <pre className="p-3 rounded-lg bg-black/60 border border-white/5 font-mono text-[10px] text-amber-300/80 overflow-x-auto">
                          {JSON.stringify(email.data, null, 2)}
                        </pre>
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
