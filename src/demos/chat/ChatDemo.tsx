import React, { useState, useRef, useEffect } from "react";
import {
  Spotlight,
  GlassCard,
  Magnetic,
  StatusDot,
  GlowingBadge,
  TextReveal,
} from "../../components";
import {
  Send,
  Hash,
  Smile,
  Paperclip,
  Search,
  MoreVertical,
  Bot,
  User,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "colleague";
  name: string;
  avatar?: string;
  text: string;
  time: string;
}

export const ChatDemo: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState("#design-systems");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "colleague",
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      text: "Team, I just stress-tested our new shared-UI Spotlight card with 100 concurrent nodes on Safari. Zero frame drops!",
      time: "10:14 AM",
    },
    {
      id: "msg-2",
      sender: "colleague",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      text: "Love that. The radial spotlight gradient variables make it so lightweight compared to rendering multiple canvas layers.",
      time: "10:16 AM",
    },
    {
      id: "msg-3",
      sender: "bot",
      name: "PulseBot AI",
      text: "Automatic build report: Package shared-ui v1.0.0 compiled successfully in 1.4s. All 8 demo sites verified clean.",
      time: "10:18 AM",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      name: "You",
      text: userText,
      time: now,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulated automated intelligent reply
    setTimeout(() => {
      setIsTyping(false);
      const botReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "bot",
        name: "PulseBot AI",
        text: `Echo acknowledged for "${userText}". All client motion components are operating in optimal 120fps physics mode.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      {/* Top Banner */}
      <div className="py-4 px-6 border-b border-white/10 bg-zinc-950/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GlowingBadge variant="indigo">PULSECHAT WORKSPACE</GlowingBadge>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            Active Channel: {activeChannel}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <StatusDot status="online" size="sm" />
          <span>Real-time Stream Connected</span>
        </div>
      </div>

      {/* Main Chat Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[75vh]">
        {/* Sidebar Channels & Contacts */}
        <div className="space-y-6">
          <GlassCard className="p-4 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-2">
                Team Channels
              </span>
              <div className="space-y-1">
                {["#general", "#design-systems", "#engineering", "#releases"].map((channel) => (
                  <button
                    key={channel}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeChannel === channel
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Hash size={13} />
                    <span>{channel}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-2">
                Active Teammates
              </span>
              <div className="space-y-2 text-xs">
                {[
                  { name: "Marcus Vance", status: "online", role: "Design" },
                  { name: "Elena Rostova", status: "online", role: "Frontend" },
                  { name: "PulseBot AI", status: "online", role: "Assistant" },
                  { name: "David Kim", status: "away", role: "DevOps" },
                ].map((person, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <StatusDot status={person.status as any} size="sm" />
                      <span className="font-medium text-white">{person.name}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">{person.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Chat Thread & Input */}
        <div className="md:col-span-3 flex flex-col justify-between bg-zinc-950/70 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
          {/* Thread Header */}
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash size={18} className="text-amber-400" />
              <h3 className="font-bold text-base text-white">{activeChannel}</h3>
              <span className="text-xs text-zinc-500 hidden sm:inline">
                · Production components debate & live releases
              </span>
            </div>
            <button className="text-zinc-500 hover:text-white p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 max-h-[55vh] pr-2">
            {messages.map((msg) => {
              const isMe = msg.sender === "user";
              const isBot = msg.sender === "bot";

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className="shrink-0">
                    {isBot ? (
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                        <Bot size={15} />
                      </div>
                    ) : msg.avatar ? (
                      <img
                        src={msg.avatar}
                        alt={msg.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/15"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 text-xs font-bold">
                        U
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[75%] space-y-1 ${
                      isMe ? "items-end text-right" : "items-start text-left"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                      <span className="font-semibold text-zinc-300">{msg.name}</span>
                      <span>{msg.time}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-600/20"
                          : isBot
                          ? "bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 rounded-tl-none font-mono text-xs"
                          : "bg-white/[0.05] border border-white/10 text-zinc-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono">
                <Bot size={14} className="animate-spin" />
                <span>PulseBot AI is compiling response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="pt-4 border-t border-white/10 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activeChannel}... (Press Enter to send)`}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />

            <Magnetic strength={0.3}>
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shadow-md shadow-indigo-600/25 active:scale-95"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </Magnetic>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatDemo;
