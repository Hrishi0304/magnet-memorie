import { Button } from "./Button";
import { useCartStore } from "../../store/cartStore";

interface ShopProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  badge?: "Best Seller" | "New Arrival";
  subtitle: string;
  actionText?: string;
  actionVariant?: "solid" | "outline";
}

export const ShopProductCard = ({
  id,
  title,
  price,
  imageUrl,
  imageAlt,
  badge,
  subtitle,
  actionText = "Add to Cart",
  actionVariant = "solid"
}: ShopProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAction = () => {
    if (actionText === "Add to Cart") {
      addItem({ id, title, price, imageUrl, uploads: [] });
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-surface-variant shadow-sm flex flex-col h-full relative group transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      {badge && (
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-memory-gold text-on-tertiary-fixed font-label-sm text-label-sm uppercase px-2 py-1 rounded-sm shadow-sm">
            {badge}
          </span>
        </div>
      )}
      <button className="absolute top-2 right-2 z-10 p-2 text-on-surface-variant hover:text-magnet-red transition-colors bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100">
        <span className="material-symbols-outlined">favorite</span>
      </button>
      
      <div className="aspect-square bg-surface-container overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={imageAlt}
          src={imageUrl}
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="font-headline-md text-[18px] leading-tight text-deep-onyx font-semibold">
            {title}
          </h3>
          <span className="font-body-md text-body-md font-semibold text-deep-onyx">
            ₹{price.toFixed(0)}
          </span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant mb-4 flex-grow">
          {subtitle}
        </p>
        
        {actionVariant === "solid" ? (
          <Button onClick={handleAction} fullWidth color="primary" className="bg-deep-onyx hover:bg-magnet-red">
            {actionText}
          </Button>
        ) : (
          <Button onClick={handleAction} fullWidth color="ghost" className="border border-outline hover:border-deep-onyx">
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
};
