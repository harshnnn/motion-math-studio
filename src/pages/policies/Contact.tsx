import Navigation from "@/components/Navigation";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-4">Contact Us</h1>
      <section className="space-y-4 text-foreground/90">
        <p>Email: Algovisuals100@gmail.com</p>
        <p>Phone: +91-8252582431</p>
        <p>
          Address: AlgoVisuals, New Ramnagar, Arrah, Bihar, 802301, India
        </p>
        <p>Support hours: Mon–Fri, 10:00–18:00 IST</p>
      </section>
    </main>
  </div>
);

export default Contact;
