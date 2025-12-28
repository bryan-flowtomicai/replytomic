"use client";

import { useState, useEffect, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { PLATFORM_CONFIG, TONE_OPTIONS } from "@/lib/platform-config";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaReddit } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaDiscord } from "react-icons/fa6";
import { Copy, Loader2, LogOut, Sparkles, Zap, Check, ChevronDown, ChevronUp, RotateCcw, History, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLATFORM_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  youtube: FaYoutube,
  instagram: FaInstagram,
  tiktok: SiTiktok,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  reddit: FaReddit,
  discord: FaDiscord,
};

interface Reply {
  id: string;
  tone: string;
  text: string;
  length: number;
  withinLimit: boolean;
}

interface HistoryItem {
  id: string;
  platform: string;
  comment: string;
  originalPost: string | null;
  tones: string[];
  replies: Reply[];
  selectedReplyId: string | null;
  createdAt: string;
}

interface UsageData {
  thisMonth: number;
  remaining: number;
  limit: number;
  platformsUsed: Record<string, number>;
}

interface StatsData {
  totalGenerated: number;
  timeSavedMinutes: number;
  platformBreakdown: Record<string, number>;
  favoriteTones: Record<string, number>;
}

const LOADING_MESSAGES = [
  "Crafting your perfect reply...",
  "Analyzing platform style...",
  "Optimizing for engagement...",
];

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [platform, setPlatform] = useState<string>("youtube");
  const [comment, setComment] = useState("");
  const [originalPost, setOriginalPost] = useState("");
  const [selectedTones, setSelectedTones] = useState<string[]>(["helpful", "casual"]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [inputCollapsed, setInputCollapsed] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [tier, setTier] = useState<string>("free");
  const [limitReached, setLimitReached] = useState(false);
  const [currentGenerationId, setCurrentGenerationId] = useState<string | null>(null);

  const platformConfig = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.youtube;
  const PlatformIcon = PLATFORM_ICONS[platform] || FaYoutube;

  // Fetch usage data on mount
  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const res = await fetch("/api/usage");
      if (res.ok) {
        const data = await res.json();
        setUsage(data.usage);
        setStats(data.stats);
        setTier(data.user?.tier || "free");
      }
    } catch (err) {
      console.error("Error fetching usage:", err);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/history?limit=20");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      } else {
        console.error("History fetch failed:", await res.text());
      }
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Keyboard shortcut: Cmd/Ctrl + Enter to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (comment.trim() && selectedTones.length > 0 && !loading) {
          handleGenerate();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [comment, selectedTones, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const toggleTone = (tone: string) => {
    setSelectedTones(prev =>
      prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone]
    );
  };

  const handleGenerate = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    setReplies([]);
    setLimitReached(false);
    setCurrentGenerationId(null);

    try {
      const response = await fetch("/api/generate-replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment,
          platform,
          originalPost: originalPost || undefined,
          tones: selectedTones,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.limitReached) {
          setLimitReached(true);
          return;
        }
        throw new Error(data.error || "Failed to generate replies");
      }

      setReplies(data.replies || []);
      setCurrentGenerationId(data.generationId || null);
      setInputCollapsed(true);
      
      if (data.usage) {
        setUsage(prev => prev ? {
          ...prev,
          remaining: data.usage.remaining,
          thisMonth: prev.limit === -1 ? prev.thisMonth : prev.limit - data.usage.remaining,
        } : null);
      }
      
      fetchUsage();
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (error) {
      console.error("Error generating replies:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate replies";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, replyId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(replyId);
    
    // Track the selected reply
    if (currentGenerationId) {
      try {
        await fetch("/api/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            generationId: currentGenerationId,
            replyId: replyId,
          }),
        });
      } catch (err) {
        console.error("Error tracking reply selection:", err);
      }
    }
    
    setTimeout(() => setCopiedId(null), 1500);
  };

  const startNewReply = () => {
    setInputCollapsed(false);
    setReplies([]);
    setComment("");
    setOriginalPost("");
    setLimitReached(false);
    setCurrentGenerationId(null);
  };

  const loadFromHistory = (item: HistoryItem) => {
    setPlatform(item.platform);
    setComment(item.comment);
    setOriginalPost(item.originalPost || "");
    setSelectedTones(item.tones || ["helpful"]);
    setReplies(item.replies || []);
    setCurrentGenerationId(item.id);
    setInputCollapsed(true);
    setShowHistory(false);
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ReplyTomic
          </div>
          <div className="flex items-center gap-2">
            {/* Usage Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white">
                {usage?.remaining === -1 ? "∞" : usage?.remaining ?? "..."} 
                <span className="text-gray-400">/{usage?.limit === -1 ? "∞" : usage?.limit ?? 25}</span>
              </span>
            </div>
            {/* History Button */}
            <button
              onClick={() => { setShowHistory(true); fetchHistory(); }}
              className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <History className="h-5 w-5" />
              <span className="hidden sm:inline">History</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowHistory(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-black border-l border-white/10 z-50 overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">History</h2>
                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {historyLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No history yet</p>
                    <p className="text-sm mt-1">Generate some replies to see them here</p>
                  </div>
                ) : (
                  history.map((item) => {
                    const ItemIcon = PLATFORM_ICONS[item.platform] || FaYoutube;
                    const itemConfig = PLATFORM_CONFIG[item.platform];
                    const selectedReply = item.selectedReplyId 
                      ? item.replies?.find(r => r.id === item.selectedReplyId)
                      : null;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span style={{ color: itemConfig?.color }}>
                              <ItemIcon className="text-lg" />
                            </span>
                            <span className="text-sm text-gray-400">{formatTimeAgo(item.createdAt)}</span>
                          </div>
                          {selectedReply && (
                            <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                              Used
                            </span>
                          )}
                        </div>
                        <p className="text-white text-sm line-clamp-2 mb-2">{item.comment}</p>
                        {selectedReply && (
                          <p className="text-gray-400 text-xs line-clamp-1 italic">
                            → {selectedReply.text}
                          </p>
                        )}
                        <div className="flex gap-1 mt-2">
                          {item.tones?.slice(0, 3).map(tone => (
                            <span key={tone} className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">
                              {tone}
                            </span>
                          ))}
                          {item.replies?.length > 0 && (
                            <span className="px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-300">
                              {item.replies.length} replies
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Bar */}
        {stats && (stats.totalGenerated > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-6 py-3 px-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.totalGenerated}</p>
              <p className="text-xs text-gray-400">Replies</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{stats.timeSavedMinutes}</p>
              <p className="text-xs text-gray-400">Min Saved</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">
                {usage?.remaining === -1 ? "∞" : usage?.remaining}
              </p>
              <p className="text-xs text-gray-400">Remaining</p>
            </div>
          </motion.div>
        )}

        {/* Limit Reached Warning */}
        {limitReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/30"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Monthly Limit Reached</h3>
                <p className="text-gray-300 mb-4">
                  You&apos;ve used all {usage?.limit} free replies this month. Upgrade to Pro for unlimited replies!
                </p>
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-all">
                  Upgrade to Pro - $29/mo
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Input Section */}
        <motion.div
          initial={false}
          animate={{ height: inputCollapsed ? "auto" : "auto" }}
          className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
        >
          {inputCollapsed && replies.length > 0 ? (
            <button
              onClick={() => setInputCollapsed(false)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <span style={{ color: platformConfig.color }}>
                  <PlatformIcon className="text-2xl" />
                </span>
                <div>
                  <p className="text-white font-medium text-lg">Edit Input</p>
                  <p className="text-gray-400 text-base truncate max-w-[200px] sm:max-w-[400px]">
                    {comment.slice(0, 50)}{comment.length > 50 ? "..." : ""}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </button>
          ) : (
            <div className="p-5 space-y-5">
              {replies.length > 0 && (
                <button
                  onClick={() => setInputCollapsed(true)}
                  className="w-full flex items-center justify-between mb-2"
                >
                  <span className="text-lg font-semibold text-white">Input</span>
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                </button>
              )}

              {/* Platform Selector */}
              <div>
                <label className="text-base text-gray-300 mb-2 block font-medium">Platform</label>
                <div className="relative">
                  <span 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl z-10"
                    style={{ color: platform === 'tiktok' ? '#00F2EA' : platformConfig.color }}
                  >
                    <PlatformIcon />
                  </span>
                  <Select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="pl-14 bg-black/50 border-white/20 text-white h-14 text-lg rounded-xl"
                  >
                    {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
                      <option key={key} value={key} className="bg-black text-white">
                        {config.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Tone Selector */}
              <div>
                <label className="text-base text-gray-300 mb-3 block font-medium">Reply Tone</label>
                <div className="flex flex-wrap gap-2">
                  {TONE_OPTIONS.map((tone) => (
                    <button
                      key={tone.value}
                      onClick={() => toggleTone(tone.value)}
                      className={`px-4 py-2.5 text-base rounded-xl transition-all font-medium ${
                        selectedTones.includes(tone.value)
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {tone.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Context Toggle */}
              <div>
                <button
                  onClick={() => setShowContext(!showContext)}
                  className="flex items-center gap-2 text-base text-gray-400 hover:text-white transition-all"
                >
                  {showContext ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  Add post context (optional)
                </button>
                <AnimatePresence>
                  {showContext && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <Textarea
                        placeholder="Paste video title or post caption..."
                        value={originalPost}
                        onChange={(e) => setOriginalPost(e.target.value)}
                        rows={2}
                        className="mt-3 bg-black/50 border-white/20 text-white placeholder:text-gray-500 text-base rounded-xl p-4"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Comment Input */}
              <div>
                <label className="text-base text-gray-300 mb-2 block font-medium">
                  Comment to Reply To
                </label>
                <Textarea
                  placeholder="Paste the comment you want to reply to..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 text-base rounded-xl p-4"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>{comment.length} characters</span>
                  <span className="hidden sm:block">⌘+Enter to generate</span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !comment.trim() || selectedTones.length === 0 || limitReached}
                className="w-full h-14 rounded-xl font-bold text-lg text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                style={{
                  background: loading || !comment.trim() || selectedTones.length === 0 || limitReached
                    ? 'linear-gradient(to right, #1e40af, #0e7490)'
                    : 'linear-gradient(to right, #2563eb, #06b6d4)',
                  boxShadow: loading || !comment.trim() || selectedTones.length === 0 || limitReached
                    ? 'none'
                    : '0 4px 20px rgba(59, 130, 246, 0.4)',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    {loadingMessage}
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6" />
                    Generate Replies
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Section */}
        <div ref={resultsRef}>
          <AnimatePresence mode="wait">
            {replies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    Your Replies
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleGenerate}
                      disabled={loading || limitReached}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all text-base font-medium disabled:opacity-50"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span className="hidden sm:inline">Regenerate</span>
                    </button>
                    <button
                      onClick={startNewReply}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all text-base font-medium"
                    >
                      <Zap className="w-5 h-5" />
                      <span className="hidden sm:inline">New</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {replies.map((reply, index) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-5 rounded-2xl bg-white/5 border transition-all ${
                        copiedId === reply.id 
                          ? "border-green-500/50 bg-green-500/5" 
                          : "border-white/10 hover:border-blue-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-sm font-medium capitalize">
                          {reply.tone}
                        </span>
                        <span className={`text-sm font-medium ${
                          reply.length <= platformConfig.maxLength ? "text-green-400" : "text-red-400"
                        }`}>
                          {reply.length}/{platformConfig.maxLength}
                        </span>
                      </div>
                      
                      <p className="text-white text-lg leading-relaxed mb-4">
                        {reply.text}
                      </p>
                      
                      <button
                        onClick={() => copyToClipboard(reply.text, reply.id)}
                        className={`w-full h-12 rounded-xl font-medium text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                          copiedId === reply.id
                            ? "bg-green-500 text-white"
                            : "bg-white/10 text-white hover:bg-blue-500"
                        }`}
                      >
                        {copiedId === reply.id ? (
                          <>
                            <Check className="w-5 h-5" />
                            Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            Copy Reply
                          </>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!loading && replies.length === 0 && !limitReached && (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Ready to Generate</h2>
              <p className="text-gray-400 text-lg max-w-sm mx-auto">
                Paste a comment above and tap Generate to create platform-perfect replies.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
