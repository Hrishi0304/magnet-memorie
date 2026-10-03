import { useRef } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export const Cart = () => {
  const { items, removeItem, totalPrice, addUpload, removeUpload } = useCartStore();
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      addUpload(id, dataUrl);
    };
    reader.readAsDataURL(file);
    // reset so the same file can be re-selected if removed
    e.target.value = "";
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg md:py-[64px]">
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-stack-lg md:mb-[40px]">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="font-body-lg text-on-surface-variant mb-6">Your cart is currently empty.</p>
          <Link to="/shop/square-magnets" className="bg-deep-onyx text-white hover:bg-magnet-red transition-colors duration-200 py-3 px-8 rounded-DEFAULT font-label-md text-label-md inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-[40px]">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            {items.map((item) => {
              const uploadsFull = item.uploads.length >= item.quantity;

              return (
                <div key={item.id} className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md md:p-[24px] flex flex-col gap-stack-md shadow-sm hover:shadow-md transition-shadow">
                  {/* Top row: image + details */}
                  <div className="flex flex-col sm:flex-row gap-stack-md sm:gap-[24px]">
                    {/* Product Image */}
                    <div className="w-full sm:w-[140px] h-[140px] shrink-0 bg-surface-container-low rounded-md overflow-hidden relative">
                      <img className="absolute inset-0 w-full h-full object-cover" alt={item.title} src={item.imageUrl} />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-headline-md text-[20px] leading-[28px] text-primary mb-1">{item.title}</h3>
                          <p className="font-body-md text-body-md text-on-surface-variant mb-3">Selected variant</p>
                        </div>
                        <span className="font-headline-md text-[20px] leading-[28px] text-primary font-semibold">₹{(item.price * item.quantity).toFixed(0)}</span>
                      </div>

                      <div className="flex justify-between items-center mt-stack-md sm:mt-0">
                        {/* Quantity Display */}
                        <div className="flex items-center gap-1.5 font-label-md text-label-md text-on-surface-variant">
                          <span>Qty:</span>
                          <span className="font-semibold text-primary">{item.quantity}</span>
                        </div>

                        {/* Remove Action with Delete Icon */}
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:text-secondary hover:bg-secondary/10 transition-colors focus:outline-none"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div className="border-t border-surface-variant pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-label-md text-label-md text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                        Upload Photos
                        <span className="text-on-surface-variant font-normal">
                          ({item.uploads.length}/{item.quantity})
                        </span>
                      </p>
                      {uploadsFull && (
                        <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          All uploaded
                        </span>
                      )}
                    </div>

                    {/* Uploaded photo thumbnails */}
                    {item.uploads.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.uploads.map((photo, i) => (
                          <div key={i} className="relative w-16 h-16 rounded-md overflow-hidden border border-surface-variant shrink-0 group">
                            <img src={photo} alt={`upload-${i}`} className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeUpload(item.id, i)}
                              aria-label="Remove photo"
                              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <span className="material-symbols-outlined text-white text-[18px]">close</span>
                            </button>
                            <span className="absolute bottom-0.5 right-0.5 bg-black/60 text-white text-[10px] px-1 rounded">
                              #{i + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload button / drop zone - hidden once all photos are uploaded */}
                    {!uploadsFull && (
                      <div
                        className="relative flex items-center justify-center gap-2 border-2 border-dashed rounded-lg py-3 px-4 border-secondary/40 bg-secondary/5 hover:bg-secondary/10 cursor-pointer transition-colors"
                        onClick={() => fileInputRefs.current[item.id]?.click()}
                      >
                        <span className="material-symbols-outlined text-[20px] text-on-surface-variant">
                          add_photo_alternate
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Add photo {item.uploads.length + 1} of {item.quantity}
                        </span>
                        <input
                          ref={(el) => { fileInputRefs.current[item.id] = el; }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(item.id, e)}
                        />
                      </div>
                    )}

                    {!uploadsFull && (
                      <p className="font-label-sm text-[11px] text-on-surface-variant mt-1.5">
                        Upload 1 photo per magnet. Supports JPG, PNG, HEIC.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md md:p-[32px] shadow-sm sticky top-[100px]">
              <h2 className="font-headline-md text-headline-md text-primary mb-stack-md border-b border-surface-variant pb-4">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 mb-stack-lg">
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="text-primary font-medium">₹{totalPrice().toFixed(0)}</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Delivery</span>
                  <span className="text-primary font-medium">{totalPrice() >= 1499 ? "Free" : "₹60"}</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-surface-variant pt-4 mb-stack-lg">
                <span className="font-headline-md text-[20px] text-primary">Total</span>
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">
                  ₹{(totalPrice() + (totalPrice() >= 1499 ? 0 : 60)).toFixed(0)}
                </span>
              </div>

              <Link to="/checkout" className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-4 rounded-md uppercase tracking-wider shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200 focus:outline-none flex justify-center items-center">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
