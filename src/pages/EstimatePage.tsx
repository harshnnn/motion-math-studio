import EstimateCalculator from '@/components/EstimateCalculator';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/currency';
import { useRegionCurrency } from '@/hooks/useRegionCurrency';
import { PRICING, getPrice } from '@/pricing/config';

const EstimatePage = () => {
  const { currency } = useRegionCurrency('USD');

  // Replace any hardcoded USD amounts with region-aware values
  const base = getPrice('formula', currency);

  const total = /* ...your existing math but based on base... */ base;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Quick Estimate
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get an instant estimate for your mathematical animation project. 
            Our calculator provides accurate pricing based on your specific requirements.
          </p>
        </div>

        <EstimateCalculator />

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a more detailed quote or have specific requirements?
          </p>
          <Button asChild>
            <Link to="/request">Submit Detailed Request</Link>
          </Button>
        </div>

        <section className="px-6 py-12">
          <div className="mt-6 text-2xl font-bold text-foreground">
            {formatCurrency(total, currency)}
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Starts at {formatCurrency(getPrice('formula', currency), currency)}
          </p>
        </section>
      </div>
      </div>
    </div>
  );
};

export default EstimatePage;
