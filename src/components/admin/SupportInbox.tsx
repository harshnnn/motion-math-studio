import { useEffect, useState, useRef } from 'react';
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
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [threadFilter, setThreadFilter] = useState('');

  const checkAdmin = async () => {
    try {
      const authUser = (await supabase.auth.getUser()).data.user;
      if (!authUser) { setIsAdmin(false); return; }
      const { data: profile } = await supabase.from('profiles').select('email').eq('user_id', authUser.id).maybeSingle();
      if (!profile?.email) { setIsAdmin(false); return; }
      const { data: adminRow } = await supabase
        .from('admin_users')
        .select('email,is_active')
        .eq('is_active', true)
        .filter('email','ilike', profile.email) // case-insensitive
        .maybeSingle();
      setIsAdmin(!!adminRow);
    } catch {
      setIsAdmin(false);
    }
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      let data: SupportMessage[] | null = null;
      if (isAdmin) {
        // Use RPC to bypass any lingering RLS mismatches
        const { data: rpcData, error: rpcErr } = await supabase.rpc('admin_list_support_messages');
        if (rpcErr) throw rpcErr;
        data = rpcData as any;
      } else {
        const { data: selData, error: selErr } = await supabase
          .from('support_messages')
          .select('*')
          .order('created_at', { ascending: true });
        if (selErr) throw selErr;
        data = selData;
      }
      const grouped: Record<string, SupportMessage[]> = {};
      (data || []).forEach(m => {
        grouped[m.user_id] = grouped[m.user_id] || [];
        if (!grouped[m.user_id].some(existing => existing.id === m.id)) {
          grouped[m.user_id].push(m);
        }
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

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // First check admin, then load messages (since load depends on isAdmin)
  useEffect(() => {
    (async () => {
      await checkAdmin();
    })();
  }, []);

  useEffect(() => {
    if (isAdmin === null) return; // wait until admin status resolved
    loadMessages();
    const intv = setInterval(loadMessages, 20000);
    return () => clearInterval(intv);
  }, [isAdmin]);

  // Realtime subscription for all support messages (admin scope)
  useEffect(() => {
    if (isAdmin === null) return; // wait
    const channel = supabase
      .channel('support_messages_admin')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'support_messages'
      }, (payload) => {
        const newMsg = payload.new as SupportMessage;
        setThreads(prev => {
          const existing = prev.find(t => t.user_id === newMsg.user_id);
          if (existing) {
            if (existing.messages.some(m => m.id === newMsg.id)) return prev;
            const updated = prev.map(t => t.user_id === newMsg.user_id
              ? { ...t, messages: [...t.messages, newMsg], last_message_at: newMsg.created_at }
              : t);
            return [...updated].sort((a,b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
          } else {
            const newThread: ThreadGroup = { user_id: newMsg.user_id, messages: [newMsg], last_message_at: newMsg.created_at };
            return [...prev, newThread].sort((a,b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
          }
        });
        setActiveUser(cur => cur || newMsg.user_id);
      });
    channel.subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [threads, activeUser]);

  const filteredThreads = threads.filter(t => t.user_id.toLowerCase().includes(threadFilter.toLowerCase()));
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
          {isAdmin === false && (
            <p className="text-[10px] text-red-500 mb-2">You are not an active admin. (Showing only threads you can access.)</p>
          )}
          <div className="sticky top-0 bg-background/95 backdrop-blur pt-0 pb-2 space-y-2">
            <Input
              placeholder="Filter by user id..."
              value={threadFilter}
              onChange={(e) => setThreadFilter(e.target.value)}
              className="h-8 text-xs"
            />
            <div className="text-[10px] text-muted-foreground">{filteredThreads.length} thread(s)</div>
          </div>
          {threads.length === 0 && (
            <p className="text-xs text-muted-foreground">No threads yet.</p>
          )}
          {filteredThreads.map(t => (
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
            <div ref={bottomRef} />
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
