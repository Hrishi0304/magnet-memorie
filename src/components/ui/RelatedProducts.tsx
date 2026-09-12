import { Link } from "react-router-dom";

interface RelatedProduct {
  to: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  imageUrl: string;
}

interface RelatedProductsProps {
  title?: string;
  products: RelatedProduct[];
}

export const RelatedProducts = ({ title = "You May Also Like", products }: RelatedProductsProps) => {
  return (
    <section className="w-full bg-surface-container-low border-t border-surface-variant py-16 mt-8">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-headline-lg text-deep-onyx mb-8">{title}</h2>
        
        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-gutter md:overflow-visible scrollbar-hide">
          {products.map((p, i) => (
            <Link
              key={i}
              to={p.to}
              className="group flex-none w-[80%] sm:w-[45%] md:w-auto snap-start bg-white rounded-xl border border-surface-variant shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-headline-md text-headline-md text-deep-onyx mb-1">{p.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{p.subtitle}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary">{p.priceLabel}</span>
                  <span className="material-symbols-outlined text-[20px] text-magnet-red group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
