import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BadgeCheck, Database, Globe2, LockKeyhole, Mail, ShieldCheck, UserCheck } from "lucide-react";

const lastUpdated = "October 1, 2025";

const highlights = [
  {
    icon: ShieldCheck,
    title: "No resale of data",
    description: "We never sell, rent, or trade your personal information with third parties.",
  },
  {
    icon: LockKeyhole,
    title: "Secure by design",
    description: "All project data lives on encrypted infrastructure with role-based access.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent processes",
    description: "Clear retention timelines and easy access to updates on your requests.",
  },
];

const privacySections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    summary:
      "We only capture the details required to deliver accurate proposals, provide support, and comply with legal obligations.",
    bullets: [
      "Identity details such as your name, job title, and company.",
      "Contact details including email, phone number, and preferred messaging channel.",
      "Project context like scope, timelines, assets shared, and integration requirements.",
      "Support records, including messages exchanged, feedback, and meeting notes.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    summary:
      "Every piece of information has a purpose. We strictly limit processing to the following legitimate uses.",
    bullets: [
      "Responding to enquiries, preparing proposals, and managing project onboarding.",
      "Coordinating delivery milestones, payment schedules, and progress notifications.",
      "Providing technical support, troubleshooting, and feature updates.",
      "Meeting contractual, accounting, and regulatory obligations that apply to our business.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Processors",
    summary:
      "Limited sharing happens only with vetted partners who help us run core business operations.",
    bullets: [
      "Payment processing with Razorpay to accept and reconcile project invoices.",
      "Secure hosting and storage through Supabase and Vercel to deliver our digital experiences.",
      "Collaboration tools that assist our project teams under strict confidentiality clauses.",
      "Legal or compliance disclosures when required by applicable law or court order.",
    ],
  },
  {
    id: "data-retention",
    title: "Retention & Security",
    summary:
      "We combine modern infrastructure with disciplined operational practices to keep your data protected.",
    bullets: [
      "Access is restricted to team members who need the information to fulfill their role.",
      "Data is encrypted in transit and at rest, with periodic security reviews and patching.",
      "Project assets are retained for active engagements and removed within 180 days of closure unless you request earlier deletion.",
      "We maintain incident response plans to quickly address and communicate any security concerns.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Transfers",
    summary:
      "Our collaborators may operate across jurisdictions. Wherever your data travels, we protect it with contractual safeguards.",
    bullets: [
      "We partner only with providers that meet industry-standard compliance certifications.",
      "Data transfers outside your region apply standard contractual clauses or equivalent protections.",
      "You can request more detail on vendors or transfer mechanisms at any time.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    summary:
      "You stay in full control. Reach out to exercise any of the rights below and we will respond within five business days.",
    bullets: [
      "Access: request a copy of the information we hold about you.",
      "Rectification: correct or update inaccurate or outdated details.",
      "Deletion: ask us to remove data we no longer need for agreed purposes.",
      "Restriction & Objection: limit certain processing activities or opt out of marketing communications.",
      "Portability: receive your data in a structured, machine-readable format when technically feasible.",
    ],
  },
];

const contactChannels = [
  {
    icon: Mail,
    label: "Direct Email",
    value: "contact@algovisuals.org",
    description: "Ideal for privacy requests, data export, or deletion enquiries.",
  },
  {
    icon: UserCheck,
    label: "Project Support",
    value: "Algovisuals100@gmail.com",
    description: "Reach out for project updates, scope clarifications, or collaboration invites.",
  },
  {
    icon: Globe2,
    label: "Business Hours",
    value: "Mon–Fri · 10:00–18:00 IST",
    description: "Expect a first response within one business day.",
  },
];

const Privacy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <main className="pt-28 pb-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/30 px-8 py-12 shadow-sm">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/20),transparent_60%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/90">Privacy Matters</p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Privacy Policy</h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Learn how AlgoVisuals collects, safeguards, and uses your information while delivering immersive
                algorithm visualisations and engineering services.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 rounded-full border border-border/70 px-4 py-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span>Document version 2.0</span>
                </span>
                <span className="flex items-center gap-2 text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Last updated {lastUpdated}</span>
                </span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {highlights.map(({ icon: Icon, title, description }) => (
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
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">On this page</h2>
                <nav className="mt-5 space-y-2 text-sm">
                  {privacySections.map((section) => (
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
                <h3 className="text-base font-semibold">Need to talk to us?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our privacy team responds promptly to all data requests and clarifications.
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
            {privacySections.map((section) => (
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
              <h3 className="text-lg font-semibold text-foreground">Updates to this policy</h3>
              <p className="mt-3">
                We review our privacy notice on a quarterly basis to reflect new features, regulatory guidance, or
                improvements to our internal controls. Significant changes will be communicated via email and highlighted on
                this page. We encourage you to revisit the policy regularly to stay informed.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Privacy;
