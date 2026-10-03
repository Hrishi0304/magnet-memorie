export const Terms = () => {
  return (
    <main className="flex-grow w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20">
      <h1 className="font-display-lg text-display-lg text-primary mb-8 text-center">Terms & Conditions</h1>
      
      <div className="prose prose-on-surface max-w-none font-body-md text-on-surface">
        <p className="mb-8 text-center">
          By using the Magnet Memorie website or placing an order, you agree to the following terms:
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">1. Customized Products</h3>
            <p className="text-on-surface-variant">All products are personalized and made according to the details and photos provided by the customer.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">2. Orders & Payments</h3>
            <p className="text-on-surface-variant">Orders are processed only after successful payment. Customers are responsible for providing accurate order and customization details.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">3. Cancellation & Refunds</h3>
            <p className="text-on-surface-variant">As our products are customized, orders cannot be cancelled, returned, or exchanged once production has started, except for eligible damaged, defective, or incorrect orders.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">4. Customer Photos</h3>
            <p className="text-on-surface-variant">Customers must provide clear, high-quality photos. Print quality may vary depending on the quality of the uploaded image.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">5. Shipping</h3>
            <p className="text-on-surface-variant">Delivery timelines are estimates and may vary due to courier delays, weather, holidays, or other unforeseen circumstances.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">6. Damaged or Incorrect Orders</h3>
            <p className="text-on-surface-variant">Please contact us within <strong>48 hours of delivery</strong> with your order details and supporting photos/videos for verification.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">7. Live Stall Bookings</h3>
            <p className="text-on-surface-variant">For Live Photo Magnet Stall bookings, booking details, pricing, payment, cancellation, and rescheduling terms will be confirmed at the time of booking.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">8. Intellectual Property</h3>
            <p className="text-on-surface-variant">All Magnet Memorie logos, designs, images, text, and website content are protected and may not be copied or used without permission.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">9. Privacy</h3>
            <p className="text-on-surface-variant">Customer information and uploaded photos are handled according to our <strong>Privacy Policy</strong>.</p>
          </section>

          <section>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">10. Updates</h3>
            <p className="text-on-surface-variant">Magnet Memorie reserves the right to update these Terms & Conditions when necessary.</p>
          </section>
        </div>

        <div className="mt-12 p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-center sm:text-left">
          <h3 className="font-headline-md text-headline-md text-primary mb-4">Contact Us</h3>
          <p className="font-body-md text-on-surface-variant mb-3"><strong>Magnet Memorie</strong></p>
          <div className="flex flex-col gap-2 font-body-md text-on-surface-variant">
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              magnetmemoriee@gmail.com
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2">
              <span className="material-symbols-outlined text-[18px]">call</span>
              +91 9989216856
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
