import { logoutToLogin } from "@/lib/auth/session";
import api from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CancelSubscriptionModal({ setDeletePlanModal, setConfirmDelete }) {
     const [loadingDelete, setLoadingDelete] = useState(false)
     const [password, setPassword] = useState("");

     const handleDeleteConfirm = async () => {
          if (!password) {
               toast.error("Password is required");
               return;
          }

          try {
               setLoadingDelete(true);

               console.log(password,)

               const res = await api.post({
                    url: `/subscription/stripe/cancel-subscription`,
                    payload: {
                         password: password,
                    },
               });

               if (res.success) {
                    toast.success(res.message);
                    resetDeleteState();
                    logoutToLogin();
               }
          } catch (e) {
               toast.error(e?.message || "Something went wrong");
          } finally {
               setLoadingDelete(false);
          }
     };

     const resetDeleteState = () => {
          setDeletePlanModal(false);
          setConfirmDelete(false);
     };

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
               <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

                    <h2 className="text-xl font-semibold mb-4 text-gray-900">
                         Confirm Plan Deletion
                    </h2>

                    <p className="text-sm text-gray-600 mb-4">
                         Please enter your password to confirm deletion of your subscription.
                    </p>

                    <input
                         type="password"
                         placeholder="Enter your password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />

                    <div className="flex justify-end gap-3">
                         <button
                              onClick={resetDeleteState}
                              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                         >
                              Cancel
                         </button>

                         <button
                              onClick={handleDeleteConfirm}
                              disabled={loadingDelete}
                              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                         >
                              {loadingDelete ? "Deleting..." : "Confirm Delete"}
                         </button>
                    </div>
               </div>
          </div>
     )
}