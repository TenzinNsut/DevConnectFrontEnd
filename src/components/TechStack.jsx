import React, { useState } from 'react';
import { Search, ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const stackCategories = [
  {
    id: "web",
    name: "Frontend & Full-Stack",
    items: [
      { name: "React", desc: "Interactive UI component library", popularity: "96% match rate", category: "Frontend" },
      { name: "Next.js", desc: "Production React web framework", popularity: "94% match rate", category: "Full-Stack" },
      { name: "TypeScript", desc: "Typed JavaScript for scalable applications", popularity: "98% match rate", category: "Language" },
      { name: "Tailwind CSS", desc: "Utility-first design architecture", popularity: "92% match rate", category: "Styling" },
      { name: "Vue.js", desc: "Progressive JavaScript framework", popularity: "85% match rate", category: "Frontend" },
      { name: "GraphQL", desc: "Type-safe declarative API query language", popularity: "88% match rate", category: "API" },
    ]
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    items: [
      { name: "Python", desc: "Core language for data and foundation models", popularity: "99% match rate", category: "Language" },
      { name: "PyTorch", desc: "Deep learning tensor computation framework", popularity: "95% match rate", category: "Machine Learning" },
      { name: "FastAPI", desc: "High-throughput asynchronous Python APIs", popularity: "93% match rate", category: "Backend" },
      { name: "LangChain", desc: "Building composable agentic LLM workflows", popularity: "90% match rate", category: "GenAI" },
      { name: "Hugging Face", desc: "Open model weights and transformer tooling", popularity: "89% match rate", category: "ML Hub" },
      { name: "vLLM", desc: "Low-latency inference and paged attention engine", popularity: "84% match rate", category: "Inference" },
    ]
  },
  {
    id: "systems",
    name: "Systems & Cloud",
    items: [
      { name: "Go", desc: "High-performance language for cloud microservices", popularity: "93% match rate", category: "Language" },
      { name: "Rust", desc: "Memory-safe, zero-overhead systems programming", popularity: "95% match rate", category: "Language" },
      { name: "Docker", desc: "Standard containerization runtime and packaging", popularity: "97% match rate", category: "DevOps" },
      { name: "Kubernetes", desc: "Automated container orchestration", popularity: "89% match rate", category: "Cloud" },
      { name: "gRPC", desc: "Contract-first cross-service RPC protocol", popularity: "86% match rate", category: "Protocols" },
      { name: "WebAssembly", desc: "High-speed client-side binary execution", popularity: "82% match rate", category: "Systems" },
    ]
  },
  {
    id: "data",
    name: "Databases & Storage",
    items: [
      { name: "PostgreSQL", desc: "Relational engine with JSONB and pgvector", popularity: "96% match rate", category: "SQL" },
      { name: "MongoDB", desc: "Document database for flexible schemas", popularity: "94% match rate", category: "NoSQL" },
      { name: "Redis", desc: "In-memory cache and pub/sub message broker", popularity: "91% match rate", category: "Cache" },
      { name: "Supabase", desc: "Managed PostgreSQL with row-level security", popularity: "92% match rate", category: "BaaS" },
      { name: "Prisma", desc: "Type-safe TypeScript database ORM", popularity: "90% match rate", category: "ORM" },
      { name: "ClickHouse", desc: "Fast columnar analytical database", popularity: "81% match rate", category: "Analytics" },
    ]
  },
  {
    id: "mobile",
    name: "Mobile & Native",
    items: [
      { name: "React Native", desc: "Native iOS and Android apps with React", popularity: "91% match rate", category: "Mobile" },
      { name: "Flutter", desc: "Google cross-platform UI toolkit with Dart", popularity: "88% match rate", category: "Mobile" },
      { name: "Swift / iOS", desc: "Native Apple systems and app development", popularity: "87% match rate", category: "Native" },
      { name: "Kotlin / Android", desc: "Modern native Android ecosystem", popularity: "86% match rate", category: "Native" },
    ]
  }
];

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = stackCategories.map(cat => {
    if (selectedCategory !== "all" && cat.id !== selectedCategory) {
      return null;
    }
    const filteredItems = cat.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredItems.length > 0 ? { ...cat, items: filteredItems } : null;
  }).filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#E1E0CC] selection:bg-[#E1E0CC] selection:text-black">
      <Navbar />

      <main className="flex-grow pt-28 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/60">
            Ecosystem Directory
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.05em] leading-[0.95]" style={{ color: "#E1E0CC" }}>
            The Developer Stack Directory.
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed text-[#E1E0CC]/70">
            Explore active technologies across the DevConnect network. Pair with engineers matching your exact toolset.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-5 max-w-4xl">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#E1E0CC]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies (e.g. React, Python, Go, Rust, PostgreSQL)..."
              className="w-full bg-[#111113] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-[#E1E0CC] placeholder-[#E1E0CC]/40 outline-none focus:border-[#E1E0CC]/50 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-[#E1E0CC] text-black font-semibold"
                  : "bg-[#111113] text-[#E1E0CC]/70 hover:text-[#E1E0CC] border border-white/10"
              }`}
            >
              All Stacks
            </button>
            {stackCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-[#E1E0CC] text-black font-semibold"
                    : "bg-[#111113] text-[#E1E0CC]/70 hover:text-[#E1E0CC] border border-white/10"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories & Cards */}
        <div className="space-y-12">
          {filteredCategories.map(cat => (
            <div key={cat.id} className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-medium tracking-tight text-[#E1E0CC]">{cat.name}</h3>
                <span className="text-xs font-mono text-[#E1E0CC]/40">{cat.items.length} proficiencies</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="p-6 rounded-2xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-medium text-[#E1E0CC]">
                          {item.name}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[#E1E0CC]/70">
                          {item.category}
                        </span>
                      </div>

                      <p className="text-xs text-[#E1E0CC]/70 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#E1E0CC]/60 pt-3 border-t border-white/5">
                      <span>Compatibility</span>
                      <span className="text-[#E1E0CC]">{item.popularity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-20 text-[#E1E0CC]/50 space-y-2">
              <p className="text-base font-medium text-[#E1E0CC]">No technology matches "{searchQuery}"</p>
              <p className="text-xs">Try searching for JavaScript, Python, Rust, Go, or Cloud.</p>
            </div>
          )}
        </div>

        {/* Custom Stack Card */}
        <div className="border border-white/10 rounded-3xl p-10 sm:p-14 bg-[#111113] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-medium tracking-tight text-[#E1E0CC]">Work with a niche or experimental stack?</h3>
            <p className="text-sm text-[#E1E0CC]/70 max-w-lg leading-relaxed">
              DevConnect supports freeform technology tagging. Add your custom libraries or languages directly to your profile.
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

export default TechStack;
