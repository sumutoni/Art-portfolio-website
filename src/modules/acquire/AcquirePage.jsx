import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArtworkBySlug } from "../../core/services/artworkService";
import { SiteShell } from "../../shared/components/SiteShell";
import { FiLock, FiShield, FiPackage, FiTruck, FiMail, FiPhone, FiHelpCircle, FiCheckSquare } from "react-icons/fi";
import { RiSecurePaymentLine } from "react-icons/ri";

function Icon({ IconNode }) {
  return (
    <IconNode className="text-gallery-accent h-5 w-5" />
  );
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

  const metaRows = [
    ["Year", artwork.year],
    ["Medium", artwork.medium],
    ["Dimensions", artwork.size],
    ["Artwork Price", artwork.price],
    ["Shipping", "Calculated after address"]
  ];

  const includes = [
    ["Certificate of authenticity", "Signed by the artist", FiShield],
    ["Secure encrypted payment", "Your data is protected", RiSecurePaymentLine],
    ["Artwork reservation", "Secured after successful payment", FiCheckSquare],
    ["Private delivery coordination", "Carefully handled and insured", FiTruck],
    ["Direct confirmation", "From the artist's studio", FiMail]
  ];

  const inputClass = "mt-1.5 w-full border border-gallery-accent/65 bg-transparent px-3 py-2.5 text-[0.98rem] text-gallery-lightText placeholder:text-gallery-lightSoft focus:border-gallery-accent focus:outline-none dark:text-[#efe8d8] dark:placeholder:text-[#7f8389]";
  const cardClass = "border border-gallery-accent/40 bg-[rgba(255,255,255,0.58)] px-6 py-5 dark:bg-[linear-gradient(126deg,rgba(9,9,8,0.95),rgba(19,16,10,0.78))]";

  return (
    <SiteShell>
      <main className="flex-1 px-5 pb-8 pt-20">
        <div className="mx-auto w-[min(1320px,95vw)]">
          <a className="mb-3 inline-block text-[0.98rem] text-gallery-accent" href={`/artwork?art=${encodeURIComponent(artwork.slug)}`}>
            ← Back to artwork
          </a>

          <header className="mb-4">
            <h1 className="font-display text-[clamp(2.2rem,3.4vw,3.2rem)] leading-none text-gallery-lightText dark:text-gallery-text">Acquire Artwork</h1>
            <p className="mt-2 text-[0.98rem] text-gallery-lightSoft dark:text-gallery-soft">
              You are moments away from bringing this original work into your collection.
            </p>
          </header>

          <section className="grid gap-5 lg:grid-cols-[1.03fr_1.68fr_1fr]" aria-label="Artwork purchase layout">
            <aside className={`${cardClass} text-gallery-lightText dark:text-[#f2efea]`}>
              <img className="h-[300px] w-full object-cover" src={artwork.image} alt="Artwork selected for acquisition" />

              <h2 className="mt-3 font-display text-[2rem] leading-[0.92]">{artwork.title}</h2>
              <p className="mt-0.5 text-[1rem] text-[#8c6e3f] dark:text-[#c8b08a]">by Denis Mpabuka</p>

              <dl className="mt-3">
                {metaRows.map(([label, value]) => (
                  <div className={`${label === 'Artwork Price'? 'mt-5 pt-5 border-t border-gallery-lightAccent/30':label === 'Shipping'? 'mb-5 pb-5 border-b border-gallery-lightAccent/30': ''}`}>
                    <div key={label} className="flex items-center justify-between gap-4 py-[0.34rem]">
                      <dt className="text-[0.95rem] text-gallery-lightSoft dark:text-[#d2cec6]">{label}</dt>
                      <dd className="text-right text-[0.95rem] text-gallery-lightSoft dark:text-[#d2cec6]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex items-baseline justify-between text-[#8c6e3f] dark:text-[#d5c49f]">
                <span className="font-display font-semibold text-[2rem]">Total</span>
                <strong className="font-display text-[2rem] font-semibold">{artwork.price}</strong>
              </div>

              <div className="mt-4 space-y-3 text-[0.98rem] text-gallery-lightSoft dark:text-[#d8d2c7]">
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

            <section className={`${cardClass} text-gallery-lightText dark:text-[#f2efea]`} aria-labelledby="payment-title">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex gap-3 items-center">
                  <Icon IconNode={FiLock} />
                  <div>
                    <h3 id="payment-title" className="font-display text-[2.2rem] leading-none">Payment Details</h3>
                    <p className="mt-0.5 text-[0.95rem] text-gallery-lightSoft dark:text-[#bfb8aa]">Securely complete your artwork acquisition.</p>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[1.05rem] font-semibold">
                  <span>VISA</span>
                  <span className="inline-block h-4 w-4 rounded-full bg-[#ea001b]" />
                  <span className="-ml-2 inline-block h-4 w-4 rounded-full bg-[#f79e1b]" />
                  <span className="ml-1 rounded bg-[#2f5aa8] px-1.5 py-0.5 text-[0.72rem] tracking-wide text-white">AMEX</span>
                </div>
              </div>

              <form className="grid gap-3" onSubmit={onSubmit}>
                <label className="text-[0.96rem]">Cardholder Name<input className={inputClass} type="text" placeholder="Full name as shown on card" required /></label>

                <label className="text-[0.96rem]">Card Number<input className={inputClass} type="text" placeholder="1234 1234 1234 1234" required /></label>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-[0.96rem]">Expiry Date<input className={inputClass} type="text" placeholder="MM / YY" required /></label>
                  <label className="text-[0.96rem]">Security Code (CVC)<input className={inputClass} type="text" placeholder="CVC" required /></label>
                </div>

                <label className="text-[0.96rem]">Billing Country
                  <select className={inputClass} required>
                    <option value="">Select country</option>
                    <option>Rwanda</option>
                    <option>Kenya</option>
                    <option>Uganda</option>
                    <option>United States</option>
                  </select>
                </label>

                <label className="text-[0.96rem]">Billing Address<input className={inputClass} type="text" placeholder="Street address" required /></label>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-[0.96rem]">City<input className={inputClass} type="text" placeholder="City" required /></label>
                  <label className="text-[0.96rem]">Postal Code<input className={inputClass} type="text" placeholder="Postal code" required /></label>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-[0.96rem]">Email Address<input className={inputClass} type="email" placeholder="you@example.com" required /></label>
                  <label className="text-[0.96rem]">Phone Number<input className={inputClass} type="tel" placeholder="+250 7XX XXX XXX" required /></label>
                </div>

                <button
                  className="mt-1 border border-gallery-accent bg-gallery-accent/16 px-4 py-3 text-[0.9rem] uppercase tracking-[0.18em] text-[#8c6e3f] transition hover:bg-gallery-accent/26 dark:text-[#f0e6d1]"
                  type="submit"
                >
                  Complete Purchase — {artwork.price}
                </button>

                <button className="flex items-center justify-center gap-2 text-[0.9rem] text-[#8c6e3f] dark:text-[#ccb88f]" type="button">
                  <FiHelpCircle className="h-4 w-4" />
                  <span>Request assistance before paying</span>
                </button>
              </form>
            </section>

            <aside className={`${cardClass} text-gallery-lightText dark:text-[#f2efea]`}>
              <h4 className="mb-4 text-[0.9rem] uppercase tracking-[0.15em] text-[#8c6e3f] dark:text-[#d7c398]">Your Acquisition Includes</h4>
              <div className="space-y-3">
                {includes.map(([title, subtitle, IconNode]) => (
                  <div key={title} className="flex gap-3">
                    <Icon IconNode={IconNode} />
                    <div>
                      <p className="text-[1rem] leading-tight text-gallery-lightSoft dark:text-[#d6d0c4]">{title}</p>
                      <p className="text-[0.9rem] leading-tight text-gallery-lightSoft/90 dark:text-[#c9c2b6]">{subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gallery-accent/24 pt-5">
                <h4 className="mb-2 text-[1.95rem] font-display leading-none text-gallery-lightText dark:text-[#ece2c9]">Need assistance?</h4>
                <p className="text-[0.95rem] text-gallery-lightSoft dark:text-[#c9c2b6]">For private collectors, galleries, or special delivery requests, contact the studio before completing payment.</p>
                <button className="mt-4 w-full border border-gallery-accent px-3 py-3 text-[0.9rem] uppercase tracking-[0.14em] text-[#8c6e3f] dark:text-[#d9c6a2]" type="button">Contact Studio</button>
                <p className="mt-4 flex items-center gap-2 text-[0.98rem] text-gallery-lightSoft dark:text-[#c9c2b6]"><FiMail className="h-4 w-4 text-gallery-accent" />studio@denismpabuka.com</p>
                <p className="mt-1 flex items-center gap-2 text-[0.98rem] text-gallery-lightSoft dark:text-[#c9c2b6]"><FiPhone className="h-4 w-4 text-gallery-accent" />+250 788 123 456</p>
              </div>
            </aside>
          </section>

          <p className="mt-5 flex items-center justify-center gap-2 text-center text-[0.98rem] text-gallery-lightSoft dark:text-[#bfb39d]"><FiLock className="h-4 w-4 text-gallery-accent" />Your payment information is secure and encrypted. We do not store your card details.</p>
        </div>
      </main>
      <footer className="border-t border-gallery-line px-6 py-6 text-center text-gallery-soft">
        <p>© {new Date().getFullYear()} Denis Mpabuka Studio</p>
      </footer>
    </SiteShell>
  );
}
