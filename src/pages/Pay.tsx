import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const Pay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");
  const amt = searchParams.get("amt");
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing">("pending");

  const openUpi = (app: "gpay" | "phonepe" | "bhim") => {
    const upiId = import.meta.env.VITE_OWNER_UPI_ID || "yourname@upi";
    const name = "MagnetMemorie";
    const amount = amt || "0";
    const transactionId = orderId || `TXN${Date.now()}`;
    const note = encodeURI(`Order ${orderId || "Payment"}`);

    let url = "";
    if (app === "gpay") {
      url = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tr=${transactionId}&tn=${note}`;
    } else if (app === "phonepe") {
      url = `phonepe://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tr=${transactionId}&tn=${note}`;
    } else {
      url = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tr=${transactionId}&tn=${note}`;
    }

    setPaymentStatus("processing");

    // Slight delay so state updates before browser attempts deep link navigation
    setTimeout(() => {
      window.location.href = url;
    }, 100);
  };

  if (!orderId || !amt) {
    return (
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-error text-3xl">error</span>
        </div>
        <h1 className="font-headline-lg text-primary mb-2">Invalid Payment Link</h1>
        <p className="font-body-md text-on-surface-variant">The payment link seems to be broken or missing details.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-surface-container-highest text-primary font-label-md rounded-xl hover:bg-surface-container-highest/80 transition-colors"
        >
          Return Home
        </button>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-sm mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg mt-8">
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/30 overflow-hidden">

        <div className="bg-surface-container-highest p-8 text-center border-b border-outline-variant/30">
          <h1 className="font-headline-sm text-on-surface-variant mb-1">Complete Payment</h1>
          <p className="font-label-sm text-on-surface-variant/70 mb-4 uppercase tracking-wider">{orderId}</p>
          <div className="text-5xl font-headline-lg text-primary font-medium tracking-tight">
            ₹{amt}
          </div>
        </div>

        {paymentStatus === "pending" ? (
          <div className="p-6 flex flex-col gap-3">
            <p className="font-label-sm text-center text-on-surface-variant mb-3">
              Select an app to pay securely
            </p>

            <button
              onClick={() => openUpi("gpay")}
              className="flex items-center gap-4 w-full p-4 rounded-2xl border border-outline-variant/40 hover:bg-surface-container hover:border-secondary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <img src="gpay.jpg" alt="GPay" className="w-7 h-7 object-contain" />
              </div>
              <div className="text-left">
                <span className="block font-body-lg font-semibold text-primary">Google Pay</span>
                <span className="block font-label-sm text-on-surface-variant mt-0.5">Fast & secure</span>
              </div>
              <span className="material-symbols-outlined ml-auto text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
            </button>

            <button
              onClick={() => openUpi("phonepe")}
              className="flex items-center gap-4 w-full p-4 rounded-2xl border border-outline-variant/40 hover:bg-surface-container hover:border-secondary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#5f259f] flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <img src="/phonepe.png" alt="PhonePe" className="w-7 h-7 object-contain" />
              </div>
              <div className="text-left">
                <span className="block font-body-lg font-semibold text-primary">PhonePe</span>
                <span className="block font-label-sm text-on-surface-variant mt-0.5">Direct via UPI</span>
              </div>
              <span className="material-symbols-outlined ml-auto text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
            </button>

            <button
              onClick={() => openUpi("bhim")}
              className="flex items-center gap-4 w-full p-4 rounded-2xl border border-outline-variant/40 hover:bg-surface-container hover:border-secondary/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                <img src="BHIM.png" alt="BHIM" className="w-7 h-7 object-contain" />
              </div>
              <div className="text-left">
                <span className="block font-body-lg font-semibold text-primary">Any UPI App</span>
                <span className="block font-label-sm text-on-surface-variant mt-0.5">Paytm, Cred, BHIM</span>
              </div>
              <span className="material-symbols-outlined ml-auto text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
            </button>
          </div>
        ) : (
          <div className="p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-secondary text-4xl">payments</span>
            </div>
            <h3 className="font-headline-md text-primary mb-3">Payment Initiated</h3>
            <p className="font-body-md text-on-surface-variant mb-8 px-4">
              Please complete the payment in your UPI app. Once done, we will confirm your order on WhatsApp.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full py-4 bg-secondary text-on-secondary font-label-md rounded-xl hover:opacity-90 transition-opacity"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
