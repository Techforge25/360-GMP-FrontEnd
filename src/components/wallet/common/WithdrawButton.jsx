import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";

export default function WithDrawButton({ withdrawOpen, setWithdrawOpen }) {
     const [errorModalOpen, setErrorModalOpen] = useState(false);
     const [errorMessage, setErrorMessage] = useState("");
     const [loading, setLoading] = useState(false);
     const [profile, setProfile] = useState("")
     useEffect(() => {
          const loggedIn = JSON.parse(localStorage.getItem("user"))
          setProfile(loggedIn.profileData)
     }, [])

     const [formData, setFormData] = useState({
          businessProfile: profile,
          amount: "",
     });

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }));
     };

     const connectStripeAccount = async () => {
          setErrorModalOpen(false);
          setLoading(true);

          try {
               const res = await api.post({
                    url: "/wallet/connect",
                    payload: {
                         ownerModel: profile === "business" ? "BusinessProfile" : "UserProfile",
                    },
                    enableSuccessMessage: false,
                    enableErrorMessage: false,
                    activateLoader: false,
               });

               if (res.success) {
                    window.open(res.data.url);
               }
          } catch (err) {
               toast.error("Failed to connect Stripe account");
          } finally {
               setLoading(false);
          }
     };

     const handleWithdraw = async () => {
          setWithdrawOpen(false);

          if (Number(formData.amount) < 50) {
               toast.error("Please Withdraw atleast $50");
               return;
          }

          setLoading(true);

          try {
               const res = await api.post({
                    url: "/wallet/withdraw",
                    payload: {
                         ownerModel: profile === "business" ? "BusinessProfile" : "UserProfile",
                         withdrawalAmount: Number(formData.amount)
                    },
                    enableSuccessMessage: false,
                    enableErrorMessage: false,
                    activateLoader: false,
               });

               if (res.message === "Funds sent successfully") {
                    toast.success("Funds sent Successfully!");
               }

               if (res.data?.onboardingRequired) {
                    setErrorMessage("Stripe account setup required.");
                    setErrorModalOpen(true);
               }

          } catch (err) {
               const message =
                    err?.response?.data?.message ||
                    err?.data?.message ||
                    "Something went wrong";

               toast.error(message);
          } finally {
               setLoading(false);
          }
     };
     return (
          <>
               {withdrawOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                         <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

                              <h2 className="mb-4 text-lg text-black font-semibold">
                                   Withdraw Funds
                              </h2>

                              <div className="mb-4">
                                   <label className="mb-1 block text-sm text-gray-500">
                                        Withdrawal Amount
                                   </label>
                                   <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-[#240457]"
                                        placeholder="Enter amount"
                                   />
                              </div>

                              {/* Buttons */}
                              <div className="flex justify-end gap-3">
                                   <Button
                                        variant="secondary"
                                        onClick={() => setWithdrawOpen(false)}
                                   >
                                        Cancel
                                   </Button>

                                   <Button onClick={handleWithdraw} disabled={loading}>
                                        {loading ? "Processing..." : "Submit"}
                                   </Button>
                              </div>
                         </div>
                    </div>
               )}

               {
                    errorModalOpen && (
                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                              <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">

                                   <h2 className="text-lg font-semibold text-red-600 mb-3">
                                        Withdrawal Failed
                                   </h2>

                                   <p className="text-gray-600 text-sm mb-5">
                                        {errorMessage}
                                        Please Make a New Account
                                   </p>

                                   <div className="flex justify-end gap-4">
                                        <Button
                                             variant="default"
                                             onClick={connectStripeAccount}
                                             disabled={loading}
                                        >
                                             {loading ? "Connecting..." : "Connect Account"}
                                        </Button>
                                        <Button
                                             variant="secondary"
                                             onClick={() => setWithdrawOpen(false)}
                                             disabled={loading}
                                        >
                                             Close
                                        </Button>
                                   </div>

                              </div>
                         </div>
                    )
               }
          </>
     )
}