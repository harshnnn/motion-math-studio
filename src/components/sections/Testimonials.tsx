import React from "react";

export const Testimonials: React.FC = () => {
  const items = [
    {
      quote:
        "Transformed a dense differential equations paper into a clear visual story. Reviewers loved it.",
      author: "Dr. A. Klein",
      org: "Noether Research",
    },
    {
      quote:
        "Perfect for my lecture series—clean equation animations and precise pacing.",
      author: "Prof. R. Singh",
      org: "Hilbert Institute",
    },
    {
      quote:
        "Helped our ML paper stand out with algorithm step-by-step visuals.",
      author: "M. Alvarez",
      org: "Gauss Labs",
    },
  ];
  return (
    <section className="px-6 py-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-foreground text-center">
          What Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-2xl p-6">
              <p className="text-foreground/90 italic">“{t.quote}”</p>
              <div className="mt-4 text-sm text-muted-foreground">
                {t.author} · {t.org}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
