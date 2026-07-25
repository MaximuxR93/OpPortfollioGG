import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
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
        content:
          "AI-integrated web apps, RAG pipelines, and production LLM tooling — built end-to-end.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

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
    bullets: [
      "Identified 3 critical exploits on a 10,000+ user gaming platform; patches shipped in 48h.",
      "Flag 50+ high-risk accounts per month via an internal threat-detection workflow.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Independent Clients",
    period: "Jan 2023 – Present",
    bullets: [
      "NES: MERN event platform, 500+ registrations, admin CMS, deployed on Render.",
      "Dipan Herbals: full-stack marketing site with headless CMS + payment gateway.",
    ],
  },
  {
    role: "Android App Development Intern",
    company: "Webguru Infosystems",
    period: "Aug 2024 – Oct 2024",
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
  },
  {
    name: "SecondBrain",
    tag: "RAG Document Assistant",
    stack: "MERN · FastAPI · LangChain · Groq",
    desc: "End-to-end RAG pipeline with source-cited answers over uploaded PDFs, streaming chat UI, CI/CD on Vercel.",
    href: "https://the2nd-brain-28jk.vercel.app",
  },
  {
    name: "DocScanX",
    tag: "AI ATS Resume Analyser",
    stack: "Python · FastAPI · Groq · NLP",
    desc: "ATS simulation engine returning keyword-match scores, missing-skill gaps, and rewrite suggestions.",
    href: "https://doc-scan-x.vercel.app",
  },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="min-h-screen flex flex-col justify-center py-24">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/80 mb-3">{eyebrow}</p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">{title}</h2>
      <div className="text-neutral-300">{children}</div>
    </section>
  );
}

function Index() {
  // Forward window mouse movement to the Spline canvas so the bot tracks the
  // cursor even while it's hovering interactive content above the background.
  useEffect(() => {
    let raf = 0;
    const forward = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const canvas = document.querySelector("canvas");
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0) return;
        const init: MouseEventInit = {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
          cancelable: true,
          view: window,
        };
        canvas.dispatchEvent(new MouseEvent("pointermove", init));
        canvas.dispatchEvent(new MouseEvent("mousemove", init));
      });
    };
    window.addEventListener("mousemove", forward);
    return () => {
      window.removeEventListener("mousemove", forward);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Fixed 3D bot background — full viewport, cursor forwarded from window */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0">
        <div className="absolute inset-0">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={400} />
        </div>
        <div className="absolute inset-0">
          <SplineScene scene={SCENE} className="w-full h-full" />
        </div>
        {/* Left-side vignette so text stays readable over the bot */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent md:via-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Scrolling content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-20 backdrop-blur-md bg-black/30 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
            <a href="#hero" className="font-semibold tracking-tight">
              MM<span className="text-cyan-400">.</span>
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
              <a href="#about" className="hover:text-white transition">About</a>
              <a href="#skills" className="hover:text-white transition">Skills</a>
              <a href="#experience" className="hover:text-white transition">Experience</a>
              <a href="#projects" className="hover:text-white transition">Projects</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </div>
            <a
              href="mailto:mitrayanmallick1142002@gmail.com"
              className="text-sm px-4 py-2 rounded-full bg-white text-black hover:bg-cyan-300 transition"
            >
              Get in touch
            </a>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Content column — sits left half so bot is visible on right */}
          <div className="md:max-w-[52%]">
            {/* Hero */}
            <section id="hero" className="min-h-screen flex flex-col justify-center pt-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur w-fit mb-6">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-xs text-neutral-300">Available for opportunities</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
                Mitrayan
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  Mallick
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-xl">
                AI Engineer & Full-Stack Developer building LLM-powered products, RAG systems, and
                production Chrome extensions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="px-5 py-3 rounded-full bg-cyan-400 text-black text-sm font-medium hover:bg-cyan-300 transition"
                >
                  View my work
                </a>
                <a
                  href="https://github.com/MaximuxR93"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full border border-white/15 text-sm font-medium hover:bg-white/5 transition inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-neutral-400">
                <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> Kolkata, India</span>
                <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4" /> CGPA 8.79 / 10</span>
              </div>
            </section>

            <Section id="about" eyebrow="About" title="AI-integrated products, shipped end-to-end.">
              <p className="text-lg leading-relaxed">
                B.Tech in Computer Science (AI/ML) with hands-on experience building and shipping
                AI-integrated web apps and Android apps. I've designed a production Chrome extension
                with multi-LLM support and built a full-stack RAG system using LangChain + FastAPI.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Comfortable across the full SDLC — from system design and REST API development to
                frontend delivery and production deployment on Vercel and Render.
              </p>
            </Section>

            <Section id="skills" eyebrow="Toolbox" title="Skills & technologies.">
              <div className="grid gap-6">
                {Object.entries(skills).map(([group, items]) => (
                  <div
                    key={group}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-5"
                  >
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
                      {items.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-neutral-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="experience" eyebrow="Work" title="Experience.">
              <div className="space-y-5">
                {experience.map((e) => (
                  <div
                    key={e.role}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 text-cyan-400 text-sm mb-1">
                          <Briefcase className="h-4 w-4" />
                          {e.company}
                        </div>
                        <h3 className="text-xl font-semibold text-white">{e.role}</h3>
                      </div>
                      <span className="text-xs text-neutral-400 shrink-0 mt-1">{e.period}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-neutral-300">
                      {e.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-cyan-400 mt-1">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="projects" eyebrow="Selected work" title="Projects.">
              <div className="grid gap-5">
                {projects.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 hover:border-cyan-400/40 hover:bg-white/[0.06] transition"
                  >
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
                ))}
              </div>
            </Section>

            <Section id="contact" eyebrow="Get in touch" title="Let's build something.">
              <p className="text-lg text-neutral-300 mb-8 max-w-lg">
                Looking for an AI Engineer or Full-Stack Developer role. Open to freelance and
                collaboration on LLM-powered products.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="mailto:mitrayanmallick1142002@gmail.com"
                  className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-4 hover:border-cyan-400/40 transition flex items-center gap-3"
                >
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">mitrayanmallick1142002@gmail.com</span>
                </a>
                <a
                  href="tel:+917980423657"
                  className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-4 hover:border-cyan-400/40 transition flex items-center gap-3"
                >
                  <Phone className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">+91 79804 23657</span>
                </a>
                <a
                  href="https://github.com/MaximuxR93"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-4 hover:border-cyan-400/40 transition flex items-center gap-3"
                >
                  <Github className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">github.com/MaximuxR93</span>
                </a>
                <a
                  href="https://linkedin.com/in/mitrayan-mallick"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur p-4 hover:border-cyan-400/40 transition flex items-center gap-3"
                >
                  <Linkedin className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm">linkedin.com/in/mitrayan-mallick</span>
                </a>
              </div>
              <p className="mt-16 text-xs text-neutral-500">
                © 2026 Mitrayan Mallick. Built with React, TanStack Start & Spline.
              </p>
            </Section>
          </div>
        </main>
      </div>
    </div>
  );
}
