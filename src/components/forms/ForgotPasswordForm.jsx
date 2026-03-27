"use client"
import { forgotPasswordSchema } from "@/validations/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";
export default function ForgotPasswordForm() {
     const router = useRouter();
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     const {
          register,
          handleSubmit,
          watch,
          formState: { errors },
     } = useForm({
          resolver: yupResolver(forgotPasswordSchema),
          mode: "onChange",
     });
     const firstError = Object.values(errors)[0]?.message;
     const onSubmit = async (data) => {
          setLoading(true);
          setError("");
          console.log(data, "data")
          try {
               const res = await api.post({
                    url: `/auth/forgotPassword`,
                    payload: { email: data.email },
                    enableSuccessMessage: false,
                    enableErrorMessage: false,
                    activateLoader: false,
               });

               if (res.success) {
                    router.push(
                         `/otp-verification?email=${encodeURIComponent(data.email)}&type=password-reset`,
                    );
               } else {
                    setError(res.message || "Request failed");
               }
          } catch (err) {
               console.log(err, "errror")
               setError(err.message || "Something went wrong.");
          } finally {
               setLoading(false);
          }
     };
     return (
          <>
               {(firstError || error) && (
                    <p className="p-2 xs:p-3 text-sm xs:text-sm sm:text-base text-red-500 bg-red-50 rounded-md text-center">
                         {firstError || error}
                    </p>
               )}
               <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 xs:space-y-5 sm:space-y-6"
               >
                    <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
                         <label
                              htmlFor="email"
                              className="text-sm xs:text-sm sm:text-base font-medium text-text-primary"
                         >
                              Enter Your Email
                         </label>
                         <Input
                              id="email"
                              placeholder="info@gmail.com"
                              type="email"
                              {...register("email")}
                              className="bg-surface border-border-light h-9 xs:h-10 sm:h-11 text-sm xs:text-sm sm:text-base"
                         />
                    </div>

                    <Button
                         type="submit"
                         isLoading={loading}
                         disabled={!watch("email")}
                         className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-9 xs:h-10 sm:h-11 text-sm xs:text-base sm:text-xl shadow-lg shadow-brand-primary/20"
                    >
                         Request OTP
                    </Button>
               </form>
          </>
     )
}