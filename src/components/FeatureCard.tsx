import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  price: string;
  features: string[];
}

export default function FeatureCard({ icon, title, description, price, features }: FeatureCardProps) {
  return (
    <div className="group relative">
      {/* Glass Card */}
      <div className="relative bg-card border border-border/50 rounded-2xl p-8 hover:bg-card-elevated transition-all duration-300 hover:border-primary/30 hover:shadow-card">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        {/* Icon */}
        <div className="mb-6 text-primary text-4xl">
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        
        {/* Price */}
        <div className="text-3xl font-bold bg-gradient-text bg-clip-text text-transparent mb-6">
          {price}
        </div>
        
        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:animate-glow-pulse"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}