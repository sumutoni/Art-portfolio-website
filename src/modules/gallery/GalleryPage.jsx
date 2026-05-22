import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArtworks } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";

export function GalleryPage() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetchArtworks().then(setArtworks).catch(() => setArtworks([]));
  }, []);

  return (
    <SiteShell>
      <main className="flex-1 px-4 pt-20">
        <section className="mx-auto w-[min(1200px,92vw)] py-24" aria-labelledby="gallery-title">
          <div className="mb-8">
            <p className="kicker">Collection</p>
            <h1 id="gallery-title" className="mt-1 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-none">Full Gallery</h1>
          </div>
          <div className="grid grid-cols-12 gap-5">
            {artworks.map((art, index) => (
              <Link
                key={art.slug}
                className={`col-span-12 overflow-hidden border border-gallery-line bg-black/10 transition hover:-translate-y-1 hover:border-gallery-accent ${index % 2 === 0 ? "md:col-span-5" : "md:col-span-7"}`}
                to={`/artwork?art=${encodeURIComponent(art.slug)}`}
              >
                <img className="h-[clamp(240px,32vw,460px)] w-full object-cover" src={art.image} alt={`${art.title} by Denis Mpabuka`} loading="lazy" />
                <div className="border-t border-gallery-line p-4">
                  <h3 className="font-display text-3xl">{art.title}</h3>
                  <p className="text-sm text-gallery-lightSoft dark:text-gallery-soft">{art.year} · {art.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-gallery-line px-6 py-6 text-center text-gallery-soft">
        <p>© {new Date().getFullYear()} Denis Mpabuka Studio</p>
      </footer>
    </SiteShell>
  );
}
