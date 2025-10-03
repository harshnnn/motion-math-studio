import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type Review = {
  id: string;
  project_id: string;
  user_id: string;
  quote: string;
  author: string;
  role?: string | null;
  org?: string | null;
  link?: string | null;
  topics?: string[] | null;
  rating?: number | null;
  approved: boolean;
  verified: boolean;
  created_at: string;
};

const TestimonialsManager: React.FC = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setReviews(data || []);
    } catch (e: any) {
      toast({ title: 'Failed to load reviews', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const updateReview = async (id: string, patch: Partial<Review>) => {
    try {
      const { error } = await supabase.from('reviews').update(patch).eq('id', id);
      if (error) throw error;
      setReviews(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
      toast({ title: 'Updated', description: 'Review updated.' });
    } catch (e: any) {
      toast({ title: 'Update failed', description: e.message, variant: 'destructive' });
    }
  };

  const removeReview = async (id: string) => {
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      setReviews(prev => prev.filter(r => r.id !== id));
      toast({ title: 'Removed', description: 'Review deleted.' });
    } catch (e: any) {
      toast({ title: 'Delete failed', description: e.message, variant: 'destructive' });
    }
  };

  const filtered = reviews.filter(r =>
    !search || r.author.toLowerCase().includes(search.toLowerCase()) || (r.org || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Testimonials</h3>
        <Button variant="outline" onClick={fetchReviews} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh'}</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Search by author or org" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <Card key={r.id} className="relative">
            <CardHeader>
              <CardTitle className="text-base">{r.author} {r.org ? `· ${r.org}` : ''}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {r.rating && <Badge variant="secondary">{r.rating}★</Badge>}
                {r.verified && <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30">Verified</Badge>}
                {r.approved ? (
                  <Badge className="bg-primary/15 text-primary border-primary/30">Approved</Badge>
                ) : (
                  <Badge variant="outline">Pending</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="italic text-sm">“{r.quote}”</p>
              {r.topics && r.topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {r.topics.slice(0,6).map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
              )}
              {r.link && (
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-xs underline text-muted-foreground">Link</a>
              )}
              <div className="flex gap-2 pt-2">
                {r.approved ? (
                  <Button size="sm" variant="secondary" onClick={() => updateReview(r.id, { approved: false })}>Unapprove</Button>
                ) : (
                  <Button size="sm" onClick={() => updateReview(r.id, { approved: true })}>Approve</Button>
                )}
                {r.verified ? (
                  <Button size="sm" variant="secondary" onClick={() => updateReview(r.id, { verified: false })}>Unverify</Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => updateReview(r.id, { verified: true })}>Verify</Button>
                )}
                <Button size="sm" variant="destructive" onClick={() => removeReview(r.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsManager;
