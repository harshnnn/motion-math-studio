import React from "react";
import { CheckCircle2 } from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const points = [
    "Publication-ready visuals and typography",
    "Clear storyboarding for complex topics",
    "Fast turnaround with structured revisions",
    "STEM-native terminology and notation",
    "Consistent branding and color theory",
    "Delivery in your preferred formats (MP4/WebM)",
  ];
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground text-center">
          Why Choose MathInMotion
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border/50 rounded-xl p-4">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-foreground/90">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
