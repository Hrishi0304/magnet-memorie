import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

// ─── Environment Variables ──────────────────────────────────────────────────
const OWNER_WHATSAPP = import.meta.env.VITE_OWNER_WHATSAPP || "919876543210";
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || "";
// ──────────────────────────────────────────────────────────────────────────────

type PaymentModal = "upi-select" | "gpay" | "phonepe" | "bhim" | "whatsapp" | null;

const initialForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();

  const total = totalPrice();
  const deliveryFee = total === 0 ? 0 : total >= 499 ? 0 : 60;
  const finalTotal = total === 0 ? 0 : total + deliveryFee;

  // ── Form State ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState(initialForm);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  // ── Payment Modal State ─────────────────────────────────────────────────────
  const [modal, setModal] = useState<PaymentModal>(null);
  const [formError, setFormError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const grandTotal = finalTotal.toFixed(0);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported by your browser.");
      return;
    }
    setLocationLoading(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const addr = data.address;
          setForm((prev) => ({
            ...prev,
            address: [addr.road, addr.neighbourhood, addr.suburb].filter(Boolean).join(", "),
            city: addr.city || addr.town || addr.village || "",
            state: addr.state || "",
            pincode: addr.postcode || "",
          }));
        } catch {
          setLocationError("Could not fetch address. Please enter manually.");
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        setLocationError("Location permission denied. Please enter manually.");
        setLocationLoading(false);
      }
    );
  };

  const buildOrderSummary = () => {
    const lines = items.map(
      (item) => `• ${item.title} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(0)}`
    );
    return lines.join("\n");
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.phone.trim() || form.phone.length < 10) return "Please enter a valid 10-digit phone number.";
    if (!form.address.trim()) return "Please enter your delivery address.";
    if (!form.city.trim()) return "Please enter your city.";
    if (!form.pincode.trim()) return "Please enter your PIN code.";
    return "";
  };

  const handlePlaceOrder = () => {
    const err = validateForm();
    if (err) { setFormError(err); return; }
    setFormError("");
    setModal("upi-select");
  };


  // ── Compress image via canvas before upload ─────────────────────────────────
  const compressImage = (dataUrl: string, maxWidth = 1200, quality = 0.8): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = dataUrl;
    });

  // ── Upload all photos to Google Drive via Apps Script ────────────────────────
  const uploadPhotosToDrive = async (orderId: string): Promise<string> => {
    const todayDateTime = new Date().toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: false
    }).replace(/[\s,:]+/g, "_"); // "02_Oct_2026_21_21"

    const itemsPayload = await Promise.all(
      items
        .filter((item) => item.uploads.length > 0)
        .map(async (item) => ({
          magnetType: item.title,
          photos: await Promise.all(
            item.uploads.map(async (dataUrl, i) => ({
              index: i + 1,
              dataUrl: await compressImage(dataUrl),
            }))
          ),
        }))
    );

    const customerFolderName = `${orderId}_${form.name.trim()}`;

    // fire-and-forget no-cors bypasses Apps Script's redirect CORS issue
    // We can't read the response in no-cors, so upload is best-effort
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",          // key fix skips preflight & redirect issue
      body: JSON.stringify({
        customerName: customerFolderName,
        orderDate: todayDateTime,
        items: itemsPayload,
      }),
      headers: { "Content-Type": "text/plain" },
    }).catch(() => {}); // swallow network error silently

    // Return folder path so WhatsApp message tells owner where to look
    return `MagnetMemorie Orders / ${customerFolderName}_${todayDateTime}`;
  };

  const openWhatsApp = async (orderId: string) => {
    const fullAddress = [form.address, form.city, form.state, form.pincode].filter(Boolean).join(", ");
    const text = encodeURIComponent(
      `🧲 *New MagnetMemorie Order*\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Customer:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      (form.email ? `*Email:* ${form.email}\n` : "") +
      `*Address:* ${fullAddress}\n\n` +
      `*Items:*\n${buildOrderSummary()}\n\n` +
      `*Subtotal:* ₹${total.toFixed(0)}\n` +
      `*Delivery:* ${deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}\n` +
      `*Total:* ₹${grandTotal}`
    );
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${text}`, "_blank");
    setModal("whatsapp");
  };

  const handleWhatsAppClick = async () => {
    setUploading(true);
    setUploadError("");

    // Generate a simple Order ID
    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    try {
      const hasPhotos = items.some((item) => item.uploads.length > 0);
      if (hasPhotos) {
        await uploadPhotosToDrive(orderId);
      }
      await openWhatsApp(orderId);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Photo upload failed. Opening WhatsApp without Drive link.");
      await openWhatsApp(orderId);
    } finally {
      setUploading(false);
    }
  };

  const handleDone = () => {
    setModal(null);
    clearCart();
    setForm(initialForm);
    setFormError("");
    setUploadError("");
    setLocationError("");
    navigate("/");
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/40 mb-4">shopping_bag</span>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">Your cart is empty</h2>
            <p className="font-body-md text-on-surface-variant mb-6">Add some photo magnets to your cart to checkout.</p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-secondary text-on-secondary font-label-md rounded shadow-sm hover:opacity-90 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

          {/* ── Left Column ──────────────────────────────────────────────── */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-stack-lg">

            {/* Step 1 Contact & Delivery Address */}
            <section aria-labelledby="shipping-heading" className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-stack-md md:p-stack-lg">
              <div className="flex items-center gap-3 mb-stack-md">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-highest text-primary font-label-md">1</span>
                <h2 id="shipping-heading" className="font-headline-md text-headline-md text-primary">Contact & Delivery</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Full Name *</label>
                  <input
                    type="text" id="name" value={form.name} onChange={handleChange}
                    placeholder="Hrishikesh Patil"
                    className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Phone Number *</label>
                  <input
                    type="tel" id="phone" value={form.phone} onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Email (optional)</label>
                  <input
                    type="email" id="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                  />
                </div>

                {/* Address with GPS button */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="address" className="font-label-sm text-label-sm text-on-surface-variant">Street Address *</label>
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={locationLoading}
                      className="flex items-center gap-1 font-label-sm text-label-sm text-secondary hover:underline disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {locationLoading ? "progress_activity" : "my_location"}
                      </span>
                      {locationLoading ? "Detecting…" : "Use my location"}
                    </button>
                  </div>
                  <textarea
                    id="address" value={form.address} onChange={handleChange}
                    rows={2}
                    placeholder="Flat / House no., Building, Street, Area"
                    className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors resize-none"
                  />
                  {locationError && (
                    <p className="font-label-sm text-[11px] text-secondary mt-1">{locationError}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">City *</label>
                  <input
                    type="text" id="city" value={form.city} onChange={handleChange}
                    placeholder="Mumbai"
                    className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                  />
                </div>

                {/* State + Pincode */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">State</label>
                    <input
                      type="text" id="state" value={form.state} onChange={handleChange}
                      placeholder="Maharashtra"
                      className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block font-label-sm text-label-sm text-on-surface-variant mb-1">PIN Code *</label>
                    <input
                      type="text" id="pincode" value={form.pincode} onChange={handleChange}
                      placeholder="400001"
                      className="w-full bg-surface-container-lowest rounded px-4 py-3 font-body-md text-on-surface border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </section>


          </div>

          {/* ── Right Column: Order Summary ───────────────────────────── */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <section aria-labelledby="summary-heading" className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-stack-md md:p-stack-lg">
              <h2 id="summary-heading" className="font-headline-md text-headline-md text-primary mb-stack-md">Order Summary</h2>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-stack-md border-b border-surface-variant pb-stack-md">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-surface-container rounded overflow-hidden border border-outline-variant/20">
                      <img className="w-full h-full object-cover" src={item.imageUrl} alt={item.title} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-body-md font-semibold text-primary">{item.title}</h3>
                      <p className="font-label-sm text-on-surface-variant">Qty: {item.quantity}</p>
                      {item.uploads.length > 0 && (
                        <p className="font-label-sm text-[11px] text-secondary mt-0.5 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          {item.uploads.length}/{item.quantity} photo{item.uploads.length !== 1 ? "s" : ""} uploaded
                        </p>
                      )}
                      <span className="font-body-md font-semibold text-primary mt-1 block">₹{(item.price * item.quantity).toFixed(0)}</span>
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
                  <span className="text-on-surface-variant">Delivery</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-stack-lg">
                <span className="font-body-lg font-semibold text-primary">Total</span>
                <span className="font-headline-md text-headline-md text-primary">₹{grandTotal}</span>
              </div>

              {/* Error */}
              {formError && (
                <p className="font-label-sm text-label-sm text-secondary mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {formError}
                </p>
              )}

              {/* CTA */}
              <button
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-secondary text-on-secondary font-label-md rounded shadow-sm hover:opacity-90 transition-all flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">lock</span>
                PLACE ORDER ₹{grandTotal}
              </button>

              <p className="font-label-sm text-[11px] text-center text-on-surface-variant mt-3">
                By placing this order you confirm your details are correct.
              </p>
            </section>
          </div>
        </div>
        )}
      </main>

      {/* ── Payment Modal ─────────────────────────────────────────────────────── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-sm shadow-xl overflow-hidden animate-[slideUp_0.25s_ease]">

            {/* ── UPI Selector ── */}
            {modal === "upi-select" && (
              <>
                <div className="p-6 border-b border-surface-variant text-center">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[#25D366] text-3xl">chat</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">Almost Done!</h3>
                  <p className="font-label-sm text-on-surface-variant">Send your order via WhatsApp to confirm and complete your purchase.</p>
                </div>
                <div className="p-4 flex flex-col gap-3">

                  <button
                    onClick={handleWhatsAppClick}
                    disabled={uploading}
                    className="flex items-center gap-4 w-full p-4 rounded-xl border border-[#25D366]/40 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all disabled:opacity-70 disabled:cursor-wait"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm shrink-0">
                      {uploading ? (
                        <span className="material-symbols-outlined text-white text-[20px] animate-spin">progress_activity</span>
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      )}
                    </div>
                    <div className="text-left">
                      <span className="block font-body-md font-semibold text-primary">
                        {uploading ? "Uploading photos…" : "Send Order via WhatsApp"}
                      </span>
                      <span className="block font-label-sm text-on-surface-variant">
                        {uploading ? "Saving to Google Drive" : "Confirm & get order details"}
                      </span>
                    </div>
                    {!uploading && <span className="material-symbols-outlined ml-auto text-on-surface-variant">chevron_right</span>}
                  </button>
                  {uploadError && (
                    <p className="font-label-sm text-[11px] text-secondary flex items-center gap-1 px-1">
                      <span className="material-symbols-outlined text-[13px]">warning</span>
                      {uploadError}
                    </p>
                  )}
                </div>
                <div className="px-4 pb-4">
                  <button onClick={() => setModal(null)} className="w-full py-3 text-on-surface-variant font-label-sm hover:text-primary transition-colors">
                    Cancel
                  </button>
                </div>
              </>
            )}

            {/* ── Post-UPI / Post-WhatsApp confirmation ── */}
            {(modal === "gpay" || modal === "phonepe" || modal === "bhim") && (
              <>
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-secondary text-3xl">payments</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">Payment Initiated</h3>
                  <p className="font-body-md text-on-surface-variant mb-6">
                    Complete the payment in your UPI app. Once done, send us your order on WhatsApp so we can confirm it.
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    disabled={uploading}
                    className="w-full py-4 bg-[#25D366] text-white font-label-md rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-3 disabled:opacity-70 disabled:cursor-wait"
                  >
                    {uploading ? (
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    )}
                    {uploading ? "Uploading photos…" : "Send Order on WhatsApp"}
                  </button>
                  <button onClick={() => setModal(null)} className="w-full py-2 text-on-surface-variant font-label-sm hover:text-primary transition-colors">
                    Close
                  </button>
                </div>
              </>
            )}

            {/* ── After WhatsApp sent ── */}
            {modal === "whatsapp" && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[#25D366] text-3xl">check_circle</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Order Sent! 🎉</h3>
                <p className="font-body-md text-on-surface-variant mb-6">
                  Your order details have been sent to us on WhatsApp. We'll confirm your order and begin production shortly.
                </p>
                <button
                  onClick={handleDone}
                  className="w-full py-4 bg-secondary text-on-secondary font-label-md rounded-xl hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
