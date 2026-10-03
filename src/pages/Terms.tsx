const termsData = [
  {
    title: "Customized Products",
    content: "All products are personalized and made according to the details and photos provided by the customer.",
    icon: "design_services"
  },
  {
    title: "Orders & Payments",
    content: "Orders are processed only after successful payment. Customers are responsible for providing accurate order and customization details.",
    icon: "payments"
  },
  {
    title: "Cancellation & Refunds",
    content: "As our products are customized, orders cannot be cancelled, returned, or exchanged once production has started, except for eligible damaged, defective, or incorrect orders.",
    icon: "assignment_return"
  },
  {
    title: "Customer Photos",
    content: "Customers must provide clear, high-quality photos. Print quality may vary depending on the quality of the uploaded image.",
    icon: "photo_library"
  },
  {
    title: "Shipping",
    content: "Delivery timelines are estimates and may vary due to courier delays, weather, holidays, or other unforeseen circumstances.",
    icon: "local_shipping"
  },
  {
    title: "Damaged or Incorrect Orders",
    content: "Please contact us within 48 hours of delivery with your order details and supporting photos/videos for verification.",
    icon: "report_problem"
  },
  {
    title: "Live Stall Bookings",
    content: "For Live Photo Magnet Stall bookings, booking details, pricing, payment, cancellation, and rescheduling terms will be confirmed at the time of booking.",
    icon: "storefront"
  },
  {
    title: "Intellectual Property",
    content: "All Magnet Memorie logos, designs, images, text, and website content are protected and may not be copied or used without permission.",
    icon: "copyright"
  },
  {
    title: "Privacy",
    content: "Customer information and uploaded photos are handled according to our Privacy Policy.",
    icon: "lock"
  },
  {
    title: "Updates",
    content: "Magnet Memorie reserves the right to update these Terms & Conditions when necessary.",
    icon: "update"
  }
];

export const Terms = () => {
  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
      <div className="text-center mb-16 animate-[fadeSlideIn_0.4s_ease-out_forwards]">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">Terms & Conditions</h1>
        <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-6" />
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          By using the Magnet Memorie website or placing an order, you agree to the following terms and conditions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {termsData.map((term, index) => (
          <section 
            key={index}
            className="group p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 hover:shadow-md transition-all duration-300 relative overflow-hidden"
            style={{ 
              animation: `fadeSlideIn 0.4s ease-out forwards`,
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
              transform: 'translateY(10px)'
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-bl-full -mr-4 -mt-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary/20" />
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0 group-hover:bg-secondary/10 group-hover:text-secondary transition-colors text-primary">
                <span className="material-symbols-outlined text-[24px]">{term.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2 flex items-center gap-2">
                  <span className="text-secondary/60 text-sm font-bold">{index + 1}.</span>
                  {term.title}
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {term.content}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div 
        className="max-w-2xl mx-auto p-8 sm:p-10 bg-gradient-to-br from-surface-container to-surface-container-low rounded-3xl border border-outline-variant/50 text-center sm:text-left flex flex-col sm:flex-row items-center gap-8 shadow-sm"
        style={{ animation: `fadeSlideIn 0.4s ease-out forwards`, animationDelay: `0.6s`, opacity: 0 }}
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[36px] text-secondary">support_agent</span>
        </div>
        <div>
          <h3 className="font-headline-md text-[22px] text-primary mb-2">Have any questions?</h3>
          <p className="font-body-md text-on-surface-variant mb-5">We are always here to help you out.</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-body-md text-on-surface font-medium">
            <a href="mailto:magnetmemoriee@gmail.com" className="flex items-center justify-center sm:justify-start gap-2 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-[20px]">mail</span>
              magnetmemoriee@gmail.com
            </a>
            <a href="https://wa.me/919989216856" target="_blank" rel="noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-[20px]">call</span>
              +91 9989216856
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(15px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};
