import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Contract = {
  id: string;
  created_at: string;
  updated_at: string;
  status: "new" | "review" | "approved" | "rejected";
  email: string | null;
  contact_name: string | null;
  organization: string | null;
  plan: "starter" | "research" | "enterprise" | "custom";
  currency: string;
  monthly_budget: number | null;
  timeframe_months: number | null;
  preferred_start_date: string | null;
  description: string;
  user_id: string | null;
};

export default function ContractsManager() {
  const [data, setData] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");

  async function load() {
    setLoading(true);
    const query = supabase
      .from("contracts")
      .select("*")
      .order("created_at", { ascending: false });
    const { data, error } = await query;
    setLoading(false);
    if (error) return;
    setData((data as any) as Contract[]);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return data.filter((c) => {
      const okStatus = status === "all" ? true : c.status === status;
      const text = [c.email, c.organization, c.contact_name, c.plan, c.description].join(" ").toLowerCase();
      const okQ = text.includes(q.toLowerCase());
      return okStatus && okQ;
    });
  }, [data, q, status]);

  async function updateStatus(id: string, status: Contract["status"]) {
    const { error } = await supabase.from("contracts").update({ status }).eq("id", id);
    if (!error) load();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={load}>Refresh</Button>
      </div>

      {loading ? <div className="text-muted-foreground">Loading…</div> : null}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div key={c.id} className="bg-card border border-border/50 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{new Date(c.created_at).toLocaleString()}</div>
              <span className="text-xs px-2 py-1 rounded-full border border-border/50">
                {c.status}
              </span>
            </div>
            <div className="text-sm">
              <div><strong>Plan:</strong> {c.plan.toUpperCase()} • <strong>Budget:</strong> {c.currency} {c.monthly_budget ?? "—"}</div>
              <div><strong>Timeframe:</strong> {c.timeframe_months ?? "—"} months</div>
              <div><strong>Start:</strong> {c.preferred_start_date ?? "—"}</div>
              <div><strong>Org:</strong> {c.organization ?? "—"}</div>
              <div><strong>Contact:</strong> {c.contact_name ?? "—"} {c.email ? `(${c.email})` : ""}</div>
            </div>
            <Textarea value={c.description} readOnly rows={5} className="resize-none" />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => updateStatus(c.id, "review")}>Mark Review</Button>
              <Button size="sm" variant="secondary" onClick={() => updateStatus(c.id, "approved")}>Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => updateStatus(c.id, "rejected")}>Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
