import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Scale,
  FileSignature,
  Gavel,
  Handshake,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

const lastUpdated = "October 1, 2025";

const keyHighlights = [
  {
    icon: Handshake,
    title: "Collaborative delivery",
    description: "Clearly documented milestones, checkpoints, and acceptance criteria for every engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Secure handling",
    description: "Confidential assets stay protected under NDA terms and infrastructure hardening.",
  },
  {
    icon: Scale,
    title: "Transparent terms",
    description: "No hidden fees—every proposal links back to the provisions published here.",
  },
];

const termsSections = [
  {
    id: "scope-of-services",
    title: "Scope of Services",
    summary:
      "Our team designs, develops, and supports algorithm visualisations, education tooling, and immersive interfaces as described in your statement of work (SOW).",
    bullets: [
      "Deliverables are detailed in the SOW, including any third-party integrations or data sources.",
      "Any additional features or change requests are scoped collaboratively and may impact timeline or cost.",
      "We operate in agile sprints with documented progress checkpoints for transparency.",
      "Dependencies you manage (content, approvals, credentials) must be supplied within agreed timelines.",
    ],
  },
  {
    id: "project-timelines",
    title: "Project Timelines & Collaboration",
    summary:
      "A healthy cadence keeps projects on track. These provisions align expectations around scheduling and communication.",
    bullets: [
      "Kick-off occurs within five business days of signature unless otherwise agreed.",
      "Review cycles include structured feedback windows; delays may shift downstream milestones proportionally.",
      "We provide workspace access for progress demos, issue tracking, and asset hand-offs.",
      "Day-to-day questions are routed through the in-app support workspace available once you log in.",
      "Both parties assign a primary contact responsible for fast decision making.",
    ],
  },
  {
    id: "payments-and-billing",
    title: "Payments & Billing",
    summary:
      "Our pricing is milestone-based to reflect measurable forward progress and shared accountability.",
    bullets: [
      "Invoices are issued via Razorpay with digital payment confirmations for your records.",
      "Standard terms: 40% mobilisation, 40% mid-project, 20% on final acceptance unless negotiated differently.",
      "Late payments beyond seven days accrue a 2% monthly service charge on outstanding balances.",
      "Taxes, duties, and currency conversion fees are borne by the client unless stated otherwise in the SOW.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property & Licensing",
    summary:
      "We strive for clarity on ownership so you can launch confidently while respecting our core tooling.",
    bullets: [
      "Final rendered assets and code specifically created for your project transfer upon full payment.",
      "Pre-existing libraries, design systems, and internal frameworks remain our property but are licensed for project use.",
      "If you require exclusive rights or source transfer, we can scope a tailored licensing addendum.",
      "Attribution requirements or portfolio showcases are agreed in writing prior to publication.",
    ],
  },
  {
    id: "revisions-acceptance",
    title: "Revisions & Acceptance",
    summary:
      "Quality matters. Here’s how we keep iteration cycles purposeful and aligned with your goals.",
    bullets: [
      "Each milestone includes up to two structured revision rounds focusing on defined objectives.",
      "Acceptance is deemed complete when approved in writing or when project assets are deployed in production.",
      "Additional rounds or major scope pivots are billed separately at the rate stated in your SOW.",
      "Post-acceptance maintenance can be arranged via monthly retainers or support blocks.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality & Data Protection",
    summary:
      "We take confidentiality seriously and mirror the commitments outlined in our privacy policy.",
    bullets: [
      "All proprietary data, credentials, and strategies shared with us remain confidential.",
      "Team members sign binding NDAs and access is restricted on a least-privilege basis.",
      "We use encrypted channels and secure storage for project materials.",
      "Either party may disclose information if required by law after providing prompt notice when permissible.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    summary:
      "Sometimes priorities shift. These terms outline the exit process in a fair and orderly manner.",
    bullets: [
      "Either party may terminate with 14 days’ written notice if the other materially breaches these terms.",
      "Upon termination, all work completed to date is invoiced and payable within seven days.",
      "We deliver in-progress assets proportionate to payments received.",
      "Clauses on confidentiality, IP, and limitation of liability survive termination.",
    ],
  },
  {
    id: "warranties-liability",
    title: "Warranties & Limitation of Liability",
    summary:
      "We’re committed to professional-grade work while keeping risk balanced for both sides.",
    bullets: [
      "We warrant that deliverables meet agreed specifications and are free from intentional infringement.",
      "Your usage of assets must comply with applicable laws, third-party terms, and licensing agreements.",
      "Our aggregate liability for any claim is capped at the fees paid in the preceding six months.",
      "We’re not liable for consequential damages, lost profits, or indirect losses.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Dispute Resolution",
    summary:
      "A straightforward legal framework keeps things clear. We favour dialogue before escalation.",
    bullets: [
      "These terms are governed by the laws of the Republic of India.",
  "We’ll first attempt to resolve disputes through good-faith negotiation within 30 days.",
  "If unresolved, disputes are subject to the exclusive jurisdiction of the competent courts in India.",
      "All notices and legal correspondence must be sent to contact@algovisuals.org with the subject ‘Legal Notice’.",
    ],
  },
];

const Terms = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <main className="pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 px-8 py-12 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)_/_0.25),transparent_60%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/90">Terms & Governance</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Terms & Conditions</h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                The contractual framework that keeps our collaborations focused, secure, and outcome-driven. Review the
                essentials any time before signing on.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2">
                  <FileSignature className="h-4 w-4 text-primary" />
                  <span>Document version 3.1</span>
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2">
                  <TimerReset className="h-4 w-4 text-primary" />
                  <span>Last updated {lastUpdated}</span>
                </span>
                <a
                  href="mailto:contact@algovisuals.org?subject=Terms%20and%20Conditions%20Clarification"
                  className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 transition hover:border-primary/60 hover:text-primary"
                >
                  <Gavel className="h-4 w-4 text-primary" />
                  <span>Request a custom addendum</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/request"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Review sample agreement
                </Link>
                <a
                  href="/assets/terms-template.pdf"
                  className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                >
                  Download PDF
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {keyHighlights.map(({ icon: Icon, title, description }) => (
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
                  {termsSections.map((section) => (
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
                <h3 className="text-base font-semibold">Need clarifications?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our legal desk is available to tailor clauses for enterprise procurement or compliance reviews.
                </p>
                <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>
                      Email <span className="font-medium text-primary">contact@algovisuals.org</span> with subject “Terms – RFP” for
                      procurement workflows.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>Schedule a 30-minute legal sync to align on security and data governance requirements.</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <section className="space-y-12 rounded-3xl border border-border/60 bg-card/60 p-6 sm:p-10">
            {termsSections.map((section) => (
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
              <h3 className="text-lg font-semibold text-foreground">Staying aligned</h3>
              <p className="mt-3">
                We revisit these terms quarterly to reflect new service models, regulatory shifts, and customer feedback. Any
                significant changes will be communicated proactively, and your continued use of our services signifies acceptance.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms;
