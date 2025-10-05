import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  Clock3,
  Headset,
  Mail,
  MapPin,
  MessageSquareDot,
  PhoneCall,
  Sparkles,
} from "lucide-react";

const contactChannels = [
  {
    icon: Mail,
    title: "Project & Sales Enquiries",
    description: "Share briefs, request proposals, or start a new build. Expect a tailored response within one business day.",
    primary: "contact@algovisuals.org",
    notes: ["Best for: new engagements, pricing questions, partnership ideas.", "Attachments welcome – decks, specs, or wireframes."],
  },
  {
    icon: PhoneCall,
    title: "Direct Line",
    description: "Speak with our solutions team for rapid coordination across ongoing initiatives.",
    primary: "+91-8252582431",
    notes: ["Available Monday to Friday", "Ideal for time-sensitive updates or clarifications."],
  },
  {
    icon: MessageSquareDot,
    title: "Support Desk",
    description: "Log technical issues, request revisions, or escalate blockers across engineering deliverables.",
    primary: "Algovisuals100@gmail.com",
    notes: ["Guaranteed first response under 24 hours.", "Tracked via ticketing to ensure full resolution."],
  },
];

const serviceCommitments = [
  {
    icon: Headset,
    title: "Dedicated project specialists",
    description: "Each engagement is paired with a specialist who knows your roadmap and keeps workstreams aligned.",
  },
  {
    icon: CalendarClock,
    title: "Prompt scheduling",
    description: "Need a working session? We can arrange strategy calls within 48 hours across most time zones.",
  },
  {
    icon: Clock3,
    title: "Clear response windows",
    description: "Office hours run Mon–Fri · 10:00–18:00 IST, with emergency coverage for critical production issues.",
  },
];

const Contact = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <main className="pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 px-8 py-12 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.primary/25),transparent_60%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/90">Let's collaborate</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Talk to AlgoVisuals</h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Whether you're shaping a visual-first learning experience or scaling algorithm tooling, our team is ready to
                help. Tell us where you are in the journey—we'll map next steps together.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/request"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Start a project brief
                </Link>
                <a
                  href="mailto:contact@algovisuals.org"
                  className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                >
                  Email our team
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Response within 24 hours</span>
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <span>Mon–Fri · 10:00–18:00 IST</span>
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/90 p-8 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-90" />
              <div className="relative space-y-5">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary/90">How we engage</p>
                <h2 className="text-2xl font-semibold">A streamlined intake process</h2>
                <p className="text-sm text-muted-foreground">
                  Share context once, get a clear roadmap. We'll review requirements, align on deliverables, and keep you
                  updated through structured touchpoints.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Discovery call to unpack goals, audiences, and success metrics.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Written proposal outlining milestones, investments, and collaborators.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    Project workspace with shared dashboards, reviews, and rollout plans.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-14 space-y-8">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Choose your channel</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Pick the route that fits your urgency. Every request is routed through a central dashboard so nothing falls
                through the cracks.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {contactChannels.map(({ icon: Icon, title, description, primary, notes }) => (
              <article
                key={title}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <span className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <p className="text-sm font-medium text-primary">{primary}</p>
                  </div>
                </div>
                <ul className="relative mt-5 space-y-2 text-xs text-muted-foreground">
                  {notes.map((note) => (
                    <li key={note} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-8 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold sm:text-3xl">Our service commitments</h2>
              <p className="text-sm text-muted-foreground">
                Working with fast-moving teams means clarity, cadence, and responsiveness. This is how we show up for you.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {serviceCommitments.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-border/50 bg-muted/20 p-6 backdrop-blur"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Visit our studio</h2>
              <p className="text-sm text-muted-foreground">
                AlgoVisuals, New Ramnagar, Arrah, Bihar · 802301 · India. Meetings by appointment only—reach out to secure a
                slot.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-muted/20 p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary/15),transparent_70%)]" />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">Arrah Design Lab</p>
                    <p className="text-xs text-muted-foreground">Ground floor · New Ramnagar, Bihar</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/40 bg-background/90 p-4 text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground">Visiting checklist</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />Bring an official ID for guest access.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />Notify us of hardware demos so we can
                      prep the lab.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />Parking assistance available on
                      request.
                    </li>
                  </ul>
                </div>
                <a
                  href="https://maps.google.com?q=AlgoVisuals,+New+Ramnagar,+Arrah,+Bihar"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/20"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default Contact;
