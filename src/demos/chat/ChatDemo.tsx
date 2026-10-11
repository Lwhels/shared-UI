import React, { useState, useRef, useEffect } from "react";
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
  MessageSquare,
  Code,
  Phone,
  Video,
  Pin,
  Bell,
  Radio,
  ChevronDown,
  Lock,
  Copy,
  Check,
  Headphones,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Reaction {
  emoji: string;
  count: number;
}

interface ThreadReply {
  id: string;
  author: string;
  avatar: string;
  role: string;
  text: string;
  timestamp: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "colleague";
  name: string;
  role: string;
  avatar?: string;
  text: string;
  codeSnippet?: string;
  codeLang?: string;
  timestamp: string;
  reactions: Record<string, number>;
  threadReplies: ThreadReply[];
  isPinned?: boolean;
}

export const ChatDemo: React.FC = () => {
  const [activeWorkspace, setActiveWorkspace] = useState<string>("kronos");
  const [activeChannel, setActiveChannel] = useState<string>("#design-systems");
  const [inputMessage, setInputMessage] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [myPresence, setMyPresence] = useState<"online" | "busy" | "away">("online");
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Thread Drawer
  const [activeThreadMsg, setActiveThreadMsg] = useState<ChatMessage | null>(null);
  const [threadReplyInput, setThreadReplyInput] = useState("");

  // New Channel Modal
  const [isNewChannelModalOpen, setIsNewChannelModalOpen] = useState(false);
  const [newChannelTitle, setNewChannelTitle] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [channels, setChannels] = useState<string[]>([
    "#announcements",
    "#design-systems",
    "#engineering-core",
    "#deployment-alerts",
    "#ai-copilot",
  ]);

  const [channelMessages, setChannelMessages] = useState<Record<string, ChatMessage[]>>({
    "#design-systems": [
      {
        id: "msg-1",
        sender: "colleague",
        name: "Marcus Vance",
        role: "Staff Architect",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        text: "Team, I just benchmarked the new radial spotlight gradient variables with 100 concurrent cards on Safari. Render time is down 84%!",
        codeSnippet: `// Smooth CSS Variables injection
cardRef.current.style.setProperty('--mouse-x', \`\${x}px\`);
cardRef.current.style.setProperty('--mouse-y', \`\${y}px\`);`,
        codeLang: "typescript",
        timestamp: "10:14 AM",
        reactions: { "🔥": 5, "👍": 7, "🚀": 3 },
        threadReplies: [
          {
            id: "tr-1",
            author: "Elena Rostova",
            role: "Principal Interaction",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
            text: "Huge win. That avoids touching React reconciler on high-frequency mousemove.",
            timestamp: "10:16 AM",
          },
        ],
      },
      {
        id: "msg-2",
        sender: "colleague",
        name: "Elena Rostova",
        role: "Principal Interaction",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        text: "Agreed. Also added sub-pixel spring damping so the hover cards feel like weighted precision aluminum under your cursor.",
        timestamp: "10:22 AM",
        reactions: { "❤️": 4 },
        threadReplies: [],
      },
      {
        id: "msg-3",
        sender: "bot",
        name: "PulseBot Copilot",
        role: "Automated CI/CD",
        text: "Automated telemetry alert: shared-ui v1.0.0 dual library package compiled cleanly in 1.72s. Zero lint errors across 8 demo verticals.",
        timestamp: "10:28 AM",
        reactions: { "✅": 9 },
        threadReplies: [],
      },
    ],
    "#ai-copilot": [
      {
        id: "msg-ai-1",
        sender: "bot",
        name: "PulseBot Copilot",
        role: "AI Engine",
        text: "Hello! I am your interactive AI engineer. Ask me anything regarding motion physics, Tailwind design tokens, or turnkey Stripe integration.",
        timestamp: "09:40 AM",
        reactions: { "🤖": 3 },
        threadReplies: [],
      },
    ],
    "#engineering-core": [
      {
        id: "msg-eng-1",
        sender: "colleague",
        name: "Devon Cross",
        role: "SRE Lead",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        text: "Global Anycast edge deployment is green across all 48 regions. P99 latency is sitting at 11ms.",
        timestamp: "08:15 AM",
        reactions: { "🟢": 6 },
        threadReplies: [],
      },
    ],
  });

  const activeMessages = channelMessages[activeChannel] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages]);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    setChannelMessages((prev) => {
      const currentList = prev[activeChannel] || [];
      const updatedList = currentList.map((m) => {
        if (m.id === messageId) {
          const currentCount = m.reactions[emoji] || 0;
          return {
            ...m,
            reactions: {
              ...m.reactions,
              [emoji]: currentCount + 1,
            },
          };
        }
        return m;
      });
      return { ...prev, [activeChannel]: updatedList };
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: "user",
      name: "You",
      role: "Lead Engineer",
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: {},
      threadReplies: [],
    };

    const currentMsgText = inputMessage;
    setInputMessage("");

    setChannelMessages((prev) => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), userMsg],
    }));

    // If in AI channel or asking AI
    if (activeChannel === "#ai-copilot" || currentMsgText.startsWith("/ai")) {
      setIsAiTyping(true);

      const query = currentMsgText.replace(/^\/ai\s*/, "");
      const aiReplyText = await generateAiResponse(
        query,
        [{ role: "user", content: query }],
        `You are PulseBot Copilot in the ${activeChannel} channel of Kronos Studio.`
      );

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        name: "PulseBot Copilot",
        role: "AI Engine",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        reactions: { "✨": 2 },
        threadReplies: [],
      };

      setIsAiTyping(false);
      setChannelMessages((prev) => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), botMsg],
      }));
    }
  };

  const handleSendThreadReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThreadMsg || !threadReplyInput.trim()) return;

    const newReply: ThreadReply = {
      id: `tr_${Date.now()}`,
      author: "You",
      role: "Lead Engineer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      text: threadReplyInput.trim(),
      timestamp: "Just now",
    };

    setChannelMessages((prev) => {
      const currentList = prev[activeChannel] || [];
      const updatedList = currentList.map((m) =>
        m.id === activeThreadMsg.id
          ? { ...m, threadReplies: [...m.threadReplies, newReply] }
          : m
      );
      return { ...prev, [activeChannel]: updatedList };
    });

    setActiveThreadMsg((prev) =>
      prev ? { ...prev, threadReplies: [...prev.threadReplies, newReply] } : null
    );

    setThreadReplyInput("");
  };

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelTitle.trim()) return;

    const formattedName = `#${newChannelTitle.trim().replace(/^#/, "").toLowerCase()}`;
    if (!channels.includes(formattedName)) {
      setChannels([...channels, formattedName]);
      setActiveChannel(formattedName);
      setChannelMessages((prev) => ({ ...prev, [formattedName]: [] }));
    }

    setNewChannelTitle("");
    setIsNewChannelModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-100 font-sans selection:bg-purple-500/30 selection:text-white flex overflow-hidden">
      {/* Pane 1: Leftmost Workspace Switcher Rail */}
      <div className="w-16 bg-[#080B10] border-r border-slate-800 flex flex-col items-center py-4 justify-between shrink-0">
        <div className="space-y-3">
          {/* Active Workspace */}
          <button
            onClick={() => setActiveWorkspace("kronos")}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
              activeWorkspace === "kronos"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 rounded-xl"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Kronos Engineering Workspace"
          >
            ⚡
          </button>

          <button
            onClick={() => setActiveWorkspace("design")}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
              activeWorkspace === "design"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 rounded-xl"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Design Systems Lab"
          >
            🎨
          </button>

          <button
            onClick={() => setActiveWorkspace("growth")}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
              activeWorkspace === "growth"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30 rounded-xl"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
            title="Growth & Telemetry"
          >
            📈
          </button>

          <div className="w-8 h-0.5 bg-slate-800 mx-auto" />

          <button
            onClick={() => setIsNewChannelModalOpen(true)}
            className="w-11 h-11 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="Add Channel"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Presence Avatar */}
        <div className="relative group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
            alt="My Status"
            className="w-10 h-10 rounded-xl object-cover border border-slate-700"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#080B10] ${
              myPresence === "online" ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
        </div>
      </div>

      {/* Pane 2: Channel & Direct Message Sidebar */}
      <div className="w-64 bg-[#121622] border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Workspace Title & Dropdown */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>Kronos Studio</span>
                <ChevronDown size={14} className="text-slate-400" />
              </h2>
              <span className="text-[10px] font-mono text-emerald-400">● 42 Members Online</span>
            </div>
          </div>

          {/* Huddle Live Banner */}
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between text-purple-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Headphones size={13} className="text-purple-400" />
                <span>Active Voice Huddle</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400">Design System Sync (4 in room)</p>
          </div>

          {/* Channels Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 mb-1">
              <span>Text Channels</span>
              <button
                onClick={() => setIsNewChannelModalOpen(true)}
                className="hover:text-white"
              >
                <Plus size={13} />
              </button>
            </div>

            {channels.map((ch) => (
              <button
                key={ch}
                onClick={() => {
                  setActiveChannel(ch);
                  setActiveThreadMsg(null);
                }}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  activeChannel === ch
                    ? "bg-purple-600/20 text-purple-300 font-bold border border-purple-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Hash size={14} />
                <span>{ch.replace(/^#/, "")}</span>
              </button>
            ))}
          </div>

          {/* Direct Messages Section */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 mb-1 block">
              Direct Messages
            </span>

            {[
              { name: "Marcus Vance", status: "online", role: "Staff Arch" },
              { name: "Elena Rostova", status: "online", role: "Design Lead" },
              { name: "PulseBot Copilot", status: "ai", role: "AI Assistant" },
              { name: "Devon Cross", status: "away", role: "SRE Lead" },
            ].map((dm) => (
              <div
                key={dm.name}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800/50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      dm.status === "online"
                        ? "bg-emerald-400"
                        : dm.status === "ai"
                        ? "bg-purple-400 animate-pulse"
                        : "bg-amber-400"
                    }`}
                  />
                  <span>{dm.name}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{dm.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Presence Switcher Bottom */}
        <div className="p-3 bg-[#0E121B] border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-semibold text-slate-200">You (Lead Eng)</span>
          </div>
          <button
            onClick={() => setMyPresence(myPresence === "online" ? "busy" : "online")}
            className="text-[10px] font-mono text-slate-400 hover:text-white"
          >
            {myPresence.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Pane 3: Main Channel Canvas */}
      <div className="flex-1 flex flex-col justify-between h-screen bg-[#0E121B] min-w-0">
        {/* Channel Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#121622]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Hash size={18} className="text-purple-400" />
              <h3 className="font-bold text-white text-base">
                {activeChannel.replace(/^#/, "")}
              </h3>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Real-time engineering discussions & motion tokens
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <button
              onClick={() => {
                setActiveChannel("#ai-copilot");
              }}
              className="px-3 py-1.5 rounded-full bg-purple-600/20 text-purple-300 text-xs font-mono font-bold hover:bg-purple-600/30 transition-colors flex items-center gap-1.5"
            >
              <Sparkles size={13} />
              <span>Ask Copilot AI</span>
            </button>
            <button className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white">
              <Phone size={16} />
            </button>
            <button className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white">
              <Video size={16} />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Date Divider */}
          <div className="flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              Today — October 11, 2026
            </span>
          </div>

          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className="group relative flex gap-3.5 hover:bg-slate-900/40 p-2 rounded-xl transition-colors"
            >
              {/* Avatar */}
              {msg.avatar ? (
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold">
                  🤖
                </div>
              )}

              {/* Message Content */}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <strong className="text-sm text-white font-semibold">{msg.name}</strong>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {msg.role}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">{msg.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {msg.text}
                </p>

                {/* Code Snippet Box */}
                {msg.codeSnippet && (
                  <div className="mt-2 rounded-xl bg-[#080B10] border border-slate-800 overflow-hidden font-mono text-xs">
                    <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                      <span>{msg.codeLang}</span>
                      <button
                        onClick={() => copyCode(msg.codeSnippet!, msg.id)}
                        className="flex items-center gap-1 hover:text-white"
                      >
                        {copiedCodeId === msg.id ? (
                          <Check size={12} className="text-emerald-400" />
                        ) : (
                          <Copy size={12} />
                        )}
                        <span>{copiedCodeId === msg.id ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="p-3 text-purple-300 overflow-x-auto">{msg.codeSnippet}</pre>
                  </div>
                )}

                {/* Reaction Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {Object.entries(msg.reactions).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      onClick={() => handleAddReaction(msg.id, emoji)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700"
                    >
                      <span>{emoji}</span>
                      <span>{count}</span>
                    </button>
                  ))}

                  {/* Thread Reply Link */}
                  {msg.threadReplies.length > 0 && (
                    <button
                      onClick={() => setActiveThreadMsg(msg)}
                      className="text-xs font-mono text-purple-400 hover:underline flex items-center gap-1 ml-2"
                    >
                      <MessageSquare size={12} />
                      <span>{msg.threadReplies.length} replies</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Hover Quick Action Bar */}
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 border border-slate-700 rounded-lg p-1 flex items-center gap-1 shadow-lg">
                <button
                  onClick={() => handleAddReaction(msg.id, "🔥")}
                  className="p-1 hover:bg-slate-700 rounded text-xs"
                  title="Fire Reaction"
                >
                  🔥
                </button>
                <button
                  onClick={() => handleAddReaction(msg.id, "👍")}
                  className="p-1 hover:bg-slate-700 rounded text-xs"
                  title="Thumbs Up"
                >
                  👍
                </button>
                <button
                  onClick={() => setActiveThreadMsg(msg)}
                  className="p-1 hover:bg-slate-700 rounded text-slate-300"
                  title="Reply in Thread"
                >
                  <MessageSquare size={13} />
                </button>
              </div>
            </div>
          ))}

          {isAiTyping && (
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 p-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>PulseBot Copilot is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <div className="p-4 border-t border-slate-800 bg-[#121622]/80">
          <form
            onSubmit={handleSendMessage}
            className="rounded-xl bg-slate-900 border border-slate-700 p-3 space-y-2 focus-within:border-purple-500 transition-colors"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activeChannel}... (Type /ai to prompt Copilot)`}
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button type="button" className="hover:text-white p-1">
                  <Paperclip size={14} />
                </button>
                <button type="button" className="hover:text-white p-1">
                  <Smile size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setInputMessage((prev) => prev + " `/ai `")}
                  className="hover:text-purple-400 p-1 flex items-center gap-1 font-mono text-[11px]"
                >
                  <Sparkles size={12} />
                  <span>AI Prompt</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-transform active:scale-95 disabled:opacity-40 flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Pane 4: Dedicated Thread Drawer (Slide-Over) */}
      <AnimatePresence>
        {activeThreadMsg && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[#121622] border-l border-slate-800 flex flex-col justify-between shrink-0 h-screen overflow-hidden"
          >
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#161C2B]">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-purple-400" />
                <h4 className="font-bold text-sm text-white">Thread Discussion</h4>
              </div>
              <button
                onClick={() => setActiveThreadMsg(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Parent Message in Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <strong className="text-purple-300 block">{activeThreadMsg.name}</strong>
                <p className="text-slate-200">{activeThreadMsg.text}</p>
              </div>

              {/* Thread replies */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Replies ({activeThreadMsg.threadReplies.length})
                </span>

                {activeThreadMsg.threadReplies.map((r) => (
                  <div key={r.id} className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between items-baseline">
                      <strong className="text-slate-200">{r.author}</strong>
                      <span className="text-[10px] text-slate-500">{r.timestamp}</span>
                    </div>
                    <p className="text-slate-300">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Thread Reply Composer */}
            <form onSubmit={handleSendThreadReply} className="p-3 border-t border-slate-800 bg-[#0E121B] flex gap-2">
              <input
                type="text"
                value={threadReplyInput}
                onChange={(e) => setThreadReplyInput(e.target.value)}
                placeholder="Reply in thread..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                required
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Channel Modal */}
      <AnimatePresence>
        {isNewChannelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewChannelModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#121622] rounded-2xl shadow-2xl p-6 border border-slate-700 z-10 text-xs font-mono"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <h3 className="text-sm font-bold text-white">Create New Channel</h3>
                <button
                  onClick={() => setIsNewChannelModalOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateChannel} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-1">Channel Name</label>
                  <input
                    type="text"
                    value={newChannelTitle}
                    onChange={(e) => setNewChannelTitle(e.target.value)}
                    placeholder="e.g. telemetry-alerts"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold"
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
