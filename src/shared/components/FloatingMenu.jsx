import { Link } from "react-router-dom";

export function FloatingMenu({ isOpen, onToggle, onOpenAbout }) {
  const itemClass = "px-2 py-1.5 text-left text-xs uppercase tracking-[0.08em] text-gallery-lightSoft transition hover:bg-gallery-accent/15 hover:text-gallery-lightText dark:text-gallery-soft dark:hover:text-gallery-text";

  return (
    <div className="fixed left-4 top-[5.6rem] z-40 grid gap-2 max-[899px]:left-2.5 max-[899px]:top-[5.1rem]">
      <button
        className="h-11 w-11 border border-gallery-line/70 bg-[rgba(11,11,11,0.005)] text-gallery-lightText backdrop-blur-xl dark:text-gallery-text"
        type="button"
        aria-controls="floating-menu"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Collapse menu" : "Expand menu"}
        onClick={onToggle}
      >
        ☰
      </button>
      <nav
        id="floating-menu"
        className={`${isOpen ? "grid" : "hidden"} min-w-[186px] gap-[0.15rem] border border-gallery-line/70 bg-[rgba(11,11,11,0.005)] p-2 backdrop-blur-xl`}
        aria-label="Primary"
      >
        <Link className={itemClass} to="/#home">Home</Link>
        <Link className={itemClass} to="/#collection">Collection</Link>
        <Link className={itemClass} to="/#kisanii">Kisanii Space</Link>
        <Link className={itemClass} to="/#exhibitions">Exhibitions</Link>
        <button className={itemClass + " border-0 bg-transparent"} type="button" onClick={onOpenAbout}>About</button>
        <Link className={itemClass} to="/gallery">Visit Gallery</Link>
      </nav>
    </div>
  );
}
