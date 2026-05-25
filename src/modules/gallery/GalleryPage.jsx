import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiHeart } from "react-icons/fi";
import { fetchArtworks } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";
import { SiteFooter } from "../../shared/components/SiteFooter";

const STATUS = ["Available", "Available", "Reserved", "Sold", "Available", "Available"];

export function GalleryPage() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetchArtworks().then(setArtworks).catch(() => setArtworks([]));
  }, []);

  const galleryItems = useMemo(() => {
    if (!artworks.length) return [];
    const padded = [...artworks];
    while (padded.length < 6) padded.push(artworks[padded.length % artworks.length]);
    return padded.slice(0, 6).map((art, index) => ({
      ...art,
      idKey: `${art.slug}-${index}`,
      status: STATUS[index],
      priceLabel: STATUS[index] === "Sold" ? "Sold" : art.price
    }));
  }, [artworks]);

  return (
    <SiteShell>
      <main className="flex-1 px-4 pb-12 pt-24">
        <section className="mx-auto w-[min(1220px,95vw)]" aria-labelledby="gallery-title">
          <div className="grid gap-8 border-b border-gallery-line pb-8 md:grid-cols-[1fr_160px] md:items-end">
            <div>
              <p className="kicker">Collection</p>
              <h1 id="gallery-title" className="mt-2 font-display text-[clamp(2.7rem,6vw,4.8rem)] leading-none text-gallery-text">Full Gallery</h1>
              <p className="mt-4 max-w-[470px] text-[0.97rem] leading-relaxed text-[color:var(--text-soft)]">
                Explore available and archived works by Denis Mpabuka. Each painting reflects identity, emotion, dignity,
                and the beauty of diversity.
              </p>
            </div>
            <div className="border-l border-gallery-line pl-5">
              <p className="font-display text-6xl leading-none text-gallery-accent">24</p>
              <p className="mt-1 text-[0.72rem] uppercase tracking-[0.16em] text-gallery-soft">Works</p>
              <p className="mt-5 text-[0.87rem] leading-relaxed text-[color:var(--text-soft)]">Original paintings.<br />Available worldwide.</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-b border-gallery-line pb-4 text-[0.7rem] uppercase tracking-[0.1em]">
            {["All Works", "Available", "Sold", "New Works"].map((tab, index) => (
              <button
                key={tab}
                className={`border px-3 py-1.5 ${index === 0 ? "border-gallery-accent bg-gallery-accent/10 text-gallery-accent" : "border-gallery-line text-gallery-soft"}`}
                type="button"
              >
                {tab}
              </button>
            ))}
            {["Medium", "Size", "Price Range"].map((filter) => (
              <button key={filter} className="inline-flex items-center gap-2 border border-gallery-line px-3 py-1.5 text-gallery-soft" type="button">
                <span>{filter}</span>
                <FiChevronDown className="h-3 w-3" />
              </button>
            ))}
            <button className="ml-auto inline-flex items-center gap-2 text-gallery-soft" type="button">
              <span>Sort by: Newest</span>
              <FiChevronDown className="h-3 w-3" />
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {galleryItems.map((art) => (
              <article key={art.idKey} className="overflow-hidden border border-gallery-line bg-black/10">
                <div className="relative">
                  <img className="h-[240px] w-full object-cover md:h-[265px]" src={art.image} alt={`${art.title} by Denis Mpabuka`} loading="lazy" />
                  <span className="absolute left-3 top-3 border border-gallery-accent bg-black/45 px-2 py-1 text-[0.58rem] uppercase tracking-[0.13em] text-gallery-accent">
                    {art.status}
                  </span>
                  <button className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-gallery-line bg-black/45 text-gallery-soft" type="button" aria-label="Save artwork">
                    <FiHeart className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <h2 className="font-display text-[2rem] leading-none text-gallery-text">{art.title}</h2>
                    <p className="mt-2 text-[0.82rem] text-[color:var(--text-soft)]">{art.medium} · {art.year}</p>
                    <p className="mt-1 text-[0.82rem] text-[color:var(--text-soft)]">{art.size}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-display text-4xl leading-none ${art.status === "Sold" ? "text-[color:var(--text-soft)]" : "text-gallery-accent"}`}>{art.priceLabel}</p>
                    <Link className="mt-3 inline-flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.12em] text-gallery-soft hover:text-gallery-text" to={`/artwork?art=${encodeURIComponent(art.slug)}`}>
                      View Artwork <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 border border-gallery-line px-6 py-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] text-gallery-text">Interested in a private viewing or a commissioned piece?</p>
              <p className="mt-1 text-[0.9rem] text-[color:var(--text-soft)]">Connect with the studio for inquiries and private access.</p>
            </div>
            <button className="border border-gallery-accent px-7 py-3 text-[0.72rem] uppercase tracking-[0.15em] text-gallery-accent" type="button">
              Contact Studio <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </SiteShell>
  );
}




