import React from 'react';
import { ArrowRight, Code, MessageSquare, Shield, Users, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Features = () => {
  const pillars = [
    {
      num: "01",
      title: "Algorithmic Stack Pairing",
      category: "Match Engine",
      description: "DevConnect pairs developers not by generic titles, but by the code they actually write. The matching engine evaluates complementary languages, frameworks, and architecture patterns.",
      techPreview: `// Sample Pairing Heuristic
const matchScore = evaluateCompatibility({
  userStack: ["React", "TypeScript", "Tailwind"],
  targetStack: ["Go", "gRPC", "PostgreSQL"],
  intent: "Fullstack SaaS MVP"
}); // -> 96.4% Compatibility`
    },
    {
      num: "02",
      title: "Low-Latency Socket Rooms",
      category: "Live Messaging",
      description: "No dropped messages, no waiting. Direct user-to-user rooms powered by Socket.IO with automatic message persistence in MongoDB. Reconnect instantly across browser refreshes.",
      techPreview: `// Real-Time Room Dispatch
socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
  const saved = await Message.create({ senderId, receiverId, message });
  io.to(receiverId).emit("receiveMessage", saved);
  io.to(senderId).emit("receiveMessage", saved);
});`
    },
    {
      num: "03",
      title: "Verified Developer Footprint",
      category: "Integrity",
      description: "Zero recruiter noise, zero vanity spam. Every profile centers on authentic GitHub contributions, technical proficiencies, bio, and actual collaboration goals.",
      techPreview: `// Developer Identity Card
interface DevProfile {
  name: "Marcus Vance";
  craft: "AI Systems & PyTorch";
  verifiedRepos: 18;
  lookingFor: "Frontend Partner for Model UI";
}`
    },
    {
      num: "04",
      title: "Hackathon & Co-founder Squads",
      category: "Collaboration",
      description: "Whether you need a systems programmer for an upcoming 48-hour hackathon or a co-founder to launch an open-source tool, DevConnect connects you directly with ready partners.",
      techPreview: `// Squad Assembly Query
findTeammates({
  availability: "Active Today",
  skills: ["Rust", "WASM", "Docker"],
  projectType: "Hackathon Team"
});`
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#E1E0CC] selection:bg-[#E1E0CC] selection:text-black">
      <Navbar />

      <main className="flex-grow pt-28 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-24">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/60">
            Platform Specifications
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.05em] leading-[0.95]" style={{ color: "#E1E0CC" }}>
            Engineered for builders who ship.
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed text-[#E1E0CC]/70">
            A minimalist, high-signal network pairing developers through verified stacks, low-latency communication, and mutual project intent.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#111113] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-white/20 transition-colors"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-light text-[#E1E0CC]/40">{item.num}</span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E1E0CC]/60 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-medium tracking-tight text-[#E1E0CC]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#E1E0CC]/70 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Minimal Code Preview */}
              <div className="rounded-2xl bg-black border border-white/10 p-4 font-mono text-xs overflow-x-auto text-[#E1E0CC]/80">
                <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-3 opacity-40">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
                </div>
                <pre className="whitespace-pre leading-relaxed">{item.techPreview}</pre>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="border border-white/10 rounded-3xl p-10 sm:p-14 bg-[#111113] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#E1E0CC]">
              Ready to meet your next coding partner?
            </h2>
            <p className="text-sm text-[#E1E0CC]/70 max-w-lg">
              Join thousands of software engineers already matching and building together on DevConnect.
            </p>
          </div>
          <Link
            to="/signup"
            className="flex-shrink-0 inline-flex items-center gap-3 rounded-full py-3 px-8 text-sm font-medium text-black transition-all hover:opacity-95"
            style={{ backgroundColor: "#E1E0CC" }}
          >
            <span>Create Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Features;
