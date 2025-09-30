import Navigation from "@/components/Navigation";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-4">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: 2025-09-30</p>

      <section className="space-y-4 text-foreground/90">
        <p>
          We collect basic contact details (name, email) and project information you submit. We use this to provide quotes,
          deliver services, and communicate with you. We do not sell your data.
        </p>
        <h2 className="text-xl font-semibold">Data Sharing</h2>
        <p>
          We may share data with payment processors (Razorpay) and hosting providers to operate our services.
        </p>
        <h2 className="text-xl font-semibold">Your Rights</h2>
        <p>
          You may request access, correction, or deletion of your personal data by contacting us at Algovisuals100@gmail.com.
        </p>
        <h2 className="text-xl font-semibold">Contact</h2>
        <p>Email: Algovisuals100@gmail.com</p>
      </section>
    </main>
  </div>
);

export default Privacy;
