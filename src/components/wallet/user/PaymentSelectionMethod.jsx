import { useState } from "react";

function VisaIcon() {
     return (
          <div className="w-[46px] h-[30px] bg-white border border-gray-200 rounded flex items-center justify-center px-1">
               <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "13px", color: "#1A1F71", letterSpacing: "-0.5px", fontStyle: "italic" }}>
                    VISA
               </span>
          </div>
     );
}

function MastercardIcon() {
     return (
          <div className="w-[46px] h-[30px] flex items-center justify-center">
               <svg width="38" height="24" viewBox="0 0 38 24" fill="none">
                    <circle cx="14" cy="12" r="11" fill="#EB001B" />
                    <circle cx="24" cy="12" r="11" fill="#F79E1B" fillOpacity="0.9" />
                    <path d="M19 4.8C21.1 6.4 22.5 8.9 22.5 11.7C22.5 14.5 21.1 17 19 18.6C16.9 17 15.5 14.5 15.5 11.7C15.5 8.9 16.9 6.4 19 4.8Z" fill="#FF5F00" />
               </svg>
          </div>
     );
}

function StripeIcon() {
     return (
          <div className="w-[46px] h-[30px] bg-[#635BFF] rounded flex items-center justify-center px-1">
               <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "11px", color: "white", letterSpacing: "0.5px" }}>stripe</span>
          </div>
     );
}

function BitPayIcon() {
     return (
          <div className="w-[46px] h-[30px] bg-white border border-gray-200 rounded flex items-center justify-center px-1">
               <span style={{ fontFamily: "Arial, sans-serif", fontWeight: 700, fontSize: "9px", color: "#1b2e7f" }}>bitpay</span>
          </div>
     );
}

function PayPalIcon() {
     return (
          <div className="w-[30px] h-[30px] flex items-center justify-center">
               <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                    <path d="M20.5 5.5C21.3 7.2 21.1 9.4 20.1 11.1C18.9 13.2 16.7 14.3 14.1 14.3H12.3C12 14.3 11.7 14.5 11.7 14.8L10.8 20.4L10.5 22.3C10.5 22.5 10.3 22.6 10.1 22.6H6.6C6.3 22.6 6.1 22.4 6.1 22.1L8.8 5.4C8.9 5.1 9.1 4.9 9.4 4.9H17.1C18.7 4.9 19.9 5.1 20.5 5.5Z" fill="#003087" />
                    <path d="M22.3 3.9C21.4 2.8 19.8 2.2 17.5 2.2H10C9.7 2.2 9.4 2.4 9.4 2.7L6.5 20.2C6.5 20.5 6.7 20.7 7 20.7H10.8L11.7 14.8C11.7 14.5 12 14.3 12.3 14.3H14.1C16.7 14.3 18.9 13.2 20.1 11.1C21.5 8.6 21.2 5.5 19.2 3.9H22.3Z" fill="#009CDE" />
               </svg>
          </div>
     );
}

function BankIcon() {
     return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M3 21H21M3 10H21M5 6L12 3L19 6M4 10V21M20 10V21M8 14V17M12 14V17M16 14V17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
     );
}

function LockIcon() {
     return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
               <rect x="3" y="11" width="18" height="11" rx="2" stroke="#9CA3AF" strokeWidth="2" />
               <path d="M7 11V7a5 5 0 0110 0v4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>
     );
}

function CartIcon() {
     return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
               <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
               <line x1="3" y1="6" x2="21" y2="6" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
               <path d="M16 10a4 4 0 01-8 0" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
     );
}

function BellIcon() {
     return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
               <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
     );
}

function MailIcon() {
     return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
               <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
               <polyline points="22,6 12,13 2,6" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
     );
}

function ChevronDownIcon() {
     return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
               <polyline points="6,9 12,15 18,9" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
     );
}

function PaymentRow({ icon, label, sub, selected, onClick }) {
     return (
          <div
               className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer"
               style={{ backgroundColor: "#F8FAFC", border: "1px solid #E5E7EB" }}
               onClick={onClick}
          >
               <div className="flex items-center gap-3">
                    {icon}
                    <div>
                         <div style={{ fontSize: "14px", fontWeight: 500, color: "#111827", fontFamily: "Inter, sans-serif" }}>{label}</div>
                         <div style={{ fontSize: "12px", color: "#6B7280", fontFamily: "Inter, sans-serif" }}>{sub}</div>
                    </div>
               </div>
               <div
                    className="w-5 h-5 rounded-full"
                    style={{ border: selected ? "none" : "2px solid #D1D5DB", backgroundColor: selected ? "#3B82F6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
               >
                    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
               </div>
          </div>
     );
}


export default function PaymentSelectionMethod() {
     const [selectedMethod, setSelectedMethod] = useState("visa")
     return (
          <div className="w-full max-w-[1190px] mx-auto bg-white rounded-2xl px-6 py-6" style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
               <h2 className="mb-5" style={{ fontSize: "16px", fontWeight: 600, color: "#111827" }}>Payment Method Selection</h2>

               <div className="flex flex-col gap-2">
                    {/* Visa - pre-selected */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: "#F8FAFC", border: "1px solid #E5E7EB" }}>
                         <div className="flex items-center gap-3">
                              <VisaIcon />
                              <div>
                                   <div style={{ fontSize: "14px", fontWeight: 500, color: "#111827" }}>visa ****2125</div>
                                   <div style={{ fontSize: "12px", color: "#6B7280" }}>Expiry · 12/27</div>
                              </div>
                         </div>
                         <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ border: "2px solid #3B82F6", backgroundColor: "#3B82F6" }}>
                              <div className="w-2 h-2 rounded-full bg-white" />
                         </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center py-2">
                         <span style={{ fontSize: "13px", color: "#9CA3AF" }}>Other Options</span>
                    </div>

                    <PaymentRow icon={<MastercardIcon />} label="Mastercard" sub="globalmanufacturing@gmail.com" selected={selectedMethod === "mastercard"} onClick={() => setSelectedMethod("mastercard")} />
                    <PaymentRow icon={<StripeIcon />} label="stripe" sub="globalmanufacturing@gmail.com" selected={selectedMethod === "stripe"} onClick={() => setSelectedMethod("stripe")} />
                    <PaymentRow icon={<BitPayIcon />} label="pay Pal" sub="globalmanufacturing@gmail.com" selected={selectedMethod === "bitpay"} onClick={() => setSelectedMethod("bitpay")} />
                    <PaymentRow icon={<PayPalIcon />} label="pay Pal" sub="globalmanufacturing@gmail.com" selected={selectedMethod === "paypal"} onClick={() => setSelectedMethod("paypal")} />

                    {/* Bank Transfer - highlighted border */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer" style={{ backgroundColor: "white", border: "2px solid #6366F1" }} onClick={() => setSelectedMethod("bank")}>
                         <div className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ border: selectedMethod === "bank" ? "none" : "2px solid #D1D5DB", backgroundColor: selectedMethod === "bank" ? "#6366F1" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                   {selectedMethod === "bank" && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <div>
                                   <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Bank Transfer (T&T)</div>
                                   <div style={{ fontSize: "12px", color: "#6B7280" }}>Direct Business-To-Business Transfer.</div>
                              </div>
                         </div>
                         <BankIcon />
                    </div>
               </div>

               {/* Security note */}
               <div className="flex items-center justify-center gap-1.5 mt-5 pt-4" style={{ borderTop: "1px solid #F3F4F6" }}>
                    <LockIcon />
                    <span style={{ fontSize: "12px", color: "#9CA3AF" }}>Payment Are Secured & Encrypted</span>
               </div>
          </div>
     )
}