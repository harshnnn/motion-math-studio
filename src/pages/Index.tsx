import { useState, useEffect, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import HeroDemo from "@/components/HeroDemo";
import FeatureCard from "@/components/FeatureCard";
import PricingStrip from "@/components/PricingStrip";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ServicesSection as EagerServicesSection } from '@/components/sections/ServicesSection';
import { ContactSection as EagerContactSection } from '@/components/sections/ContactSection';
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { BudgetSelect } from "@/components/ui/BudgetSelect";

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    budget: '',
    description: ''
  });

  // SEO: set a more descriptive title
  useEffect(() => {
    const prev = document.title;
    document.title = "Math Animation for Research & Education | MathInMotion";
    return () => { document.title = prev; };
  }, []);

  // Optionally lazy-load heavy sections (fallback to existing eager if needed)
  const ServicesSection = lazy(async () => ({ default: EagerServicesSection }));
  const ContactSection = lazy(async () => ({ default: EagerContactSection }));

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (user) {
        const [min, max] = (formData.budget || '')
          .replace(/\$/g, '')
          .split('-')
          .map(v => parseInt(v.trim(), 10));
        const { error } = await supabase.from('projects').insert({
          user_id: user.id,
          title: 'Quick Request',
          description: formData.description,
          animation_type: 'formula_basic',
          budget_min: Number.isFinite(min) ? min : 50,
          budget_max: Number.isFinite(max) ? max : 200,
          status: 'submitted'
        });
        if (error) throw error;
        toast({ title: "Request submitted!", description: "We'll get back to you within 24 hours." });
        setFormData({ email: '', budget: '', description: '' });
      } else {
        await supabase.from('quick_estimates').insert({
          animation_type: 'formula_basic',
          duration_seconds: 15,
          complexity_factor: 1.0,
          estimated_price: 100,
          email: formData.email
        });
        toast({ title: "Request received!", description: "Please sign in to submit a full project request." });
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({ title: "Error", description: "Please try again later.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

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
                    Math Animation for Research Papers
                  </span>
                  <br />
                  <span className="text-foreground">and Education</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Formula animations, research visuals & publication-grade videos
                  made from your script. Transform complex mathematical concepts
                  into elegant animated visualizations.
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
                {/* New: Scroll to contract plans */}
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                  <a href="#contract-plans">View Contract Plans</a>
                </Button>
              </div>
            </div>

            {/* Right Column - Demo Video */}
            <div className="relative">
              <HeroDemo />
            </div>
          </div>
        </div>

        {/* Remove the old in-hero contract block here */}
      </section>

      {/* Features Section (SEO heading improved) */}
      <section className="px-6 py-20 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Math Animation Services: Equations, Algorithms, Research Visuals
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple formula visualizations to complex research animations,
              we bring your mathematical concepts to life with precision and elegance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="π"
              title="Formula Animations"
              description="Clean, elegant animations of mathematical formulas and equations with smooth transitions and professional typography."
              price="$15+"
              features={[
                "5-20 second animations",
                "1080p HD quality",
                "1 revision included",
                "MP4 & WebM formats"
              ]}
            />

            <FeatureCard
              icon="∑"
              title="Math Objects & 3D"
              description="Interactive mathematical objects, geometric visualizations, and 3D mathematical concepts with dynamic movement."
              price="$150+"
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
              price="$800+"
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
      <div id="services" className="py-20 bg-surface">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-6 text-muted-foreground">Loading services…</div>}>
          <ServicesSection />
        </Suspense>
      </div>

      {/* Pricing Strip */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <PricingStrip />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Quick Request Section (budget dropdown) */}
      <section className="px-6 py-20 ">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Submit your mathematical concept and get a custom quote within 24 hours
          </p>

          <div className="bg-card border border-border/50 rounded-2xl p-8">
            <form onSubmit={handleQuickSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {!user && (
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required={!user}
                  />
                )}

                {/* Budget dropdown replaces free text, but still fills formData.budget */}
                <BudgetSelect
                  value={formData.budget}
                  onChange={(v) => setFormData(prev => ({ ...prev, budget: v }))
                  }
                  className={!user ? "" : "md:col-span-2"}
                />
              </div>

              <Textarea
                placeholder="Describe your mathematical concept or provide your script..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full md:w-auto px-12"
                disabled={isSubmitting || !formData.description}
              >
                {isSubmitting ? "Submitting..." : "Submit Quick Request"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact (lazy) */}
      <div className="py-20 bg-surface">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-6 text-muted-foreground">Loading contact…</div>}>
          <ContactSection />
        </Suspense>
      </div>

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
              <div className="text-3xl font-bold text-foreground">$500</div>
              <p className="text-sm text-muted-foreground mt-2 flex-1">
                Ideal for creators or small teams needing steady, polished equation animations.
              </p>
              <Button className="mt-6 w-full" asChild>
                <Link to="/request">Hire Us</Link>
              </Button>
            </div>

            {/* Research Partner */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="mb-3">
                <h4 className="text-xl font-semibold text-foreground">Research Partner</h4>
                <p className="text-sm text-muted-foreground mt-1">15 animations per month</p>
              </div>
              <div className="text-3xl font-bold text-foreground">$1500</div>
              <p className="text-sm text-muted-foreground mt-2 flex-1">
                Best for labs and departments producing frequent lecture or paper visuals.
              </p>
              <Button className="mt-6 w-full" asChild>
                <Link to="/request">Hire Us</Link>
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
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                MathInMotion
              </h3>
              <p className="text-muted-foreground">
                Professional mathematical animations for research, education, and content creation.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Formula Animations</li>
                <li>3D Math Objects</li>
                <li>Research Videos</li>
                <li>Custom Visualizations</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Portfolio</li>
                <li>Pricing</li>
                <li>Contact</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>License Terms</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MathInMotion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
