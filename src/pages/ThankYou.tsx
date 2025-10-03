import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ThankYou() {
  const [params] = useSearchParams();
  const type = params.get("type") || "default";

  const content = useMemo(() => {
    switch (type) {
      case "contract":
        return {
          title: "Thanks for your contract request!",
          desc: "We’ve received your details and will reach out within 24 hours to finalize next steps.",
          cta: { to: "/", label: "Back to Home" },
        };
      case "request":
        return {
          title: "Thanks for your project request!",
          desc: "Your request is in our queue. We’ll get back to you shortly.",
          cta: { to: "/", label: "Back to Home" },
        };
      case "estimate":
        return {
          title: "Estimate submitted!",
          desc: "We’ve logged your estimate. You can request a full quote any time.",
          cta: { to: "/estimate", label: "Get Another Estimate" },
        };
      default:
        return {
          title: "Thank you!",
          desc: "We’ve received your submission.",
          cta: { to: "/", label: "Back to Home" },
        };
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground">{content.title}</h1>
          <p className="text-muted-foreground mt-3">{content.desc}</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild variant="hero">
              <Link to={content.cta.to}>{content.cta.label}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
