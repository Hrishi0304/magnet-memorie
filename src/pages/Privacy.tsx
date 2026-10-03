const privacyData = [
  {
    title: "Information You Provide",
    content: "Depending on how you use our services, we may receive your name, contact details, delivery/billing info, order details, submitted photographs, payment confirmations, and website analytics.",
    icon: "list_alt"
  },
  {
    title: "Purpose of Collection",
    content: "We use this information to fulfill your orders, prepare customized products, coordinate delivery, respond to enquiries, provide updates, and improve our website and services.",
    icon: "task_alt"
  },
  {
    title: "Use of Uploaded Photos",
    content: "Images submitted are used solely for fulfilling the requested customized product. They are not sold or intentionally used for advertising without permission.",
    icon: "photo_camera"
  },
  {
    title: "Payment Processing",
    content: "Online payments are handled by authorized third-party payment providers. Magnet Memorie does not collect or store sensitive credentials like PINs, passwords, or CVV numbers.",
    icon: "security"
  },
  {
    title: "When Information May Be Shared",
    content: "We may provide limited, necessary information to partners who help operate our business (payment processors, printing partners, delivery providers). We do not sell customer data.",
    icon: "handshake"
  },
  {
    title: "Website Technologies",
    content: "We may use cookies and similar technologies to maintain website functionality, understand visitor activity, remember preferences, and improve the overall browsing experience.",
    icon: "cookie"
  },
  {
    title: "Protecting Your Information",
    content: "We use reasonable administrative and technical measures to safeguard your information. However, internet-based systems cannot be guaranteed to be completely secure.",
    icon: "shield"
  },
  {
    title: "How Long We Keep Information",
    content: "Information may be retained for as long as reasonably necessary to complete orders, provide customer support, maintain business records, or meet legal requirements.",
    icon: "history"
  },
  {
    title: "Privacy Requests",
    content: "For questions or requests concerning your personal information, you may contact us regarding access, correction, or deletion where applicable.",
    icon: "contact_support"
  },
  {
    title: "External Services",
    content: "Our website may use or link to services operated by third parties. Their handling of information is governed by their own privacy policies.",
    icon: "open_in_new"
  },
  {
    title: "Changes to This Policy",
    content: "This Privacy Policy may be revised periodically to reflect changes in our services or practices. The latest version will always be published on this page.",
    icon: "update"
  }
];

export const Privacy = () => {
  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
      <div className="text-center mb-16 animate-[fadeSlideIn_0.4s_ease-out_forwards]">
        <h1 className="font-display-lg text-display-lg text-primary mb-4">Privacy Policy</h1>
        <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-6" />
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Last Updated: 03 October 2026<br/><br/>
          At Magnet Memorie, we believe your personal information should be handled with care. This policy describes what information we collect, why we need it, and how we protect it.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {privacyData.map((policy, index) => (
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
                <p className="font-body-md text-on-surface-variant leading-relaxed">
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
          <h3 className="font-headline-md text-[22px] text-primary mb-2">Have privacy concerns?</h3>
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
