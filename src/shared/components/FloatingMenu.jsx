import { Link } from "react-router-dom";

export function FloatingMenu({ isOpen, onOpenAbout }) {
  const itemClass = "block w-full px-2 py-2 text-left text-xs uppercase tracking-[0.12em] text-gallery-soft transition hover:bg-gallery-accent/15 hover:text-gallery-text";

  return (
    <div className={`fixed left-5 top-[4.3rem] z-40 ${isOpen ? "block" : "hidden"}`}>
      <nav className="glass-panel min-w-[220px] gap-[0.2rem] p-2" aria-label="Primary">
        <Link className={itemClass} to="/#home">Home</Link>
        <Link className={itemClass} to="/#collection">Collection</Link>
        <Link className={itemClass} to="/#kisanii">Kisanii Space</Link>
        <Link className={itemClass} to="/#exhibitions">Exhibitions</Link>
        <button className={`${itemClass} w-full border-0 bg-transparent`} type="button" onClick={onOpenAbout}>About Denis</button>
        <Link className={itemClass} to="/gallery">Visit Gallery</Link>
      </nav>
    </div>
  );
}
