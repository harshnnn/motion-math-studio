import Navigation from "@/components/Navigation";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-4">Terms and Conditions</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: 2025-09-30</p>

      <section className="space-y-4 text-foreground/90">
        <p>
          Welcome to Algovisuals. These Terms govern your use of our website and animation services.
          By accessing or using our services, you agree to these Terms.
        </p>
        <h2 className="text-xl font-semibold">Services</h2>
        <p>
          We provide mathematical animation and visualization services as described on our website or proposals.
        </p>
        <h2 className="text-xl font-semibold">Payments</h2>
        <p>
          Payments are processed via Razorpay. Fees, taxes, and payment schedules will be stated in your invoice or agreement.
        </p>
        <h2 className="text-xl font-semibold">Intellectual Property</h2>
        <p>
          Unless otherwise agreed, final deliverables are licensed for your stated use. Source files remain our property.
        </p>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>
          Email: Algovisuals100@gmail.com
        </p>
      </section>
    </main>
  </div>
);

export default Terms;
