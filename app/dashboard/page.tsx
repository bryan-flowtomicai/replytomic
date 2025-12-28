"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PLATFORM_CONFIG, TONE_OPTIONS } from "@/lib/platform-config";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaReddit } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaDiscord } from "react-icons/fa6";
import { Copy, Loader2 } from "lucide-react";

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
  "Crafting your reply...",
  "Making you sound smart...",
  "Optimizing for the platform...",
  "Adding that perfect touch...",
];

export default function DashboardPage() {
  const { user } = useUser();
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
    if (percentage < 80) return "text-green-600";
    if (percentage <= 100) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Reply Generator</h1>
          <p className="text-gray-600">Generate AI-powered replies for any social media platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Platform Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Select Platform</CardTitle>
                <CardDescription>Choose the platform you&apos;re replying on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <span style={{ color: platformConfig.color }}>
                    <PlatformIcon className="text-3xl" />
                  </span>
                  <Select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                  >
                    {Object.entries(PLATFORM_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.name} ({config.maxLength} chars)
                      </option>
                    ))}
                  </Select>
                </div>
                <p className="text-sm text-gray-500 mt-2">{platformConfig.tips}</p>
              </CardContent>
            </Card>

            {/* Optional Context */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <button
                    onClick={() => setShowContext(!showContext)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span>Original Post Context (Optional)</span>
                    <span className="text-2xl">{showContext ? "−" : "+"}</span>
                  </button>
                </CardTitle>
                <CardDescription>Add the original post for better context</CardDescription>
              </CardHeader>
              {showContext && (
                <CardContent>
                  <Textarea
                    placeholder="Paste your original post/video title/caption here..."
                    value={originalPost}
                    onChange={(e) => setOriginalPost(e.target.value)}
                    rows={4}
                  />
                </CardContent>
              )}
            </Card>

            {/* Comment Input */}
            <Card>
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
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {comment.length} characters
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tone Selector */}
            <Card>
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
                      className="cursor-pointer px-4 py-2 text-sm"
                      onClick={() => toggleTone(tone.value)}
                    >
                      {tone.label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={loading || !comment.trim() || selectedTones.length === 0}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {loadingMessage}
                </>
              ) : (
                "Generate Replies"
              )}
            </Button>

            {/* Results */}
            {replies.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Generated Replies</h2>
                {replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary">{reply.tone}</Badge>
                        <span
                          className={`text-sm font-medium ${getLengthColor(
                            reply.length,
                            platformConfig.maxLength
                          )}`}
                        >
                          {reply.length}/{platformConfig.maxLength} chars
                        </span>
                      </div>
                      <p className="text-gray-800 mb-4 whitespace-pre-wrap">{reply.text}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(reply.text, reply.id)}
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
                ))}
                <Button
                  variant="outline"
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full"
                >
                  Generate More
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Counter */}
            <Card>
              <CardHeader>
                <CardTitle>Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {usageRemaining === -1 ? "∞" : usageRemaining}
                </div>
                <p className="text-sm text-gray-500">
                  {usageRemaining === -1
                    ? "Unlimited replies"
                    : `replies remaining this month`}
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Generated</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Time Saved</span>
                  <span className="font-semibold">0 min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}