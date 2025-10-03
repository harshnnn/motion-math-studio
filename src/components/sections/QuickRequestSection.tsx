import React, { useCallback, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BudgetSelect } from "@/components/ui/BudgetSelect";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useRegionCurrency } from "@/hooks/useRegionCurrency";
import { supabase } from "@/integrations/supabase/client";
import { getPrice } from "@/pricing/config";

// Isolated, memoized section to avoid rerendering the entire page on keystrokes
function QuickRequestSectionImpl() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { currency } = useRegionCurrency("USD");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    budget: "",
    description: "",
  });

  const parseBudgetRange = useCallback(
    (s: string) => {
      const parts = s?.split("-") ?? [];
      const nums = parts
        .map((p) => parseInt(p.replace(/[^\d]/g, ""), 10))
        .filter((n) => Number.isFinite(n));
      if (nums.length >= 2) return { min: nums[0], max: nums[1] };
      if (nums.length === 1) return { min: nums[0], max: nums[0] };
      return currency === "INR" ? { min: 1000, max: 5000 } : { min: 50, max: 200 };
    },
    [currency]
  );

  const handleQuickSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.description?.trim()) return;
      setIsSubmitting(true);
      try {
        const { min, max } = parseBudgetRange(formData.budget);

        if (user) {
          const { error } = await supabase.from("projects").insert({
            user_id: user.id,
            title: "Quick Request",
            description: formData.description,
            animation_type: "formula_basic",
            budget_min: min,
            budget_max: max,
            status: "submitted",
          });
          if (error) throw error;
          toast({
            title: "Request submitted!",
            description: "We'll get back to you within 24 hours.",
          });
          setFormData({ email: "", budget: "", description: "" });
        } else {
          await supabase.from("quick_estimates").insert({
            animation_type: "formula_basic",
            duration_seconds: 15,
            complexity_factor: 1.0,
            // Use region price for a quick ballpark in the user’s currency
            estimated_price: getPrice("formula", currency),
            email: formData.email,
          });
          toast({
            title: "Request received!",
            description: "Please sign in to submit a full project request.",
          });
        }
      } catch (error) {
        console.error("Error submitting request:", error);
        toast({ title: "Error", description: "Please try again later.", variant: "destructive" });
      } finally {
        setIsSubmitting(false);
      }
    },
    [currency, formData, parseBudgetRange, toast, user]
  );

  return (
    <section className="px-6 py-20 ">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Submit your mathematical concept and get a custom quote within 24 hours
        </p>

        <div className="bg-card border border-border/50 rounded-2xl p-8">
          <form onSubmit={handleQuickSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {!user && (
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required={!user}
                  inputMode="email"
                  autoComplete="email"
                />
              )}

              {/* Budget dropdown now shows INR/USD based on region */}
              <BudgetSelect
                value={formData.budget}
                onChange={(v) => setFormData((prev) => ({ ...prev, budget: v }))}
                currency={currency}
                className={!user ? "" : "md:col-span-2"}
              />
            </div>

            <Textarea
              placeholder="Describe your mathematical concept or provide your script..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
            />

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full md:w-auto px-12"
              disabled={isSubmitting || !formData.description}
            >
              {isSubmitting ? "Submitting..." : "Submit Quick Request"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

const QuickRequestSection = memo(QuickRequestSectionImpl);
export default QuickRequestSection;
