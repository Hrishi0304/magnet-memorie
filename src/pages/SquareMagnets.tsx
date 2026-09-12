import { ProductDetailPage } from "../components/ui/ProductDetailPage";
import { RelatedProducts } from "../components/ui/RelatedProducts";

const images = ["/2.5-inch.png"];

const related = [
  {
    to: "/shop/acrylic-magnets",
    title: "Acrylic Magnets",
    subtitle: "Crystal-clear acrylic with edge-to-edge printing.",
    priceLabel: "Starting at ₹129",
    imageUrl: "/acrylic-2.png"
  }
];

export const SquareMagnets = () => {
  return (
    <>
      <ProductDetailPage
        category="Square Magnets"
        title="Premium Square Photo Magnets"
        badge="Best Seller"
        description="Premium personalised photo magnets featuring a strong 5-layer construction, glossy finish, and powerful magnetic hold. Upload your favourite memory and we'll craft it into a stunning keepsake — built to last, made to display."
        images={images}
        variants={[
          { id: "sq-2x2",   label: '2×2"',   price: 99,  priceLabel: "per piece" },
          { id: "sq-2.5x2.5", label: '2.5×2.5"', price: 119, priceLabel: "per piece" },
          { id: "sq-3x3",   label: '3×3"',   price: 149, priceLabel: "per piece" },
        ]}
        features={[
          "High-definition photo printing",
          "Strong magnetic hold",
          "Glossy protective finish",
          "Handcrafted with care",
          "Dispatched in 24–48 hours",
          "Pan-India delivery",
        ]}
        note="For best results, upload photos with a resolution of at least 1000×1000 pixels."
      />
      <RelatedProducts products={related} />
    </>
  );
};
