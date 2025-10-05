import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  CloudDownload,
  Clock3,
  Globe2,
  Layers,
  Mail,
  MapPinned,
  PhoneCall,
  ServerCog,
  Truck,
} from "lucide-react";

const lastUpdated = "October 1, 2025";

const deliveryHighlights = [
  {
    icon: CloudDownload,
    title: "Digital-first delivery",
    description: "Secure download portals and versioned file handoffs for every milestone.",
  },
  {
    icon: ServerCog,
    title: "Infrastructure ready",
    description: "Deploy directly to Supabase, Vercel, or your internal stack with our guidance.",
  },
  {
    icon: BadgeCheck,
    title: "Quality checkpoints",
    description: "Each shipment includes QA reports, release notes, and verification recordings.",
  },
];

const shippingSections = [
  {
    id: "delivery-model",
    title: "Delivery Model",
    summary:
      "Motion Math Studio ships digital experiences, not boxes. We orchestrate staged releases to keep stakeholders aligned and deployments safe.",
    bullets: [
      "Primary delivery is via secure download links and encrypted cloud folders.",
      "Production builds can be deployed directly to your infrastructure with temporary access credentials.",
      "Live collaboration reviews happen inside our project workspace with timestamped commentary.",
      "We archive final assets in redundant storage for 180 days after project completion.",
    ],
  },
  {
    id: "timelines",
    title: "Timelines & Turnarounds",
    summary:
      "Clear expectations help you plan launches confidently. Turnarounds reflect project complexity and review cadence.",
    bullets: [
      "Discovery / alignment packs deliver within 5 business days of kick-off.",
      "Standard production sprints run 3–4 weeks per major milestone, inclusive of one review cycle.",
      "Priority or rush tracks compress to 1–2 weeks with dedicated night and weekend coverage.",
      "Large-scale platform rollouts include phased release plans agreed during the SOW stage.",
    ],
  },
  {
    id: "handoff",
    title: "Handoff Formats",
    summary:
      "Deliverables arrive in practical, developer-friendly formats so your team can move fast immediately after sign-off.",
    bullets: [
      "Source files packaged in organized folders with clear naming conventions.",
      "Rendered exports provided in requested resolutions and codecs with preview thumbnails.",
      "Documentation bundles covering integration notes, component APIs, and animation specs.",
      "Optional recorded walkthroughs to brief downstream teams on implementation details.",
    ],
  },
  {
    id: "global-collaboration",
    title: "Global Collaboration",
    summary:
      "We serve teams worldwide. Our logistics practices adapt to different time zones and security policies.",
    bullets: [
      "All delivery channels support MFA and adhere to your compliance requirements.",
      "We schedule drop windows that align with your region’s working hours for easy access.",
      "Content mirrors hosted on EU, US, or APAC regions based on your data residency preferences.",
      "On-premise couriered hardware is optional for sensitive VR/AR assets—arranged via trusted partners.",
    ],
  },
  {
    id: "support",
    title: "Post-delivery Support",
    summary:
      "Every shipment comes with a service window so you can validate integrations and request final tweaks.",
    bullets: [
      "Implementation support available for 14 days after each milestone delivery.",
      "Bug fixes on delivered scope are prioritized within one business day.",
      "Enhancement requests flow into the next sprint or support retainer.",
      "Dedicated success managers coordinate go-live schedules and feedback loops.",
    ],
  },
];

const contactChannels = [
  {
    icon: Mail,
    label: "Delivery Desk",
    value: "contact@algovisuals.org",
    description: "Request shipment links, timeline updates, or deployment access.",
  },
  {
    icon: PhoneCall,
    label: "Logistics Hotline",
    value: "+91-8252582431",
    description: "Ideal for urgent release coordination or high-priority escalations.",
  },
  {
    icon: MapPinned,
    label: "Studio Ops",
    value: "Algovisuals100@gmail.com",
    description: "Arrange on-site sessions, hardware couriers, or compliance reviews.",
  },
];

const Shipping = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <main className="pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 px-8 py-12 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.primary/25),transparent_60%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/90">Delivery excellence</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Shipping & Delivery</h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                The roadmap for how Motion Math Studio packages, reviews, and releases your projects—from first preview to
                production deployment.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Policy version 2.2</span>
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <span>Last updated {lastUpdated}</span>
                </span>
                <a
                  href="mailto:contact@algovisuals.org?subject=Shipping%20Policy%20Clarification"
                  className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 transition hover:border-primary/60 hover:text-primary"
                >
                  <Globe2 className="h-4 w-4 text-primary" />
                  <span>Request regional guidance</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/request"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Plan my delivery schedule
                </Link>
                <a
                  href="mailto:contact@algovisuals.org"
                  className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                >
                  Email delivery desk
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {deliveryHighlights.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 px-6 py-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex items-start gap-4">
                    <span className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1">
                      <h2 className="text-base font-semibold">{title}</h2>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="order-last lg:order-first">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-3xl border border-border/60 bg-muted/20 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick navigation</h2>
                <nav className="mt-5 space-y-2 text-sm">
                  {shippingSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-2xl border border-transparent px-4 py-3 font-medium text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm">
                <h3 className="text-base font-semibold">Need a delivery update?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our logistics coordinators keep all stakeholders aligned across milestones, time zones, and release windows.
                </p>
                <ul className="mt-5 space-y-4">
                  {contactChannels.map(({ icon: Icon, label, value, description }) => (
                    <li key={label} className="flex gap-3">
                      <span className="mt-1 rounded-xl bg-primary/10 p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{label}</p>
                        <p className="text-sm text-primary">{value}</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <section className="space-y-12 rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-10">
            {shippingSections.map((section) => (
              <article key={section.id} id={section.id} className="scroll-mt-28 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                  {section.title}
                </div>
                <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{section.title}</h2>
                <p className="text-base text-muted-foreground">{section.summary}</p>
                <ul className="grid gap-3 text-sm text-foreground/90 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative rounded-2xl border border-border/50 bg-background/70 px-4 py-3 pl-10 text-sm leading-relaxed"
                    >
                      <span className="absolute left-4 top-[1.15rem] h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-sm text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">Keeping releases on schedule</h3>
              <p className="mt-3">
                Ahead of every ship window, we circulate a readiness checklist covering approvals, staging credentials, and
                fallback plans. If external dependencies slow things down, we flag it early and help you re-sequence tasks so go-live
                momentum stays intact.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Shipping;
