import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useRegionCurrency } from "@/hooks/useRegionCurrency";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Plan = "starter" | "research" | "enterprise" | "custom";

export default function ContractRequestPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { currency } = useRegionCurrency("USD");

  const preselectedPlan = (params.get("plan") as Plan) || "custom";

  const [form, setForm] = useState({
    email: "",
    contact_name: "",
    organization: "",
    plan: preselectedPlan as Plan,
    monthly_budget: "",
    timeframe_months: "",
    preferred_start_date: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setForm((f) => ({ ...f, email: f.email || user.email! }));
    }
  }, [user]);

  const isValid = useMemo(() => {
    return (
      form.plan &&
      form.description.trim().length > 10 &&
      (!!user || form.email.trim().length > 3)
    );
  }, [form, user]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    const payload = {
      email: user ? user.email : form.email || null,
      contact_name: form.contact_name || null,
      organization: form.organization || null,
      plan: form.plan,
      currency,
      monthly_budget: form.monthly_budget ? Number(form.monthly_budget) : null,
      timeframe_months: form.timeframe_months ? Number(form.timeframe_months) : null,
      preferred_start_date: form.preferred_start_date || null,
      description: form.description.trim(),
      status: "new",
    };

    const { error } = await supabase.from("contracts").insert(payload);
    setSubmitting(false);

    if (error) {
      toast({
        title: "Could not submit contract request",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contract request submitted",
      description: "We’ll review and get back within 24 hours.",
    });
    navigate("/thank-you?type=contract");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground">Start a Contract</h1>
          <p className="text-muted-foreground mt-2">
            Tell us about your ongoing animation needs. We’ll review and propose a contract.
          </p>

          <div className="bg-card border border-border/50 rounded-2xl p-6 mt-8">
            <form className="space-y-6" onSubmit={onSubmit}>
              {!user && (
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@org.edu"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name">Contact name</Label>
                  <Input
                    id="contact_name"
                    value={form.contact_name}
                    onChange={(e) => setForm((f) => ({ ...f, contact_name: e.target.value }))}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={form.organization}
                    onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                    placeholder="Department / Channel / Company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <Label>Plan</Label>
                  <Select
                    value={form.plan}
                    onValueChange={(v) => setForm((f) => ({ ...f, plan: v as Plan }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="research">Research Partner</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="monthly_budget">
                    Monthly budget ({currency})
                  </Label>
                  <Input
                    id="monthly_budget"
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    value={form.monthly_budget}
                    onChange={(e) => setForm((f) => ({ ...f, monthly_budget: e.target.value }))}
                    placeholder="e.g., 1500"
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe_months">Timeframe (months)</Label>
                  <Input
                    id="timeframe_months"
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={form.timeframe_months}
                    onChange={(e) => setForm((f) => ({ ...f, timeframe_months: e.target.value }))}
                    placeholder="e.g., 6"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferred_start_date">Preferred start date</Label>
                  <Input
                    id="preferred_start_date"
                    type="date"
                    value={form.preferred_start_date}
                    onChange={(e) => setForm((f) => ({ ...f, preferred_start_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Currency</Label>
                  <Input value={currency} disabled />
                </div>
              </div>

              <div>
                <Label htmlFor="description">What do you need each month?</Label>
                <Textarea
                  id="description"
                  required
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Tell us about topics, cadence, duration, resolution, review process, deadlines, etc."
                />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" variant="hero" disabled={submitting || !isValid}>
                  {submitting ? "Submitting…" : "Submit Contract Request"}
                </Button>
                <Button type="button" variant="outline" onClick={() => history.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
