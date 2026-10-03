import { Link } from "react-router-dom";

export const ComingSoon = () => {
  return (
    <main className="flex-grow w-full flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-24 text-center overflow-x-hidden">
      <div className="w-full max-w-xl mx-auto">

        <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-8 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-memory-gold"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
            <path d="M4 8h16" />
            <path d="M4 14h16" />
            <path d="M10 2v20" />
            <path d="M16 2v20" />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="font-headline-lg text-headline-lg text-primary mb-4">
          Chocolates - Coming Soon
        </h1>

        {/* Divider */}
        <div className="w-12 h-1 bg-magnet-red rounded-full mx-auto mb-6" />

        {/* Body */}
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
          We're working on something sweet. Our custom photo chocolates are currently being crafted with the same care and quality you love from our magnets.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Check back soon - or explore our magnets in the meantime.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-3 w-full sm:flex-row sm:justify-center">
          <Link
            to="/shop/square-magnets"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-magnet-red text-white font-label-md text-label-md px-6 py-4 rounded-full shadow-sm hover:shadow-md hover:bg-secondary transition-all duration-200"
          >
            Shop Square Magnets
          </Link>
          <Link
            to="/shop/acrylic-magnets"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-deep-onyx text-deep-onyx font-label-md text-label-md px-6 py-4 rounded-full hover:bg-surface-container-low transition-colors duration-200"
          >
            Shop Acrylic Magnets
          </Link>
        </div>

      </div>
    </main>
  );
};
