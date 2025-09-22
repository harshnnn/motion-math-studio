import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SupportMessage {
  id: string;
  user_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface ThreadGroup {
  user_id: string;
  last_message_at: string;
  messages: SupportMessage[];
}

const SupportInbox = () => {
  const [threads, setThreads] = useState<ThreadGroup[]>([]);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      const grouped: Record<string, SupportMessage[]> = {};
      (data || []).forEach(m => {
        grouped[m.user_id] = grouped[m.user_id] || [];
        grouped[m.user_id].push(m);
      });
      const threadArr: ThreadGroup[] = Object.entries(grouped).map(([user_id, msgs]) => ({
        user_id,
        messages: msgs,
        last_message_at: msgs[msgs.length - 1]?.created_at || msgs[0]?.created_at
      })).sort((a,b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
      setThreads(threadArr);
      if (!activeUser && threadArr.length > 0) setActiveUser(threadArr[0].user_id);
    } catch (e) {
      console.error('loadMessages error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMessages(); const intv = setInterval(loadMessages, 20000); return () => clearInterval(intv); }, []);

  const activeMessages = threads.find(t => t.user_id === activeUser)?.messages || [];

  const sendReply = async () => {
    if (!input.trim() || !activeUser) return;
    try {
      setSending(true);
      const { data, error } = await supabase
        .from('support_messages')
        .insert({ user_id: activeUser, sender_id: (await supabase.auth.getUser()).data.user?.id, content: input.trim() })
        .select('*')
        .single();
      if (error) throw error;
      setInput('');
      // Optimistic update
      setThreads(prev => prev.map(t => t.user_id === activeUser ? { ...t, messages: [...t.messages, data], last_message_at: data.created_at } : t));
    } catch (e) {
      console.error('sendReply error', e);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="md:col-span-1 h-[70vh] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Support Threads</CardTitle>
          <Button variant="outline" size="sm" onClick={loadMessages} disabled={loading}>Refresh</Button>
        </CardHeader>
        <CardContent className="overflow-auto space-y-1">
          {threads.length === 0 && (
            <p className="text-xs text-muted-foreground">No threads yet.</p>
          )}
          {threads.map(t => (
            <button key={t.user_id} onClick={() => setActiveUser(t.user_id)} className={cn('w-full text-left px-2 py-2 rounded border text-xs', activeUser === t.user_id ? 'bg-primary/10 border-primary/40' : 'hover:bg-muted/40 border-border/50') }>
              <div className="font-medium truncate">User: {t.user_id.slice(0,8)}</div>
              <div className="text-[10px] text-muted-foreground">{new Date(t.last_message_at).toLocaleString()}</div>
              <div className="text-[10px] text-muted-foreground">{t.messages.length} messages</div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="md:col-span-3 h-[70vh] flex flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Conversation {activeUser && `- ${activeUser.slice(0,8)}`}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto rounded-md border bg-muted/10 p-3 space-y-2 text-sm">
            {activeMessages.length === 0 && <p className="text-xs text-muted-foreground">No messages yet.</p>}
            {activeMessages.map(m => (
              <div key={m.id} className={cn('flex flex-col gap-0.5 rounded p-2', m.sender_id === activeUser ? 'bg-muted/30 mr-auto max-w-[70%]' : 'bg-primary/10 ml-auto max-w-[70%]') }>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground/70">{m.sender_id === activeUser ? 'Client' : 'Admin'}</span>
                <p>{m.content}</p>
                <span className="text-[10px] text-muted-foreground/60">{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input placeholder="Type reply..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendReply(); } }} />
            <Button onClick={sendReply} disabled={!input.trim() || sending}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportInbox;
