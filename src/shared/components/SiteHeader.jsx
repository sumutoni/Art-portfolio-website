export function SiteHeader({ isHero, onOpenAbout, theme, onToggleTheme }) {
  return (
    <header
      className={[
        "fixed top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center px-6 py-2 transition-all duration-300",
        isHero
          ? "border-b border-transparent bg-transparent backdrop-blur-none"
          : "border-b border-gallery-line/70 bg-[rgba(11,11,11,0.02)] backdrop-blur-xl"
      ].join(" ")}
    >
      <div />
      <button
        className={[
          "justify-self-center border-0 bg-transparent font-brand text-[clamp(1.1rem,2.5vw,2rem)] font-bold uppercase tracking-[0.18em] [transform:scaleX(0.9)]",
          isHero
            ? "text-gallery-text"
            : "text-gallery-lightText dark:text-gallery-text"
        ].join(" ")}
        type="button"
        onClick={onOpenAbout}
      >
        DENIS MPABUKA
      </button>
      {/* <button
        className="justify-self-end border border-gallery-line bg-transparent px-2.5 py-1.5 text-[0.75rem] text-gallery-lightText dark:text-gallery-text"
        type="button"
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        onClick={onToggleTheme}
      >
        {theme === "light" ? "☀" : "☾"}
      </button> */}
    </header>
  );
}
