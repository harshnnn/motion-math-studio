import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType } from "react";

interface LazySectionProps {
  loader: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  componentProps?: Record<string, unknown>;
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
}

export function LazySection({
  loader,
  fallback = null,
  className,
  style,
  componentProps,
  once = true,
  rootMargin = "200px",
  threshold = 0.1,
}: LazySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const LazyComponent = useMemo(() => lazy(loader), [loader]);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setShouldLoad(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setShouldLoad(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold, shouldLoad]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {shouldLoad ? (
        <Suspense fallback={fallback}>
          <LazyComponent {...(componentProps ?? {})} />
        </Suspense>
      ) : (
        fallback ?? null
      )}
    </div>
  );
}
