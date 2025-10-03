import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function AlgorithmAnimationPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">
        <section className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Algorithm Animation Services
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-3xl">
              Custom animated explanations for classic and advanced algorithms:
              graph search (Dijkstra, A*), dynamic programming, sorting, trees,
              greedy strategies, machine learning optimization steps, and more.
              Designed for educational videos, lectures, channels, courses and
              research outreach.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border/50 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2 text-foreground">
                  Why Algorithm Animation?
                </h2>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Improves retention & conceptual understanding.</li>
                  <li>Reveals hidden states & transitions step‑by‑step.</li>
                  <li>Great for YouTube, MOOCs, conference demos.</li>
                  <li>Reduces instructor explanation time.</li>
                </ul>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2 text-foreground">
                  What You Provide
                </h2>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Algorithm name & short objective.</li>
                  <li>Desired input examples (if any).</li>
                  <li>Preferred pacing or color scheme.</li>
                  <li>Optional narration script or bullet outline.</li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Typical Deliverables
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                <li>MP4/WebM animation (1080p or as requested).</li>
                <li>Clean vector assets for reuse in slides.</li>
                <li>Optional scene breakdown / storyboard PDF.</li>
                <li>Revision cycle (per plan / quote).</li>
              </ul>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/estimate"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
              >
                Get an Instant Estimate
              </Link>
              <Link
                to="/request"
                className="px-6 py-3 rounded-md border border-border/50 text-sm font-medium hover:bg-muted/40"
              >
                Submit a Project Request
              </Link>
              <Link
                to="/contract?plan=research"
                className="px-6 py-3 rounded-md border border-border/50 text-sm font-medium hover:bg-muted/40"
              >
                Start Ongoing Contract
              </Link>
            </div>

            <div className="mt-14 border-t border-border/40 pt-8">
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                FAQ
              </h2>
              <div className="space-y-5 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">
                    How long does a typical algorithm animation take?
                  </p>
                  <p>Simple (15–25s) pieces: 3–5 days. Multi‑scene or narrated flows: 1–2 weeks.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Can you align with my branding?
                  </p>
                  <p>Yes—colors, typography accents, pacing and framing can match your channel or institution guidelines.</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
