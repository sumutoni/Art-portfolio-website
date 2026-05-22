import { Link } from "react-router-dom";

export function AboutModal({ isOpen, onClose }) {
  return (
    <section
      className={`fixed inset-0 z-[60] ${isOpen ? "flex" : "hidden"} items-start justify-center bg-black/30 pt-[4.8rem]`}
      aria-hidden={!isOpen}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative grid w-[min(1080px,92vw)] gap-5 border border-gallery-accent/40 bg-[rgba(11,11,11,0.35)] p-4 shadow-glass backdrop-blur-xl dark:text-gallery-text text-gallery-lightText md:grid-cols-[1.15fr_1fr] md:items-center md:p-6">
        <button
          className="absolute right-3 top-2 hidden cursor-pointer border-0 bg-transparent text-3xl leading-none text-gallery-text dark:text-gallery-text max-[899px]:block"
          type="button"
          aria-label="Close about panel"
          onClick={onClose}
        >
          ×
        </button>
        <div>
          <p className="kicker">About Denis</p>
          <h2 className="font-display text-5xl leading-none">Denis Mpabuka</h2>
          <p className="mt-3 text-gallery-soft dark:text-gallery-soft text-gallery-lightSoft">
            Denis Mpabuka is a Rwanda-based contemporary artist whose work explores identity, emotion, and social
            inclusion through bold colors and expressive forms. His practice reflects themes of resilience, dignity,
            and the beauty of diversity.
          </p>
          <p className="mt-3 text-gallery-soft dark:text-gallery-soft text-gallery-lightSoft">
            Alongside his artistic work, Denis is the founder of Kisanii Art and Event Space, where he supports and
            promotes emerging artists. His work invites viewers to connect deeply with human experiences and reflect on
            the transformative power of art.
          </p>
          <p className="mt-4">
            <Link className="section-link" to="/gallery">Visit Full Gallery</Link>
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
          alt="Portrait of Denis Mpabuka"
          loading="lazy"
          className="h-[min(50svh,360px)] w-full border border-gallery-line object-cover object-center"
        />
      </div>
    </section>
  );
}
