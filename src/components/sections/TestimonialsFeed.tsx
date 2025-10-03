import { useEffect, useMemo, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client"; 
import { cn } from "@/utils/cn";
import { ExternalLink, CheckCircle2, Star, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  org: string | null;
  link: string | null;
  topics: string[] | null;
  rating: number | null;
  verified: boolean | null;
  created_at: string | null;
};

function Stars({ rating = 5 }: { rating?: number | null }) {
  const r = Math.min(5, Math.max(0, Math.round(rating ?? 5)));
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < r ? "fill-yellow-500" : "opacity-30")} />
      ))}
    </div>
  );
}

function TestimonialCard({ r }: { r: Review }) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold text-foreground truncate">{r.author}</h4>
            {r.verified ? (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                <CheckCircle2 className="h-4 w-4" /> Verified
              </span>
            ) : null}
          </div>
          <div className="text-xs text-muted-foreground">
            {r.role ? r.role : null}
            {r.role && r.org ? " • " : ""}
            {r.org ? (
              r.link ? (
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1"
                >
                  {r.org}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                r.org
              )
            ) : null}
          </div>
        </div>
        <Stars rating={r.rating ?? 5} />
      </div>

      <p className="text-sm text-foreground/90 mt-4 flex-1">
        “{r.quote}”
      </p>

      {r.topics && r.topics.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {r.topics.slice(0, 6).map((t, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border/50"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function TestimonialsFeed() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Carousel state
  const pageSize = 3; // we show 3 per "page" on desktop; grid fallback when <=3
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const totalPages = useMemo(() => {
    const len = reviews?.length ?? 0;
    return len > 0 ? Math.ceil(len / pageSize) : 0;
  }, [reviews]);

  const canCarousel = (reviews?.length ?? 0) > 3;

  const next = useCallback(() => {
    if (!canCarousel || totalPages <= 1) return;
    setPage((p) => (p + 1) % totalPages);
  }, [canCarousel, totalPages]);

  const prev = useCallback(() => {
    if (!canCarousel || totalPages <= 1) return;
    setPage((p) => (p - 1 + totalPages) % totalPages);
  }, [canCarousel, totalPages]);

  useEffect(() => {
    let active = true;
    async function load() {
      setError(null);
      const { data, error } = await supabase
        .from("reviews")
        .select("id, quote, author, role, org, link, topics, rating, verified, created_at, approved")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(12);

      // If the table doesn't exist yet, just hide the section silently.
      if (error) {
        // 42P01 undefined_table in Postgres
        if ((error as any)?.code === "42P01") {
          if (active) setReviews([]);
          return;
        }
        if (active) setError(error.message);
        if (active) setReviews([]);
        return;
      }
      if (active) setReviews((data as any[] as Review[]) ?? []);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  // Autoplay every 6s when carousel is active
  useEffect(() => {
    if (!canCarousel) return;
    if (paused) return;
    const id = setInterval(() => next(), 6000);
    return () => clearInterval(id);
  }, [canCarousel, paused, next, page]);

  if (error) {
    // Fail-quiet on landing: don't break page if reviews cannot load.
    return null;
  }

  const items = reviews ?? [];
  if (items.length === 0) return null;

  const visible = canCarousel
    ? items.slice(page * pageSize, page * pageSize + pageSize)
    : items.slice(0, Math.min(3, items.length));

  return (
    <section
      className="px-6 py-20 bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground">What Clients Say</h2>
          <p className="text-muted-foreground mt-2">
            Real feedback from teams we’ve helped with research visuals and educational content.
          </p>
        </div>

        {canCarousel ? (
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6">
              {visible.map((r) => (
                <TestimonialCard key={r.id} r={r} />
              ))}
            </div>

            {/* Controls */}
            <button
              aria-label="Previous testimonials"
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card text-foreground shadow hover:bg-muted/50"
              onClick={prev}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next testimonials"
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card text-foreground shadow hover:bg-muted/50"
              onClick={next}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            {totalPages > 1 ? (
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to testimonials page ${i + 1}`}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-colors",
                      i === page ? "bg-foreground" : "bg-border hover:bg-muted-foreground/60"
                    )}
                    onClick={() => setPage(i)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((r) => (
              <TestimonialCard key={r.id} r={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
