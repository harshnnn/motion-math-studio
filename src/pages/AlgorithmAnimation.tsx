import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Layers,
  Lightbulb,
  MonitorPlay,
  Palette,
  PlayCircle,
  Rocket,
  ScrollText,
  Sparkles,
  Timer,
  Workflow,
} from "lucide-react";

const heroHighlights = [
  { label: "Average engagement uplift", value: "3.2×" },
  { label: "Delivery window", value: "5–12 days" },
  { label: "Rounds of refinement", value: "2–3 inclusive" },
];

const specialisms = [
  {
    icon: PlayCircle,
    title: "Foundational walkthroughs",
    description:
      "Step-by-step visuals for graph search, dynamic programming, greedy heuristics, sorting, and tree traversals that make classroom concepts click.",
  },
  {
    icon: Lightbulb,
    title: "Advanced research explainers",
    description:
      "Transform dense papers on ML optimization, probabilistic models, or distributed systems into clarity-first storyboards for conferences or journals.",
  },
  {
    icon: MonitorPlay,
    title: "Product & data storytelling",
    description:
      "Cinematic sequences that present product logic, analytics workflows, or developer tooling for launch videos and enterprise pitches.",
  },
];

const productionPackages = [
  {
    label: "Creator-ready",
    duration: "3–5 days",
    summary: "Short-form loops tailored for YouTube, TikTok, or microlearning clips.",
    inclusions: ["1 animated sequence up to 30s", "Caption-safe compositions", "Royalty-free audio bed"],
  },
  {
    label: "Course module",
    duration: "7–10 days",
    summary: "Cohesive multi-scene narratives for bootcamps, universities, and cohorts.",
    inclusions: ["3–5 scenes linked by transitions", "Branded intro/outro plates", "Instructor-friendly annotations"],
  },
  {
    label: "Thought leadership",
    duration: "10–14 days",
    summary: "High polish explainers for keynote stages, R&D announcements, or investor decks.",
    inclusions: ["Storyboard + motion styleframes", "Multi-language caption templates", "Layered export package"],
  },
];

const processSteps = [
  {
    title: "Discovery & brief calibration",
    blurb: "Align on learning outcomes, target audience, and reference material so every frame has intent.",
    detail: "1 × 45 min workshop · structured questionnaire follow-up",
  },
  {
    title: "Narrative scripting & storyboard",
    blurb: "We blueprint the sequence, spotlighting every state transition, data flow, and visual metaphor.",
    detail: "Script v1 in 2 business days · illustrated storyboard approval",
  },
  {
    title: "Motion build & technical checks",
    blurb: "Motion passes in After Effects / WebGL / SVG bring your algorithm to life—complete with pacing tests.",
    detail: "HD draft for review · annotated change log",
  },
  {
    title: "Sound, captions & delivery",
    blurb: "Final polish with audio, labels, accessibility captions, and export variants ready to publish.",
    detail: "MP4 + source files + implementation notes",
  },
];

const deliverables = [
  "1080p (or custom resolution) master renders in MP4/WebM",
  "Loop-optimized snippets for socials and ads",
  "Layered design files (AE, Figma, or SVG) for future reuse",
  "Accessible captions + alt-text copy blocks",
  "Playback guidelines covering narration timing and chapter markers",
];

const useCases = [
  {
    icon: Layers,
    title: "University lectures",
    description: "Curriculum-aligned visuals that keep cohorts engaged across semesters.",
  },
  {
    icon: Palette,
    title: "Product onboarding",
    description: "Show new users the algorithmic magic powering your platform in under a minute.",
  },
  {
    icon: BarChart3,
    title: "Investor storytelling",
    description: "Translate complex models into persuasive narratives for funding rounds.",
  },
  {
    icon: BookOpen,
    title: "Research dissemination",
    description: "Pair with arXiv releases, journal submissions, or conference demos for broader reach.",
  },
];

const faqs = [
  {
    question: "How technical can the animation go?",
    answer:
      "We regularly animate pseudocode, data structures, mathematical proofs, and even frame-by-frame gradient descent. Provide references and we'll calibrate the fidelity level.",
  },
  {
    question: "Can you match an existing brand or course style?",
    answer:
      "Absolutely—share guidelines, HEX palettes, typography, or prior modules. We build styleframes and iterate until your team signs off.",
  },
  {
    question: "Do you support voiceover or narration?",
    answer:
      "Yes. Supply a script or we can co-write one. We can deliver with timing markers, AI-assisted voiceovers, or coordinate with your talent.",
  },
  {
    question: "Is there a maintenance option for ongoing series?",
    answer:
      "Use the contract pathway to secure recurring drops, reserved production slots, and bulk pricing for multi-episode seasons.",
  },
];

