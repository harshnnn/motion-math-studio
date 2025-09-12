import landingPoster from "@/assets/demo/landing-poster.jpg";

export default function HeroDemo() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-card border border-border/50">
        {/* Demo Video - For now showing the poster image with animation */}
        <div className="aspect-video bg-surface relative">
          <img 
            src={landingPoster}
            alt="Mathematical animation demo"
            className="w-full h-full object-cover animate-float"
          />
          
          {/* Watermark Badge */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-lg text-sm font-medium border border-border/50">
            Sample — watermarked
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/30 animate-glow-pulse hover:scale-110 transition-transform cursor-pointer">
              <div className="w-0 h-0 border-l-[16px] border-l-primary border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Mathematical Elements */}
      <div className="absolute -top-8 -left-8 text-6xl text-primary/20 animate-float font-serif">π</div>
      <div className="absolute -bottom-6 -right-6 text-4xl text-secondary/20 animate-float delay-1000">∞</div>
      <div className="absolute top-1/2 -left-12 text-5xl text-accent/20 animate-float delay-500">∑</div>
    </div>
  );
}