"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_CONFIG, TONE_OPTIONS } from "@/lib/platform-config";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaReddit } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaDiscord } from "react-icons/fa6";
import { Copy, Loader2, LogOut, Sparkles, Zap, Check } from "lucide-react";
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

const LOADING_MESSAGES = [
  "Crafting your perfect reply...",
  "Analyzing platform nuances...",
  "Optimizing for engagement...",
  "Adding that personal touch...",
];

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [platform, setPlatform] = useState<string>("youtube");
  const [comment, setComment] = useState("");
  const [originalPost, setOriginalPost] = useState("");
  const [selectedTones, setSelectedTones] = useState<string[]>(["helpful", "casual"]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  const platformConfig = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.youtube;
  const PlatformIcon = PLATFORM_ICONS[platform] || FaYoutube;

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingMessage(
          LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
        );
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const toggleTone = (tone: string) => {
    setSelectedTones(prev =>
      prev.includes(tone)
        ? prev.filter(t => t !== tone)
        : [...prev, tone]
    );
  };

  const handleGenerate = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    setReplies([]);

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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate replies");
      }

      const data = await response.json();
      setReplies(data.replies || []);
    } catch (error) {
      console.error("Error generating replies:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate replies";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Compact Header */}
      <header className="flex-shrink-0 border-b border-white/10 bg-black/90 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ReplyTomic
            </div>
            <span className="text-sm text-gray-500 hidden sm:block">
              {user?.firstName || user?.emailAddresses[0]?.emailAddress?.split("@")[0]}
            </span>
          </div>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </header>

      {/* Main Content - Split Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Input */}
        <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0 border-r border-white/10 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Platform + Tone Row */}
            <div className="flex gap-3">
              {/* Platform Selector */}
              <div className="flex-1">
                <label className="text-xs text-gray-400 mb-1 block">Platform</label>
                <div className="relative">
                  <span 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-lg"
                    style={{ color: platform === 'tiktok' ? '#00F2EA' : platformConfig.color }}
                  >
                    <PlatformIcon />
                  </span>
                  <Select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white h-10 text-sm"
                  >
                    {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
                      <option key={key} value={key} className="bg-black text-white">
                        {config.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            {/* Tone Selector - Compact */}
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Tone (select multiple)</label>
              <div className="flex flex-wrap gap-1.5">
                {TONE_OPTIONS.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => toggleTone(tone.value)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                      selectedTones.includes(tone.value)
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Original Post Context - Collapsible inline */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Original Post Context <span className="text-gray-600">(optional)</span>
              </label>
              <Textarea
                placeholder="Paste video title or post caption for context..."
                value={originalPost}
                onChange={(e) => setOriginalPost(e.target.value)}
                rows={2}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-600 text-sm resize-none"
              />
            </div>

            {/* Comment Input */}
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">
                Comment to Reply To <span className="text-red-400">*</span>
              </label>
              <Textarea
                placeholder="Paste the comment you want to reply to..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-600 text-sm resize-none"
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{comment.length} chars</span>
                <span>Max reply: {platformConfig.maxLength}</span>
              </div>
            </div>
          </div>

          {/* Generate Button - Sticky at bottom */}
          <div className="flex-shrink-0 p-4 border-t border-white/10 bg-black/50">
            <button
              onClick={handleGenerate}
              disabled={loading || !comment.trim() || selectedTones.length === 0}
              className="w-full h-12 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading || !comment.trim() || selectedTones.length === 0
                  ? 'linear-gradient(to right, #1e40af, #0e7490)'
                  : 'linear-gradient(to right, #2563eb, #06b6d4)',
                boxShadow: loading || !comment.trim() || selectedTones.length === 0
                  ? 'none'
                  : '0 4px 20px rgba(59, 130, 246, 0.3)',
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm">{loadingMessage}</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Generate Replies
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-black via-blue-950/10 to-black">
          {replies.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Ready to Generate</h2>
                <p className="text-gray-400 mb-6">
                  Paste a comment on the left and click Generate to create platform-perfect replies instantly.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Quick copy", "Multiple tones", "Platform optimized"].map((feature) => (
                    <span key={feature} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Results Grid */
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  {replies.length} Replies Generated
                </h2>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Zap className="w-4 h-4" />
                  Regenerate
                </button>
              </div>
              
              <div className="grid gap-3">
                <AnimatePresence>
                  {replies.map((reply, index) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.07] transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <Badge className="bg-blue-500/20 text-blue-300 border-0 text-xs">
                          {reply.tone}
                        </Badge>
                        <span className={`text-xs ${
                          reply.length <= platformConfig.maxLength ? "text-green-400" : "text-red-400"
                        }`}>
                          {reply.length}/{platformConfig.maxLength}
                        </span>
                      </div>
                      
                      <p className="text-gray-200 text-sm leading-relaxed mb-3 pr-8">
                        {reply.text}
                      </p>
                      
                      {/* Copy Button - Always visible */}
                      <button
                        onClick={() => copyToClipboard(reply.text, reply.id)}
                        className={`absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          copiedId === reply.id
                            ? "bg-green-500 text-white"
                            : "bg-white/10 text-gray-300 hover:bg-blue-500 hover:text-white"
                        }`}
                      >
                        {copiedId === reply.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
