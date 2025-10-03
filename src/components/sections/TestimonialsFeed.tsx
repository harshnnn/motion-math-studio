import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Review = {
  id: string;
  quote: string;
  author: string;
  role?: string | null;
  org?: string | null;
  link?: string | null;
  topics?: string[] | null;
  rating?: number | null;
  approved: boolean;
  verified: boolean;
};

const getInitials = (name?: string | null) => {
  const n = (name || '').trim();
  if (!n) return 'AV';
  const parts = n.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
};

const TestimonialsFeed: React.FC = () => {
  const [items, setItems] = useState<Review[] | null>(null);

  useEffect(() => {
    const fetchApproved = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, quote, author, role, org, link, topics, rating, approved, verified')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(9);
      if (error) {
        // table may not exist yet during initial deploy; ignore
        setItems([]);
        return;
      }
      setItems(data || []);
    };
    fetchApproved();
  }, []);

  if (!items || items.length === 0) {
    return null; // Let the static Testimonials component handle default content
  }

  return (
    <section className="px-6 py-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-foreground text-center">What Clients Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <article key={t.id} className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{getInitials(t.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role ? `${t.role} · ` : ''}
                    {t.link ? (
                      <a href={t.link} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{t.org}</a>
                    ) : (
                      t.org
                    )}
                  </div>
                </div>
                {t.verified && (
                  <span className="ml-auto text-xs text-emerald-600 dark:text-emerald-400">✓ Verified</span>
                )}
              </div>
              <p className="mt-4 text-foreground/90 italic flex-1">“{t.quote}”</p>
              <div className="mt-4 flex items-center gap-2">
                {t.rating ? <Badge variant="secondary">{t.rating}★</Badge> : null}
                {t.topics?.slice(0,5).map(tp => (
                  <Badge key={tp} variant="secondary" className="whitespace-nowrap">{tp}</Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsFeed;
