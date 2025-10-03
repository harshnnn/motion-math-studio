import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type ClientReviewFormProps = {
  projectId: string;
  defaultAuthor?: string;
  defaultOrg?: string;
};

const ClientReviewForm: React.FC<ClientReviewFormProps> = ({ projectId, defaultAuthor = '', defaultOrg = '' }) => {
  const { toast } = useToast();
  const [author, setAuthor] = useState(defaultAuthor);
  const [role, setRole] = useState('');
  const [org, setOrg] = useState(defaultOrg);
  const [link, setLink] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState<string>('5');
  const [topicInput, setTopicInput] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addTopic = () => {
    const t = topicInput.trim();
    if (!t) return;
    if (!topics.includes(t)) setTopics(prev => [...prev, t]);
    setTopicInput('');
  };

  const removeTopic = (t: string) => {
    setTopics(prev => prev.filter(x => x !== t));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote || !author) {
      toast({ title: 'Missing fields', description: 'Please add your quote and name.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const { data: userInfo } = await supabase.auth.getUser();
      const user_id = userInfo.user?.id;
      if (!user_id) throw new Error('You must be signed in.');

      const { error } = await supabase.from('reviews').insert({
        project_id: projectId,
        user_id,
        quote,
        author,
        role: role || null,
        org: org || null,
        link: link || null,
        topics: topics.length ? topics : null,
        rating: parseInt(rating, 10)
      });
      if (error) throw error;
      toast({ title: 'Review submitted', description: 'Thanks! We will review and publish it soon.' });
      setQuote('');
      setRating('5');
      setTopics([]);
    } catch (err: any) {
      toast({ title: 'Submission failed', description: err.message || 'Please try again later.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Your Name</Label>
          <Input value={author} onChange={e => setAuthor(e.target.value)} required />
        </div>
        <div>
          <Label>Role (optional)</Label>
          <Input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g., Research Lead" />
        </div>
        <div>
          <Label>Organization (optional)</Label>
          <Input value={org} onChange={e => setOrg(e.target.value)} placeholder="e.g., ByteQuest" />
        </div>
        <div>
          <Label>Link (optional)</Label>
          <Input value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div>
        <Label>Your Review</Label>
        <Textarea value={quote} onChange={e => setQuote(e.target.value)} rows={4} placeholder="Share your experience working with us..." required />
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-end">
        <div>
          <Label>Rating</Label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              {[5,4,3,2,1].map(r => (
                <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label>Topics (optional)</Label>
            <Input value={topicInput} onChange={e => setTopicInput(e.target.value)} placeholder="e.g., Machine Learning" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTopic(); } }} />
          </div>
          <Button type="button" variant="secondary" onClick={addTopic}>Add</Button>
        </div>
      </div>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {topics.map(t => (
            <Badge key={t} variant="secondary" className="cursor-pointer" onClick={() => removeTopic(t)}>
              {t} ×
            </Badge>
          ))}
        </div>
      )}

      <Button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</Button>
    </form>
  );
};

export default ClientReviewForm;
