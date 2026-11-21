import React from 'react';
import { ArrowRight, HelpCircle, UserCheck, Shuffle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Publish Your Dev Profile",
      tagline: "High-signal technical identity",
      description: "Sign up in 30 seconds. Upload your profile photo with in-browser compression, declare your active languages and frameworks (e.g. React, Node.js, Python, Go, Rust), and specify what you want to build.",
      details: ["Instant automated image optimization", "Granular technology tags", "Collaboration intent: Hackathon, Startup MVP, or Open-Source"]
    },
    {
      num: "02",
      title: "Discover & Mutual Match",
      tagline: "Focused, distraction-free feed",
      description: "Browse curated developer cards one at a time. Examine their craft, bio, and stack compatibility. Pass on profiles that don't fit; Connect with engineers whose experience complements yours.",
      details: ["One focused card at a time", "Real-time presence indicators", "Mutual approval eliminates unsolicited noise"]
    },
    {
      num: "03",
      title: "Direct Real-Time Chat & Build",
      tagline: "Low-latency persistent rooms",
      description: "When interest is mutual or an inbound request is accepted, your connection unlocks. Open direct messaging to exchange architecture docs, coordinate repos, and start shipping immediately.",
      details: ["Zero-lag Socket.IO delivery", "Full message history persistence in MongoDB", "Direct link sharing and pair-programming"]
    }
  ];

  const faqs = [
    {
      q: "How does the matching algorithm pair engineers?",
      a: "DevConnect prioritizes developers with complementary or shared technical proficiencies. If you build frontends in React and TypeScript, the algorithm highlights backend engineers in Go, Python, or Node.js who are actively seeking partners."
    },
    {
      q: "Are chat conversations persistent after logout?",
      a: "Yes. Every message exchanged is securely stored and indexed in MongoDB, so your chat history, timestamps, and thread status remain fully intact when you return."
    },
    {
      q: "Is DevConnect free?",
      a: "Yes, DevConnect is completely free for individual software developers, students, researchers, and open-source maintainers."
    },
    {
      q: "Can I update my stack and project preferences?",
      a: "You can update your skills, bio, and profile photo at any time directly through your profile settings."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#E1E0CC] selection:bg-[#E1E0CC] selection:text-black">
      <Navbar />

      <main className="flex-grow pt-28 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-24">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/60">
            Methodology
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.05em] leading-[0.95]" style={{ color: "#E1E0CC" }}>
            How DevConnect operates.
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed text-[#E1E0CC]/70">
            A three-act flow engineered to eliminate the friction of finding technical collaborators.
          </p>
        </div>

        {/* 3-Act Workflow */}
        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#111113] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-start justify-between gap-8 hover:border-white/20 transition-colors"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#E1E0CC]/50 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    Act {step.num}
                  </span>
                  <span className="text-xs font-mono text-[#E1E0CC]/60">{step.tagline}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#E1E0CC]">
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#E1E0CC]/70 font-normal">
                  {step.description}
                </p>

                <div className="grid sm:grid-cols-3 gap-3 pt-4">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-[#E1E0CC]/80 font-mono">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>

              <div className="font-mono text-7xl sm:text-9xl font-light text-[#E1E0CC]/10 select-none self-end md:self-start">
                {step.num}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-8 pt-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/60">
              Clarifications
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-[#E1E0CC]">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="bg-[#111113] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-3">
                <h4 className="text-base font-medium text-[#E1E0CC]">
                  {faq.q}
                </h4>
                <p className="text-sm leading-relaxed text-[#E1E0CC]/70 font-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border border-white/10 rounded-3xl p-10 sm:p-14 bg-[#111113] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#E1E0CC]">
              Start your developer profile today.
            </h2>
            <p className="text-sm text-[#E1E0CC]/70 max-w-lg">
              Find partners, share knowledge, and ship projects without the noise.
            </p>
          </div>
          <Link
            to="/signup"
            className="flex-shrink-0 inline-flex items-center gap-3 rounded-full py-3 px-8 text-sm font-medium text-black transition-all hover:opacity-95"
            style={{ backgroundColor: "#E1E0CC" }}
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
