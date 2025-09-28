import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
};

const ranges = [
  "$50-$200",
  "$200-$500",
  "$500-$1,000",
  "$1,000-$3,000",
  "$3,000+",
];

export const BudgetSelect: React.FC<Props> = ({ value, onChange, className }) => {
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
      {ranges.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
};
