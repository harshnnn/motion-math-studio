import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const PathfindingVisual = () => {
    const rows = 6;
    const cols = 10;
    const cellSize = 16;
    const obstacles = new Set(['2,1', '3,1', '4,1', '5,3', '6,3', '2,4', '3,4', '7,2']);
    const path = 'M8 80 L40 80 L56 64 L72 64 L88 48 L120 48 L136 32 L168 32 L184 48 L184 96 L152 96 L136 112';

    return (
      <svg viewBox="0 0 200 140" className="w-full h-full">
        <defs>
          <linearGradient id="gridGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200 100% 60%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(264 83% 70%)" stopOpacity="0.25" />
          </linearGradient>
          <radialGradient id="pathPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(264 83% 70%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(264 83% 70%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="140" rx="18" fill="hsl(240 10% 8%)" />
        <rect width="200" height="140" rx="18" fill="url(#gridGlow)" />
        <g transform="translate(16,16)">
          {[...Array(rows)].map((_, row) =>
            [...Array(cols)].map((_, col) => {
              const key = `${col},${row}`;
              const x = col * cellSize;
              const y = row * cellSize;
              const isObstacle = obstacles.has(key);
              return (
                <rect
                  key={key}
                  x={x}
                  y={y}
                  width={cellSize - 2}
                  height={cellSize - 2}
                  rx={3}
                  fill={isObstacle ? 'hsl(240 12% 14%)' : 'hsl(240 10% 10%)'}
                  stroke="hsl(240 10% 18%)"
                  strokeWidth={0.8}
                />
              );
            }),
          )}
          <path
            d={path}
            fill="none"
            stroke="hsl(200 100% 65%)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 8"
            opacity={0.8}
          >
            <animate attributeName="stroke-dashoffset" values="0;-56" dur="4s" repeatCount="indefinite" />
          </path>
          <circle r={10} fill="url(#pathPulse)" opacity={0.8}>
            <animateMotion dur="5s" repeatCount="indefinite" path={path} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          </circle>
          <circle r={5} fill="hsl(45 100% 70%)">
            <animateMotion dur="5s" repeatCount="indefinite" path={path} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          </circle>
        </g>
      </svg>
    );
  };

  const FunctionGrapherVisual = () => (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <defs>
        <linearGradient id="surfaceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(264 83% 70%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(200 100% 65%)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="gridLines" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(240 10% 60%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(240 10% 40%)" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="200" height="140" rx="18" fill="hsl(240 10% 8%)" />
      <rect width="200" height="140" rx="18" fill="hsl(240 8% 12%)" opacity={0.6} />
      <g transform="translate(24,16)">
        <polygon points="0,96 96,120 168,96 72,72" fill="url(#gridLines)" opacity={0.45} />
        <polyline points="0,96 96,120 168,96" fill="none" stroke="hsl(240 10% 25%)" strokeWidth={1.5} />
        <polyline points="72,72 96,120" fill="none" stroke="hsl(240 10% 25%)" strokeWidth={1.5} />
        <polyline points="24,84 120,108" fill="none" stroke="hsl(240 10% 25%)" strokeWidth={1.5} />
        <path
          d="M0,88 Q32,40 64,60 Q96,80 128,44 Q160,24 192,64"
          fill="none"
          stroke="hsl(200 100% 70%)"
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.8}
        >
          <animate attributeName="d" dur="6s" repeatCount="indefinite" values="M0,88 Q32,40 64,60 Q96,80 128,44 Q160,24 192,64;M0,80 Q32,48 64,52 Q96,64 128,36 Q160,28 192,70;M0,88 Q32,40 64,60 Q96,80 128,44 Q160,24 192,64" />
        </path>
        <polygon points="0,88 96,128 192,88 96,48" fill="url(#surfaceGradient)" opacity={0.75} />
        <circle cx="96" cy="64" r="6" fill="hsl(45 100% 70%)">
          <animate attributeName="cy" values="64;58;64" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="136" cy="56" r="4" fill="hsl(200 100% 70%)">
          <animate attributeName="cy" values="56;48;56" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );

  const SimulationVisual = () => (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <defs>
        <radialGradient id="backgroundGlow" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="hsl(200 100% 20%)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="hsl(240 10% 8%)" stopOpacity="0.95" />
        </radialGradient>
        <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(264 83% 70%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(200 100% 70%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="140" rx="18" fill="hsl(240 10% 8%)" />
      <rect width="200" height="140" rx="18" fill="url(#backgroundGlow)" />
      <g transform="translate(24,24)">
        <path d="M0,72 Q48,48 96,68 T192,64" stroke="url(#trailGradient)" strokeWidth={8} fill="none" strokeLinecap="round" />
        <g>
          <g>
            <line x1="96" y1="0" x2="96" y2="88" stroke="hsl(240 10% 25%)" strokeWidth={1.2} strokeDasharray="4 6" />
            <line x1="0" y1="72" x2="192" y2="72" stroke="hsl(240 10% 25%)" strokeWidth={1.2} strokeDasharray="4 6" />
          </g>
          <g>
            <circle cx="96" cy="20" r="6" fill="hsl(200 100% 70%)">
              <animate attributeName="cy" values="20;52;28;20" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="62" cy="80" r="4" fill="hsl(45 100% 70%)">
              <animate attributeName="cx" values="62;72;48;62" dur="4.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="128" cy="68" r="5" fill="hsl(264 83% 70%)">
              <animate attributeName="cy" values="68;40;76;68" dur="5s" repeatCount="indefinite" />
              <animate attributeName="cx" values="128;156;138;128" dur="5s" repeatCount="indefinite" />
            </circle>
          </g>
          <polyline points="96,12 96,52 140,88" fill="none" stroke="hsl(200 100% 70%)" strokeWidth={3} strokeLinecap="round">
            <animate attributeName="points" dur="3.5s" repeatCount="indefinite" values="96,12 96,52 140,88;96,12 110,60 132,88;96,12 82,56 140,88;96,12 96,52 140,88" />
          </polyline>
          <circle cx="140" cy="88" r="6" fill="hsl(200 100% 70%)">
            <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    </svg>
  );

  const showcases = [
    {
      title: 'Algorithm Visualization → Pathfinding (A*)',
      type: 'Algorithm / Data Structure',
      description:
        'A glowing explorer navigates an isometric grid, revealing heuristic-driven decisions, obstacle avoidance, and optimal route discovery.',
      points: ['Node states, frontier, and final route overlays', 'Step-through playback or live speed control', 'Perfect for product explainers or interactive dashboards'],
      Visual: PathfindingVisual,
    },
    {
      title: 'Mathematical Visualization → 3D Function Grapher',
      type: 'Mathematics / Calculus',
      description:
        'A sculpted surface illustrates z = sin(x² + y²), animating curvature shifts with precise gradients and focal highlights for differentiation.',
      points: ['Surface shading with contour cues', 'Camera orbit + parameter sliders', 'Ideal for lectures, MOOCs, and research pitches'],
      Visual: FunctionGrapherVisual,
    },
    {
      title: 'Physics / AI Simulation → Double Pendulum Dynamics',
      type: 'Physics / AI Simulation',
      description:
        'Chaotic motion rendered with minimal footprint—showcasing sensitivity to initial conditions and energy transfer in a premium motion system.',
      points: ['Energy trails, vector overlays, and state plots', 'Parameter toggles for damping and mass', 'Great for R&D labs, museums, and media'],
      Visual: SimulationVisual,
    },
  ];

export const ServicesSection = () => {
  return (
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
          {showcases.map(({ title, type, description, points, Visual }) => (
            <Card key={title} className="bg-card/60 border-primary/10 backdrop-blur-sm shadow-lg overflow-hidden">
              <div className="relative h-56 border-b border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface/40 to-background" />
                <Visual />
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">{type}</Badge>
                  <h3 className="text-xl font-semibold leading-tight text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/60" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
