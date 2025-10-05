import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  HandPlatter,
  Lightbulb,
  Mail,
  PhoneCall,
  ShieldAlert,
  Timer,
} from "lucide-react";

const lastUpdated = "October 1, 2025";

const highlightCards = [
  {
    icon: CreditCard,
    title: "Transparent refunds",
    description: "Automated Razorpay workflows with status updates at every stage.",
  },
  {
    icon: Timer,
    title: "Rapid processing",
    description: "Eligible credits are issued within 7–10 business days after approval.",
  },
  {
    icon: ShieldAlert,
    title: "Client-first review",
    description: "Escalations are handled by senior producers to keep outcomes fair and timely.",
  },
];

const refundSections = [
  {
    id: "cancellation-window",
    title: "Cancellation Window",
    summary:
      "We recognise that priorities can shift. These guidelines map the window during which you can pause or cancel a project without penalties.",
    bullets: [
      "Full refund available when cancellation happens before discovery or production work begins.",
      "Between discovery and first milestone delivery, charges are prorated to hours and assets already produced.",
      "Post-first milestone acceptance, remaining invoices stand, but we’ll credit unused support retainers.",
      "Cancellations must be submitted in writing to contact@algovisuals.org for tracking and verification.",
    ],
  },
  {
    id: "eligibility",
    title: "Refund Eligibility",
    summary:
      "Once a cancellation request is received, we audit the engagement to confirm the scope of refundable effort.",
    bullets: [
      "Milestone-based projects: any approved milestones remain payable; in-progress work is calculated proportionally.",
      "Subscription retainers: unused hours are reimbursed or rolled into future credit based on your preference.",
      "Platform integrations or licenses purchased on your behalf are non-refundable but transfer to you where possible.",
      "We document every assessment with time logs and deliverable snapshots for full transparency.",
    ],
  },
  {
    id: "process",
    title: "Refund Process",
    summary:
      "Our finance desk partners with Razorpay to ensure funds route back to the original payment source quickly.",
    bullets: [
      "Acknowledgement email confirming your ticket ID within one business day.",
      "Finance review and approval within three business days—expect clarifying questions if data is missing.",
      "Razorpay initiates the refund to your payment method; timelines vary by bank or card issuer.",
      "A final settlement statement is shared for your records once the transaction is complete.",
    ],
  },
  {
    id: "non-refundable",
    title: "Non-refundable Items",
    summary:
      "Certain costs are locked once committed. We only pass these through when they’re already deployed for your project.",
    bullets: [
      "Third-party licenses, stock assets, or plug-ins procured specifically for your experience.",
      "Completed research, strategy audits, or creative explorations that were delivered prior to cancellation.",
      "Rush fees for accelerated timelines once our team has allocated overnight or weekend slots.",
      "International transfer charges applied by your bank or payment gateway.",
    ],
  },
  {
    id: "credits-support",
    title: "Project Credits & Support",
    summary:
      "We want every engagement to end on a constructive note. Credits help you resume when timing is right.",
    bullets: [
      "If you choose, we can convert refundable balances into studio credits valid for 12 months.",
      "Credits can be applied to new sprints, maintenance retainers, or training workshops.",
      "Complimentary handover documentation is provided so your internal teams can continue momentum.",
      "We keep assets archived for 180 days after cancellation in case you decide to restart.",
    ],
  },
];

const contactChannels = [
  {
    icon: Mail,
    label: "Refund Desk",
    value: "contact@algovisuals.org",
    description: "Best for formal cancellation requests or refund-status enquiries.",
  },
  {
    icon: PhoneCall,
    label: "Priority Line",
    value: "+91-8252582431",
    description: "Call when you need immediate assistance with time-sensitive deliverables.",
  },
  {
    icon: HandPlatter,
    label: "Client Success",
    value: "Algovisuals100@gmail.com",
    description: "Discuss alternate solutions, timeline adjustments, or applying studio credits.",
  },
];

const Refunds = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <main className="pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 px-8 py-12 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)_/_0.25),transparent_60%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/90">Client assurance</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Cancellation & Refunds</h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                A streamlined process that keeps engagements fair, transparent, and actionable. Review our policy before you
                commit or whenever plans shift.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2">
                  <ClipboardList className="h-4 w-4 text-primary" />
                  <span>Policy version 1.6</span>
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>Last updated {lastUpdated}</span>
                </span>
                <a
                  href="mailto:contact@algovisuals.org?subject=Refund%20Policy%20Clarification"
                  className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 transition hover:border-primary/60 hover:text-primary"
                >
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span>Request a policy consult</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/request"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Submit cancellation request
                </Link>
                <a
                  href="mailto:contact@algovisuals.org"
                  className="inline-flex items-center justify-center rounded-full border border-border/70 px-6 py-3 text-sm font-semibold transition hover:border-primary/60 hover:text-primary"
                >
                  Email finance team
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {highlightCards.map(({ icon: Icon, title, description }) => (
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
                  {refundSections.map((section) => (
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
                <h3 className="text-base font-semibold">Need a human update?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our finance and client-success teams stay available during business hours for real-time status checks.
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
            {refundSections.map((section) => (
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
              <h3 className="text-lg font-semibold text-foreground">Keeping you informed</h3>
              <p className="mt-3">
                Every refund request is paired with a dedicated point of contact who shares milestone updates until the funds
                arrive. You’ll always know what the next step is, and we’ll proactively notify you about any delays caused by
                payment gateways or banking partners.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Refunds;
