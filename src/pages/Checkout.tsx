import { useCartStore } from "../store/cartStore";

export const Checkout = () => {
  const { items, totalPrice } = useCartStore();

  const total = totalPrice();
  const estimatedTax = total * 0.18; // 18% GST
  const finalTotal = total + estimatedTax;

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Column: Checkout Steps */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-stack-lg">
          {/* Step 1: Shipping Information */}
          <section aria-labelledby="shipping-heading" className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-stack-md md:p-stack-lg">
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-primary font-label-md">1</span>
              <h2 id="shipping-heading" className="font-headline-md text-headline-md text-primary">Shipping Information</h2>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="email" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="first-name" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">First Name</label>
                <input type="text" id="first-name" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="last-name" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Last Name</label>
                <input type="text" id="last-name" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Street Address</label>
                <input type="text" id="address" placeholder="123 Memory Lane" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="city" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">City</label>
                <input type="text" id="city" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">State</label>
                  <select id="state" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors">
                    <option>CA</option>
                    <option>NY</option>
                    <option>TX</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="zip" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">ZIP Code</label>
                  <input type="text" id="zip" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
                </div>
              </div>
            </form>
          </section>

          {/* Step 2: Shipping Method */}
          <section aria-labelledby="method-heading" className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-stack-md md:p-stack-lg">
            <div className="flex items-center gap-3 mb-stack-md">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-primary font-label-md">2</span>
              <h2 id="method-heading" className="font-headline-md text-headline-md text-primary">Shipping Method</h2>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-between p-4 border border-secondary rounded cursor-pointer bg-error-container/10 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" defaultChecked className="w-5 h-5 text-secondary border-outline focus:ring-secondary" />
                  <div>
                    <span className="block font-body-md font-semibold text-primary">Standard Shipping</span>
                    <span className="block font-label-sm text-on-surface-variant">3-5 Business Days</span>
                  </div>
                </div>
                <span className="font-body-md font-semibold text-primary">Free</span>
              </label>
              <label className="flex items-center justify-between p-4 border border-outline-variant/50 rounded cursor-pointer hover:border-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" className="w-5 h-5 text-secondary border-outline focus:ring-secondary" />
                  <div>
                    <span className="block font-body-md font-semibold text-primary">Express Shipping</span>
                    <span className="block font-label-sm text-on-surface-variant">1-2 Business Days</span>
                  </div>
                </div>
                <span className="font-body-md font-semibold text-primary">₹99</span>
              </label>
            </div>
          </section>

          {/* Step 3: Payment */}
          <section aria-labelledby="payment-heading" className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-stack-md md:p-stack-lg">
            <div className="flex items-center justify-between mb-stack-md">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-primary font-label-md">3</span>
                <h2 id="payment-heading" className="font-headline-md text-headline-md text-primary">Payment</h2>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="font-label-sm text-label-sm">Secure Encrypted</span>
              </div>
            </div>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="cc-number" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Card Number</label>
                <div className="relative">
                  <input type="text" id="cc-number" placeholder="0000 0000 0000 0000" className="w-full bg-surface-container-lowest rounded px-4 py-3 pl-10 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
                  <span className="material-symbols-outlined absolute left-3 top-3.5 text-outline">credit_card</span>
                </div>
              </div>
              <div>
                <label htmlFor="cc-exp" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Expiration Date</label>
                <input type="text" id="cc-exp" placeholder="MM/YY" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="cc-cvc" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Security Code (CVC)</label>
                <input type="text" id="cc-cvc" placeholder="123" className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
            </form>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
          <section aria-labelledby="summary-heading" className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-stack-md md:p-stack-lg">
            <h2 id="summary-heading" className="font-headline-md text-headline-md text-primary mb-stack-md">Order Summary</h2>
            
            {/* Items List */}
            <div className="flex flex-col gap-4 mb-stack-md border-b border-surface-variant pb-stack-md">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-surface-container rounded overflow-hidden border border-outline-variant/20">
                    <img className="w-full h-full object-cover" src={item.imageUrl} alt={item.title} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-body-md font-semibold text-primary">{item.title}</h3>
                    <p className="font-label-sm text-on-surface-variant">Qty: {item.quantity}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-body-md font-semibold text-primary">₹{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-2 font-body-md text-on-surface mb-stack-md border-b border-surface-variant pb-stack-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Estimated Tax</span>
                <span>₹{estimatedTax.toFixed(0)}</span>
              </div>
            </div>
            <div className="flex justify-between items-end mb-stack-lg">
              <span className="font-body-lg font-semibold text-primary">Total</span>
              <span className="font-headline-md text-headline-md text-primary">₹{finalTotal.toFixed(0)}</span>
            </div>

            {/* Action Button */}
            <button className="w-full py-4 bg-secondary text-on-secondary font-label-md rounded shadow-sm hover:opacity-90 transition-all flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-sm">lock</span>
              PLACE ORDER
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};
