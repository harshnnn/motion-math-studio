import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  org?: string;
  link?: string;
  topics?: string[];
  verified?: boolean;
};

const getInitials = (name: string) => {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Testimonials: React.FC = () => {
  const items: Testimonial[] = [
    {
      quote:
        "Helped us ship crisp, mathematically-accurate animations for Data Structures, Algorithms, Dynamic Programming, Machine Learning, and AI. Scripts to final renders in days, not weeks.",
      author: "ByteQuest Team",
      role: "Channel Manager",
      org: "Byte_Quest (YouTube)",
      link: "https://www.youtube.com/@Byte_Quest",
      topics: [
        "Data Structures",
        "Algorithms",
        "Dynamic Programming",
        "Machine Learning",
        "Artificial Intelligence",
      ],
      verified: true,
    },
    {
      quote:
        "Perfect for my lecture series—clean equation animations, consistent notation, and precise pacing that keeps students engaged.",
      author: "Harmandeep Kaur",
      role: "Professor of Algorithms",
      org: "Chandigarh University",
      topics: ["Algorithms", "Proof sketches"],
      verified: true,
    },
    {
      quote:
        "Our ML paper stood out with step-by-step visuals of the training loop and loss landscapes. Reviewers specifically mentioned the clarity.",
      author: "M. Alvarez",
      role: "CTO",
      org: "Gauss Labs",
      topics: ["Machine Learning", "Optimization"],
    },
  ];

  return (
    <section className="px-6 py-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-foreground text-center">
          What Clients Say
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <article
              key={i}
              className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{getInitials(t.author || t.org || "")}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {t.author}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t.role ? `${t.role} · ` : ""}
                    {t.link ? (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {t.org}
                      </a>
                    ) : (
                      t.org
                    )}
                  </div>
                </div>
                {t.verified && (
                  <span className="ml-auto text-xs text-emerald-600 dark:text-emerald-400">
                    ✓ Verified
                  </span>
                )}
              </div>

              <p className="mt-4 text-foreground/90 italic flex-1">“{t.quote}”</p>

              {t.topics && t.topics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.topics.slice(0, 5).map((topic) => (
                    <Badge key={topic} variant="secondary" className="whitespace-nowrap">
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
