import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchArtworks } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";
import { useHeroHeader } from "../../shared/hooks/useHeroHeader";

export function HomePage() {
  const [artworks, setArtworks] = useState([]);
  const [isHero, setIsHero] = useState(true);
  const location = useLocation();

  useHeroHeader(true, setIsHero);

  useEffect(() => {
    fetchArtworks().then(setArtworks).catch(() => setArtworks([]));
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const timer = window.setTimeout(scrollToTarget, 40);
    return () => window.clearTimeout(timer);
  }, [location.hash]);

  const featured = useMemo(() => artworks.slice(0, 4), [artworks]);

  return (
    <SiteShell isHero={isHero}>
      <main className="flex-1">
        <section id="home" className="relative grid min-h-screen place-items-center px-5 pb-8 pt-24" aria-label="Hero">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=1600&q=80"
          >
            <source src="https://cdn.coverr.co/videos/coverr-paint-brush-on-canvas-1579/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90" />
          <div className="relative z-10 max-w-[900px] text-center">
            <p className="kicker">Cinematic Gallery</p>
            <h1 className="mt-1 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.02] text-gallery-text">
              Identity, emotion, and dignity in color.
            </h1>
            <p className="mx-auto mb-6 mt-3 max-w-[700px] text-gallery-soft">
              Discover the contemporary paintings of Rwanda-based artist Denis Mpabuka, where expressive forms and bold
              palettes reveal resilience, social inclusion, and the beauty of diversity.
            </p>
            <a
              className="inline-block border border-gallery-accent bg-gallery-accent/15 px-5 py-3 text-xs uppercase tracking-[0.08em] text-gallery-text transition hover:-translate-y-[1px] hover:bg-gallery-accent/30"
              href="#collection"
            >
              Enter Collection
            </a>
          </div>
        </section>

        <section id="collection" className="mx-auto w-[min(1200px,92vw)] py-24" aria-labelledby="collection-title">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="kicker">Collection</p>
              <h2 id="collection-title" className="mt-1 font-display text-[clamp(2rem,5vw,4rem)] leading-none">
                Artworks
              </h2>
            </div>
            <Link className="section-link" to="/gallery">Visit Gallery</Link>
          </div>

          <div className="grid grid-cols-12 gap-5">
            {featured.map((art, index) => (
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

          <div className="mt-7 flex justify-center">
            <Link className="section-link" to="/gallery">Visit Gallery</Link>
          </div>
        </section>

        <section id="kisanii" className="mx-auto w-[min(1200px,92vw)] py-24" aria-labelledby="kisanii-title">
          <div className="grid gap-6 border border-gallery-line bg-black/10 p-[clamp(1rem,2.5vw,2rem)] md:grid-cols-[1.15fr_1fr] md:items-center">
            <div>
              <p className="kicker">Kisanii Space</p>
              <h2 id="kisanii-title" className="mt-1 font-display text-[clamp(2rem,5vw,4rem)] leading-none">
                Kisanii Art and Event Space
              </h2>
              <p className="mt-3 text-gallery-lightSoft dark:text-gallery-soft">
                Founded by Denis Mpabuka, Kisanii Space is a platform dedicated to supporting and promoting emerging
                artists in Rwanda. It is both a creative incubator and a cultural meeting point for exhibitions,
                mentorship, and collaboration.
              </p>
              <p className="mt-3 text-gallery-lightSoft dark:text-gallery-soft">
                Through Kisanii, Denis extends his practice beyond the studio, building inclusive opportunities for new
                artistic voices to be seen, collected, and celebrated.
              </p>
            </div>
            <img
              className="h-[min(60svh,460px)] w-full border border-gallery-line object-cover"
              src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1200&q=80"
              alt="Kisanii art and event space ambience"
              loading="lazy"
            />
          </div>
        </section>

        <section id="exhibitions" className="mx-auto w-[min(1200px,92vw)] py-24" aria-labelledby="exhibitions-title">
          <div className="mb-8">
            <p className="kicker">Exhibitions</p>
            <h2 id="exhibitions-title" className="mt-1 font-display text-[clamp(2rem,5vw,4rem)] leading-none">
              Recent and Upcoming
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              ["Threads of Belonging", "Kigali · Solo Show · March 2026", "An immersive body of work on identity, collective memory, and social inclusion."],
              ["Forms of Resilience", "Nairobi · Group Exhibition · October 2025", "A regional exhibition spotlighting East African contemporary painters."],
              ["Kisanii Emerging Voices", "Kigali · Curated Program · July 2026", "A platform exhibition presenting new artists supported through Kisanii Space."]
            ].map(([title, meta, description]) => (
              <article key={title} className="border border-gallery-line bg-black/10 p-4">
                <h3 className="font-display text-4xl leading-none">{title}</h3>
                <p className="mt-1 text-[0.86rem] uppercase tracking-[0.04em] text-[#8c6e3f] dark:text-gallery-accent">{meta}</p>
                <p className="mt-2 text-gallery-lightSoft dark:text-gallery-soft">{description}</p>
              </article>
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
