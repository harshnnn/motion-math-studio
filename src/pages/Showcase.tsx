import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Clock3, Film, Layers, Play, Sparkles, Star } from "lucide-react";

const showcaseItems = [
  {
    id: 1,
    title: "Quantum Walkthrough",
    category: "Research Visuals",
    duration: "01:20",
    description:
      "Step-by-step breakdown of a quantum search algorithm with animated state transitions and probability amplitudes.",
    tags: ["Quantum", "Algorithm", "Explainer"],
    accent: "from-primary/40 via-transparent to-transparent",
  },
  {
    id: 2,
    title: "Neural Network Gradient Flow",
    category: "Advanced Explainers",
    duration: "00:58",
    description:
      "Dynamic visualization of backpropagation highlighting gradient signals, weight updates, and attention overlays.",
    tags: ["Deep Learning", "Simulation", "Education"],
    accent: "from-secondary/40 via-transparent to-transparent",
  },
  {
    id: 3,
    title: "Astrophysics Report Highlights",
    category: "Research Visuals",
    duration: "01:45",
    description:
      "Cinematic summary of a dark-matter observational study with animated charts, maps, and citation callouts.",
    tags: ["Astrophysics", "Reporting", "Cinematic"],
    accent: "from-accent/40 via-transparent to-transparent",
  },
  {
    id: 4,
    title: "Computational Geometry Demo",
    category: "Product Demos",
    duration: "01:05",
    description:
      "Interactive showcase of convex hull, Voronoi, and Delaunay algorithms powering a geospatial analytics platform.",
    tags: ["Geometry", "Platform", "UI Overlay"],
    accent: "from-primary/40 via-secondary/10 to-transparent",
  },
  {
    id: 5,
    title: "Financial Risk Heatmaps",
    category: "Product Demos",
    duration: "00:52",
    description:
      "High-contrast dash-style animation illustrating Monte Carlo simulations for portfolio risk and regulatory reporting.",
    tags: ["Finance", "Simulation", "Reporting"],
    accent: "from-secondary/40 via-transparent to-transparent",
  },
  {
    id: 6,
    title: "Biochemical Pathway Storyboard",
    category: "Medical & Pharma",
    duration: "02:10",
    description:
      "Narrative-led visualization of protein signalling cascades with 3D molecular renders and clinical annotations.",
    tags: ["Medical", "Storyboard", "3D"],
    accent: "from-accent/40 via-primary/10 to-transparent",
  },
  {
    id: 7,
    title: "University Lecture Opener",
    category: "Education Series",
    duration: "00:34",
    description:
      "Branded sequence for an academic lecture series blending formula handwriting, campus footage, and typographic reveals.",
    tags: ["Branding", "Typography", "Motion"],
    accent: "from-primary/40 via-accent/20 to-transparent",
  },
  {
    id: 8,
    title: "VR Data Environment Tour",
    category: "Immersive & XR",
    duration: "01:28",
    description:
      "Immersive flythrough of a volumetric data environment designed for AR/VR collaboration workflows.",
    tags: ["XR", "Product", "Immersive"],
    accent: "from-secondary/40 via-primary/10 to-transparent",
  },
  {
    id: 9,
    title: "Climate Model Narrative",
    category: "Impact Stories",
    duration: "01:12",
    description:
      "Explainer connecting climate data simulations with policy recommendations using illustrated timelines and infographics.",
    tags: ["Climate", "Narrative", "Infographics"],
    accent: "from-accent/40 via-secondary/10 to-transparent",
  },
  {
    id: 10,
    title: "Cybersecurity Threat Matrix",
    category: "Advanced Explainers",
    duration: "00:47",
    description:
      "Fast-paced breakdown of zero-day exploits, kill chain diagrams, and mitigation workflows for enterprise teams.",
    tags: ["Security", "Dashboards", "Mitigation"],
    accent: "from-primary/40 via-secondary/20 to-transparent",
  },
];

const highlightMetrics = [
  {
    icon: Sparkles,
    label: "Signature craft",
    value: "Algorithm-first storytelling with premium motion design.",
  },
  {
    icon: Film,
    label: "Formats & delivery",
    value: "4K exports, layered project files, and localized captions on request.",
  },
  {
    icon: Layers,
    label: "Collaboration",
    value: "Storyboarding, technical review cycles, and in-app approvals.",
  },
];

const Showcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(showcaseItems.map((item) => item.category)));
    return ["All", ...unique];
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return showcaseItems;
    return showcaseItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const previous = document.title;
    document.title = "Animation Showcase | AlgoVisuals";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-24 pb-20">
        <section className="relative mx-auto w-full max-w-6xl px-6 py-14 overflow-hidden rounded-3xl border border-border/60 bg-muted/20 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)_/_0.25),transparent_60%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-xs uppercase tracking-[0.3em]">Showcase</Badge>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Motion-first storytelling for complex ideas
              </h1>
              <p className="text-lg text-muted-foreground">
                Preview the styles our studio crafts for research labs, engineering teams, and forward-thinking brands. Each
                sample highlights how we translate dense technical subjects into cinematic, easy-to-follow animations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/request">Book a discovery call</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/estimate">Request a tailored estimate</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {highlightMetrics.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/90 px-6 py-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex items-start gap-4">
                    <span className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary/80">{label}</p>
                      <p className="text-sm text-muted-foreground">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-6xl px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Curated animation samples</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Switch between categories to see how we adapt motion language and data storytelling to different technical domains.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-muted/40">
                  <AspectRatio ratio={16 / 9}>
                    <div className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${item.accent}`}>
                      <img src="/placeholder.svg" alt={`${item.title} placeholder`} className="h-16 w-16 opacity-90" />
                      <div className="absolute inset-0 bg-background/20 transition group-hover:bg-background/10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
                          <Play className="h-3.5 w-3.5" /> Preview
                        </span>
                      </div>
                    </div>
                  </AspectRatio>
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
                    <Clock3 className="h-3.5 w-3.5" />
                    {item.duration}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary/80">
                      <Star className="h-3.5 w-3.5" /> {item.category}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-primary/30 text-xs text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground/80">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-3 py-1">
                      <Layers className="h-3.5 w-3.5 text-primary" /> Layered source files included
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-3 py-1">
                      <Sparkles className="h-3.5 w-3.5 text-primary" /> Storyboard + QA review
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="secondary" size="sm" asChild>
                      <Link to={`/request?reference=${encodeURIComponent(item.title)}`}>Request similar project</Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs" asChild>
                      <Link to="/algorithm-animation">View detailed service</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-6xl px-6">
          <div className="rounded-3xl border border-primary/30 bg-primary/10 p-10 text-center shadow-lg backdrop-blur">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">Ready to co-create your next visual narrative?</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Share your research papers, product decks, or concept notes. We'll translate them into a production plan with motion tests,
              review milestones, and go-live support tailored to your audience.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/request">Start a project request</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Showcase;
