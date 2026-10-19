import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { X } from "lucide-react";

interface SizeVariant {
  id: string;
  label: string;   // "2×2 inches"
  price: number;
  priceLabel: string; // "₹99 per piece"
  imageUrl?: string;
}

interface ProductDetailPageProps {
  category: string;
  title: string;
  badge?: string;
  description: string;
  images: string[];
  variants: SizeVariant[];
  features: string[];
  note?: string;
}

export const ProductDetailPage = ({
  category,
  title,
  badge,
  description,
  images,
  variants,
  features,
  note,
}: ProductDetailPageProps) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [selectedImage, setSelectedImage] = useState(variants[0]?.imageUrl || images[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleVariantSelect = (v: SizeVariant) => {
    setSelectedVariant(v);
    if (v.imageUrl) {
      setSelectedImage(v.imageUrl);
    }
  };

  const handleThumbnailClick = (img: string) => {
    setSelectedImage(img);
    const matched = variants.find((v) => v.imageUrl === img);
    if (matched) {
      setSelectedVariant(matched);
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const isUploadValid = previews.length === quantity;

  const handleAddToCart = () => {
    if (!isUploadValid) return; // double check

    addItem({
      id: `${selectedVariant.id}-${Date.now()}`,
      title: `${title} ${selectedVariant.label}`,
      price: selectedVariant.price,
      quantity: quantity,
      imageUrl: selectedVariant.imageUrl || selectedImage || images[0],
      uploads: previews,
    });

    // Reset state after adding
    setPreviews([]);
    setQuantity(1);
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant mb-8">
        <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-primary">{title}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* LEFT - Image Gallery */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="w-full aspect-square rounded-xl overflow-hidden bg-surface-container relative group">
            <img
              src={selectedImage || images[0]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {badge && (
              <span className="absolute top-4 left-4 bg-memory-gold text-white font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleThumbnailClick(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? "border-magnet-red shadow-sm ring-1 ring-magnet-red"
                      : "border-outline-variant/40 hover:border-outline opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${title} preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - Product Info */}
        <div className="flex flex-col gap-6">
          {/* Category Tag */}
          <p className="font-label-sm text-label-sm text-magnet-red uppercase tracking-widest">{category}</p>

          {/* Title */}
          <h1 className="font-display-lg text-[36px] leading-[44px] font-bold text-deep-onyx -mt-2">
            {title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-deep-onyx">
              ₹{selectedVariant.price}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant">
              {selectedVariant.priceLabel}
            </span>
          </div>

          {/* Description */}
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {description}
          </p>

          <div className="h-[1px] w-full bg-surface-variant" />

          {/* Size Variants */}
          <div>
            <p className="font-label-md text-label-md text-deep-onyx uppercase tracking-wider mb-3">
              Size
            </p>
            <div className="flex flex-wrap gap-3">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleVariantSelect(v)}
                  className={`px-4 py-2 rounded-full border font-label-sm text-label-sm transition-all duration-200 ${
                    selectedVariant.id === v.id
                      ? "border-deep-onyx bg-deep-onyx text-white shadow-sm"
                      : "border-outline-variant text-on-surface hover:border-deep-onyx"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-label-md text-label-md text-deep-onyx uppercase tracking-wider">
                Quantity
              </p>
            </div>
            <div className="inline-flex items-center border border-outline-variant rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 text-on-surface-variant hover:bg-surface-container transition-colors font-semibold text-lg"
              >
                −
              </button>
              <span className="px-6 py-2.5 font-label-md text-label-md text-primary border-x border-outline-variant min-w-[48px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(25, q + 1))}
                className="px-4 py-2.5 text-on-surface-variant hover:bg-surface-container transition-colors font-semibold text-lg"
              >
                +
              </button>
            </div>
            
            {/* Bulk orders link */}
            <div className="mt-3">
              <Link to="/bulk-orders" className="font-label-sm text-label-sm text-magnet-red hover:underline decoration-magnet-red transition-all">
                Ordering more than 25? See Bulk Orders
              </Link>
            </div>
          </div>

          <div className="h-[1px] w-full bg-surface-variant" />

          {/* Photo Upload */}
          <div>
            <p className="font-label-md text-label-md text-deep-onyx uppercase tracking-wider mb-1">
              Upload Your Photos
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">
              Upload {quantity} photo{quantity > 1 ? "s" : ""}, one per magnet. High resolution recommended.
            </p>

            {/* Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-secondary bg-error-container/10 scale-[1.01]"
                  : "border-outline-variant bg-surface-container-low hover:border-secondary hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant mb-3" style={{ fontVariationSettings: "'FILL' 0" }}>
                add_photo_alternate
              </span>
              <p className="font-label-md text-label-md text-primary text-center">
                Click to upload or drag & drop
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                JPG, PNG or HEIC • Max 10MB per photo
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {/* Previews */}
            {previews.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-label-sm text-deep-onyx">Uploaded ({previews.length}/{quantity})</span>
                  {previews.length !== quantity && (
                    <span className="font-label-sm text-label-sm text-magnet-red">
                      {previews.length > quantity ? "Too many photos" : "More photos needed"}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {previews.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-surface-variant group shadow-sm">
                      <img src={src} alt={`upload-${i}`} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {note && (
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-3 flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[16px] mt-0.5 text-memory-gold flex-shrink-0">info</span>
                {note}
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!isUploadValid}
              className={`w-full font-label-md text-label-md py-4 rounded-lg transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-2 ${
                isUploadValid 
                  ? "bg-magnet-red text-white shadow-sm hover:bg-secondary hover:shadow-md cursor-pointer" 
                  : "bg-surface-variant text-on-surface-variant cursor-not-allowed opacity-70"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              {isUploadValid ? `Add to Cart ₹${(selectedVariant.price * quantity).toFixed(0)}` : `Upload ${quantity} photos to Add`}
            </button>
            <p className="text-center font-label-sm text-label-sm text-on-surface-variant">
              Free shipping on orders above ₹999
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-memory-gold font-bold text-sm">✔</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
