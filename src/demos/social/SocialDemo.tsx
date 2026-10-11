import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Spotlight,
  GlassCard,
  Magnetic,
  GlowingBadge,
  StatusDot,
  TextReveal,
} from "../../components";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    badge: string;
    bio?: string;
  };
  timestamp: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  reposts: number;
  hasLiked?: boolean;
}

export const SocialDemo: React.FC = () => {
  const [newPostText, setNewPostText] = useState("");
  const [activeTag, setActiveTag] = useState("#motionUI");
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set(["@ariathorne"]));
  const [selectedPostForComments, setSelectedPostForComments] = useState<Post | null>(null);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [selectedUserProfile, setSelectedUserProfile] = useState<any | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post-1",
      author: {
        name: "Aria Thorne",
        handle: "@ariathorne",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        badge: "Design Director",
        bio: "Directing interaction physics and spatial design tokens at Horizon Labs. Obsessed with 120fps fluid mechanics.",
      },
      timestamp: "12m ago",
      content:
        "Just open-sourced our entire interactive 3D perspective component collection. Hover physics feel like actual tactile hardware under your glass trackpad. Check the shared-UI repository!",
      tags: ["#designSystems", "#motionUI", "#react"],
      likes: 124,
      comments: [
        { id: "cm-1", author: "Kaelen Voss", text: "The sub-pixel damping curves are buttery smooth on Safari!", timestamp: "5m ago" },
        { id: "cm-2", author: "Devon Cross", text: "Already using the Spotlight component on our landing page.", timestamp: "2m ago" },
      ],
      reposts: 32,
      hasLiked: false,
    },
    {
      id: "post-2",
      author: {
        name: "Kaelen Voss",
        handle: "@kaelenvoss",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        badge: "WebGL Engineer",
        bio: "Compiling fragment shaders and high-speed motion loops. Ex-Automotive UI lead.",
      },
      timestamp: "1h ago",
      content:
        "Sub-pixel spring damping in Framer Motion is unbeatable when combined with radial spotlight CSS variables. No lag, no re-render jank on 120Hz ProMotion screens.",
      tags: ["#webperf", "#framerMotion", "#frontend"],
      likes: 89,
      comments: [],
      reposts: 14,
      hasLiked: true,
    },
    {
      id: "post-3",
      author: {
        name: "Sloane Lin",
        handle: "@sloanelin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        badge: "Founding Designer",
        bio: "Building next-generation design systems with multi-theme architecture.",
      },
      timestamp: "3h ago",
      content:
        "The best design systems aren't dogmatic. They give you the physics, the spotlights, and the typography tokens, then let you craft restaurants, SaaS, or portfolios without looking identical.",
      tags: ["#designPhilosophy", "#uiUx"],
      likes: 245,
      comments: [
        { id: "cm-3", author: "Maya Sterling", text: "Spot on! The 5-theme switcher proves this exact thesis.", timestamp: "1h ago" },
      ],
      reposts: 58,
      hasLiked: false,
    },
  ]);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const liked = !p.hasLiked;
          return {
            ...p,
            hasLiked: liked,
            likes: liked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: "You (Creative Lead)",
        handle: "@creator",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        badge: "Pro Member",
        bio: "Founding architect experimenting with shared-UI client libraries.",
      },
      timestamp: "Just now",
      content: newPostText,
      tags: [activeTag],
      likes: 1,
      comments: [],
      reposts: 0,
      hasLiked: true,
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");

    confetti({
      particleCount: 50,
      spread: 45,
      origin: { y: 0.6 },
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim() || !selectedPostForComments) return;

    const commentItem: Comment = {
      id: `cm-${Date.now()}`,
      author: "You (@creator)",
      text: newCommentInput,
      timestamp: "Just now",
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === selectedPostForComments.id
          ? { ...p, comments: [...p.comments, commentItem] }
          : p
      )
    );

    setSelectedPostForComments((prev) =>
      prev ? { ...prev, comments: [...prev.comments, commentItem] } : null
    );

    setNewCommentInput("");
  };

  const toggleFollow = (handle: string) => {
    setFollowedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) next.delete(handle);
      else next.add(handle);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header Banner with Notifications Trigger */}
      <section className="relative py-16 px-6 text-center border-b border-white/10 bg-gradient-to-b from-purple-950/20 to-zinc-950/60">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <GlowingBadge variant="rose">SPHERE CREATOR NETWORK</GlowingBadge>

            {/* Notification Bell Pill */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white relative transition-transform active:scale-95"
                title="Notifications"
              >
                <Bell size={14} />
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-zinc-950 border border-white/15 rounded-2xl p-3 shadow-2xl text-left z-50 space-y-2"
                  >
                    <div className="text-xs font-bold text-white px-2 py-1 border-b border-white/10">
                      Notifications (3)
                    </div>
                    {[
                      { text: "Elena Rostova liked your post on #motionUI", time: "5m ago" },
                      { text: "Marcus Vance mentioned you in #designSystems", time: "22m ago" },
                      { text: "Aria Thorne started following your updates", time: "1h ago" },
                    ].map((n, i) => (
                      <div key={i} className="p-2 rounded-xl bg-white/[0.02] text-xs text-zinc-300">
                        <div>{n.text}</div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{n.time}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight">
            Connect with the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-300 to-indigo-400">
              <TextReveal text="Vanguard of Digital Design." />
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            A collaborative stream where designers, creative coders, and founders exchange production components and experiments.
          </p>
        </div>
      </section>

      {/* Main 3-Column Community Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Profile & Navigation */}
        <div className="space-y-6">
          <GlassCard className="p-6 text-center space-y-4">
            <div
              className="relative inline-block mx-auto cursor-pointer"
              onClick={() =>
                setSelectedUserProfile({
                  name: "Alex Rivera",
                  handle: "@alexdesign",
                  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
                  badge: "Pro Architect",
                  bio: "Lead Interface Technologist at Shared-UI. Focusing on 120fps motion design tokens.",
                  stats: { followers: "8.9k", following: "1.4k", components: 42 },
                })
              }
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="Your Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-rose-500/50 mx-auto"
              />
              <div className="absolute bottom-0 right-0">
                <StatusDot status="online" size="md" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-white">Alex Rivera</h3>
              <p className="text-xs text-zinc-400 font-mono">@alexdesign · Pro</p>
            </div>

            <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="font-bold text-white block">1.4k</span>
                <span className="text-[10px] text-zinc-500">Following</span>
              </div>
              <div>
                <span className="font-bold text-white block">8.9k</span>
                <span className="text-[10px] text-zinc-500">Followers</span>
              </div>
              <div>
                <span className="font-bold text-rose-400 block">42</span>
                <span className="text-[10px] text-zinc-500">Components</span>
              </div>
            </div>
          </GlassCard>

          {/* Trending Topics */}
          <Spotlight className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 font-mono uppercase">
              <TrendingUp size={14} />
              <span>Trending Tags</span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { tag: "#motionUI", posts: "2.4k posts" },
                { tag: "#designSystems", posts: "1.8k posts" },
                { tag: "#reactSpring", posts: "940 posts" },
                { tag: "#threeDCard", posts: "620 posts" },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTag(item.tag)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer text-zinc-300 hover:text-white"
                >
                  <span className="font-mono text-amber-400">{item.tag}</span>
                  <span className="text-[10px] text-zinc-500">{item.posts}</span>
                </div>
              ))}
            </div>
          </Spotlight>
        </div>

        {/* Center: Post Feed & Composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Composer */}
          <GlassCard className="p-5">
            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Share a component pattern, animation trick, or code snippet..."
                rows={3}
                className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
              />

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-amber-400">
                    {activeTag}
                  </span>
                </div>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    disabled={!newPostText.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-500 hover:bg-rose-400 disabled:opacity-40 text-white font-bold text-xs transition-colors"
                  >
                    <Send size={12} />
                    <span>Publish Post</span>
                  </button>
                </Magnetic>
              </div>
            </form>
          </GlassCard>

          {/* Post Stream */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Spotlight key={post.id} className="p-6 space-y-4 group">
                <div className="flex items-center justify-between">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setSelectedUserProfile(post.author)}
                  >
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white hover:underline">
                          {post.author.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 font-mono">
                          {post.author.badge}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">
                        {post.author.handle} · {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-amber-400 hover:underline cursor-pointer"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-zinc-400 text-xs">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.hasLiked ? "text-rose-400 font-semibold" : "hover:text-rose-400"
                    }`}
                  >
                    <Heart size={15} fill={post.hasLiked ? "currentColor" : "none"} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() => setSelectedPostForComments(post)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <MessageCircle size={15} />
                    <span>{post.comments.length}</span>
                  </button>

                  <button
                    onClick={() => {
                      setPosts((prev) =>
                        prev.map((p) => (p.id === post.id ? { ...p, reposts: p.reposts + 1 } : p))
                      );
                    }}
                    className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                  >
                    <Repeat size={15} />
                    <span>{post.reposts}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://sphere.shared-ui.dev/p/${post.id}`);
                      setShareToast(true);
                      setTimeout(() => setShareToast(false), 2000);
                    }}
                    className="hover:text-white transition-colors"
                    title="Share permalink"
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </Spotlight>
            ))}
          </div>
        </div>

        {/* Right Column: Suggested Creators */}
        <div className="space-y-6">
          <Spotlight className="p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Suggested Creators
            </h4>

            <div className="space-y-3">
              {[
                { name: "Devon Cross", handle: "@devoncross", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", role: "Design Systems", badge: "Core Contributor", bio: "Architecting design systems for Fortune 500 engineering teams." },
                { name: "Maya Sterling", handle: "@mayasterling", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", role: "Creative Tech", badge: "WebGL Fellow", bio: "Procedural shaders, audio-reactive canvases, and three.js." },
                { name: "Julian Thorne", handle: "@julianthorne", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80", role: "Motion Architect", badge: "Framer Lead", bio: "Crafting micro-interactions and tactile friction physics." },
              ].map((creator, i) => {
                const isFollowed = followedUsers.has(creator.handle);
                return (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={() => setSelectedUserProfile(creator)}
                    >
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div className="font-semibold text-white truncate max-w-[100px] hover:underline">
                          {creator.name}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          {creator.role}
                        </div>
                      </div>
                    </div>

                    <Magnetic strength={0.2}>
                      <button
                        onClick={() => toggleFollow(creator.handle)}
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          isFollowed
                            ? "bg-white/10 text-zinc-300 hover:bg-rose-500/20 hover:text-rose-300"
                            : "bg-white text-zinc-950 hover:bg-amber-400"
                        }`}
                      >
                        {isFollowed ? "Following" : "Follow"}
                      </button>
                    </Magnetic>
                  </div>
                );
              })}
            </div>
          </Spotlight>
        </div>
      </div>

      {/* Comment Drawer Modal */}
      <AnimatePresence>
        {selectedPostForComments && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex justify-between items-center pb-3 border-b border-white/10 shrink-0">
                <h3 className="font-bold text-sm text-white">
                  Comments on {selectedPostForComments.author.name}'s Post
                </h3>
                <button
                  onClick={() => setSelectedPostForComments(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Original post snippet */}
              <div className="p-3 rounded-xl bg-white/5 text-xs text-zinc-300 shrink-0">
                "{selectedPostForComments.content}"
              </div>

              {/* Comments list */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {selectedPostForComments.comments.length === 0 ? (
                  <p className="text-xs text-zinc-500 text-center py-8">
                    No comments yet. Start the conversation!
                  </p>
                ) : (
                  selectedPostForComments.comments.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-semibold text-white">{c.author}</span>
                        <span className="text-zinc-500 font-mono">{c.timestamp}</span>
                      </div>
                      <p className="text-xs text-zinc-300">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add comment */}
              <form onSubmit={handleAddComment} className="pt-3 border-t border-white/10 flex gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Write a reply..."
                  value={newCommentInput}
                  onChange={(e) => setNewCommentInput(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs"
                >
                  Reply
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Profile View Modal */}
      <AnimatePresence>
        {selectedUserProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 text-center relative"
            >
              <button
                onClick={() => setSelectedUserProfile(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <img
                src={selectedUserProfile.avatar}
                alt={selectedUserProfile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-rose-500/50 mx-auto"
              />

              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  {selectedUserProfile.name}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {selectedUserProfile.handle}
                </p>
                {selectedUserProfile.badge && (
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 font-mono border border-rose-500/20">
                    {selectedUserProfile.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedUserProfile.bio || "Active contributor across the Sphere creator ecosystem."}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => toggleFollow(selectedUserProfile.handle)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors ${
                    followedUsers.has(selectedUserProfile.handle)
                      ? "bg-white/10 text-zinc-300"
                      : "bg-rose-500 text-white hover:bg-rose-400"
                  }`}
                >
                  {followedUsers.has(selectedUserProfile.handle) ? "Following" : "Follow Creator"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {shareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-zinc-900 border border-white/20 text-xs font-mono text-emerald-400 shadow-2xl">
          Permalink Copied to Clipboard!
        </div>
      )}
    </div>
  );
};

export default SocialDemo;
