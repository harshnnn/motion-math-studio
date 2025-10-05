import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Calendar, ArrowRight } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section className="section-math">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-math">Visualize</span>
            <br />
            Your <span className="text-primary">Mathematics?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Let's bring your mathematical concepts to life with stunning animations that engage,
            educate, and inspire your audience.
          </p>
        </div>

        {/* Side-by-side: Left = Contact Methods, Right = Our Process */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Contact Methods */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-primary/20">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Email Discussion</div>
                <div className="text-sm text-muted-foreground">contact@algovisuals.org</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-primary/20">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Schedule Consultation</div>
                <div className="text-sm text-muted-foreground">Free 30-minute project discussion</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-card/30 border border-primary/20">
              <div className="p-2 rounded-lg bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Instant Quote</div>
                <div className="text-sm text-muted-foreground">Get project estimate within 24 hours</div>
              </div>
            </div>
          </div>

          {/* Right: Our Process */}
          <div className="p-6 rounded-xl bg-card/50 border border-primary/20 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-primary">Our Process</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</div>
                <span>Analyze your mathematical content</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</div>
                <span>Design visualization concepts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</div>
                <span>Create high-quality animations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">4</div>
                <span>Deliver in your preferred format</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
