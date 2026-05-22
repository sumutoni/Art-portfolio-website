import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArtworkBySlug } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";

export function ArtworkPage() {
  const [searchParams] = useSearchParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const slug = searchParams.get("art") || "";
    fetchArtworkBySlug(slug).then(setArtwork).catch(() => setArtwork(null));
  }, [searchParams]);

  if (!artwork) {
    return (
      <SiteShell>
        <main className="mx-auto flex min-h-screen w-[min(1200px,92vw)] flex-1 items-center pt-20">Loading artwork...</main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="flex-1 px-4 pt-20">
        <section className="mx-auto grid w-[min(1200px,92vw)] gap-6 py-20 md:grid-cols-[1.3fr_1fr] md:items-start" aria-live="polite">
          <div>
            <img className="h-[min(75svh,680px)] w-full border border-gallery-line object-cover" src={artwork.image} alt={`Selected artwork ${artwork.title}`} />
          </div>
          <div>
            <p className="kicker">Artwork Details</p>
            <h1 className="mt-1 font-display text-[clamp(2rem,4.2vw,3.3rem)] leading-[1.04] text-gallery-lightText dark:text-gallery-text">{artwork.title}</h1>
            <p className="mt-3 text-gallery-lightSoft dark:text-gallery-soft">{artwork.story}</p>
            <ul className="mt-5 text-gallery-lightSoft dark:text-gallery-soft">
              <li className="mb-1">Year: {artwork.year}</li>
              <li className="mb-1">Medium: {artwork.medium}</li>
              <li className="mb-1">Dimensions: {artwork.size}</li>
              <li className="mb-1">Price: {artwork.price}</li>
            </ul>
            <div className="mt-7">
              <a
                className="inline-block border border-gallery-accent bg-gallery-accent/15 px-5 py-3 text-xs uppercase tracking-[0.08em] text-gallery-lightText transition hover:-translate-y-[1px] hover:bg-gallery-accent/30 dark:text-gallery-text"
                href={`/acquire?art=${encodeURIComponent(artwork.slug)}`}
              >
                Acquire Artwork
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gallery-line px-6 py-6 text-center text-gallery-soft">
        <p>© {new Date().getFullYear()} Denis Mpabuka Studio</p>
      </footer>
    </SiteShell>
  );
}
