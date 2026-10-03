import { Link } from "react-router-dom";

const products = [
  {
    to: "/shop/square-magnets",
    label: "Best Seller",
    title: "Square Magnets",
    subtitle: "Classic glossy photo magnets in multiple square sizes. Starting at ₹149 per piece.",
    imageUrl: "/2.5-inch.png",
    cta: "Shop Square Magnets",
  },
  {
    to: "/shop/acrylic-magnets",
    label: "New Arrival",
    title: "Acrylic Magnets",
    subtitle: "Crystal-clear acrylic with edge-to-edge printing. Thicker, more premium. Starting at ₹199 per piece.",
    imageUrl: "/acrylic-2.png",
    cta: "Shop Acrylic Magnets",
  },
];

const steps = [
  {
    icon: "add_photo_alternate",
    step: "01",
    title: "Upload Your Photos",
    desc: "Choose your favourite pictures and upload them directly on the product page.",
  },
  {
    icon: "engineering",
    step: "02",
    title: "We Craft Your Magnets",
    desc: "Each magnet is handcrafted with high-definition printing and a strong magnetic base.",
  },
  {
    icon: "local_shipping",
    step: "03",
    title: "Delivered to Your Door",
    desc: "Dispatched within 24–48 hours. Pan-India delivery with full tracking.",
  },
];

const features = [
  { icon: "hd", label: "HD Photo Printing" },
  { icon: "verified", label: "Strong Magnetic Hold" },
  { icon: "schedule", label: "24–48 Hr Dispatch" },
  { icon: "handshake", label: "Handcrafted in India" },
];

export const Home = () => {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-[580px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full"
            style={{
              backgroundImage:
                "url('/home.png')"            
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-off-white-cream/95 via-off-white-cream/70 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <p className="font-label-md text-label-md text-magnet-red uppercase tracking-widest mb-4">
            Personalised Photo Magnets
          </p>
          <h1 className="font-display-lg text-display-lg text-deep-onyx mb-5 max-w-xl leading-tight">
            Memories that Stick.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8">
            Turn your favourite photos into premium magnets. Keep your memories close forever.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop/square-magnets"
              className="inline-flex items-center justify-center bg-magnet-red text-white font-label-md text-label-md px-8 py-4 rounded-full shadow-sm hover:shadow-md hover:bg-secondary transition-all duration-200 hover:-translate-y-0.5"
            >
              Shop Square Magnets
            </Link>
            <Link
              to="/shop/acrylic-magnets"
              className="inline-flex items-center justify-center border-2 border-deep-onyx text-deep-onyx font-label-md text-label-md px-8 py-4 rounded-full hover:bg-surface-container-low transition-all duration-200"
            >
              Shop Acrylic Magnets
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Strip ── */}
      <section className="w-full bg-deep-onyx text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-5 flex flex-wrap justify-center md:justify-between gap-6">
          {features.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[20px] text-memory-gold"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {icon}
              </span>
              <span className="font-label-md text-label-md text-white/90">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Categories ── */}
      <section className="max-w-container-max w-full mx-auto px-margin-mobile md:px-margin-desktop py-20">
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-deep-onyx mb-3">Our Products</h2>
          <div className="w-12 h-1 bg-magnet-red mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {products.map(({ to, label, title, subtitle, imageUrl, cta }) => (
            <Link
              key={to}
              to={to}
              className="group relative overflow-hidden rounded-xl bg-white border border-surface-variant shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-surface-container">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-memory-gold text-white font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {label}
                </span>
              </div>
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-headline-md text-headline-md text-deep-onyx mb-2">{title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{subtitle}</p>
                <span className="inline-flex items-center gap-2 font-label-md text-label-md text-magnet-red group-hover:gap-3 transition-all duration-200">
                  {cta}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full bg-surface-container-low border-t border-b border-surface-variant py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-deep-onyx mb-3">How It Works</h2>
            <div className="w-12 h-1 bg-magnet-red mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map(({ icon, step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-full bg-white border border-surface-variant shadow-sm flex items-center justify-center mb-5">
                  <span
                    className="material-symbols-outlined text-[28px] text-magnet-red"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-deep-onyx text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-headline-md text-[18px] text-deep-onyx mb-2">{title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bulk Orders CTA ── */}
      <section className="max-w-container-max w-full mx-auto px-margin-mobile md:px-margin-desktop py-20">
        <div className="bg-deep-onyx rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-label-md text-label-md text-memory-gold uppercase tracking-widest mb-3">
              Events, Weddings & Corporate
            </p>
            <h2 className="font-headline-lg text-headline-lg text-white mb-3">Need a Bulk Order?</h2>
            <p className="font-body-md text-body-md text-white/70 max-w-md">
              Custom pricing for orders of 25+ pieces. Fast turnaround, personalised for every guest.
            </p>
          </div>
          <Link
            to="/bulk-orders"
            className="flex-shrink-0 inline-flex items-center justify-center bg-magnet-red text-white font-label-md text-label-md px-10 py-4 rounded-full shadow-sm hover:bg-secondary hover:shadow-md transition-all duration-200 whitespace-nowrap"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </>
  );
};
