"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_CONFIG, TONE_OPTIONS } from "@/lib/platform-config";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaReddit } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaDiscord } from "react-icons/fa6";
import { Copy, Loader2, LogOut, Sparkles, Clock, TrendingUp, Zap, ChevronDown, ChevronUp } from "lucide-react";
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
  "Making you sound brilliant...",
];

export default function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [platform, setPlatform] = useState<string>("youtube");
  const [comment, setComment] = useState("");
  const [originalPost, setOriginalPost] = useState("");
  const [showContext, setShowContext] = useState(false);
  const [selectedTones, setSelectedTones] = useState<string[]>(["helpful", "casual"]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [usageRemaining, setUsageRemaining] = useState(25);
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
      if (data.usageRemaining !== undefined) {
        setUsageRemaining(data.usageRemaining);
      }
    } catch (error) {
      console.error("Error generating replies:", error);
      alert(error instanceof Error ? error.message : "Failed to generate replies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLengthColor = (length: number, maxLength: number) => {
    const percentage = (length / maxLength) * 100;
    if (percentage < 80) return "text-green-400";
    if (percentage <= 100) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,transparent,black)] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ReplyTomic
            </div>
            <div className="hidden md:block text-sm text-gray-400">
              Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress || "User"}!
            </div>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            AI Reply Generator
          </h1>
          <p className="text-xl text-gray-400">Generate platform-perfect replies in seconds</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span style={{ color: platformConfig.color }}>
                      <PlatformIcon className="text-3xl" />
                    </span>
                    <span>Select Platform</span>
                  </CardTitle>
                  <CardDescription>Choose the platform you&apos;re replying on</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  >
                    {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.name} ({config.maxLength} chars)
                      </option>
                    ))}
                  </Select>
                  <p className="text-sm text-gray-400 mt-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {platformConfig.tips}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Optional Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <button
                    onClick={() => setShowContext(!showContext)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <CardTitle>Original Post Context (Optional)</CardTitle>
                    {showContext ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <CardDescription>Add the original post for better context</CardDescription>
                </CardHeader>
                <AnimatePresence>
                  {showContext && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent>
                        <Textarea
                          placeholder="Paste your original post/video title/caption here..."
                          value={originalPost}
                          onChange={(e) => setOriginalPost(e.target.value)}
                          rows={4}
                          className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                        />
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Comment Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Comment to Reply To</CardTitle>
                  <CardDescription>Paste the comment you want to reply to</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={6}
                    className="mb-4 bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {comment.length} characters
                    </span>
                    <span className="text-xs text-gray-500">
                      Max: {platformConfig.maxLength} chars
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tone Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Tone Selection</CardTitle>
                  <CardDescription>Select the tones you want (can select multiple)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {TONE_OPTIONS.map((tone) => (
                      <Badge
                        key={tone.value}
                        variant={selectedTones.includes(tone.value) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                          selectedTones.includes(tone.value)
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0"
                            : "border-white/30 text-gray-300 hover:border-white/50 hover:text-white"
                        }`}
                        onClick={() => toggleTone(tone.value)}
                      >
                        {tone.label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleGenerate}
                disabled={loading || !comment.trim() || selectedTones.length === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-6"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {loadingMessage}
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Replies
                  </>
                )}
              </Button>
            </motion.div>

            {/* Results */}
            <AnimatePresence>
              {replies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    Generated Replies
                  </h2>
                  {replies.map((reply, index) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm hover:border-white/20 transition-all">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                              {reply.tone}
                            </Badge>
                            <span
                              className={`text-sm font-medium ${getLengthColor(
                                reply.length,
                                platformConfig.maxLength
                              )}`}
                            >
                              {reply.length}/{platformConfig.maxLength} chars
                            </span>
                          </div>
                          <p className="text-gray-200 mb-6 whitespace-pre-wrap text-lg leading-relaxed">
                            {reply.text}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(reply.text, reply.id)}
                            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent"
                          >
                            {copiedId === reply.id ? (
                              <>
                                <span className="mr-2">✓</span> Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent"
                  >
                    Generate More
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Counter */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {usageRemaining === -1 ? "∞" : usageRemaining}
                  </div>
                  <p className="text-sm text-gray-400">
                    {usageRemaining === -1
                      ? "Unlimited replies"
                      : `replies remaining this month`}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                    <span className="text-sm text-gray-400">Total Generated</span>
                    <span className="font-bold text-xl">0</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-black/30">
                    <span className="text-sm text-gray-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time Saved
                    </span>
                    <span className="font-bold text-xl">0 min</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}