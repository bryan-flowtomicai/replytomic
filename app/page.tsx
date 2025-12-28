"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaReddit } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { Shield, Zap, Settings, Sparkles, ArrowRight, Check, Brain, Clock } from "lucide-react";
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

  const features = [
    {
      icon: Zap,
      title: "Auto-Detection",
      description: "Smart platform detection automatically optimizes your replies for each social network's unique style and character limits.",
      color: "blue",
      size: "large"
    },
    {
      icon: Settings,
      title: "Tone Control",
      description: "Switch between 'Helpful Expert', 'Casual Friend', or 'Direct Professional' to match your brand voice.",
      color: "cyan",
      size: "normal"
    },
    {
      icon: Shield,
      title: "Anti-Ban Protection",
      description: "Human-emulation mode keeps your replies natural and authentic, staying under the radar of platform algorithms.",
      color: "green",
      size: "normal"
    },
    {
      icon: Brain,
      title: "Platform Intelligence",
      description: "Each platform gets optimized replies - Instagram gets emoji-heavy casual, LinkedIn gets professional insights.",
      color: "purple",
      size: "normal"
    },
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Generate 5 perfect replies in 15 seconds. Reply to 100 comments in 30 minutes instead of hours.",
      color: "orange",
      size: "large"
    },
  ];

  const getColorClasses = (color: string, isHovered: boolean = false) => {
    const colors: Record<string, { bg: string; border: string; icon: string; iconBg: string }> = {
      blue: {
        bg: "from-blue-500/20 to-blue-600/10",
        border: "border-blue-500/50 hover:border-blue-400",
        icon: "text-blue-400",
        iconBg: "bg-blue-500/30 border-blue-400/50"
      },
      cyan: {
        bg: "from-cyan-500/20 to-cyan-600/10",
        border: "border-cyan-500/50 hover:border-cyan-400",
        icon: "text-cyan-400",
        iconBg: "bg-cyan-500/30 border-cyan-400/50"
      },
      green: {
        bg: "from-green-500/20 to-green-600/10",
        border: "border-green-500/50 hover:border-green-400",
        icon: "text-green-400",
        iconBg: "bg-green-500/30 border-green-400/50"
      },
      purple: {
        bg: "from-violet-500/20 to-violet-600/10",
        border: "border-violet-500/50 hover:border-violet-400",
        icon: "text-violet-400",
        iconBg: "bg-violet-500/30 border-violet-400/50"
      },
      orange: {
        bg: "from-orange-500/20 to-amber-600/10",
        border: "border-orange-500/50 hover:border-orange-400",
        icon: "text-orange-400",
        iconBg: "bg-orange-500/30 border-orange-400/50"
      },
    };
    return colors[color] || colors.blue;
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
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-blue-500/50 bg-blue-500/10 backdrop-blur-sm">
              <span className="text-sm text-blue-300 font-medium">✨ AI-Powered Social Media Replies</span>
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
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-14 h-14 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-white/40 hover:bg-white/10 transition-all cursor-pointer"
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
      <section className="py-20 px-4 border-y border-white/10 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">See It In Action</h2>
            <p className="text-gray-300 text-lg">Watch AI craft the perfect reply in real-time</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before - Bad Reply */}
            <motion.div
              initial={{ opacity: 0.6, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl border border-red-500/40 bg-gradient-to-br from-red-500/15 to-red-900/10 backdrop-blur-sm"
            >
              <div className="text-sm text-red-400 mb-3 font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">✗</span>
                Generic Bot Reply
              </div>
              <div className="text-white mb-4 p-4 bg-black/40 rounded-xl border border-white/10">
                &quot;{demoComment}&quot;
              </div>
              <div className="text-gray-400 italic text-sm">
                &quot;Thanks for the comment! Check out our website for more info.&quot;
              </div>
            </motion.div>

            {/* After - ReplyTomic Reply */}
            <motion.div
              initial={{ opacity: 0.6, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl border border-green-500/40 bg-gradient-to-br from-green-500/15 to-green-900/10 backdrop-blur-sm"
            >
              <div className="text-sm text-green-400 mb-3 font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">✓</span>
                ReplyTomic Optimized
              </div>
              <div className="text-white mb-4 p-4 bg-black/40 rounded-xl border border-white/10">
                &quot;{demoComment}&quot;
              </div>
              <div className="text-white">
                &quot;{demoReply}
                {isTyping && <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse" />}&quot;
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned Bento Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-gray-300 text-xl">Everything you need to dominate social media</p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Auto-Detection - Large (spans 4 cols) */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-4 p-8 rounded-2xl border border-blue-500/40 bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-transparent hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-blue-500/30 border border-blue-400/50 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Auto-Detection</h3>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    Smart platform detection automatically optimizes your replies for each social network&apos;s unique style and character limits.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tone Control - Normal (spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 p-6 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 via-cyan-600/10 to-transparent hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/30 border border-cyan-400/50 flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tone Control</h3>
              <p className="text-gray-200">
                Switch between &quot;Helpful Expert&quot;, &quot;Casual Friend&quot;, or &quot;Direct Professional&quot;.
              </p>
            </motion.div>

            {/* Anti-Ban - Normal (spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 p-6 rounded-2xl border border-green-500/40 bg-gradient-to-br from-green-500/20 via-green-600/10 to-transparent hover:border-green-400/60 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/30 border border-green-400/50 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Anti-Ban Protection</h3>
              <p className="text-gray-200">
                Human-emulation mode keeps your replies natural and authentic.
              </p>
            </motion.div>

            {/* Platform Intelligence - Normal (spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 p-6 rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-500/20 via-violet-600/10 to-transparent hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/30 border border-violet-400/50 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Platform Intelligence</h3>
              <p className="text-gray-200">
                Each platform gets optimized replies tailored to its culture.
              </p>
            </motion.div>

            {/* Lightning Fast - Large (spans 4 cols) */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-4 p-8 rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-500/20 via-amber-600/10 to-transparent hover:border-orange-400/60 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-orange-500/30 border border-orange-400/50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    Generate 5 perfect replies in 15 seconds. Reply to 100 comments in 30 minutes instead of spending hours manually crafting responses.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 border-y border-white/10 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Simple Pricing</h2>
            <p className="text-gray-300 text-xl">Start free, upgrade when you&apos;re ready to scale</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">Starter</h3>
              <div className="text-5xl font-bold mb-6 text-white">
                $19<span className="text-lg text-gray-400 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["100 replies/month", "All platforms", "All tone options", "Reply history"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up">
                <Button className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent font-semibold h-12" variant="outline">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Pro - Featured */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl border-2 border-blue-500 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 relative shadow-lg shadow-blue-500/20"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-5xl font-bold mb-6 text-white">
                $49<span className="text-lg text-gray-300 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["Unlimited replies", "All platforms", "All tone options", "Full history & analytics", "Priority support"].map((item, i) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className={i === 0 ? "font-semibold" : ""}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up">
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-semibold h-12">
                  Upgrade to Pro
                </Button>
              </Link>
            </motion.div>

            {/* Free */}
            <motion.div
              initial={{ opacity: 0.5, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
              <div className="text-5xl font-bold mb-6 text-white">
                $0<span className="text-lg text-gray-400 font-normal">/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["25 replies/month", "3 platforms", "Basic tones"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up">
                <Button className="w-full border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent font-semibold h-12" variant="outline">
                  Try Free
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to Save 10+ Hours Per Week?
            </h2>
            <p className="text-gray-300 text-xl mb-10">
              Join 500+ creators who are already using ReplyTomic to scale their social media presence
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-10 py-7 font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
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
