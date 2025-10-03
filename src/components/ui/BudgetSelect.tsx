import React from "react";
import { formatCurrency } from "@/utils/currency";

type Props = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  // Optional: defaults to USD; pass "INR" to render INR ranges
  currency?: "USD" | "INR";
};

function rangesFor(currency: "USD" | "INR") {
  // Define numeric tiers, we’ll format per currency
  // Final “+” tier has null as max
  return currency === "INR"
    ? [
        [499, 999],
        [1000, 1999],
        [2000, 2999],
        [3000, 3999],
        [4000, null],
      ]
    : [
        [50, 200],
        [200, 500],
        [500, 1000],
        [1000, 3000],
        [3000, null],
      ];
}

function fmt(min: number, max: number | null, currency: "USD" | "INR") {
  if (max == null) return `${formatCurrency(min, currency)}+`;
  return `${formatCurrency(min, currency)}-${formatCurrency(max, currency)}`;
}

export const BudgetSelect: React.FC<Props> = ({ value, onChange, className, currency = "USD" }) => {
  const ranges = rangesFor(currency);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 rounded-lg bg-background border border-border/50 text-foreground ${className ?? ""}`}
      aria-label="Budget range"
    >
      <option value="" disabled>
        Select budget range
      </option>
      {ranges.map(([min, max]) => {
        const label = fmt(min as number, max as number | null, currency);
        return (
          <option key={label} value={label}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default BudgetSelect;
