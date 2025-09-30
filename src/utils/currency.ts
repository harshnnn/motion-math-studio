import type { Currency } from '@/hooks/useRegionCurrency';

export function formatCurrency(value: number, currency: Currency) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
