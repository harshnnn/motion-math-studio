import Navigation from "@/components/Navigation";

const Shipping = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-4">Shipping & Delivery</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: 2025-09-30</p>

      <section className="space-y-4 text-foreground/90">
        <p>
          We deliver digital animations via secure download links or your preferred platform.
          Typical delivery timelines are defined per project scope. No physical shipping is involved.
        </p>
        <h2 className="text-xl font-semibold">Turnaround</h2>
        <p>Standard: 3–4 weeks. Rush: 1–2 weeks (additional fees may apply).</p>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>Email: Algovisuals100@gmail.com</p>
      </section>
    </main>
  </div>
);

export default Shipping;
