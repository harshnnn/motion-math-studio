import Navigation from "@/components/Navigation";

const Refunds = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-4">Cancellation & Refunds</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: 2025-09-30</p>

      <section className="space-y-4 text-foreground/90">
        <h2 className="text-xl font-semibold">Cancellations</h2>
        <p>
          You may cancel before production begins for a full refund. Once work has started, refunds are prorated
          based on effort completed.
        </p>
        <h2 className="text-xl font-semibold">Refunds</h2>
        <p>
          Eligible refunds are processed within 7-10 business days to the original payment method via Razorpay.
        </p>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>Email: Algovusials100@gamil.com</p>
      </section>
    </main>
  </div>
);

export default Refunds;
