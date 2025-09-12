export default function PricingStrip() {
  const pricingTiers = [
    { name: "Basic", price: "$15+", description: "Formula snippets" },
    { name: "Intermediate", price: "$150+", description: "Math objects & 3D" },
    { name: "Advanced", price: "$800+", description: "Full research animations" },
  ];

  return (
    <div className="bg-surface border border-border/50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
        Quick Pricing Overview
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier, index) => (
          <div key={index} className="text-center group">
            <div className="bg-card border border-border/50 rounded-xl p-6 hover:bg-card-elevated transition-all duration-300 hover:border-primary/30">
              <h4 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                {tier.name}
              </h4>
              <div className="text-3xl font-bold bg-gradient-text bg-clip-text text-transparent mb-2">
                {tier.price}
              </div>
              <p className="text-muted-foreground text-sm">
                {tier.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}