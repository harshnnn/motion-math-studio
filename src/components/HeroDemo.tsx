export default function HeroDemo() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-surface/80 backdrop-blur-sm shadow-card">
        <div className="aspect-video">
          <svg
            viewBox="0 0 960 540"
            role="img"
            aria-labelledby="hero-visual-title hero-visual-desc"
            className="w-full h-full"
          >
            <title id="hero-visual-title">AlgoVisuals creative technology showcase</title>
            <desc id="hero-visual-desc">
              Animated visualization representing algorithmic pathfinding, mathematical surfaces, and physics simulations.
            </desc>
            <defs>
              <radialGradient id="heroGlow" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="hsl(200 100% 72%)" stopOpacity="0.35" />
                <stop offset="45%" stopColor="hsl(264 83% 70%)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(240 12% 10%)" stopOpacity="0.12" />
              </radialGradient>
              <linearGradient id="heroGrid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(200 100% 65%)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="hsl(264 83% 70%)" stopOpacity="0.15" />
              </linearGradient>
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="960" height="540" fill="hsl(240 12% 8%)" />
            <rect width="960" height="540" fill="url(#heroGlow)" />

            {/* Grid */}
            <g stroke="url(#heroGrid)" strokeWidth="0.8" opacity="0.45">
              {Array.from({ length: 16 }).map((_, i) => (
                <line key={`v-${i}`} x1={120 + i * 48} y1="60" x2={360 + i * 36} y2="520" />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`h-${i}`} x1="60" y1={120 + i * 34} x2="900" y2={220 + i * 28} />
              ))}
            </g>

            {/* Algorithm Path */}
            <g>
              <path
                d="M180 420 Q260 360 320 320 T460 260 T620 200 T760 160"
                fill="none"
                stroke="hsl(200 100% 70%)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="24 16"
                opacity="0.85"
              >
                <animate attributeName="stroke-dashoffset" values="0;-160" dur="6s" repeatCount="indefinite" />
              </path>
              <circle r="24" fill="hsl(264 83% 70%)" filter="url(#nodeGlow)">
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path="M180 420 Q260 360 320 320 T460 260 T620 200 T760 160"
                  keyTimes="0;1"
                />
              </circle>
            </g>

            {/* Mathematical Surface */}
            <g transform="translate(120 140)">
              <path
                d="M0 180 Q120 60 240 120 T480 80"
                fill="none"
                stroke="hsl(240 30% 45%)"
                strokeOpacity="0.6"
                strokeWidth="7"
              />
              <path
                d="M0 180 Q120 60 240 120 T480 80"
                fill="none"
                stroke="hsl(200 100% 70%)"
                strokeWidth="7"
                strokeOpacity="0.8"
                strokeLinecap="round"
              >
                <animate
                  attributeName="d"
                  dur="7s"
                  repeatCount="indefinite"
                  values="M0 180 Q120 60 240 120 T480 80;M0 200 Q120 40 240 140 T480 60;M0 180 Q120 60 240 120 T480 80"
                />
              </path>
              <circle cx="240" cy="120" r="14" fill="hsl(45 100% 70%)">
                <animate attributeName="cy" values="120;100;140;120" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="360" cy="100" r="10" fill="hsl(200 100% 70%)">
                <animate attributeName="cy" values="100;80;110;100" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Physics Orbitals */}
            <g transform="translate(640 280)">
              <circle cx="0" cy="0" r="90" fill="none" stroke="hsl(264 83% 70% / 0.25)" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="140" fill="none" stroke="hsl(200 100% 70% / 0.2)" strokeWidth="1.5" />
              {['6s', '9s', '12s'].map((dur, idx) => (
                <circle key={dur} r={8 + idx * 4} fill="hsl(200 100% 70%)">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="360 0 0"
                    dur={dur}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="r" values={`${8 + idx * 4};${10 + idx * 4};${8 + idx * 4}`} dur={dur} repeatCount="indefinite" />
                </circle>
              ))}
            </g>

            {/* Caption */}
            <g transform="translate(72 72)">
              <rect width="380" height="96" rx="18" fill="hsl(240 10% 12% / 0.92)" stroke="hsl(264 83% 60% / 0.35)" />
              <text x="28" y="46" fill="hsl(200 100% 80%)" fontSize="30" fontWeight="600" letterSpacing="0.12em">
                ALGOVISUALS
              </text>
              <text x="28" y="76" fill="hsl(240 12% 70%)" fontSize="18" letterSpacing="0.28em">
                MOTION  DESIGN  +  SCIENCE
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Mathematical Elements */}
      <div className="absolute -top-8 -left-8 text-6xl text-primary/20 animate-float font-serif">π</div>
      <div className="absolute -bottom-6 -right-6 text-4xl text-secondary/20 animate-float delay-1000">∞</div>
      <div className="absolute top-1/2 -left-12 text-5xl text-accent/20 animate-float delay-500">∑</div>
    </div>
  );
}