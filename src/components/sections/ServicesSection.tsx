import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MathScene } from '@/components/math3d/MathScene';
import { WaveEquation } from '@/components/math3d/WaveEquation';
import { MathFractal } from '@/components/math3d/MathFractal';
import { Zap, Target, Cpu, Palette } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Equation Animations',
    description: 'Transform complex mathematical equations into flowing, interactive visualizations',
    features: ['Differential Equations', 'Linear Algebra', 'Calculus Concepts', 'Statistical Models'],
  },
  {
    icon: Target,
    title: 'Algorithm Visualization',
    description: 'Bring algorithms to life with step-by-step animated explanations',
    features: ['Sorting Algorithms', 'Graph Theory', 'Machine Learning', 'Optimization'],
  },
  {
    icon: Cpu,
    title: 'Research Papers',
    description: 'Convert academic research into engaging visual narratives',
    features: ['Scientific Papers', 'Data Analysis', 'Theoretical Concepts', 'Proof Visualization'],
  },
  {
    icon: Palette,
    title: 'Custom Solutions',
    description: 'Tailored mathematical visualizations for your specific needs',
    features: ['Educational Content', 'Presentations', 'Interactive Demos', 'Publication Graphics'],
  },
];

export const ServicesSection = () => (
  <section className="section-math">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          <span className="text-gradient-math">Services</span> &{' '}
          <span className="text-primary">Capabilities</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Professional mathematical animation services tailored to researchers, educators, and organizations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <Card key={i} className="p-8 bg-card/50 border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center">Wave Equations</h3>
          <div className="h-80 rounded-xl overflow-hidden border border-primary/20">
            <MathScene cameraPosition={[5, 5, 5]} enableZoom={false}>
              <WaveEquation color="#00ffff" amplitude={1.5} frequency={1.5} />
            </MathScene>
          </div>
          <p className="text-center text-muted-foreground">Real-time wave propagation visualization</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center">Fractal Structures</h3>
          <div className="h-80 rounded-xl overflow-hidden border border-primary/20">
            <MathScene cameraPosition={[6, 4, 6]} enableZoom={false}>
              <MathFractal iterations={4} color="#ff00ff" scale={1.2} />
            </MathScene>
          </div>
          <p className="text-center text-muted-foreground">Self-similar mathematical patterns</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center">Complex Functions</h3>
          <div className="h-80 rounded-xl overflow-hidden border border-primary/20">
            <MathScene cameraPosition={[7, 5, 7]} enableZoom={false}>
              <WaveEquation color="#00ff00" amplitude={2} frequency={0.8} size={6} />
            </MathScene>
          </div>
          <p className="text-center text-muted-foreground">Multi-dimensional function visualization</p>
        </div>
      </div>
    </div>
  </section>
);
