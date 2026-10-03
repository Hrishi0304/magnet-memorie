const shippingData = [
  {
    title: "Processing Time",
    content: "Orders are processed after payment confirmation. Customized products generally require 1–2 business days for production before dispatch.",
    icon: "schedule"
  },
  {
    title: "Delivery Estimates",
    content: "Estimated delivery time after dispatch:\n• Metro Cities: 2–4 Business Days\n• Other Cities & Towns: 5–8 Business Days\n• Remote Areas: 7–10 Business Days",
    icon: "calendar_today"
  },
  {
    title: "Shipping Charges",
    content: "Applicable shipping charges will be shown during checkout before you complete your payment.",
    icon: "currency_rupee"
  },
  {
    title: "Tracking",
    content: "Once your order is dispatched, tracking details may be shared through WhatsApp, SMS, or Email, depending on the available service.",
    icon: "share_location"
  },
  {
    title: "Delivery Address",
    content: "Please verify your name, phone number, complete address, and PIN code before confirming your order. Delays caused by incorrect details may require additional charges.",
    icon: "home"
  },
  {
    title: "Delivery Attempts",
    content: "Courier partners may make multiple delivery attempts. If an order cannot be delivered due to recipient unavailability or refusal, re-shipping charges may apply.",
    icon: "sync"
  },
  {
    title: "Customized Orders",
    content: "As our products are made specifically for each customer, production begins shortly after order confirmation. Orders generally cannot be modified or cancelled after production has started.",
    icon: "design_services"
  },
  {
    title: "Damaged or Missing Orders",
    content: "If your package arrives damaged or incomplete, please contact us within 48 hours with your order number, clear photographs, and an unboxing video for verification.",
    icon: "report_problem"
  },
  {
    title: "International Delivery",
    content: "International shipping may be available for selected locations. Customs duties, taxes, and import charges, where applicable, are the responsibility of the customer.",
    icon: "flight_takeoff"
  },
  {
    title: "Important Note",
    content: "Delivery dates are estimates and not guaranteed. Shipping charges are non-refundable after dispatch. Peak seasons may require additional processing or delivery time.",
    icon: "info"
  }
];

export const Shipping = () => {
  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
      <div className="text-center mb-16 animate-[fadeSlideIn_0.4s_ease-out_forwards]">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">Shipping Policy</h1>
        <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-6" />
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Last Updated: 03 October 2026<br/><br/>
          At Magnet Memorie, we carefully prepare and pack every customized order before dispatch. Please review the following shipping information before placing your order.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {shippingData.map((policy, index) => (
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
                <span className="material-symbols-outlined text-[24px]">{policy.icon}</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2 flex items-center gap-2">
                  <span className="text-secondary/60 text-sm font-bold">{index + 1}.</span>
                  {policy.title}
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {policy.content}
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
          <h3 className="font-headline-md text-[22px] text-primary mb-2">Have a question about your order?</h3>
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