export default function AlgorithmAnimationPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1 pt-28 pb-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 px-8 py-12 shadow-sm">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)_/_0.25),transparent_60%)]" />
            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs uppercase tracking-[0.35em] text-primary">
                  Algorithm animation studio
                </Badge>
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                  Turn complex algorithms into cinematic, teachable motion
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  We partner with educators, founders, and researchers to craft motion narratives that decode algorithms, data
                  pipelines, and proof ideas. Every frame is engineered for clarity, retention, and brand credibility.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/estimate"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Get an instant estimate
                  </Link>
                  <Link
                    to="/request"
                    className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                  >
                    Submit a project brief
                  </Link>
                  <Link
                    to="/contract?plan=research"
                    className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                  >
                    Reserve a retainer slot
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {heroHighlights.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-border/60 bg-background/80 px-5 py-4 shadow-sm backdrop-blur"
                    >
                      <p className="text-2xl font-semibold text-foreground">{value}</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-8 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-90" />
                <div className="relative space-y-6">
                  <h2 className="text-2xl font-semibold">What we animate</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose the depth—from whiteboard style breakdowns to fully art-directed explainers with storytelling moments.
                    Every engagement includes storyboard approvals before motion build.
                  </p>
                  <div className="space-y-5">
                    {specialisms.map(({ icon: Icon, title, description }) => (
                      <div key={title} className="flex gap-4 rounded-2xl border border-border/50 bg-muted/30 p-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">{title}</p>
                          <p className="text-xs text-muted-foreground">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="mt-16 space-y-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold">Production packages</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Select a starting point. We can customise duration, voiceover, or accessibility needs for enterprise or academic
                  delivery.
                </p>
              </div>
              <Badge className="rounded-full bg-primary/10 px-4 py-2 text-primary">Guidance from project leads</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {productionPackages.map(({ label, duration, summary, inclusions }) => (
                <article
                  key={label}
                  className="group flex h-full flex-col rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                    <span>{label}</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
                      <Timer className="h-3.5 w-3.5" />
                      {duration}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{summary}</h3>
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    {inclusions.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/request"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border/60 px-5 py-2 text-xs font-semibold transition group-hover:border-primary/70 group-hover:text-primary"
                  >
                    Start with this format
                    <Rocket className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="space-y-8 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-sm">
              <div className="space-y-3">
                <h2 className="text-3xl font-semibold">Our production workflow</h2>
                <p className="text-sm text-muted-foreground">
                  Transparent milestones keep your stakeholders aligned. Expect weekly updates and dedicated threads per
                  workstream.
                </p>
              </div>
              <div className="space-y-6">
                {processSteps.map(({ title, blurb, detail }, index) => (
                  <div key={title} className="relative grid gap-2 rounded-3xl border border-border/50 bg-muted/20 p-6">
                    <span className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <Workflow className="h-5 w-5 text-primary" />
                      <h3 className="text-base font-semibold">{title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{blurb}</p>
                    <p className="text-xs uppercase tracking-wide text-primary/80">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-sm">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Deliverables included</h2>
                <p className="text-sm text-muted-foreground">
                  Built for reuse across courses, product launches, and social channels.
                </p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-border/50 bg-background/90 p-6">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <ScrollText className="mt-1 h-5 w-5 text-primary" />
                  <p>
                    Need LMS-specific packaging (SCORM, H5P, Rise)? Mention it in the brief and we will include the proper export
                    workflow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-semibold">Where these animations perform best</h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    Leverage motion to amplify your core goals—whether that is scaling a bootcamp, onboarding engineers faster, or
                    shipping a compelling pitch deck.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {useCases.map(({ icon: Icon, title, description }) => (
                    <div
                      key={title}
                      className="flex h-full flex-col gap-3 rounded-3xl border border-border/60 bg-muted/20 p-6 backdrop-blur"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/dashboard"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 px-5 py-2 text-xs font-semibold transition hover:border-primary/60 hover:text-primary"
                >
                  View sample pipelines
                  <Layers className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-6 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-sm">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold">Frequently asked</h2>
                  <p className="text-sm text-muted-foreground">
                    A quick primer. Reach out for a tailored deck or agency agreement details.
                  </p>
                </div>
                <div className="space-y-5 text-sm text-muted-foreground">
                  {faqs.map(({ question, answer }) => (
                    <div key={question} className="rounded-2xl border border-border/40 bg-background/90 p-5">
                      <p className="font-medium text-foreground">{question}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-3xl border border-border/60 bg-primary/10 px-8 py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
              <div className="space-y-4">
                <Badge className="rounded-full bg-primary px-4 py-1 text-primary-foreground">Next steps</Badge>
                <h2 className="text-3xl font-semibold text-primary">
                  Ready to transform your algorithm into a signature visual experience?
                </h2>
                <p className="max-w-xl text-sm text-primary/90">
                  We only take on a select number of algorithm animation projects each cycle to maintain craftsmanship. Share your
                  timeline and we will confirm availability within 24 hours.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/request"
                  className="inline-flex flex-1 min-w-[220px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Book a discovery call
                </Link>
                <Link
                  to="/estimate"
                  className="inline-flex flex-1 min-w-[220px] items-center justify-center rounded-full border border-primary/60 bg-background px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:text-primary"
                >
                  Generate a scoped quote
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
