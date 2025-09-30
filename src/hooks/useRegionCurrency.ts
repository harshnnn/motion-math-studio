import { useEffect, useState } from 'react';

export type Currency = 'INR' | 'USD';

const STORAGE_KEY = 'regionCurrency:v1';

function timeout<T>(p: Promise<T>, ms = 1500): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

export function useRegionCurrency(defaultCurrency: Currency = 'USD') {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const override = params.get('currency')?.toUpperCase();
      if (override === 'INR' || override === 'USD') {
        setCurrency(override);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ currency: override, ts: Date.now() }));
        return;
      }

      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const { currency: c, ts } = JSON.parse(cached) as { currency: Currency; ts: number };
        // Reuse cache for 24h
        if (Date.now() - ts < 24 * 60 * 60 * 1000 && (c === 'INR' || c === 'USD')) {
          setCurrency(c);
          return;
        }
      }
    } catch { /* ignore */ }

    // Detect via IP (fallback to locale if fails)
    (async () => {
      let detected: Currency = defaultCurrency;
      try {
        // Fast, no-key endpoints; rate-limited but fine for client use
        const res = await timeout(fetch('https://ipapi.co/json/'), 2000);
        const data = await res.json();
        if (data?.country_code === 'IN') detected = 'INR';
      } catch {
        // Fallback: check browser locale region
        const region = Intl.DateTimeFormat().resolvedOptions().locale?.split('-')[1];
        if (region?.toUpperCase() === 'IN') detected = 'INR';
      }
      setCurrency(detected);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ currency: detected, ts: Date.now() }));
      } catch { /* ignore */ }
    })();
  }, [defaultCurrency]);

  return {
    currency,
    isIN: currency === 'INR',
    setCurrency, // optional manual override if you add a UI later
  };
}
