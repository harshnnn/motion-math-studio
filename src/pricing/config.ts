import type { Currency } from '@/hooks/useRegionCurrency';

export const PRICING = {
  services: {
    // Landing page “FeatureCard” starting prices
    formula: { USD: 15, INR: 499 },
    math3d: { USD: 80, INR: 1499 },
    research: { USD: 400, INR: 4999 },
  },
  plans: {
    // Contract plans (adjust freely)
    starter: { USD: 500, INR: 5000 },
    research: { USD: 1500, INR: 15000 },
    enterprise: { USD: 0, INR: 0 }, // Custom
  },
} as const;

export function getPrice(path: keyof typeof PRICING['services'] | keyof typeof PRICING['plans'], currency: Currency) {
  // @ts-ignore
  const node = PRICING.services[path] ?? PRICING.plans[path];
  return node[currency] as number;
}
