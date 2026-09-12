import { Button } from "./Button";
import { useCartStore } from "../../store/cartStore";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  isBestSeller?: boolean;
}

export const ProductCard = ({ id, title, price, imageUrl, imageAlt, isBestSeller }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handlePersonalize = () => {
    addItem({ id, title, price, imageUrl, uploads: [] });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-variant overflow-hidden group hover:shadow-md transition-shadow duration-300 flex flex-col w-full h-full">
      {/* Fixed 4:3 aspect ratio image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          alt={imageAlt}
          src={imageUrl}
        />
        {isBestSeller && (
          <span className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
            Best Seller
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-headline-md text-headline-md text-deep-onyx mb-1">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow">₹{price.toFixed(0)}</p>
        <Button onClick={handlePersonalize} fullWidth color="ghost" className="border border-deep-onyx">
          Personalize
        </Button>
      </div>
    </div>
  );
};
