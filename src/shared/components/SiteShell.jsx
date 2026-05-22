import { useEffect, useState } from "react";
import { AboutModal } from "./AboutModal";
import { FloatingMenu } from "./FloatingMenu";
import { SiteHeader } from "./SiteHeader";
import { useTheme } from "../hooks/useTheme";

const GRAIN_STYLE = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='7' cy='6' r='1'/%3E%3Ccircle cx='37' cy='28' r='1'/%3E%3Ccircle cx='62' cy='44' r='1'/%3E%3Ccircle cx='96' cy='18' r='1'/%3E%3Ccircle cx='103' cy='75' r='1'/%3E%3Ccircle cx='24' cy='93' r='1'/%3E%3C/g%3E%3C/svg%3E\")"
};

export function SiteShell({ children, isHero = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setIsAboutOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[45]" style={GRAIN_STYLE} />
      <SiteHeader isHero={isHero} onOpenAbout={() => setIsAboutOpen(true)} theme={theme} onToggleTheme={toggleTheme} />
      <FloatingMenu
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((current) => !current)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <div className="flex min-h-screen flex-col">{children}</div>
    </>
  );
}
