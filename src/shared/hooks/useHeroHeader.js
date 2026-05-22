import { useEffect } from "react";

export function useHeroHeader(isEnabled, setIsHero) {
  useEffect(() => {
    if (!isEnabled) {
      setIsHero(false);
      return;
    }

    const hero = document.getElementById("home");
    const sync = () => {
      if (!hero) return;
      const headerHeight = 72;
      const inHero = hero.getBoundingClientRect().bottom > headerHeight;
      setIsHero(inHero);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [isEnabled, setIsHero]);
}
