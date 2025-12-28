import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaReddit } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Reply to Every Comment
            <br />
            in Seconds, Not Hours
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100">
            AI-powered replies for YouTube, Instagram, TikTok, Twitter, LinkedIn & more
          </p>

          {/* Platform Logos */}
          <div className="flex justify-center items-center gap-6 mb-12 flex-wrap">
            <FaYoutube className="text-4xl text-red-500 bg-white rounded-full p-2" />
            <FaInstagram className="text-4xl text-pink-500 bg-white rounded-full p-2" />
            <SiTiktok className="text-4xl text-black bg-white rounded-full p-2" />
            <FaTwitter className="text-4xl text-blue-400 bg-white rounded-full p-2" />
            <FaLinkedin className="text-4xl text-blue-600 bg-white rounded-full p-2" />
            <FaFacebook className="text-4xl text-blue-500 bg-white rounded-full p-2" />
            <FaReddit className="text-4xl text-orange-500 bg-white rounded-full p-2" />
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6">
                Start Free
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Problem/Solution Section */}
        <div className="mt-24 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">The Problem</h2>
            <p className="text-lg text-purple-100">
              Content creators waste 10+ hours per week responding to comments across multiple platforms.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">The Solution</h2>
            <p className="text-lg text-purple-100">
              ReplyTomic generates platform-optimized replies in 15 seconds, saving you time while maintaining authenticity.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-4">1</div>
              <h3 className="text-xl font-bold mb-4">Select Platform</h3>
              <p className="text-gray-600">
                Choose from YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook, or Reddit
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-4">2</div>
              <h3 className="text-xl font-bold mb-4">Paste Comment</h3>
              <p className="text-gray-600">
                Add the comment you want to reply to, optionally include the original post for context
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-4">3</div>
              <h3 className="text-xl font-bold mb-4">Get 5 Replies</h3>
              <p className="text-gray-600">
                Receive 5 AI-generated, platform-optimized reply options. Copy and paste!
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-24 text-center text-white">
          <p className="text-2xl font-bold mb-4">Join 500+ creators saving 10 hours per week</p>
        </div>

        {/* Pricing Preview */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-2 mb-8">
                <li>25 replies/month</li>
                <li>3 platforms</li>
                <li>Basic tones</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 border-4 border-purple-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Creator Pro</h3>
              <div className="text-4xl font-bold mb-4">$29<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-2 mb-8">
                <li>Unlimited replies</li>
                <li>All platforms</li>
                <li>All tones</li>
                <li>Generation history</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Upgrade to Pro</Button>
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Agency</h3>
              <div className="text-4xl font-bold mb-4">$99<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-2 mb-8">
                <li>Everything in Pro</li>
                <li>10 team seats</li>
                <li>Brand voice training</li>
                <li>Bulk mode</li>
                <li>Analytics</li>
              </ul>
              <Link href="/sign-up">
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
