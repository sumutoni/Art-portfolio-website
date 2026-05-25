import { useEffect, useMemo, useRef, useState } from "react";
import { fetchArtworks } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";
import { Link } from "react-router-dom";

export function ArtworkPage() {
  const [artworks, setArtworks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedSlug = params.get("art") || "";

    fetchArtworks()
      .then((items) => {
        if (!items.length) {
          setArtworks([]);
          return;
        }

        const startIndex = Math.max(0, items.findIndex((item) => item.slug === selectedSlug));
        const ordered = [...items.slice(startIndex), ...items.slice(0, startIndex)];
        setArtworks(ordered);
      })
      .catch(() => setArtworks([]));
  }, []);

  useEffect(() => {
    if (!artworks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index") || 0);
          setActiveIndex(index);
        });
      },
      { threshold: 0.62 }
    );

    sectionsRef.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, [artworks]);

  const total = artworks.length;
  const current = useMemo(() => String(activeIndex + 1).padStart(2, "0"), [activeIndex]);
  const totalLabel = useMemo(() => String(total).padStart(2, "0"), [total]);

  if (!artworks.length) {
    return (
      <SiteShell>
        <main className="mx-auto flex min-h-screen w-[min(1200px,92vw)] flex-1 items-center pt-20">Loading artwork...</main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="h-screen overflow-y-auto snap-y snap-mandatory pt-16">
        {artworks.map((artwork, index) => (
          <section
            key={artwork.slug}
            ref={(node) => {
              sectionsRef.current[index] = node;
            }}
            data-index={index}
            className="relative snap-start min-h-screen px-4 py-8 md:px-8"
            aria-live="polite"
          >
            <div className="mx-auto grid h-[calc(100vh-7rem)] w-[min(1320px,95vw)] gap-0 overflow-hidden md:grid-cols-[1fr_1.05fr]">
              <div className="flex items-center p-[clamp(1rem,2.2vw,2rem)]">
                <div className="max-w-[430px]">
                  <p className="kicker">Featured Work</p>
                  <h1 className="mt-2 font-display text-[clamp(2.3rem,4.8vw,4.7rem)] leading-[0.95] text-gallery-text">{artwork.title}</h1>
                  <p className="mt-3 text-[0.86rem] uppercase tracking-[0.1em] text-gallery-accent">{artwork.year} · {artwork.medium} · {artwork.size}</p>
                  <p className="mt-5 max-w-[360px] text-[color:var(--text-soft)]">{artwork.story}</p>
                  <Link
                    className="mt-8 inline-block text-[0.75rem] uppercase tracking-[0.15em] text-gallery-text pb-5 border-b-2 border-gallery-lightAccent"
                    to={`/acquire?art=${encodeURIComponent(artwork.slug)}`}
                  >
                    Acquire Artwork
                  </Link>
                </div>
              </div>
              <img className="mt-10 h-full w-full object-cover" src={artwork.image} alt={`Selected artwork ${artwork.title}`} />
            </div>

            <div className="pointer-events-none absolute bottom-7 left-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.12em] text-gallery-text">
              <span>{current} / {totalLabel}</span>
              <span className="h-px w-8 bg-gallery-accent" />
              <span>Scroll</span>
            </div>
          </section>
        ))}
      </main>
    </SiteShell>
  );
}
