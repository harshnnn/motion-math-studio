import { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import HeroDemo from "@/components/HeroDemo";
import FeatureCard from "@/components/FeatureCard";
import Navigation from "@/components/Navigation";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import Footer from "@/components/Footer";
import { useRegionCurrency } from '@/hooks/useRegionCurrency';
import { PRICING, getPrice } from '@/pricing/config';
import { formatCurrency } from '@/utils/currency';
import { LazySection } from "@/components/sections/LazySection";

const Index = () => {

  const { currency, isIN } = useRegionCurrency('USD');

  // SEO: set a more descriptive title
  useEffect(() => {
    const prev = document.title;
    document.title = "Math Animation for Research & Education | AlgoVisuals";
    return () => { document.title = prev; };
  }, []);

  const loadServicesSection = useCallback(
    () => import("@/components/sections/ServicesSection").then((module) => ({ default: module.ServicesSection })),
    []
  );

  const loadContactSection = useCallback(
    () => import("@/components/sections/ContactSection").then((module) => ({ default: module.ContactSection })),
    []
  );

  const loadTestimonialsFeed = useCallback(
    () => import("@/components/sections/TestimonialsFeed"),
    []
  );

  const loadQuickRequestSection = useCallback(
    () => import("@/components/sections/QuickRequestSection"),
    []
  );

  // Removed local Quick Request state and handlers to avoid rerendering the entire page on keystrokes.

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-text bg-clip-text text-transparent">
                    Custom Animations for
                  </span>
                  <br />
                  <span className="text-foreground">Innovators & Educators</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  High quality animated explanations for algorithms, math & physics equations,
                  and full research papers. Turn complex concepts into publication‑grade
                  motion that teaches & engages.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/estimate">Get an Estimate</Link>
                </Button>
                <Button variant="hero-outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/request">Submit Request</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <Link to="/showcase">See Animation Showcase</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Demo Video */}
            <div className="relative">
              <HeroDemo />
            </div>
          </div>
        </div>

      </section>

      {/* Features Section (SEO heading improved) */}
      <section className="px-6 py-20 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Scientific & Technical Animation Services: Equations, Algorithms, Research Visuals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple formula visualizations to complex research & algorithm animations,
              we bring mathematical ideas to life with precision and clarity. See our
              <Link to="/algorithm-animation" className="ml-1 text-primary hover:underline">
                Algorithm Animation Services
              </Link>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="π"
              title="Formula Animations"
              description="Clean, elegant animations of mathematical formulas and equations with smooth transitions and professional typography."
              price={`${formatCurrency(getPrice('formula', currency), currency)}+`}
              features={[
                "5-20 second animations",
                isIN ? "720p/1080p options" : "1080p HD quality",
                "1 revision included",
                "MP4 & WebM formats"
              ]}
            />

            <FeatureCard
              icon="∑"
              title="Math Objects & 3D"
              description="Interactive mathematical objects, geometric visualizations, and 3D mathematical concepts with dynamic movement."
              price={`${formatCurrency(getPrice('math3d', currency), currency)}+`}
              features={[
                "Up to 60 seconds",
                "3D mathematical objects",
                "2 revisions included",
                "Custom styling options"
              ]}
            />

            <FeatureCard
              icon="∞"
              title="Full Research Animations"
              description="Complete research paper visualizations with custom storyboarding, multiple scenes, and publication-ready quality."
              price={`${formatCurrency(getPrice('research', currency), currency)}+`}
              features={[
                "Custom duration",
                "Complete storyboarding",
                "Multiple revisions",
                "Research publication ready"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Services (lazy) */}
      <div id="services">
        <LazySection
          loader={loadServicesSection}
          className="py-20 bg-surface"
          fallback={<div className="max-w-7xl mx-auto px-6 text-muted-foreground">Loading services…</div>}
        />
      </div>

      {/* Testimonials */}
      {/* <Testimonials /> */}
      <LazySection
        loader={loadTestimonialsFeed}
        className="px-6 py-20 bg-surface"
        fallback={
          <div className="max-w-4xl mx-auto text-center text-muted-foreground">Loading testimonials…</div>
        }
      />
      {/* Quick Request Section (memoized & isolated to prevent page rerenders) */}
      <LazySection
        loader={loadQuickRequestSection}
        className="px-6 py-20"
        fallback={
          <div className="max-w-3xl mx-auto text-center text-muted-foreground">Preparing quick request form…</div>
        }
      />

      {/* Contact (lazy) */}
      <LazySection
        loader={loadContactSection}
        className="py-20 bg-surface"
        fallback={<div className="max-w-7xl mx-auto px-6 text-muted-foreground">Loading contact…</div>}
      />

      {/* New: Contract plans placed between Contact section and Footer */}
      <section id="contract-plans" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Looking for a Long-Term Animation Partner?
            </h3>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              We offer ongoing monthly contracts for teams that need consistent, publication-ready math animations.
              Perfect for research groups, universities, and agencies with recurring content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="mb-3">
                <h4 className="text-xl font-semibold text-foreground">Starter Plan</h4>
                <p className="text-sm text-muted-foreground mt-1">5 animations per month</p>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {formatCurrency(getPrice('starter', currency), currency) || (currency === 'INR' ? 'Custom' : 'Custom')}
              </div>
              <p className="text-sm text-muted-foreground mt-2 flex-1">
                Ideal for creators or small teams needing steady, polished equation animations.
              </p>
              <Button className="mt-6 w-full" asChild>
                <Link to="/contract?plan=starter">Start Contract Request</Link>
              </Button>
            </div>

            {/* Research Partner */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="mb-3">
                <h4 className="text-xl font-semibold text-foreground">Research Partner</h4>
                <p className="text-sm text-muted-foreground mt-1">15 animations per month</p>
              </div>
              <div className="text-3xl font-bold text-foreground">
                {formatCurrency(PRICING.plans.research[currency], currency)}
              </div>
              <p className="text-sm text-muted-foreground mt-2 flex-1">
                Best for labs and departments producing frequent lecture or paper visuals.
              </p>
              <Button className="mt-6 w-full" asChild>
                <Link to="/contract?plan=research">Start Contract Request</Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="mb-3">
                <h4 className="text-xl font-semibold text-foreground">Enterprise</h4>
                <p className="text-sm text-muted-foreground mt-1">Custom engagement</p>
              </div>
              <div className="text-3xl font-bold text-foreground">Custom</div>
              <p className="text-sm text-muted-foreground mt-2 flex-1">
                Tailored workflows, SLAs, and dedicated capacity for large teams and agencies.
              </p>
              <Button variant="outline" className="mt-6 w-full" asChild>
                <Link to="/contract?plan=enterprise">Start Contract Request</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
