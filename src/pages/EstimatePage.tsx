import EstimateCalculator from '@/components/EstimateCalculator';
import Navigation from '@/components/Navigation';

const EstimatePage = () => {
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
          <a 
            href="/request" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          >
            Submit Detailed Request
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EstimatePage;