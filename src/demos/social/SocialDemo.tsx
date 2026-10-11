import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Heart,
  MessageCircle,
  Repeat,
  Share2,
  Sparkles,
  Send,
  TrendingUp,
  Image,
  Smile,
  Users,
  Check,
  Bell,
  X,
  Bookmark,
  ExternalLink,
  Radio,
  Search,
  Hash,
  Compass,
  CheckCircle2,
  MoreHorizontal,
  BarChart2,
  AtSign,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Reply {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface PollOption {
  text: string;
  votes: number;
}

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    badge: string;
    verified: boolean;
  };
  timestamp: string;
  content: string;
  tags: string[];
  likes: number;
  reposts: number;
  replies: Reply[];
  hasLiked?: boolean;
  hasReposted?: boolean;
  hasBookmarked?: boolean;
  poll?: {
    question: string;
    options: PollOption[];
    userVotedIndex?: number;
  };
}

export const SocialDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"for-you" | "following" | "design-tech">("for-you");
  const [composerText, setComposerText] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeThreadPost, setActiveThreadPost] = useState<Post | null>(null);
  const [newReplyText, setNewReplyText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [followedUsers, setFollowedUsers] = useState<Set<string>>(
    new Set(["@ariathorne", "@kaelenvoss"])
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFollow = (handle: string) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) {
        next.delete(handle);
        showToast(`Unfollowed ${handle}`);
      } else {
        next.add(handle);
        showToast(`Now following ${handle}`);
      }
      return next;
    });
  };

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post-1",
      author: {
        name: "Aria Thorne",
        handle: "@ariathorne",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        badge: "Design Director",
        verified: true,
      },
      timestamp: "8m ago",
      content:
        "Just open-sourced our entire interactive 3D perspective component collection. Hover physics feel like actual tactile hardware under your glass trackpad. Check the shared-UI repository!",
      tags: ["#DesignSystems", "#MotionUI", "#React18"],
      likes: 184,
      reposts: 42,
      hasLiked: false,
      replies: [
        {
          id: "r1",
          author: "Kaelen Voss",
          handle: "@kaelenvoss",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
          text: "The sub-pixel damping curves are buttery smooth on 120Hz ProMotion displays!",
          timestamp: "5m ago",
        },
        {
          id: "r2",
          author: "Devon Cross",
          handle: "@devoncross",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
          text: "Already using the Spotlight component on our landing page. Absolute game changer.",
          timestamp: "2m ago",
        },
      ],
      poll: {
        question: "Which motion paradigm feels best for high-frequency trading dashboards?",
        options: [
          { text: "Damped Spring Oscillators", votes: 142 },
          { text: "Linear Hardware Transforms", votes: 38 },
          { text: "Zero Animation (Instant Cut)", votes: 61 },
        ],
      },
    },
    {
      id: "post-2",
      author: {
        name: "Kaelen Voss",
        handle: "@kaelenvoss",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        badge: "WebGL Architect",
        verified: true,
      },
      timestamp: "45m ago",
      content:
        "PSA: If your CSS radial gradient spotlight is causing layout reflows, move mouse coordinates into raw CSS variables instead of React state. Drops CPU usage from 34% to 2% flat.",
      tags: ["#WebPerf", "#CSS", "#Frontend"],
      likes: 295,
      reposts: 88,
      hasLiked: false,
      replies: [
        {
          id: "r3",
          author: "Aria Thorne",
          handle: "@ariathorne",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          text: "100%. Keeping transform computations out of the React render loop is law.",
          timestamp: "20m ago",
        },
      ],
    },
    {
      id: "post-3",
      author: {
        name: "Devon Cross",
        handle: "@devoncross",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        badge: "Systems Lead",
        verified: false,
      },
      timestamp: "2h ago",
      content:
        "Shipped our turnkey Stripe payment integration with instant email receipts today. Zero superfluous SaaS dependencies, just clean TypeScript abstractions.",
      tags: ["#TypeScript", "#Stripe", "#IndieHacker"],
      likes: 92,
      reposts: 15,
      hasLiked: false,
      replies: [],
    },
  ]);

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked: nextLiked,
            likes: nextLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleRepost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextRepost = !p.hasReposted;
          return {
            ...p,
            hasReposted: nextRepost,
            reposts: nextRepost ? p.reposts + 1 : p.reposts - 1,
          };
        }
        return p;
      })
    );
    showToast("Reposted to your follower network.");
  };

  const handleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextBookmark = !p.hasBookmarked;
          return { ...p, hasBookmarked: nextBookmark };
        }
        return p;
      })
    );
    showToast("Post saved to bookmarks.");
  };

  const handleVotePoll = (postId: string, optionIdx: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId && p.poll && p.poll.userVotedIndex === undefined) {
          const updatedOptions = p.poll.options.map((opt, i) =>
            i === optionIdx ? { ...opt, votes: opt.votes + 1 } : opt
          );
          return {
            ...p,
            poll: {
              ...p.poll,
              options: updatedOptions,
              userVotedIndex: optionIdx,
            },
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: {
        name: "You (Active Creator)",
        handle: "@you",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        badge: "Pro Member",
        verified: true,
      },
      timestamp: "Just now",
      content: composerText.trim(),
      tags: ["#Community", "#SharedUI"],
      likes: 1,
      reposts: 0,
      hasLiked: true,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setComposerText("");
    showToast("Dispatch published live to network!");

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#1D9BF0", "#8B5CF6", "#10B981"],
    });
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThreadPost || !newReplyText.trim()) return;

    const replyObj: Reply = {
      id: `rep_${Date.now()}`,
      author: "You",
      handle: "@you",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      text: newReplyText.trim(),
      timestamp: "Just now",
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === activeThreadPost.id ? { ...p, replies: [...p.replies, replyObj] } : p
      )
    );

    setActiveThreadPost((prev) =>
      prev ? { ...prev, replies: [...prev.replies, replyObj] } : null
    );

    setNewReplyText("");
    showToast("Reply published to thread.");
  };

  const filteredPosts = posts.filter((p) => {
    if (selectedTag && !p.tags.includes(selectedTag)) return false;
    if (activeTab === "following") return followedUsers.has(p.author.handle);
    if (activeTab === "design-tech") return p.tags.some((t) => t.toLowerCase().includes("design") || t.toLowerCase().includes("motion"));
    return true;
  });

  const maxChars = 280;
  const charsLeft = maxChars - composerText.length;
  const progressRatio = Math.min(1, composerText.length / maxChars);

  return (
    <div className="min-h-screen bg-[#0C1017] text-slate-100 font-sans selection:bg-[#1D9BF0]/30 selection:text-white">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#1D9BF0] text-white text-xs font-semibold shadow-2xl flex items-center gap-2"
          >
            <Sparkles size={14} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Column: Navigation Rail */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-slate-800/80 p-6 sticky top-0 h-screen flex flex-col justify-between">
          <div className="space-y-6">
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1D9BF0] to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-sky-500/20">
                P
              </div>
              <div>
                <span className="font-bold tracking-tight text-white text-base">Pulse Network</span>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE GLOBAL MESH</span>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="space-y-1.5 text-sm font-medium">
              {[
                { label: "Home Feed", icon: Hash, active: true },
                { label: "Trending Topics", icon: TrendingUp },
                { label: "Notifications", icon: Bell, badge: "3" },
                { label: "Bookmarks", icon: Bookmark },
                { label: "Live Spaces", icon: Radio, live: true },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                    item.active
                      ? "bg-slate-800/90 text-white font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={item.active ? "text-[#1D9BF0]" : ""} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#1D9BF0] text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.live && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              ))}
            </nav>

            {/* Quick Primary Button */}
            <button
              onClick={() => {
                const el = document.getElementById("main-composer");
                el?.focus();
              }}
              className="w-full py-3 rounded-full bg-[#1D9BF0] hover:bg-sky-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-sky-500/20 active:scale-95"
            >
              Post Dispatch
            </button>
          </div>

          {/* User mini bar */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="text-xs">
                <strong className="block text-white leading-tight">Alex Vance</strong>
                <span className="text-slate-400 text-[11px]">@alexvance</span>
              </div>
            </div>
            <MoreHorizontal size={16} className="text-slate-500" />
          </div>
        </aside>

        {/* Center Column: Feed Stream */}
        <main className="col-span-1 lg:col-span-6 border-r border-slate-800/80 min-h-screen">
          {/* Feed Header Tabs */}
          <div className="sticky top-0 z-30 bg-[#0C1017]/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-6">
            <div className="flex gap-2">
              {[
                { id: "for-you", label: "For You" },
                { id: "following", label: "Following" },
                { id: "design-tech", label: "Design Tech" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSelectedTag(null);
                  }}
                  className={`py-3.5 px-3 text-xs font-semibold transition-all relative ${
                    activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeFeedTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1D9BF0] rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {selectedTag && (
              <div className="flex items-center gap-1.5 text-xs text-[#1D9BF0] bg-sky-500/10 px-2.5 py-1 rounded-full">
                <span>{selectedTag}</span>
                <button onClick={() => setSelectedTag(null)} className="hover:text-white">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Post Composer Box */}
          <form
            onSubmit={handleCreatePost}
            className="p-4 sm:p-6 border-b border-slate-800 space-y-3 bg-[#10141D]"
          >
            <div className="flex gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <textarea
                  id="main-composer"
                  rows={3}
                  value={composerText}
                  onChange={(e) => setComposerText(e.target.value.slice(0, maxChars))}
                  placeholder="What are you building today? Share a technical insight..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none"
                />

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {/* Action Icons */}
                  <div className="flex items-center gap-1 text-[#1D9BF0]">
                    <button type="button" className="p-1.5 rounded-full hover:bg-sky-500/10 transition-colors">
                      <Image size={16} />
                    </button>
                    <button type="button" className="p-1.5 rounded-full hover:bg-sky-500/10 transition-colors">
                      <BarChart2 size={16} />
                    </button>
                    <button type="button" className="p-1.5 rounded-full hover:bg-sky-500/10 transition-colors">
                      <Smile size={16} />
                    </button>
                  </div>

                  {/* Character Counter & Submit */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono ${
                        charsLeft < 20 ? "text-red-400 font-bold" : "text-slate-500"
                      }`}
                    >
                      {charsLeft}
                    </span>

                    <button
                      type="submit"
                      disabled={!composerText.trim()}
                      className="px-5 py-2 rounded-full bg-[#1D9BF0] hover:bg-sky-400 text-white font-bold text-xs transition-transform active:scale-95 disabled:opacity-40"
                    >
                      Dispatch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Posts Feed Stream */}
          <div className="divide-y divide-slate-800/80">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="p-4 sm:p-6 hover:bg-slate-900/40 transition-colors space-y-3"
              >
                {/* Author Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-sm text-white font-semibold">
                          {post.author.name}
                        </strong>
                        {post.author.verified && (
                          <CheckCircle2 size={13} className="text-[#1D9BF0]" />
                        )}
                        <span className="text-xs text-slate-400">{post.author.handle}</span>
                        <span className="text-xs text-slate-500">· {post.timestamp}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {post.author.badge}
                      </span>
                    </div>
                  </div>

                  <button className="text-slate-500 hover:text-slate-300">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Content */}
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="text-xs text-[#1D9BF0] hover:underline"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Interactive Poll Box (if present) */}
                {post.poll && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <span className="text-xs font-semibold text-slate-300 block">
                      {post.poll.question}
                    </span>
                    <div className="space-y-2">
                      {post.poll.options.map((opt, i) => {
                        const totalVotes = post.poll!.options.reduce((s, o) => s + o.votes, 0);
                        const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                        const hasVoted = post.poll!.userVotedIndex !== undefined;

                        return (
                          <div
                            key={opt.text}
                            onClick={() => !hasVoted && handleVotePoll(post.id, i)}
                            className={`p-2.5 rounded-lg border text-xs font-mono relative overflow-hidden transition-all ${
                              hasVoted
                                ? "border-slate-700 bg-slate-800/80 cursor-default"
                                : "border-slate-700 hover:border-[#1D9BF0] bg-slate-800/40 cursor-pointer"
                            }`}
                          >
                            {hasVoted && (
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-[#1D9BF0]/20 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            )}
                            <div className="relative flex justify-between items-center">
                              <span className="text-slate-200 font-medium">{opt.text}</span>
                              {hasVoted && <strong className="text-slate-400">{pct}%</strong>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Post Action Bar */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 max-w-md">
                  {/* Reply Button */}
                  <button
                    onClick={() => setActiveThreadPost(post)}
                    className="flex items-center gap-1.5 hover:text-[#1D9BF0] transition-colors"
                  >
                    <MessageCircle size={15} />
                    <span>{post.replies.length}</span>
                  </button>

                  {/* Repost Button */}
                  <button
                    onClick={() => handleRepost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.hasReposted ? "text-emerald-400" : "hover:text-emerald-400"
                    }`}
                  >
                    <Repeat size={15} />
                    <span>{post.reposts}</span>
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.hasLiked ? "text-red-500" : "hover:text-red-500"
                    }`}
                  >
                    <Heart size={15} className={post.hasLiked ? "fill-red-500" : ""} />
                    <span>{post.likes}</span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`hover:text-[#1D9BF0] transition-colors ${
                      post.hasBookmarked ? "text-[#1D9BF0]" : ""
                    }`}
                  >
                    <Bookmark size={15} className={post.hasBookmarked ? "fill-[#1D9BF0]" : ""} />
                  </button>

                  {/* Share Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://pulse.network/posts/${post.id}`);
                      showToast("Post link copied to clipboard!");
                    }}
                    className="hover:text-[#1D9BF0] transition-colors"
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Column: Trending & Discovery */}
        <aside className="hidden lg:block lg:col-span-3 p-6 space-y-6 sticky top-0 h-screen overflow-y-auto">
          {/* Search Box */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Pulse dispatches..."
              className="w-full bg-slate-900 text-xs text-white pl-9 pr-4 py-2.5 rounded-full border border-slate-800 focus:outline-none focus:border-[#1D9BF0]"
            />
          </div>

          {/* Live Spaces Audio Room */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE AUDIO SPACE</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Designing at 120fps: Physics, Springs & Shaders
            </h4>
            <p className="text-xs text-slate-400">Hosted by Aria Thorne · 142 tuning in</p>
            <button
              onClick={() => showToast("Connected to live audio telemetry room.")}
              className="w-full py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors"
            >
              Tune In to Stage
            </button>
          </div>

          {/* Trending Topics Box */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Trending in Tech
            </span>
            <div className="space-y-2.5 text-xs">
              {[
                { tag: "#MotionUI", count: "14.2k dispatches" },
                { tag: "#Vite6", count: "9.8k dispatches" },
                { tag: "#SubPixelPhysics", count: "6.1k dispatches" },
                { tag: "#DesignEngineers", count: "4.5k dispatches" },
              ].map((t) => (
                <div
                  key={t.tag}
                  onClick={() => setSelectedTag(t.tag)}
                  className="cursor-pointer hover:bg-slate-800/60 p-2 rounded-lg transition-colors"
                >
                  <strong className="text-slate-200 block">{t.tag}</strong>
                  <span className="text-[11px] text-slate-500">{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who to Follow Box */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Who to Follow
            </span>
            <div className="space-y-3 text-xs">
              {[
                {
                  name: "Aria Thorne",
                  handle: "@ariathorne",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                },
                {
                  name: "Kaelen Voss",
                  handle: "@kaelenvoss",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                },
              ].map((user) => {
                const isFollowing = followedUsers.has(user.handle);
                return (
                  <div key={user.handle} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <strong className="text-white block">{user.name}</strong>
                        <span className="text-slate-500 text-[11px]">{user.handle}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFollow(user.handle)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        isFollowing
                          ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          : "bg-white text-slate-950 hover:bg-slate-200"
                      }`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Slide-over Nested Thread Drawer */}
      <AnimatePresence>
        {activeThreadPost && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveThreadPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0C1017] border-l border-slate-800 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Top */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#10141D]">
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} className="text-[#1D9BF0]" />
                  <h3 className="font-bold text-white text-sm">Thread Conversation</h3>
                </div>
                <button
                  onClick={() => setActiveThreadPost(null)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Post Context in Drawer */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={activeThreadPost.author.avatar}
                      alt={activeThreadPost.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-xs">
                      <strong className="text-white block">{activeThreadPost.author.name}</strong>
                      <span className="text-slate-400">{activeThreadPost.author.handle}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeThreadPost.content}
                  </p>
                </div>

                {/* Replies list */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono uppercase text-slate-500 block">
                    Replies ({activeThreadPost.replies.length})
                  </span>

                  {activeThreadPost.replies.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-6 text-center">
                      No replies yet. Be the first to start the discussion!
                    </p>
                  ) : (
                    activeThreadPost.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1.5 text-xs"
                      >
                        <div className="flex justify-between items-baseline">
                          <strong className="text-slate-200">{rep.author}</strong>
                          <span className="text-[10px] text-slate-500">{rep.timestamp}</span>
                        </div>
                        <p className="text-slate-300 font-normal">{rep.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Reply Composer Bottom */}
              <form onSubmit={handleAddReply} className="p-4 border-t border-slate-800 bg-[#10141D] flex gap-2">
                <input
                  type="text"
                  value={newReplyText}
                  onChange={(e) => setNewReplyText(e.target.value)}
                  placeholder="Post your reply to the thread..."
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-full text-xs text-white focus:outline-none focus:border-[#1D9BF0]"
                  required
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-[#1D9BF0] hover:bg-sky-400 text-white"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
