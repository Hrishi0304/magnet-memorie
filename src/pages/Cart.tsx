import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

  const handleDecrease = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleIncrease = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
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
            {items.map((item) => (
              <div key={item.id} className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-md md:p-[24px] flex flex-col sm:flex-row gap-stack-md sm:gap-[24px] shadow-sm hover:shadow-md transition-shadow">
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
                      
                      {/* Uploaded Photos Mapping */}
                      {item.uploads && item.uploads.length > 0 && (
                        <div className="flex flex-col gap-2 mb-4">
                          <p className="font-label-sm text-label-sm text-deep-onyx">Your Photos ({item.uploads.length})</p>
                          <div className="flex flex-wrap gap-2">
                            {item.uploads.map((photo, i) => (
                              <div key={i} className="w-10 h-10 rounded-md overflow-hidden border border-surface-variant shrink-0 bg-surface-container">
                                <img src={photo} alt={`upload-${i}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="font-headline-md text-[20px] leading-[28px] text-primary font-semibold">₹{item.price.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between items-end mt-stack-md sm:mt-0">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-outline-variant rounded bg-surface-container-lowest">
                      <button 
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        aria-label="Decrease quantity" 
                        className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-[20px]">remove</span>
                      </button>
                      <span className="font-label-md text-label-md text-primary px-3 py-1 border-x border-outline-variant">{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        aria-label="Increase quantity" 
                        className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                    
                    {/* Remove Action */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="font-label-md text-label-md text-on-surface-variant hover:text-secondary underline underline-offset-4 transition-colors focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                  <span>Shipping</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                  <span>Estimated Tax</span>
                  <span className="text-primary font-medium">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-surface-variant pt-4 mb-stack-lg">
                <span className="font-headline-md text-[20px] text-primary">Total</span>
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">₹{totalPrice().toFixed(0)}</span>
              </div>
              
              <Link to="/checkout" className="w-full bg-secondary text-on-secondary font-label-md text-label-md py-4 rounded-md uppercase tracking-wider shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200 focus:outline-none flex justify-center items-center">
                Checkout
              </Link>
              
              <p className="font-body-md text-[13px] text-center text-on-surface-variant mt-4">
                Secure checkout. We accept all major credit cards.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
