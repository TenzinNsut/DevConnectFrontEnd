import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Terminal,
  Activity,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------- WordsPullUp ---------------- */
export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block relative whitespace-nowrap"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] select-none pointer-events-none">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
export interface Segment {
  text: string;
  className?: string;
}

export interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = "",
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
export interface NavItem {
  label: string;
  href: string;
}

export interface PrismaHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  videoSrc?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Tech stack", href: "/tech-stack" },
  { label: "Sign In", href: "/login" },
];

const PrismaHero: React.FC<PrismaHeroProps> = ({
  title = "DevConnect",
  subtitle = "DevConnect is a worldwide network of software engineers, designers and builders bound not by place, status or labels but by passion to unlock potential through our unique perspectives.",
  ctaText = "Join DevConnect",
  ctaLink = "/signup",
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  navItems = defaultNavItems,
}) => {
  // Cursor Parallax illusion
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, lag-free parallax motion
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax mappings
  // Background video moves opposite to cursor
  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  // Foreground text moves slightly towards cursor for true 3D spatial depth
  const fgTranslateX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const fgTranslateY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  // Atmospheric lighting tilt
  const tiltX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const normX = clientX / innerWidth - 0.5;
    const normY = clientY / innerHeight - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-screen w-full relative overflow-hidden bg-black select-none"
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Parallax Background video (scaled 1.10 to prevent edge gaps during movement) */}
        <motion.div
          className="absolute inset-[-5%] w-[110%] h-[110%] pointer-events-none"
          style={{
            x: bgTranslateX,
            y: bgTranslateY,
            rotateX: tiltX,
            rotateY: tiltY,
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop"
            className="w-full h-full object-cover"
            src={videoSrc}
          />
        </motion.div>

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />

        {/* Gradient overlay for contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Hanging Navbar at top center */}
        <nav className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
          <div className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-14 rounded-b-2xl md:rounded-b-3xl bg-black px-6 py-2.5 sm:px-8 md:px-10 shadow-2xl border-b border-x border-white/10">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                className="text-[11px] sm:text-xs md:text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(225, 224, 204, 0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(225, 224, 204, 0.75)")
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Hero content with foreground parallax depth */}
        <motion.div
          style={{
            x: fgTranslateX,
            y: fgTranslateY,
          }}
          className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:px-10 sm:pb-8 md:px-14 md:pb-10 z-20"
        >
          <div className="grid grid-cols-12 items-end gap-6 sm:gap-8">
            {/* Title Column - Calculated font clamp so 10-char 'DevConnect' never overflows into column 2 */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8 overflow-hidden pb-8">
              <h1
                className="font-medium leading-[0.88] tracking-[-0.06em] text-[13vw] sm:text-[11vw] md:text-[9.5vw] lg:text-[7.8vw] xl:text-[10vw]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text={title} showAsterisk />
              </h1>
            </div>

            {/* Subtitle & CTA button Column */}
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-5 pb-2 lg:pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs sm:text-sm md:text-xl max-w-md font-normal leading-relaxed"
                style={{ color: "rgba(225, 224, 204, 0.85)" }}
              >
                {subtitle}
              </motion.p>

              <div className="flex flex-wrap items-center gap-3">
                <Link to={ctaLink} className="self-start">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group inline-flex items-center gap-3 self-start rounded-full py-2 pl-6 pr-2 text-sm sm:text-base font-medium text-black transition-all hover:gap-4 cursor-pointer shadow-2xl whitespace-nowrap"
                    style={{ backgroundColor: "#E1E0CC" }}
                  >
                    <span>{ctaText}</span>
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-105 flex-shrink-0">
                      <ArrowRight
                        className="h-4 w-4"
                        style={{ color: "#E1E0CC" }}
                      />
                    </span>
                  </motion.button>
                </Link>

                <a
                  href="#explore"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("explore")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md text-xs sm:text-sm md:text-base font-medium text-[#E1E0CC]/80 hover:text-[#E1E0CC] hover:border-white/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  Explore Platform ↓
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <a
          href="#explore"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("explore")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="hidden md:flex flex-col items-center gap-1.5 absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[#E1E0CC]/40 hover:text-[#E1E0CC] transition-colors cursor-pointer group select-none"
        >
          <span className="text-[9px] font-mono tracking-widest uppercase">
            Scroll to explore
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export { PrismaHero };
export default PrismaHero;
