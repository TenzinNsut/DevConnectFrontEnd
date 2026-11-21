import React from 'react';
import { PrismaHero } from "@/components/ui/prisma-hero";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Code, 
  Users, 
  MessageSquare, 
  Terminal, 
  Layers, 
  Database,
  Radio,
  Github,
  Linkedin
} from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen w-full bg-black text-[#E1E0CC] selection:bg-[#E1E0CC] selection:text-black">
      {/* 100vh Edge-to-Edge Fluid Parallax Hero */}
      <PrismaHero
        title="DevConnect"
        subtitle="A developer networking platform to discover peers, match by tech stack, and collaborate in real time."
        ctaText="Join DevConnect"
        ctaLink="/signup"
      />

      {/* Anchor point for smooth scroll */}
      <div id="explore" className="relative z-10" />

      {/* ---------------- CORE FEATURES ---------------- */}
      <section className="py-14 px-4 sm:py-20 sm:px-8 md:py-24 md:px-12 max-w-7xl mx-auto space-y-10 sm:space-y-16 border-t border-white/10">
        
        <div className="space-y-2 sm:space-y-3 max-w-2xl">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#E1E0CC]/50">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight text-[#E1E0CC]">
            What is DevConnect?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#E1E0CC]/70 leading-relaxed font-normal">
            DevConnect is built to help developers find coding partners, project collaborators, and teammates through straightforward tech stack matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          
          {/* Feature 1 */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all space-y-4 sm:space-y-5 flex flex-col justify-between group">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E1E0CC]">
                <Code className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-[#E1E0CC]/40">01 / DISCOVERY</div>
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] group-hover:text-white transition-colors">
                Discover by Tech Stack
              </h3>
              <p className="text-xs sm:text-sm text-[#E1E0CC]/70 leading-relaxed font-normal">
                Browse developer profiles by their primary tools — React, Node.js, Python, MongoDB, or others — and explore what they are currently building.
              </p>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#E1E0CC]/50">
              <span>Swipe & Filter Feed</span>
              <span className="text-[#E1E0CC]/80">Pass / Connect</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all space-y-4 sm:space-y-5 flex flex-col justify-between group">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E1E0CC]">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-[#E1E0CC]/40">02 / CONNECTIONS</div>
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] group-hover:text-white transition-colors">
                Connection Requests
              </h3>
              <p className="text-xs sm:text-sm text-[#E1E0CC]/70 leading-relaxed font-normal">
                Send connection requests to developers you'd like to collaborate with. Manage incoming requests and accept them to establish a connection.
              </p>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#E1E0CC]/50">
              <span>Bidirectional Requests</span>
              <span className="text-[#E1E0CC]/80">Interested / Accepted</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all space-y-4 sm:space-y-5 flex flex-col justify-between group">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E1E0CC]">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-[#E1E0CC]/40">03 / REAL-TIME CHAT</div>
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] group-hover:text-white transition-colors">
                Instant Socket.IO Messaging
              </h3>
              <p className="text-xs sm:text-sm text-[#E1E0CC]/70 leading-relaxed font-normal">
                Chat 1-on-1 with accepted connections in real time. Messages persist in MongoDB and sync seamlessly across reloads and offline sessions.
              </p>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#E1E0CC]/50">
              <span>WebSockets & Rooms</span>
              <span className="text-[#E1E0CC]/80">MongoDB History</span>
            </div>
          </div>

        </div>

      </section>

      {/* ---------------- TECH STACK & ARCHITECTURE ---------------- */}
      <section className="py-14 px-4 sm:py-20 sm:px-8 md:py-24 md:px-12 bg-[#08080A] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2 sm:space-y-3 max-w-xl">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#E1E0CC]/50">
                Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight text-[#E1E0CC]">
                How It's Built.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#E1E0CC]/70 leading-relaxed font-normal">
                DevConnect is developed as a fullstack MERN application with a real-time WebSocket communication layer.
              </p>
            </div>

            <Link
              to="/tech-stack"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#E1E0CC]/70 hover:text-[#E1E0CC] transition-colors self-start md:self-auto"
            >
              <span>View full tech stack page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111113] border border-white/10 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 text-[#E1E0CC] font-mono text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#E1E0CC]/60" />
                <span>Frontend</span>
              </div>
              <h4 className="text-sm sm:text-base font-medium text-[#E1E0CC]">React & Redux</h4>
              <p className="text-xs text-[#E1E0CC]/60 leading-relaxed">
                Vite-powered single-page application with Redux Toolkit for global state, Tailwind CSS, and Framer Motion.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#111113] border border-white/10 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 text-[#E1E0CC] font-mono text-xs uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-[#E1E0CC]/60" />
                <span>Backend API</span>
              </div>
              <h4 className="text-sm sm:text-base font-medium text-[#E1E0CC]">Node.js & Express</h4>
              <p className="text-xs text-[#E1E0CC]/60 leading-relaxed">
                Modular RESTful API with route validation, JWT cookie authentication, and bcrypt password encryption.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#111113] border border-white/10 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 text-[#E1E0CC] font-mono text-xs uppercase tracking-wider">
                <Database className="w-4 h-4 text-[#E1E0CC]/60" />
                <span>Database</span>
              </div>
              <h4 className="text-sm sm:text-base font-medium text-[#E1E0CC]">MongoDB & Mongoose</h4>
              <p className="text-xs text-[#E1E0CC]/60 leading-relaxed">
                NoSQL document store managing user profiles, connection request states, and persistent chat messages.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#111113] border border-white/10 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 text-[#E1E0CC] font-mono text-xs uppercase tracking-wider">
                <Radio className="w-4 h-4 text-[#E1E0CC]/60" />
                <span>Real-Time</span>
              </div>
              <h4 className="text-sm sm:text-base font-medium text-[#E1E0CC]">Socket.IO</h4>
              <p className="text-xs text-[#E1E0CC]/60 leading-relaxed">
                Bi-directional WebSocket rooms for instant peer-to-peer message dispatch and live online presence tracking.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- ABOUT THE PROJECT & AUTHOR ---------------- */}
      <section className="py-14 px-4 sm:py-20 sm:px-8 md:py-20 md:px-12 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <div className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-[#111113] border border-white/10 space-y-4 sm:space-y-6">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#E1E0CC]/50">
            About This Project
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#E1E0CC]">
            Personal Project by Tenzin Lekshey
          </h3>
          <p className="text-xs sm:text-sm text-[#E1E0CC]/75 max-w-xl mx-auto leading-relaxed">
            DevConnect was built to explore real-time socket communication, state management with Redux Toolkit, and fullstack MERN engineering with a cohesive, dark studio design language.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <a
              href="https://github.com/TenzinNsut"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E1E0CC] hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tenzin-lekshey-66120a211/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E1E0CC] hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- SIMPLE CALL TO ACTION ---------------- */}
      <section className="py-14 px-4 sm:py-20 sm:px-8 md:py-20 md:px-12 bg-[#0B0B0D] border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#E1E0CC]">
            Ready to try DevConnect?
          </h2>
          <p className="text-xs sm:text-sm text-[#E1E0CC]/70 max-w-md mx-auto leading-relaxed">
            Create an account to test profile creation, explore the feed, and test real-time messaging.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link to="/signup" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-full font-medium text-xs sm:text-sm text-black transition-all hover:opacity-95 cursor-pointer shadow-xl inline-flex items-center justify-center gap-2"
                style={{ backgroundColor: "#E1E0CC" }}
              >
                <span>Create an Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <Link to="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-full border border-white/15 bg-black/60 hover:bg-white/5 font-medium text-xs sm:text-sm text-[#E1E0CC]/80 hover:text-[#E1E0CC] transition-all cursor-pointer inline-flex items-center justify-center gap-2">
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 text-[#E1E0CC]/60" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <Footer />
    </main>
  );
};

export default Home;