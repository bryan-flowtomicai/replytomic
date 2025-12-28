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
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,transparent,black)] pointer-events-none" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ReplyTomic
          </div>
          <Link href="/sign-up">
            <Button className="bg-white text-black hover:bg-gray-200">
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
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <span className="text-sm text-gray-400">AI-Powered Social Media Replies</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Dominate Social Media
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                While You Sleep
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Generate platform-perfect replies for YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook & Reddit. 
              Save 10+ hours per week.
            </p>

            {/* Platform Logos */}
            <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
              {[
                { Icon: FaYoutube, color: "#FF0000" },
                { Icon: FaInstagram, color: "#E1306C" },
                { Icon: SiTiktok, color: "#000000" },
                { Icon: FaTwitter, color: "#1DA1F2" },
                { Icon: FaLinkedin, color: "#0A66C2" },
                { Icon: FaFacebook, color: "#1877F2" },
                { Icon: FaReddit, color: "#FF4500" },
              ].map(({ Icon, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:border-white/20 transition-colors"
                  style={{ color }}
                >
                  <Icon className="text-2xl" />
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 justify-center mb-8">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 group">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-lg px-8 py-6">
                  Try Demo
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-black" />
                  ))}
                </div>
                <span>500+ creators</span>
              </div>
              <div>•</div>
              <div>Save 10+ hours/week</div>
              <div>•</div>
              <div>7 platforms supported</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 px-4 border-y border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">See It In Action</h2>
            <p className="text-gray-400 text-lg">Watch AI craft the perfect reply in real-time</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Before - Bad Reply */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-red-500/20 bg-red-500/5"
            >
              <div className="text-sm text-red-400 mb-2 font-semibold">❌ Generic Bot Reply</div>
              <div className="text-gray-300 mb-4 p-4 bg-black/50 rounded-lg border border-white/10">
                &quot;{demoComment}&quot;
              </div>
              <div className="text-gray-500 italic">
                &quot;Thanks for the comment! Check out our website for more info.&quot;
              </div>
            </motion.div>

            {/* After - ReplyTomic Reply */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-green-500/20 bg-green-500/5"
            >
              <div className="text-sm text-green-400 mb-2 font-semibold">✨ ReplyTomic Optimized</div>
              <div className="text-gray-300 mb-4 p-4 bg-black/50 rounded-lg border border-white/10">
                &quot;{demoComment}&quot;
              </div>
              <div className="text-white">
                &quot;{demoReply}
                {isTyping && <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse" />}&quot;
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 text-lg">Everything you need to dominate social media</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            {/* Large Feature Card - Auto Detection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">Auto-Detection</h3>
              </div>
              <p className="text-gray-400 text-lg">
                Smart platform detection automatically optimizes your replies for each social network&apos;s unique style and character limits.
              </p>
            </motion.div>

            {/* Tone Control */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-purple-500/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold">Tone Control</h3>
              </div>
              <p className="text-gray-400">
                Switch between &quot;Helpful Expert&quot;, &quot;Casual Friend&quot;, or &quot;Direct Professional&quot; to match your brand voice.
              </p>
            </motion.div>

            {/* Anti-Ban Protection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Anti-Ban Protection</h3>
              </div>
              <p className="text-gray-400">
                Human-emulation mode keeps your replies natural and authentic, staying under the radar of platform algorithms.
              </p>
            </motion.div>

            {/* Platform Optimization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">Platform Intelligence</h3>
              </div>
              <p className="text-gray-400">
                Each platform gets optimized replies - Instagram gets emoji-heavy casual, LinkedIn gets professional insights.
              </p>
            </motion.div>

            {/* Speed & Scale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 p-8 rounded-xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:border-white/20 transition-all group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold">Lightning Fast</h3>
              </div>
              <p className="text-gray-400 text-lg">
                Generate 5 perfect replies in 15 seconds. Reply to 100 comments in 30 minutes instead of spending hours manually crafting responses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 border-y border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-gray-400 text-lg">Start free, upgrade when you&apos;re ready to scale</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl border border-white/10 bg-black/50 hover:border-white/20 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-4">
                $19<span className="text-lg text-gray-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>100 replies/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>All platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>All tone options</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>Reply history</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Pro - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-xl border-2 border-purple-500 bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-4">
                $49<span className="text-lg text-gray-400">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Unlimited replies</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>All platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>All tone options</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Full history & analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-purple-400" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full bg-white text-black hover:bg-gray-200">
                  Upgrade to Pro
                </Button>
              </Link>
            </motion.div>

            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-xl border border-white/10 bg-black/50 hover:border-white/20 transition-all"
            >
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">
                $0<span className="text-lg text-gray-500">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500">25 replies/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500">3 platforms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-500">Basic tones</span>
                </li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full" variant="outline">
                  Try Free
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Save 10+ Hours Per Week?
            </h2>
            <p className="text-gray-400 text-xl mb-8">
              Join 500+ creators who are already using ReplyTomic to scale their social media presence
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6">
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
            <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 md:mb-0">
              ReplyTomic
            </div>
            <div className="flex gap-6 text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © 2024 ReplyTomic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}