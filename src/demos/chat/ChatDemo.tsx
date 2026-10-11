import React, { useState, useRef, useEffect } from "react";
import {
  Spotlight,
  GlassCard,
  Magnetic,
  StatusDot,
  GlowingBadge,
  TextReveal,
} from "../../components";
import { generateAiResponse } from "../../services/aiService";
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
  Plus,
  X,
  FileText,
  Heart,
  Flame,
  ThumbsUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Reaction {
  emoji: string;
  count: number;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "colleague";
  name: string;
  avatar?: string;
  text: string;
  time: string;
  attachment?: { name: string; size: string };
  reactions?: Record<string, number>;
}

export const ChatDemo: React.FC = () => {
  const [channels, setChannels] = useState<string[]>([
    "#general",
    "#design-systems",
    "#ai-assistant",
    "#engineering",
    "#releases",
  ]);
  const [activeChannel, setActiveChannel] = useState("#design-systems");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [myStatus, setMyStatus] = useState<"online" | "busy" | "away" | "offline">("online");
  const [newChannelModal, setNewChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [channelMessages, setChannelMessages] = useState<Record<string, ChatMessage[]>>({
    "#design-systems": [
      {
        id: "msg-1",
        sender: "colleague",
        name: "Marcus Vance",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        text: "Team, I just stress-tested our new shared-UI Spotlight card with 100 concurrent nodes on Safari. Zero frame drops!",
        time: "10:14 AM",
        reactions: { "🔥": 4, "👍": 6 },
      },
      {
        id: "msg-2",
        sender: "colleague",
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        text: "Love that. The radial spotlight gradient variables make it so lightweight compared to rendering multiple canvas layers.",
        time: "10:16 AM",
        reactions: { "🚀": 3 },
      },
      {
        id: "msg-3",
        sender: "bot",
        name: "PulseBot AI",
        text: "Automated telemetry report: Package shared-ui v1.0.0 compiled cleanly in 1.70s. All 8 demo sites verified.",
        time: "10:18 AM",
      },
    ],
    "#ai-assistant": [
      {
        id: "msg-ai-1",
        sender: "bot",
        name: "PulseBot AI",
        text: "Hello! I am your interactive AI assistant. Ask me anything about component props, performance optimization, or architecture patterns.",
        time: "10:00 AM",
      },
    ],
    "#general": [
      {
        id: "msg-gen-1",
        sender: "colleague",
        name: "Aria Thorne",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        text: "Welcome everyone to the new Shared-UI release channel. Feel free to test components and report micro-interaction feedback.",
        time: "09:30 AM",
      },
    ],
  });

  const currentMessages = channelMessages[activeChannel] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages, isTyping, activeChannel]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() && !attachedFile) return;

    const userText = inputMessage;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      name: "You",
      text: userText,
      time: now,
      attachment: attachedFile || undefined,
      reactions: {},
    };

    setChannelMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMsg],
    }));

    setInputMessage("");
    setAttachedFile(null);

    // If in #ai-assistant or prompt mentions PulseBot or Bot
    if (activeChannel === "#ai-assistant" || userText.toLowerCase().includes("bot") || userText.toLowerCase().includes("@pulsebot")) {
      setIsTyping(true);
      const aiResponse = await generateAiResponse(userText);
      setIsTyping(false);

      const botReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "bot",
        name: "PulseBot AI",
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChannelMessages((prev) => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), botReply],
      }));
    }
  };

  const handleAddReaction = (msgId: string, emoji: string) => {
    setChannelMessages((prev) => {
      const msgs = prev[activeChannel] || [];
      return {
        ...prev,
        [activeChannel]: msgs.map((m) => {
          if (m.id === msgId) {
            const rx = m.reactions || {};
            return {
              ...m,
              reactions: {
                ...rx,
                [emoji]: (rx[emoji] || 0) + 1,
              },
            };
          }
          return m;
        }),
      };
    });
  };

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = `#${newChannelName.replace(/^#/, "").toLowerCase().trim()}`;
    if (!cleanName || channels.includes(cleanName)) return;

    setChannels([...channels, cleanName]);
    setChannelMessages((prev) => ({ ...prev, [cleanName]: [] }));
    setActiveChannel(cleanName);
    setNewChannelName("");
    setNewChannelModal(false);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white flex flex-col">
      {/* Top Banner */}
      <div className="py-4 px-6 border-b border-white/10 bg-zinc-950/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GlowingBadge variant="indigo">PULSECHAT WORKSPACE</GlowingBadge>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            Active Channel: <strong className="text-white">{activeChannel}</strong>
          </span>
        </div>

        {/* User Presence Selector */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            <StatusDot status={myStatus} size="sm" />
            <select
              value={myStatus}
              onChange={(e) => setMyStatus(e.target.value as any)}
              className="bg-transparent text-xs text-zinc-300 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="online" className="bg-zinc-900">Online</option>
              <option value="away" className="bg-zinc-900">Away</option>
              <option value="busy" className="bg-zinc-900">Do Not Disturb</option>
              <option value="offline" className="bg-zinc-900">Invisible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Chat Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[75vh]">
        {/* Sidebar Channels & Contacts */}
        <div className="space-y-6">
          <GlassCard className="p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                  Channels ({channels.length})
                </span>
                <button
                  onClick={() => setNewChannelModal(true)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white"
                  title="Create new channel"
                >
                  <Plus size={12} />
                </button>
              </div>

              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      activeChannel === channel
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Hash size={13} />
                      <span>{channel}</span>
                    </div>
                    {channel === "#ai-assistant" && (
                      <span className="text-[9px] px-1 rounded bg-indigo-500/30 text-indigo-200 font-mono">
                        AI
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-2 font-semibold">
                Online Teammates
              </span>
              <div className="space-y-2 text-xs">
                {[
                  { name: "Marcus Vance", status: "online", role: "Design Tech" },
                  { name: "Elena Rostova", status: "online", role: "Frontend" },
                  { name: "PulseBot AI", status: "online", role: "AI Engine" },
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
              <span className="text-xs text-zinc-500 hidden sm:inline font-mono">
                {activeChannel === "#ai-assistant"
                  ? "· Interactive assistant powered by live OpenAI/Gemini or simulated engine"
                  : "· Design systems engineering & component architecture debate"}
              </span>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 max-h-[55vh] pr-2">
            {currentMessages.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <Hash size={32} className="mx-auto text-zinc-600" />
                <p className="text-sm font-semibold text-zinc-400">Welcome to {activeChannel}!</p>
                <p className="text-xs text-zinc-600">This channel was just created. Start typing below.</p>
              </div>
            ) : (
              currentMessages.map((msg) => {
                const isMe = msg.sender === "user";
                const isBot = msg.sender === "bot";

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 group/msg ${isMe ? "flex-row-reverse" : "flex-row"}`}
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

                        {/* File attachment preview */}
                        {msg.attachment && (
                          <div className="mt-2 p-2 rounded-lg bg-black/40 border border-white/10 flex items-center gap-2 text-xs font-mono">
                            <FileText size={14} className="text-amber-400" />
                            <span>{msg.attachment.name}</span>
                            <span className="text-[10px] text-zinc-500">({msg.attachment.size})</span>
                          </div>
                        )}
                      </div>

                      {/* Reactions bar */}
                      <div className="flex items-center gap-1.5 pt-1">
                        {msg.reactions &&
                          Object.entries(msg.reactions).map(([emoji, count]) => (
                            <button
                              key={emoji}
                              onClick={() => handleAddReaction(msg.id, emoji)}
                              className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] flex items-center gap-1 font-mono transition-transform active:scale-90"
                            >
                              <span>{emoji}</span>
                              <span className="text-zinc-400">{count}</span>
                            </button>
                          ))}

                        {/* Quick reaction adders on hover */}
                        <div className="opacity-0 group-hover/msg:opacity-100 transition-opacity flex gap-1">
                          {["👍", "🔥", "🚀", "❤️"].map((e) => (
                            <button
                              key={e}
                              onClick={() => handleAddReaction(msg.id, e)}
                              className="p-1 rounded hover:bg-white/10 text-xs"
                              title={`React with ${e}`}
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono">
                <Bot size={14} className="animate-spin" />
                <span>PulseBot AI is compiling contextual response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Attached file chip */}
          {attachedFile && (
            <div className="mb-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-xs font-mono text-indigo-300">
              <div className="flex items-center gap-2">
                <FileText size={14} />
                <span>Attachment: {attachedFile.name} ({attachedFile.size})</span>
              </div>
              <button onClick={() => setAttachedFile(null)} className="hover:text-white">
                <X size={14} />
              </button>
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="pt-4 border-t border-white/10 flex items-center gap-3"
          >
            <button
              type="button"
              onClick={() =>
                setAttachedFile({
                  name: "shared-ui-tokens-v1.json",
                  size: "14.2 KB",
                })
              }
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              title="Attach File"
            >
              <Paperclip size={16} />
            </button>

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
                disabled={!inputMessage.trim() && !attachedFile}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all shadow-md shadow-indigo-600/25 active:scale-95"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </Magnetic>
          </form>
        </div>
      </div>

      {/* New Channel Modal */}
      <AnimatePresence>
        {newChannelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-zinc-950 border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="font-bold text-sm text-white">Create New Channel</h3>
                <button
                  onClick={() => setNewChannelModal(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateChannel} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. client-feedback"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Create Channel
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatDemo;
