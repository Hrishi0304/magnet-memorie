import { ProductDetailPage } from "../components/ui/ProductDetailPage";
import { RelatedProducts } from "../components/ui/RelatedProducts";

const images = [
  "/acrylic-2.png"
]

const related = [
  {
    to: "/shop/square-magnets",
    title: "Square Magnets",
    subtitle: "Classic glossy photo magnets in multiple square sizes.",
    priceLabel: "₹149 per piece",
    imageUrl: "/2.5-inch.png"
  }
];

export const AcrylicMagnets = () => {
  return (
    <>
      <ProductDetailPage
        category="Acrylic Magnets"
        title="Premium Acrylic Photo Magnets"
        badge="New Arrival"
        description="Crystal-clear acrylic magnets with vivid, edge-to-edge photo printing and a powerful magnetic base. Thicker and more premium than standard magnets - perfect for gifting, displaying, or preserving your most cherished moments."
        images={images}
        variants={[
          { id: "ac-2.5x3.5", label: '2.5×3.5"', price: 199, priceLabel: "per piece" },
          { id: "ac-2.5x3.5-std", label: '2.5×3.5" + Stand', price: 239, priceLabel: "per piece" },
          { id: "ac-2.5x6.5", label: '2.5×6.5"', price: 299, priceLabel: "per piece" },
        ]}
        features={[
          "Crystal-clear acrylic finish",
          "Strong magnetic hold",
          "Edge-to-edge photo printing",
          "Premium thick construction",
          "Dispatched in 24–48 hours",
          "Pan-India delivery",
        ]}
        note="Acrylic magnets are crafted individually. Upload a high-resolution photo for the sharpest result."
      />
      <RelatedProducts products={related} />
    </>
  );
};
