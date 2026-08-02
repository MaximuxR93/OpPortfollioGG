import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useCountUp } from "@/hooks/use-count-up";
import { useFullPageScroll } from "@/hooks/use-full-page-scroll";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Sparkles,
  Code2,
  Brain,
  Shield,
  GraduationCap,
  Briefcase,
  Menu,
  X,
  Download,
  FileText,
  Award,
  BookOpen,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mitrayan Mallick — AI Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Mitrayan Mallick — AI Engineer and Full-Stack Developer building LLM-powered products, RAG systems, and shipped Chrome extensions.",
      },
      { property: "og:title", content: "Mitrayan Mallick — AI Engineer & Full-Stack Developer" },
      {
        property: "og:description",
        content: "AI-integrated web apps, RAG pipelines, and production LLM tooling — built end-to-end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";
const ROLES = ["AI Engineer", "RAG Builder", "Full-Stack Dev", "LLM Tooling", "Chrome Ext Dev"];
const NAV_LINKS = ["about", "skills", "experience", "projects", "resume", "credentials", "contact"];
const ALL_SECTIONS = ["hero", ...NAV_LINKS];

const skills = {
  "AI / LLM": ["LangChain", "RAG", "Groq", "OpenAI", "Anthropic", "Prompt Engineering", "Scikit-Learn"],
  Frontend: ["React 18", "Next.js", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "FastAPI", "REST APIs", "Python"],
  "Databases & Cloud": ["MongoDB", "PostgreSQL", "Redis", "Docker", "Vercel", "Render", "GitHub Actions"],
};

const experience = [
  {
    role: "Security & Exploit Analyst",
    company: "Raitomira / Nexon",
    period: "Aug 2024 – Present",
    stats: [{ label: "critical exploits found", value: 3 }, { label: "high-risk accounts/mo", value: 50 }],
    bullets: [
      "Identified 3 critical exploits on a 10,000+ user gaming platform; patches shipped in 48h.",
      "Flag 50+ high-risk accounts per month via an internal threat-detection workflow.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent Clients",
    period: "Jan 2023 – Present",
    stats: [{ label: "event registrations", value: 500 }],
    bullets: [
      "NES: MERN event platform, 500+ registrations, admin CMS, deployed on Render.",
      "Dipan Herbals: full-stack marketing site with headless CMS + payment gateway.",
    ],
  },
  {
    role: "Android App Development Intern",
    company: "Webguru Infosystems",
    period: "Aug 2024 – Oct 2024",
    stats: [],
    bullets: [
      "Rebuilt MediCure's offline-first reminder engine using Room DB with conflict resolution.",
      "Shipped a doctor compliance dashboard + foreground-service push notifications.",
    ],
  },
];

const projects = [
  {
    name: "Glimpse",
    tag: "AI Sidebar Chrome Extension",
    stack: "React 18 · TypeScript · Vite · Chrome MV3 · Groq",
    desc: "Zero-backend Chrome extension integrating 4 LLM providers with token streaming and sub-2s response latency.",
    href: "https://github.com/MaximuxR93/GlimpseV1",
    color: "from-cyan-500/10 to-blue-500/10",
    border: "hover:border-cyan-400/50",
  },
  {
    name: "SecondBrain",
    tag: "RAG Document Assistant",
    stack: "MERN · FastAPI · LangChain · Groq",
    desc: "End-to-end RAG pipeline with source-cited answers over uploaded PDFs, streaming chat UI, CI/CD on Vercel.",
    href: "https://the2nd-brain-28jk.vercel.app",
    color: "from-violet-500/10 to-purple-500/10",
    border: "hover:border-violet-400/50",
  },
  {
    name: "DocScanX",
    tag: "AI ATS Resume Analyser",
    stack: "Python · FastAPI · Groq · NLP",
    desc: "ATS simulation engine returning keyword-match scores, missing-skill gaps, and rewrite suggestions.",
    href: "https://doc-scan-x.vercel.app",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "hover:border-emerald-400/50",
  },
];

const CV_PATH = "/cv.pdf";

const credentials = [
  {
    title: "Grade Card",
    subtitle: "B.Tech · CS (AI/ML) · CGPA 8.79",
    file: "/Grade_Card_Corrected.pdf",
    download: "Mitrayan_Mallick_Grade_Card.pdf",
    icon: GraduationCap,
    glow: "rgba(34,211,238,0.15)",
    accent: "#22d3ee",
    tag: "Academic",
    featured: true,
  },
  {
    title: "Letter of Recommendation",
    subtitle: "Professional Reference",
    file: "/Mitrayan_Mallick_Letter_of_Recommendation.pdf",
    download: "Mitrayan_Mallick_LOR.pdf",
    icon: Star,
    glow: "rgba(251,191,36,0.15)",
    accent: "#fbbf24",
    tag: "Reference",
    featured: true,
  },
  {
    title: "Experience Certificate",
    subtitle: "Webguru Infosystems · Android Intern",
    file: "/Mitrayan_Mallick_Experience_Certificate.pdf",
    download: "Mitrayan_Mallick_Experience_Certificate.pdf",
    icon: Briefcase,
    glow: "rgba(167,139,250,0.15)",
    accent: "#a78bfa",
    tag: "Internship",
    featured: false,
  },
  {
    title: "Achievement Certificate",
    subtitle: "Academic · Verified",
    file: "/Certificate_Corrected.pdf",
    download: "Mitrayan_Mallick_Certificate.pdf",
    icon: Award,
    glow: "rgba(52,211,153,0.15)",
    accent: "#34d399",
    tag: "Certificate",
    featured: false,
  },
  {
    title: "Udemy Certificate I",
    subtitle: "Course Completion · Verified",
    file: "/UC-ac59fcf6-d699-4a28-a98c-b4ac5ea7f338.pdf",
    download: "Mitrayan_Mallick_Udemy_Cert_1.pdf",
    icon: BookOpen,
    glow: "rgba(244,114,182,0.15)",
    accent: "#f472b6",
    tag: "Udemy",
    featured: false,
  },
  {
    title: "Udemy Certificate II",
    subtitle: "Course Completion · Verified",
    file: "/UC-d735e5e6-a4e2-48fd-9394-b0ea9ac57106.pdf",
    download: "Mitrayan_Mallick_Udemy_Cert_2.pdf",
    icon: BookOpen,
    glow: "rgba(244,114,182,0.15)",
    accent: "#f472b6",
    tag: "Udemy",
    featured: false,
  },
];

// Fade + slide up on scroll
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({ value, label }: { value: number; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <span ref={ref} className="inline-flex items-baseline gap-1 text-cyan-400 font-bold">
      {count}+
      <span className="text-neutral-400 font-normal text-xs ml-1">{label}</span>
    </span>
  );
}

function Index() {
  const role = useTypewriter(ROLES);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { containerRef, jumpTo } = useFullPageScroll();

  // Console easter egg
  useEffect(() => {
    console.log(
      "%c Hey recruiter 👋 ",
      "background:#06b6d4;color:#000;font-size:14px;font-weight:bold;padding:4px 8px;border-radius:4px;"
    );
    console.log(
      "%c mitrayanmallick1142002@gmail.com — let's build something.",
      "color:#67e8f9;font-size:12px;"
    );
  }, []);

  // Forward mouse to Spline canvas
  useEffect(() => {
    let raf = 0;
    const forward = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const canvas = document.querySelector("canvas");
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0) return;
        const init: MouseEventInit = { clientX: e.clientX, clientY: e.clientY, bubbles: true, cancelable: true, view: window };
        canvas.dispatchEvent(new MouseEvent("pointermove", init));
        canvas.dispatchEvent(new MouseEvent("mousemove", init));
      });
    };
    window.addEventListener("mousemove", forward);
    return () => { window.removeEventListener("mousemove", forward); cancelAnimationFrame(raf); };
  }, []);

  // Active nav section on scroll — observe inside container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = ALL_SECTIONS;
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = container.querySelector<HTMLElement>(`#${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4, root: container },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-black text-white overflow-y-auto overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="hidden md:block"><CursorGlow /></div>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-cyan-400 z-50 origin-left"
        style={{
          scaleX: activeSection === "hero" ? 0
            : activeSection === "about" ? 1/8
            : activeSection === "skills" ? 2/8
            : activeSection === "experience" ? 3/8
            : activeSection === "projects" ? 4/8
            : activeSection === "resume" ? 5/8
            : activeSection === "credentials" ? 6/8
            : activeSection === "contact" ? 1 : 0,
          width: "100%",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Right side dot indicators */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        {ALL_SECTIONS.map((id) => (
          <button
            key={id}
            onClick={() => jumpTo(id)}
            title={id}
            className={`rounded-full transition-all duration-300 ${
              activeSection === id
                ? "h-3 w-3 bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]"
                : "h-2 w-2 bg-white/20 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <div className="absolute inset-0">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={400} />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <SplineScene scene={SCENE} className="w-full h-full" />
        </div>
        <div className="absolute inset-0 md:hidden" style={{ background: "radial-gradient(ellipse at 20% 40%, oklch(0.28 0.08 270) 0px, transparent 60%), radial-gradient(ellipse at 80% 70%, oklch(0.22 0.12 200) 0px, transparent 55%), #000" }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent md:via-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Scrolling content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-black/30 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
            <button onClick={() => jumpTo("hero")} className="font-semibold tracking-tight">
              MM<span className="text-cyan-400">.</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8 text-sm">
              {NAV_LINKS.filter(id => id !== "resume" && id !== "credentials").map((id) => (
                <button
                  key={id}
                  onClick={() => jumpTo(id)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === id ? "text-cyan-400" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {id}
                </button>
              ))}
              <button
                onClick={() => jumpTo("credentials")}
                className={`capitalize transition-colors duration-200 ${
                  activeSection === "credentials" ? "text-cyan-400" : "text-neutral-400 hover:text-white"
                }`}
              >
                credentials
              </button>
              <button
                onClick={() => jumpTo("resume")}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm transition-all duration-200 ${
                  activeSection === "resume"
                    ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                    : "border-white/20 text-neutral-300 hover:border-cyan-400/50 hover:text-cyan-400"
                }`}
              >
                <Download className="h-3 w-3" /> CV
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:mitrayanmallick1142002@gmail.com"
                className="hidden md:inline-flex text-sm px-4 py-2 rounded-full bg-white text-black hover:bg-cyan-300 transition"
              >
                Get in touch
              </a>
              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 text-neutral-400 hover:text-white transition"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/5 bg-black/80 backdrop-blur-md overflow-hidden"
              >
                <div className="flex flex-col px-6 py-4 gap-4">
                  {NAV_LINKS.filter(id => id !== "resume").map((id) => (
                    <button
                      key={id}
                      onClick={() => { jumpTo(id); setMobileOpen(false); }}
                      className={`capitalize text-sm transition-colors text-left ${
                        activeSection === id ? "text-cyan-400" : "text-neutral-300"
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                  <a
                    href={CV_PATH}
                    download="Mitrayan_Mallick_CV.pdf"
                    className="text-sm px-4 py-2 rounded-full border border-cyan-400/40 text-cyan-400 text-center hover:bg-cyan-400/10 transition inline-flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" /> Download CV
                  </a>
                  <a
                    href="mailto:mitrayanmallick1142002@gmail.com"
                    className="text-sm px-4 py-2 rounded-full bg-white text-black text-center hover:bg-cyan-300 transition"
                  >
                    Get in touch
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="w-full md:max-w-[52%]">

            {/* Hero */}
            <section id="hero" className="min-h-screen flex flex-col justify-center pt-20">
              {/* Pulsing badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur w-fit mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
                <span className="text-xs text-neutral-300">Available for opportunities</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
              >
                Mitrayan
                <br />
                <span className="animated-gradient">Mallick</span>
              </motion.h1>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 h-8 flex items-center"
              >
                <span className="text-xl md:text-2xl text-cyan-400 font-mono font-medium">
                  {role}
                  <span className="animate-pulse">|</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-base md:text-xl text-neutral-300 max-w-xl"
              >
                Building LLM-powered products, RAG systems, and production Chrome extensions end-to-end.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  onClick={() => jumpTo("projects")}
                  className="px-5 py-3 rounded-full bg-cyan-400 text-black text-sm font-medium hover:bg-cyan-300 transition hover:scale-105 active:scale-95"
                >
                  View my work
                </button>
                <a
                  href={CV_PATH}
                  download="Mitrayan_Mallick_CV.pdf"
                  className="px-5 py-3 rounded-full border border-cyan-400/40 text-cyan-400 text-sm font-medium hover:bg-cyan-400/10 transition inline-flex items-center gap-2 hover:scale-105 active:scale-95 group"
                >
                  <Download className="h-4 w-4 group-hover:animate-bounce" /> Download CV
                </a>
                <a
                  href="https://github.com/MaximuxR93"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full border border-white/15 text-sm font-medium hover:bg-white/5 transition inline-flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex items-center gap-6 text-sm text-neutral-400"
              >
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Kolkata, India</span>
                <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4" /> CGPA 8.79 / 10</span>
              </motion.div>
            </section>

            {/* About */}
            <section id="about" className="min-h-screen flex flex-col justify-center py-24">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">About</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                  AI-integrated products, shipped end-to-end.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-neutral-300">
                  B.Tech in Computer Science (AI/ML) with hands-on experience building and shipping
                  AI-integrated web apps and Android apps. I've designed a production Chrome extension
                  with multi-LLM support and built a full-stack RAG system using LangChain + FastAPI.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg leading-relaxed mt-4 text-neutral-300">
                  Comfortable across the full SDLC — from system design and REST API development to
                  frontend delivery and production deployment on Vercel and Render.
                </p>
              </Reveal>
            </section>

            {/* Skills */}
            <section id="skills" className="min-h-screen flex flex-col justify-center py-24">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">Toolbox</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Skills & technologies.</h2>
              </Reveal>
              <div className="grid gap-4">
                {Object.entries(skills).map(([group, items], gi) => (
                  <Reveal key={group} delay={gi * 0.08}>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 hover:border-white/20 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        {group.startsWith("AI") ? (
                          <Brain className="h-4 w-4 text-cyan-400" />
                        ) : group === "Frontend" ? (
                          <Code2 className="h-4 w-4 text-cyan-400" />
                        ) : group === "Backend" ? (
                          <Shield className="h-4 w-4 text-cyan-400" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-cyan-400" />
                        )}
                        <h3 className="text-sm uppercase tracking-widest text-neutral-400">{group}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((s, si) => (
                          <motion.span
                            key={s}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: si * 0.04 }}
                            className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-neutral-200 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors cursor-default"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Experience — timeline */}
            <section id="experience" className="min-h-screen flex flex-col justify-center py-24">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">Work</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">Experience.</h2>
              </Reveal>
              <div className="relative pl-6 border-l border-white/10">
                {experience.map((e, i) => (
                  <Reveal key={e.role} delay={i * 0.1}>
                    <div className="relative mb-10 last:mb-0">
                      {/* Timeline dot */}
                      <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-black" />
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 hover:border-cyan-400/30 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 text-cyan-400 text-sm mb-1">
                              <Briefcase className="h-4 w-4" />
                              {e.company}
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white">{e.role}</h3>
                          </div>
                          <span className="text-xs text-neutral-400 sm:shrink-0 sm:mt-1">{e.period}</span>
                        </div>
                        {e.stats.length > 0 && (
                          <div className="flex flex-wrap gap-4 mb-3 text-sm">
                            {e.stats.map((s) => (
                              <StatCounter key={s.label} value={s.value} label={s.label} />
                            ))}
                          </div>
                        )}
                        <ul className="space-y-2 text-sm text-neutral-300">
                          {e.bullets.map((b, bi) => (
                            <li key={bi} className="flex gap-2">
                              <span className="text-cyan-400 mt-1">›</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="min-h-screen flex flex-col justify-center py-24">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">Selected work</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Projects.</h2>
              </Reveal>
              <div className="grid gap-5">
                {projects.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.1}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${p.color} backdrop-blur p-6 ${p.border} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10 block`}
                    >
                      {/* Sweep shine on hover */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            {p.name}
                            <ExternalLink className="h-4 w-4 text-neutral-500 group-hover:text-cyan-400 transition" />
                          </h3>
                          <p className="text-sm text-cyan-400/90 mt-0.5">{p.tag}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{p.desc}</p>
                      <p className="mt-3 text-xs text-neutral-500 font-mono">{p.stack}</p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Resume */}
            <section id="resume" className="min-h-screen flex flex-col justify-center py-24">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">Resume</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Grab my CV.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg text-neutral-300 mb-10 max-w-lg">
                  Full breakdown of my experience, projects, education and skills — one PDF, no fluff.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  href={CV_PATH}
                  download="Mitrayan_Mallick_CV.pdf"
                  className="group inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5 sm:p-6 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02] w-full sm:w-fit"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20 group-hover:bg-cyan-400/20 transition">
                    <FileText className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Mitrayan_Mallick_CV.pdf</p>
                    <p className="text-neutral-400 text-sm mt-0.5">Click to download</p>
                  </div>
                  <Download className="h-5 w-5 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-all ml-4" />
                </a>
              </Reveal>
            </section>

            {/* Credentials */}
            <section id="credentials" className="min-h-screen flex flex-col justify-center py-24">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">Proof of work</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Credentials.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg text-neutral-300 mb-8 max-w-lg">
                  Every claim, backed by a document.
                </p>
              </Reveal>

              {/* Featured row — 2 large cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {credentials.filter(c => c.featured).map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.1}>
                    <div
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
                      style={{ boxShadow: `0 0 0 0 ${c.glow}`, transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 32px 4px ${c.glow}`)}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${c.glow}`)}
                    >
                      {/* Glow blob */}
                      <div
                        className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl"
                        style={{ background: c.accent }}
                      />
                      <div className="flex items-start justify-between">
                        <span
                          className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border font-medium"
                          style={{ color: c.accent, borderColor: `${c.accent}40`, background: `${c.accent}10` }}
                        >
                          {c.tag}
                        </span>
                        <c.icon className="h-5 w-5 opacity-30" style={{ color: c.accent }} />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white leading-snug">{c.title}</p>
                        <p className="text-xs text-neutral-400 mt-1">{c.subtitle}</p>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <a
                          href={c.file}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border border-white/10 text-neutral-300 hover:text-white hover:border-white/25 transition-all duration-200"
                        >
                          <ExternalLink className="h-3 w-3" /> View
                        </a>
                        <a
                          href={c.file}
                          download={c.download}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium border transition-all duration-200"
                          style={{ color: c.accent, borderColor: `${c.accent}40`, background: `${c.accent}08` }}
                        >
                          <Download className="h-3 w-3" /> Save
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Secondary grid — 4 compact cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {credentials.filter(c => !c.featured).map((c, i) => (
                  <Reveal key={c.title} delay={0.2 + i * 0.07}>
                    <div
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-4 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02]"
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 24px 2px ${c.glow}`)}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <div
                        className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20 blur-xl"
                        style={{ background: c.accent }}
                      />
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border font-medium"
                          style={{ color: c.accent, borderColor: `${c.accent}40`, background: `${c.accent}10` }}
                        >
                          {c.tag}
                        </span>
                        <c.icon className="h-4 w-4 opacity-25" style={{ color: c.accent }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white leading-snug">{c.title}</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{c.subtitle}</p>
                      </div>
                      <div className="flex gap-1.5 mt-auto">
                        <a
                          href={c.file}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 transition-all duration-200"
                        >
                          <ExternalLink className="h-2.5 w-2.5" /> View
                        </a>
                        <a
                          href={c.file}
                          download={c.download}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] border transition-all duration-200"
                          style={{ color: c.accent, borderColor: `${c.accent}35`, background: `${c.accent}08` }}
                        >
                          <Download className="h-2.5 w-2.5" /> Save
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="min-h-screen flex flex-col justify-center py-24">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">Get in touch</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Let's build something.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-lg text-neutral-300 mb-8 max-w-lg">
                  Looking for an AI Engineer or Full-Stack Developer role. Open to freelance and
                  collaboration on LLM-powered products.
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { href: "mailto:mitrayanmallick1142002@gmail.com", icon: Mail, label: "mitrayanmallick1142002@gmail.com" },
                  { href: "tel:+917980423657", icon: Phone, label: "+91 79804 23657" },
                  { href: "https://github.com/MaximuxR93", icon: Github, label: "github.com/MaximuxR93", external: true },
                  { href: "https://linkedin.com/in/mitrayan-mallick", icon: Linkedin, label: "linkedin.com/in/mitrayan-mallick", external: true },
                ].map((c, i) => (
                  <Reveal key={c.label} delay={i * 0.07}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noreferrer" : undefined}
                      className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-4 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-3 group"
                    >
                      <c.icon className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{c.label}</span>
                    </a>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3}>
                <p className="mt-16 text-xs text-neutral-500">
                  © 2026 Mitrayan Mallick. Built with React, TanStack Router & Spline.
                </p>
              </Reveal>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
