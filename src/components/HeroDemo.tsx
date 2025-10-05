export default function HeroDemo() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-surface/80 backdrop-blur-sm shadow-card">
        <div className="aspect-video">
          <svg
            viewBox="0 0 960 540"
            role="img"
            aria-labelledby="hero-visual-title hero-visual-desc"
            className="h-full w-full"
          >
            <title id="hero-visual-title">AlgoVisuals seamless motion showcase</title>
            <desc id="hero-visual-desc">
              An endless loop depicting algorithmic flow, mathematical surfaces, and orbital systems with cinematic transitions.
            </desc>

            <defs>
              <radialGradient id="bgGlow" cx="52%" cy="48%" r="68%">
                <stop offset="0%" stopColor="hsl(200 95% 72% / 0.38)" />
                <stop offset="45%" stopColor="hsl(266 92% 70% / 0.22)" />
                <stop offset="100%" stopColor="hsl(240 18% 10% / 0.18)" />
              </radialGradient>
              <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(200 100% 70% / 0.35)" />
                <stop offset="100%" stopColor="hsl(200 100% 70% / 0)" />
              </radialGradient>
              <linearGradient id="gridSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(200 100% 72% / 0.35)" />
                <stop offset="100%" stopColor="hsl(264 95% 72% / 0.15)" />
              </linearGradient>
              <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path
                id="flowPath"
                d="M120 400 C200 360 260 290 340 270 C460 240 540 320 620 300 C720 276 780 220 840 200"
              />
              <clipPath id="frameMask">
                <rect x="32" y="32" width="896" height="476" rx="28" />
              </clipPath>
            </defs>

            <rect width="960" height="540" fill="hsl(237 18% 10%)" />
            <rect width="960" height="540" fill="url(#bgGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 480 270"
                to="360 480 270"
                dur="18s"
                repeatCount="indefinite"
              />
            </rect>

            <g clipPath="url(#frameMask)">
              {/* Emanating pulse */}
              <circle cx="480" cy="270" r="160" fill="url(#pulse)">
                <animate
                  attributeName="r"
                  dur="9s"
                  values="120;180;120"
                  repeatCount="indefinite"
                  keyTimes="0;0.5;1"
                  keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                />
                <animate
                  attributeName="opacity"
                  dur="9s"
                  values="0.28;0.45;0.28"
                  repeatCount="indefinite"
                  keyTimes="0;0.5;1"
                  keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                />
              </circle>

              {/* Tilted grid */}
              <g transform="translate(0 40)">
                <g stroke="url(#gridSheen)" strokeWidth="0.8" opacity="0.45">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line
                      key={`gv-${i}`}
                      x1={50 + i * 46}
                      y1={80}
                      x2={300 + i * 34}
                      y2={520}
                    />
                  ))}
                  {Array.from({ length: 16 }).map((_, i) => (
                    <line key={`gh-${i}`} x1={40} y1={90 + i * 28} x2={900} y2={210 + i * 24} />
                  ))}
                </g>
                <rect width="960" height="480" fill="hsl(237 18% 12% / 0.6)" />
              </g>

              {/* Flow line */}
              <use href="#flowPath" fill="none" stroke="hsl(200 100% 72% / 0.16)" strokeWidth="14" />
              <use
                href="#flowPath"
                fill="none"
                stroke="hsl(200 100% 72%)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="20 16"
                opacity="0.9"
              >
                <animate attributeName="stroke-dashoffset" dur="8s" values="0;-288" repeatCount="indefinite" />
              </use>

              {/* Beacon nodes */}
              {[
                { offset: 0.18, color: "hsl(196 100% 78%)" },
                { offset: 0.46, color: "hsl(261 95% 75%)" },
                { offset: 0.74, color: "hsl(45 100% 72%)" },
              ].map(({ offset, color }) => (
                <circle key={offset} r="18" fill={color} filter="url(#softGlow)">
                  <animateMotion
                    dur="8s"
                    repeatCount="indefinite"
                    rotate="auto"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    begin={`-${offset * 8}s`}
                    path="M120 400 C200 360 260 290 340 270 C460 240 540 320 620 300 C720 276 780 220 840 200"
                  />
                </circle>
              ))}

              {/* Surface waves */}
              <g transform="translate(90 140)">
                <path
                  d="M0 200 C120 120 240 150 360 130 C480 110 600 160 720 120"
                  fill="none"
                  stroke="hsl(240 30% 46% / 0.55)"
                  strokeWidth="8"
                />
                <path
                  d="M0 200 C120 120 240 150 360 130 C480 110 600 160 720 120"
                  fill="none"
                  stroke="hsl(200 100% 72% / 0.82)"
                  strokeWidth="6"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="d"
                    dur="10s"
                    repeatCount="indefinite"
                    values="M0 200 C120 120 240 150 360 130 C480 110 600 160 720 120;M0 210 C120 100 240 160 360 110 C480 130 600 150 720 130;M0 200 C120 120 240 150 360 130 C480 110 600 160 720 120"
                    keyTimes="0;0.5;1"
                    keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                  />
                </path>
              </g>

              {/* Orbital system */}
              <g transform="translate(660 280)">
                <circle r="100" fill="none" stroke="hsl(264 92% 72% / 0.3)" strokeWidth="1.5" />
                <circle r="160" fill="none" stroke="hsl(200 100% 72% / 0.24)" strokeWidth="1.5" />
                <circle r="28" fill="hsl(215 100% 78% / 0.9)" filter="url(#softGlow)">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="14s"
                    values="0 0 0;360 0 0"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                  />
                </circle>
                {[{ r: 8, d: 9 }, { r: 11, d: 13 }, { r: 14, d: 17 }].map(({ r, d }, idx) => (
                  <circle key={idx} cx="0" cy={100 + idx * 20} r={r} fill="hsl(200 100% 70%)">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      dur={`${d}s`}
                      values="0 0 0;360 0 0"
                      repeatCount="indefinite"
                      keyTimes="0;1"
                    />
                    <animate
                      attributeName="r"
                      dur={`${d}s`}
                      values={`${r};${r + 3};${r}`}
                      repeatCount="indefinite"
                      keyTimes="0;0.5;1"
                      keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                    />
                  </circle>
                ))}
              </g>

              {/* Floating math glyphs */}
              {[
                { x: 160, y: 430, char: "∑" },
                { x: 780, y: 140, char: "π" },
                { x: 520, y: 380, char: "∞" },
              ].map(({ x, y, char }, idx) => (
                <text
                  key={char}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fontSize="58"
                  fill="hsl(200 100% 72% / 0.16)"
                >
                  {char}
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    dur="12s"
                    values="0 0;0 -14;0 0"
                    repeatCount="indefinite"
                    keyTimes="0;0.5;1"
                    begin={`${idx * 1.8}s`}
                    keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                  />
                </text>
              ))}

              {/* Caption tile */}
              <g transform="translate(72 72)">
                <rect width="400" height="104" rx="22" fill="hsl(240 10% 12% / 0.9)" stroke="hsl(266 92% 72% / 0.35)" />
                <text x="32" y="50" fill="hsl(200 100% 82%)" fontSize="30" fontWeight="600" letterSpacing="0.14em">
                  ALGOVISUALS
                </text>
                <text x="32" y="80" fill="hsl(240 12% 72%)" fontSize="18" letterSpacing="0.32em">
                  MOTION  DESIGN  ×  SCIENCE
                </text>
              </g>
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