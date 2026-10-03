import { useState } from "react";
import { CustomSelect } from "../components/ui/CustomSelect";

type OrderMode = "regular" | "event";

export const BulkOrders = () => {
  const [orderMode, setOrderMode] = useState<OrderMode>("regular");
  const [eventType, setEventType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [eventAddress, setEventAddress] = useState("");

  const eventQtyOptions = ["100 – 250", "251 – 500", "500 – 1000", "1000+"];

  const handleModeChange = (mode: OrderMode) => {
    setOrderMode(mode);
    setQuantity("");
  };

  return (
    <main className="flex-grow w-full">
      {/* Hero */}
      <section className="w-full bg-deep-onyx text-white py-20 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <p className="font-label-md text-label-md text-memory-gold uppercase tracking-widest mb-4">For Events, Gifting &amp; Corporate Orders</p>
          <h1 className="font-display-lg text-display-lg mb-6 max-w-3xl mx-auto leading-tight">
            Order in Bulk.<br />Make Every Piece Personal.
          </h1>
          <p className="font-body-lg text-body-lg text-white/70 max-w-xl mx-auto">
            Weddings, birthdays, corporate gifting, school reunions — we handle large orders with uncompromised quality and fast turnaround.
          </p>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="w-full bg-surface-container-low border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[36px] text-magnet-red" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
            <h3 className="font-headline-md text-headline-md text-primary text-[18px]">From 25 Pieces</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Bulk pricing kicks in from 25 units. Event orders start at 100. Bigger orders, bigger savings.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[36px] text-magnet-red" style={{ fontVariationSettings: "'FILL' 1" }}>design_services</span>
            <h3 className="font-headline-md text-headline-md text-primary text-[18px]">Custom Branding</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Logo, name, or event date — every magnet can be personalised.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[36px] text-magnet-red" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
            <h3 className="font-headline-md text-headline-md text-primary text-[18px]">48–72 Hr Dispatch</h3>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Fast production and dispatch with full order tracking.</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-3">Submit Your Enquiry</h2>
            <div className="w-12 h-1 bg-magnet-red rounded-full mx-auto mb-4" />
            <p className="font-body-md text-body-md text-on-surface-variant">
              Fill in the form and we'll get back to you within 24 hours with a custom quote.
            </p>
          </div>

          <form className="flex flex-col gap-5">

            {/* Order Type Toggle */}
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">Order Type</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleModeChange("regular")}
                  className={`flex flex-col items-center gap-1.5 px-4 py-4 rounded-lg border-2 transition-all duration-200 ${
                    orderMode === "regular"
                      ? "border-deep-onyx bg-deep-onyx text-white shadow-md"
                      : "border-outline-variant text-on-surface hover:border-deep-onyx"
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>package_2</span>
                  <span className="font-label-md text-label-md">Regular Bulk</span>
                  <span className={`font-label-sm text-[12px] ${orderMode === "regular" ? "text-white/70" : "text-on-surface-variant"}`}>
                    Min. 25 magnets
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("event")}
                  className={`flex flex-col items-center gap-1.5 px-4 py-4 rounded-lg border-2 transition-all duration-200 ${
                    orderMode === "event"
                      ? "border-deep-onyx bg-deep-onyx text-white shadow-md"
                      : "border-outline-variant text-on-surface hover:border-deep-onyx"
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
                  <span className="font-label-md text-label-md">Event Order</span>
                  <span className={`font-label-sm text-[12px] ${orderMode === "event" ? "text-white/70" : "text-on-surface-variant"}`}>
                    Min. 100 magnets
                  </span>
                </button>
              </div>
            </div>

            {/* Name + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="bulk-name" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Full Name</label>
                <input
                  type="text"
                  id="bulk-name"
                  placeholder="Rahul Sharma"
                  className="w-full bg-white rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="bulk-phone" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="bulk-phone"
                  placeholder="+91 98765 43210"
                  className="w-full bg-white rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="bulk-email" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Email Address</label>
              <input
                type="email"
                id="bulk-email"
                placeholder="you@example.com"
                className="w-full bg-white rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
              />
            </div>

            {/* Regular Bulk — just quantity */}
            {orderMode === "regular" && (
              <div>
                <label htmlFor="bulk-qty-regular" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Number of Magnets <span className="text-on-surface-variant font-normal">(min. 25)</span>
                </label>
                <input
                  type="number"
                  id="bulk-qty-regular"
                  min={25}
                  placeholder="e.g. 50"
                  className="w-full bg-white rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                />
              </div>
            )}

            {/* Event Order — occasion type + quantity */}
            {orderMode === "event" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-20" style={{ animation: "fadeSlideIn 0.2s ease forwards" }}>
                <CustomSelect
                  id="bulk-event"
                  label="Event / Occasion"
                  placeholder="Select type"
                  options={[
                    "Wedding / Sangeet",
                    "Birthday Party",
                    "Corporate Gift",
                    "School / College Reunion",
                    "Baby Shower",
                    "Other",
                  ]}
                  value={eventType}
                  onChange={setEventType}
                />
                <CustomSelect
                  id="bulk-qty"
                  label="Quantity (min. 100)"
                  placeholder="Select range"
                  options={eventQtyOptions}
                  value={quantity}
                  onChange={setQuantity}
                />
              </div>
            )}

            {/* Event Address — only for event orders */}
            {orderMode === "event" && (
              <div style={{ animation: "fadeSlideIn 0.25s ease forwards" }}>
                <label htmlFor="bulk-event-address" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Event Address or Google Maps Link <span className="text-magnet-red">*</span>
                </label>
                <textarea
                  id="bulk-event-address"
                  rows={3}
                  value={eventAddress}
                  onChange={(e) => setEventAddress(e.target.value)}
                  placeholder={"123, MG Road, Koramangala, Bengaluru — 560034\nor paste a Google Maps link: https://maps.google.com/..."}
                  className="w-full bg-white rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors resize-none"
                  required
                />
                <p className="font-label-sm text-[12px] text-on-surface-variant mt-1.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-memory-gold">info</span>
                  Magnets will be delivered directly to the event venue.
                </p>
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor="bulk-message" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Additional Details</label>
              <textarea
                id="bulk-message"
                rows={4}
                placeholder="Tell us about your event, preferred magnet type, custom text or design requirements..."
                className="w-full bg-white rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/40 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-magnet-red text-white font-label-md text-label-md py-4 rounded shadow-sm hover:shadow-md hover:bg-secondary transition-all duration-200 uppercase tracking-wider mt-2"
            >
              Send Enquiry
            </button>

            <p className="text-center font-body-md text-[13px] text-on-surface-variant">
              We'll respond within 24 hours with a detailed quote. No spam, ever.
            </p>
          </form>
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};
