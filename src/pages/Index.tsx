import { useState } from "react";
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
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    budget: '',
    description: ''
  });

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (user) {
        // If user is logged in, create a project
        const { error } = await supabase.from('projects').insert({
          user_id: user.id,
          title: 'Quick Request',
          description: formData.description,
          animation_type: 'formula_basic',
          budget_min: parseInt(formData.budget.split('-')[0].replace('$', '')) || 50,
          budget_max: parseInt(formData.budget.split('-')[1]?.replace('$', '')) || 200,
          status: 'submitted'
        });

        if (error) throw error;

        toast({
          title: "Request submitted!",
          description: "We'll get back to you within 24 hours.",
        });

        // Reset form
        setFormData({ email: '', budget: '', description: '' });
      } else {
        // If not logged in, just save as a quick estimate
        await supabase.from('quick_estimates').insert({
          animation_type: 'formula_basic',
          duration_seconds: 15,
          complexity_factor: 1.0,
          estimated_price: 100,
          email: formData.email
        });

        toast({
          title: "Request received!",
          description: "Please sign in to submit a full project request.",
        });
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: "Please try again later.",
        variant: "destructive",
      });
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
                    Bring Mathematical Ideas
                  </span>
                  <br />
                  <span className="text-foreground">to Motion</span>
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
              </div>

              {/* Trust Badge */}
              <p className="text-sm text-muted-foreground">
                Trusted by researchers, educators & content creators
              </p>
            </div>

            {/* Right Column - Demo Video */}
            <div className="relative">
              <HeroDemo />
            </div>
          </div>
        </div>

        {/* Background Mathematical Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 text-9xl text-primary/5 font-serif">∫</div>
          <div className="absolute bottom-20 left-20 text-8xl text-secondary/5">∂</div>
          <div className="absolute top-1/2 left-1/4 text-6xl text-accent/5">√</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Mathematical Animation Services
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

      {/* NEW: Services Section */}
      <div className="py-20">
        <ServicesSection />
      </div>


      {/* Pricing Strip */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <PricingStrip />
        </div>
      </section>

      {/* Quick Request Section */}
      <section className="px-6 py-20 bg-surface">
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
                <Input
                  type="text"
                  placeholder="Budget range (e.g., $50-$200)"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
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

      {/* NEW: Contact Section */}
      <div className="py-20">
        <ContactSection />
      </div>


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
