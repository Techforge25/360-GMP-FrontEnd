"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useUserRole } from "@/context/UserContext";
export default function AuthSuccessComp() {
     const router = useRouter();
     const { login } = useUserRole();

     useEffect(() => {
          const init = async () => {
               try {
                    const res = await api.get({ url: "/auth/user/me" });
                    login(res.data);

                    if (res.data.role === "user") router.push("/dashboard/user");
                    if (res.data.role === "business") router.push("/dashboard/business");
                    if (!res.data.role || res.data.role === null) router.push("/onboarding/role");
               }
               catch (e) {
                    router.push("/login");
               }
          };
          init();
     }, []);
     return (
          <div>Logging in...</div>
     )
}