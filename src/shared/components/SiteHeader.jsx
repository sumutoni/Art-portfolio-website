import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";

export function SiteHeader({ isHero, onOpenAbout, onToggleMenu, theme, onToggleTheme }) {
  return (
    <header className="fixed top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center bg-transparent px-5 py-3 transition-all duration-300 md:px-7">
      <button
        className="inline-flex items-center gap-2 border-0 bg-transparent text-[0.68rem] uppercase tracking-[0.15em] text-gallery-text md:text-[0.72rem]"
        type="button"
        onClick={onToggleMenu}
      >
        <FiMenu className="h-3.5 w-3.5" />
        <span>Menu</span>
      </button>

      <button
        className="justify-self-center border-0 bg-transparent font-brand text-[clamp(1rem,2vw,1.6rem)] font-bold uppercase tracking-[0.2em] [transform:scaleX(0.88)] text-gallery-text"
        type="button"
        onClick={onOpenAbout}
      >
        DENIS MPABUKA
      </button>

      <div className="justify-self-end flex items-center gap-4">
        <nav className="hidden items-center gap-4 md:flex">
          <Link className="text-[0.64rem] uppercase tracking-[0.15em] text-gallery-text/90 hover:text-gallery-text" to="/#collection">Collection</Link>
          <Link className="text-[0.64rem] uppercase tracking-[0.15em] text-gallery-text/90 hover:text-gallery-text" to="/#exhibitions">Exhibitions</Link>
          <button className="text-[0.64rem] uppercase tracking-[0.15em] text-gallery-text/90 hover:text-gallery-text border-0 bg-transparent" type="button" onClick={onOpenAbout}>About</button>
        </nav>
        <button
          className="grid h-8 w-8 place-items-center border border-gallery-line bg-transparent text-gallery-text transition hover:border-gallery-accent hover:text-gallery-accent"
          type="button"
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          onClick={onToggleTheme}
        >
          {theme === "light" ? <FiMoon className="h-3.5 w-3.5" /> : <FiSun className="h-3.5 w-3.5" />}
        </button>
      </div>
    </header>
  );
}
