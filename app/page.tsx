"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaReddit } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { Shield, Zap, Settings, Sparkles, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [demoReply, setDemoReply] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const demoComment = "This looks amazing! How did you get started with this?";
  const demoReplyText = "Thanks! I started by focusing on solving one specific problem, then iterated based on user feedback. The key was staying consistent and building in public. What are you working on?";

  useEffect(() => {
    setIsTyping(true);
    setDemoReply("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < demoReplyText.length) {
        setDemoReply(demoReplyText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simple fade-in animation - only runs once, starts visible
  const fadeIn = {
    initial: { opacity: 0.8, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background effects - blue/cyan gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ReplyTomic
          </div>
          <Link href="/sign-up">
            <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
              <span className="text-sm text-white">AI-Powered Social Media Replies</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white">
              Dominate Social Media
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                While You Sleep
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Generate platform-perfect replies for YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook & Reddit. 
              Save 10+ hours per week.
            </p>

            {/* Platform Logos */}
            <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
              {[
                { Icon: FaYoutube, color: "#FF0000" },
                { Icon: FaInstagram, color: "#E1306C" },
                { Icon: SiTiktok, color: "#00F2EA" },
                { Icon: FaTwitter, color: "#1DA1F2" },
                { Icon: FaLinkedin, color: "#0A66C2" },
                { Icon: FaFacebook, color: "#1877F2" },
                { Icon: FaReddit, color: "#FF4500" },
              ].map(({ Icon, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                  className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer"
                  style={{ color }}
                >
                  <Icon className="text-2xl" />
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 justify-center mb-8 flex-wrap">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 font-semibold group">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 text-lg px-8 py-6 bg-transparent font-semibold">
                  Try Demo
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-black" />
                  ))}
                </div>
                <span className="text-white font-medium">500+ creators</span>
              </div>
              <div className="text-gray-500">•</div>
              <div className="text-white font-medium">Save 10+ hours/week</div>
              <div className="text-gray-500">•</div>
              <div className="text-white font-medium">7 platforms supported</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 border-y border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">See It In Action</h2>
            <p className="text-gray-300 text-lg">Watch AI craft the perfect reply in real-time</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before - Bad Reply */}
            <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/10">
              <div className="text-sm text-red-400 mb-3 font-semibold">❌ Generic Bot Reply</div>
              <div className="text-white mb-4 p-4 bg-black/50 rounded-lg border border-white/10">
                &quot;{demoComment}&quot;
              </div>
              <div className="text-gray-400 italic">
                &quot;Thanks for the comment! Check out our website for more info.&quot;
              </div>
            </div>

            {/* After - ReplyTomic Reply */}
            <div className="p-6 rounded-xl border border-green-500/30 bg-green-500/10">
              <div className="text-sm text-green-400 mb-3 font-semibold">✨ ReplyTomic Optimized</div>
              <div className="text-white mb-4 p-4 bg-black/50 rounded-lg border border-white/10">
                &quot;{demoComment}&quot;
              </div>
              <div className="text-white">
                &quot;{demoReply}
                {isTyping && <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse" />}&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-gray-300 text-lg">Everything you need to dominate social media</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            {/* Large Feature Card - Auto Detection */}
            <div className="md:col-span-2 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:border-blue-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Auto-Detection</h3>
              </div>
              <p className="text-gray-300 text-lg">
                Smart platform detection automatically optimizes your replies for each social network&apos;s unique style and character limits.
              </p>
            </div>

            {/* Tone Control */}
            <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Tone Control</h3>
              </div>
              <p className="text-gray-300">
                Switch between &quot;Helpful Expert&quot;, &quot;Casual Friend&quot;, or &quot;Direct Professional&quot; to match your brand voice.
              </p>
            </div>

            {/* Anti-Ban Protection */}
            <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:border-green-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Anti-Ban Protection</h3>
              </div>
              <p className="text-gray-300">
                Human-emulation mode keeps your replies natural and authentic, staying under the radar of platform algorithms.
              </p>
            </div>

            {/* Platform Optimization */}
            <div className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:border-blue-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Platform Intelligence</h3>
              </div>
              <p className="text-gray-300">
                Each platform gets optimized replies - Instagram gets emoji-heavy casual, LinkedIn gets professional insights.
              </p>
            </div>

            {/* Speed & Scale */}
            <div className="md:col-span-2 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-amber-500/10 hover:border-orange-500/30 transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Lightning Fast</h3>
              </div>
              <p className="text-gray-300 text-lg">
                Generate 5 perfect replies in 15 seconds. Reply to 100 comments in 30 minutes instead of spending hours manually crafting responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 border-y border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Simple Pricing</h2>
            <p className="text-gray-300 text-lg">Start free, upgrade when you&apos;re ready to scale</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="p-8 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-2 text-white">Starter</h3>
              <div className="text-4xl font-bold mb-4 text-white">
                $19<span className="text-lg text-gray-400">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>100 replies/month</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>All platforms</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>All tone options</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Reply history</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent font-semibold" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="p-8 rounded-xl border-2 border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-bold mb-4 text-white">
                $49<span className="text-lg text-gray-300">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="font-semibold">Unlimited replies</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>All platforms</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>All tone options</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>Full history & analytics</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-semibold">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>

            {/* Free */}
            <div className="p-8 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
              <div className="text-4xl font-bold mb-4 text-white">
                $0<span className="text-lg text-gray-400">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>25 replies/month</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>3 platforms</span>
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Check className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>Basic tones</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent font-semibold" variant="outline">
                  Try Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Save 10+ Hours Per Week?
          </h2>
          <p className="text-gray-300 text-xl mb-8">
            Join 500+ creators who are already using ReplyTomic to scale their social media presence
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 font-semibold">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 md:mb-0">
              ReplyTomic
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © 2024 ReplyTomic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
