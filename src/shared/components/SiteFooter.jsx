import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";

export function SiteFooter() {
  return (
    <footer className="border-t border-gallery-line px-5 py-4">
      <div className="mx-auto flex w-[min(1220px,95vw)] flex-wrap items-center justify-between gap-4">
        <p className="font-brand text-2xl tracking-[0.12em] text-gallery-accent">DM</p>
        <nav className="flex flex-wrap items-center gap-6 text-[0.66rem] uppercase tracking-[0.14em] text-gallery-soft">
          <Link to="/#collection">Collection</Link>
          <Link to="/#exhibitions">Exhibitions</Link>
          <Link to="/#home">About</Link>
          <Link to="/#kisanii">Kisanii Space</Link>
          <a href="mailto:studio@denismpabuka.com">Contact</a>
        </nav>
        <div className="flex items-center gap-3 text-gallery-soft">
          <FiInstagram className="h-4 w-4" />
          <FiFacebook className="h-4 w-4" />
          <FiMail className="h-4 w-4" />
        </div>
      </div>
    </footer>
  );
}
