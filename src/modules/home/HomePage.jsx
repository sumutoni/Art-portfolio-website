import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchArtworks } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";
import { SiteFooter } from "../../shared/components/SiteFooter";
import { useHeroHeader } from "../../shared/hooks/useHeroHeader";

export function HomePage() {
  const [artworks, setArtworks] = useState([]);
  const [isHero, setIsHero] = useState(true);
  const [heroStage, setHeroStage] = useState(0);
  const location = useLocation();

  useHeroHeader(true, setIsHero);

  useEffect(() => {
    fetchArtworks().then(setArtworks).catch(() => setArtworks([]));
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroStage(1), 3000);
    return () => window.clearTimeout(timer);
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
        <section id="home" className="relative min-h-screen overflow-hidden" aria-label="Hero">
          <div className={`absolute inset-0 transition-opacity duration-[1200ms] ${heroStage === 0 ? "opacity-100" : "opacity-0"}`}>
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=2000&q=80"
              alt="Denis Mpabuka artwork texture"
            />
            <div className="hero-overlay absolute inset-0" />
            <div className="absolute inset-0 grid place-items-center px-5 text-center">
              <div>
                <p className="kicker">Contemporary Painter · Rwanda</p>
                <h1 className="mt-2 font-display text-[clamp(2.5rem,7vw,5.4rem)] leading-[0.95] text-gallery-text">Denis Mpabuka</h1>
                <p className="mt-3 text-[1.1rem] italic text-[#e4dccd]">Stories of identity, memory, and becoming</p>
                <a className="mt-7 inline-block border-b border-gallery-accent pb-1 text-[0.75rem] uppercase tracking-[0.16em] text-gallery-text" href="#collection">
                  Explore the Collection
                </a>
              </div>
            </div>
          </div>

          <div className={`absolute inset-0 transition-opacity duration-[1400ms] ${heroStage === 1 ? "opacity-100" : "opacity-0"}`}>
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=2000&q=80"
            >
              <source src="https://cdn.coverr.co/videos/coverr-painting-in-the-workshop-1571692365448/1080p.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay absolute inset-0" />
            <div className="absolute left-[7%] top-1/2 max-w-[520px] -translate-y-1/2 text-left">
              <p className="kicker">The Studio</p>
              <h2 className="mt-1 font-display text-[clamp(2.1rem,5vw,4rem)] leading-[0.95] text-gallery-text">Where emotion takes form.</h2>
              <p className="mt-4 max-w-[420px] text-[#d3ccbf]">Close-up brushwork, quiet studio atmosphere, and cinematic reveals of finished artwork.</p>
              <a className="mt-7 inline-flex items-center gap-3 border border-gallery-accent px-5 py-3 text-[0.72rem] uppercase tracking-[0.14em] text-gallery-text" href="#collection">
                Discover the Work <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section id="collection" className="relative min-h-screen overflow-hidden" aria-labelledby="collection-title">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=2200&q=80"
            alt="Gallery room featuring contemporary paintings"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,8,0.86)_0%,rgba(5,6,8,0.64)_34%,rgba(5,6,8,0.3)_66%,rgba(5,6,8,0.16)_100%)]" />
          <div className="relative z-10 flex min-h-screen items-center px-[7vw]">
            <div className="max-w-[440px]">
              <p className="kicker">Step Into the World</p>
              <h2 id="collection-title" className="mt-2 font-display text-[clamp(2.3rem,5vw,4.6rem)] leading-[0.95] text-gallery-text">Art that speaks beyond time.</h2>
              <p className="mt-4 text-[#d0c8bb]">Explore paintings that reflect resilience, heritage, and the beauty of becoming.</p>
              <Link className="mt-8 inline-flex items-center gap-3 border-b border-gallery-accent pb-1 text-[0.75rem] uppercase tracking-[0.16em] text-gallery-text" to="/gallery">
                Explore the Collection <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="kisanii" className="mx-auto w-[min(1240px,92vw)] py-24" aria-labelledby="kisanii-title">
          <div className="grid gap-6 glass-panel p-[clamp(1rem,2.5vw,2rem)] md:grid-cols-[1.15fr_1fr] md:items-center">
            <div>
              <p className="kicker">Kisanii Space</p>
              <h2 id="kisanii-title" className="mt-1 font-display text-[clamp(2rem,5vw,4.4rem)] leading-none">Kisanii Art and Event Space</h2>
              <p className="mt-3 text-[color:var(--text-soft)]">Founded by Denis Mpabuka, Kisanii Space is a platform dedicated to supporting and promoting emerging artists in Rwanda.</p>
            </div>
            <img className="h-[min(60svh,460px)] w-full border border-gallery-line object-cover" src="https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=1200&q=80" alt="Kisanii space" loading="lazy" />
          </div>
        </section>

        <section id="exhibitions" className="mx-auto w-[min(1240px,92vw)] py-24" aria-labelledby="exhibitions-title">
          <div className="mb-8">
            <p className="kicker">Exhibitions</p>
            <h2 id="exhibitions-title" className="mt-1 font-display text-[clamp(2rem,5vw,4.4rem)] leading-none">Recent and Upcoming</h2>
          </div>
          <div className="grid gap-4">
            {[
              ["Threads of Belonging", "Kigali · Solo Show · March 2026", "An immersive body of work on identity, collective memory, and social inclusion."],
              ["Forms of Resilience", "Nairobi · Group Exhibition · October 2025", "A regional exhibition spotlighting East African contemporary painters."],
              ["Kisanii Emerging Voices", "Kigali · Curated Program · July 2026", "A platform exhibition presenting new artists supported through Kisanii Space."]
            ].map(([title, meta, description]) => (
              <article key={title} className="glass-panel p-5">
                <h3 className="font-display text-5xl leading-none">{title}</h3>
                <p className="mt-2 text-[0.86rem] uppercase tracking-[0.12em] text-gallery-accent">{meta}</p>
                <p className="mt-2 text-[color:var(--text-soft)]">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </SiteShell>
  );
}




