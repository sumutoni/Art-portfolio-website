import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiCheckSquare, FiHelpCircle, FiLock, FiMail, FiPackage, FiPhone, FiShield, FiTruck } from "react-icons/fi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { fetchArtworkBySlug } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";
import { SiteFooter } from "../../shared/components/SiteFooter";

function Icon({ IconNode }) {
  return <IconNode className="h-5 w-5 text-gallery-accent" />;
}

export function AcquirePage() {
  const [searchParams] = useSearchParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const slug = searchParams.get("art") || "";
    fetchArtworkBySlug(slug).then(setArtwork).catch(() => setArtwork(null));
  }, [searchParams]);

  const onSubmit = (event) => {
    event.preventDefault();
    alert("Purchase submitted. The studio will confirm payment and delivery details shortly.");
  };

  if (!artwork) {
    return (
      <SiteShell>
        <main className="mx-auto flex min-h-screen w-[min(1320px,95vw)] flex-1 items-center pt-20">Loading acquisition page...</main>
      </SiteShell>
    );
  }

  const includes = [
    ["Certificate of authenticity", "Signed by the artist", FiShield],
    ["Secure encrypted payment", "Your data is protected", RiSecurePaymentLine],
    ["Artwork reservation", "Secured after successful payment", FiCheckSquare],
    ["Private delivery coordination", "Carefully handled and insured", FiTruck],
    ["Direct confirmation", "From the artist's studio", FiMail]
  ];

  const metaRows = [
    ["Year", artwork.year],
    ["Medium", artwork.medium],
    ["Dimensions", artwork.size],
    ["Artwork Price", artwork.price],
    ["Shipping", "Calculated after address"]
  ];

  const labelClass = "text-[0.96rem] text-[color:var(--text)]";
  const inputClass = "mt-1.5 w-full border border-gallery-accent/80 bg-transparent px-3 py-2.5 text-[0.98rem] text-[color:var(--text)] placeholder:text-[color:var(--text-soft)] focus:border-gallery-accent focus:outline-none";
  const panelClass = "glass-panel p-5 md:p-6";

  return (
    <SiteShell>
      <main className="flex-1 px-5 pb-8 pt-20">
        <div className="mx-auto w-[min(1320px,95vw)]">
          <a className="mb-3 inline-block text-[0.98rem] text-gallery-accent" href={`/artwork?art=${encodeURIComponent(artwork.slug)}`}>
            ← Back to artwork
          </a>

          <header className="mb-4">
            <h1 className="font-display text-[clamp(2.2rem,3.4vw,3.2rem)] leading-none text-gallery-lightText dark:text-gallery-text">Acquire Artwork</h1>
            <p className="mt-2 text-[0.98rem] text-[color:var(--text-soft)]">You are moments away from bringing this original work into your collection.</p>
          </header>

          <section className="grid gap-5 lg:grid-cols-[1.03fr_1.68fr_1fr]">
            <aside className={panelClass}>
              <img className="h-[300px] w-full border border-gallery-line object-cover" src={artwork.image} alt="Artwork selected for acquisition" />
              <h2 className="mt-3 font-display text-[2rem] leading-[0.92] text-[color:var(--text)]">{artwork.title}</h2>
              <p className="mt-0.5 text-[1rem] text-gallery-accent">by Denis Mpabuka</p>

              <dl className="mt-3">
                {metaRows.map(([label, value]) => (
                  <div key={label} className={`${label === "Artwork Price" ? "mt-5 border-t border-gallery-line pt-5" : ""} ${label === "Shipping" ? "mb-5 border-b border-gallery-line pb-5" : ""}`}>
                    <div className="flex items-center justify-between gap-4 py-[0.34rem]">
                      <dt className="text-[0.95rem] text-[color:var(--text-soft)]">{label}</dt>
                      <dd className="text-right text-[0.95rem] text-[color:var(--text-soft)]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex items-baseline justify-between text-gallery-accent">
                <span className="font-display text-[2rem]">Total</span>
                <strong className="font-display text-[2rem]">{artwork.price}</strong>
              </div>

              <div className="mt-4 space-y-3 text-[0.98rem] text-[color:var(--text-soft)]">
                <div className="flex gap-3">
                  <Icon IconNode={FiShield} />
                  <div>
                    <p className="leading-tight">Certificate of authenticity</p>
                    <p className="text-[0.88rem] opacity-85">Included with your purchase</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon IconNode={FiPackage} />
                  <div>
                    <p className="leading-tight">Worldwide delivery</p>
                    <p className="text-[0.88rem] opacity-85">Secure and insured shipping</p>
                  </div>
                </div>
              </div>
            </aside>

            <section className={panelClass} aria-labelledby="payment-title">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Icon IconNode={FiLock} />
                  <div>
                    <h3 id="payment-title" className="font-display text-[2.2rem] leading-none text-[color:var(--text)]">Payment Details</h3>
                    <p className="mt-0.5 text-[0.95rem] text-[color:var(--text-soft)]">Securely complete your artwork acquisition.</p>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[1.05rem] font-semibold text-gallery-accent">
                  <span>VISA</span>
                  <span className="inline-block h-4 w-4 rounded-full bg-[#ea001b]" />
                  <span className="-ml-2 inline-block h-4 w-4 rounded-full bg-[#f79e1b]" />
                  <span className="ml-1 rounded bg-[#2f5aa8] px-1.5 py-0.5 text-[0.72rem] tracking-wide text-white">AMEX</span>
                </div>
              </div>

              <form className="grid gap-3" onSubmit={onSubmit}>
                <label className={labelClass}>Cardholder Name<input className={inputClass} type="text" placeholder="Full name as shown on card" required /></label>
                <label className={labelClass}>Card Number<input className={inputClass} type="text" placeholder="1234 1234 1234 1234" required /></label>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className={labelClass}>Expiry Date<input className={inputClass} type="text" placeholder="MM / YY" required /></label>
                  <label className={labelClass}>Security Code (CVC)<input className={inputClass} type="text" placeholder="CVC" required /></label>
                </div>
                <label className={labelClass}>Billing Country
                  <select className={inputClass} required>
                    <option value="">Select country</option>
                    <option>Rwanda</option>
                    <option>Kenya</option>
                    <option>Uganda</option>
                    <option>United States</option>
                  </select>
                </label>
                <label className={labelClass}>Billing Address<input className={inputClass} type="text" placeholder="Street address" required /></label>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className={labelClass}>City<input className={inputClass} type="text" placeholder="City" required /></label>
                  <label className={labelClass}>Postal Code<input className={inputClass} type="text" placeholder="Postal code" required /></label>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className={labelClass}>Email Address<input className={inputClass} type="email" placeholder="you@example.com" required /></label>
                  <label className={labelClass}>Phone Number<input className={inputClass} type="tel" placeholder="+250 7XX XXX XXX" required /></label>
                </div>

                <button className="mt-1 border border-gallery-accent bg-gallery-accent/10 px-4 py-3 text-[0.9rem] uppercase tracking-[0.18em] text-gallery-accent transition hover:bg-gallery-accent/25" type="submit">
                  Complete Purchase — {artwork.price}
                </button>
                <button className="flex items-center justify-center gap-2 text-[0.9rem] text-gallery-accent" type="button">
                  <FiHelpCircle className="h-4 w-4" />
                  <span>Request assistance before paying</span>
                </button>
              </form>
            </section>

            <aside className={panelClass}>
              <h4 className="mb-4 text-[0.9rem] uppercase tracking-[0.15em] text-gallery-accent">Your Acquisition Includes</h4>
              <div className="space-y-3">
                {includes.map(([title, subtitle, IconNode]) => (
                  <div key={title} className="flex gap-3">
                    <Icon IconNode={IconNode} />
                    <div>
                      <p className="text-[1rem] leading-tight text-[color:var(--text)]">{title}</p>
                      <p className="text-[0.9rem] leading-tight text-[color:var(--text-soft)]">{subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gallery-line pt-5">
                <h4 className="mb-2 font-display text-[1.95rem] leading-none text-[color:var(--text)]">Need assistance?</h4>
                <p className="text-[0.95rem] text-[color:var(--text-soft)]">For private collectors, galleries, or special delivery requests, contact the studio before completing payment.</p>
                <button className="mt-4 w-full border border-gallery-accent px-3 py-3 text-[0.9rem] uppercase tracking-[0.14em] text-gallery-accent" type="button">Contact Studio</button>
                <p className="mt-4 flex items-center gap-2 text-[0.98rem] text-[color:var(--text-soft)]"><FiMail className="h-4 w-4 text-gallery-accent" />studio@denismpabuka.com</p>
                <p className="mt-1 flex items-center gap-2 text-[0.98rem] text-[color:var(--text-soft)]"><FiPhone className="h-4 w-4 text-gallery-accent" />+250 788 123 456</p>
              </div>
            </aside>
          </section>

          <p className="mt-5 flex items-center justify-center gap-2 text-center text-[0.98rem] text-[color:var(--text-soft)]"><FiLock className="h-4 w-4 text-gallery-accent" />Your payment information is secure and encrypted. We do not store your card details.</p>
        </div>
      </main>
      <SiteFooter />
    </SiteShell>
  );
}




