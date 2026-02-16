"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import api from "@/lib/axios";
import { useUserRole } from "@/context/UserContext";
import { backendURL } from "@/constants";

function LoginPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useUserRole();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  // Check for authenticated session after Google OAuth callback
  useEffect(() => {
    const checkAuthSession = async () => {
      // For new Google OAuth users, profile doesn't exist yet
      // If redirectPath exists, it means backend redirected us here after successful OAuth
      if (redirectPath) {
        // User is authenticated but profile doesn't exist - redirect to onboarding
        const userData = {
          isNewToPlatform: true,
          email: "", // Will be filled during onboarding
        };
        login(userData);
        router.push("/onboarding/role");
      }
    };

    checkAuthSession();
  }, [login, router, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post({
        url: `/auth/user/login`,
        payload: {
          email,
          passwordHash: password,
        },
      });

      if (res.success) {
        console.log("Logged in:", res.data);
        // Check if token is at the root level and merge it
        const finalUserData = {
          ...res.data,
          accessToken:
            res.accessToken ||
            res.token ||
            res.data?.accessToken ||
            res.data?.token,
        };

        login(finalUserData);

        // Check isNew field to decide navigation
        if (finalUserData.isNewToPlatform) {
          router.push("/onboarding/role");
        } else {
          // If not new, send to dashboard based on role (or default dashboard)
          // If role is missing, default to role selection anyway as a fallback
          const role = res.data.role;
          if (role === "business") router.push("/dashboard/business");
          else if (role === "user") router.push("/dashboard/user");
          else router.push("/dashboard");
        }
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const res = await api.get({
  //       url: `/auth/logout`,
  //     });

  //     if (res.success) {
  //       console.log("Logged out:", res.data);

  //       router.push("/login");
  //     } else {
  //       setError(res.message || "Logout failed");
  //     }
  //   } catch (err) {
  //     setError("Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGoogleLogin = () => {
    window.open(`${backendURL}/auth/google`, `_self`);
  };

  return (
    <Card className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-xl mx-auto border-none shadow-xl bg-surface-elevated">
      <CardHeader className="text-center pb-1 sm:pb-2 px-3 xs:px-4 sm:px-6 pt-4 xs:pt-6 sm:pt-8">
        <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
          Welcome To 360GMP
        </CardTitle>
        <CardDescription className="text-sm xs:text-sm sm:text-base text-text-secondary mt-1 sm:mt-2">
          One Platform Many Solutions
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 xs:space-y-5 sm:space-y-6 px-3 xs:px-4 sm:px-6 pb-4 xs:pb-6 sm:pb-8 pt-3 xs:pt-4 sm:pt-6">
        {error && (
          <div className="p-2 xs:p-3 text-sm xs:text-sm sm:text-base text-red-500 bg-red-50 rounded-md text-center">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 xs:space-y-4 sm:space-y-4"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface border-border-light h-9 xs:h-10 sm:h-11 text-sm xs:text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
            <label
              htmlFor="password"
              className="text-sm xs:text-sm sm:text-base font-medium text-text-primary"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-surface border-border-light h-9 xs:h-10 sm:h-11 text-sm xs:text-sm sm:text-base pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-brand-primary transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <FiEye className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 xs:gap-0">
            <label className="flex items-center space-x-1.5 xs:space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary h-3 w-3 xs:h-4 xs:w-4"
              />
              <span className="text-sm xs:text-sm sm:text-base text-text-secondary">
                Remember me
              </span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm xs:text-sm sm:text-base font-medium text-text-secondary hover:text-brand-primary"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-9 xs:h-10 sm:h-11 text-sm xs:text-sm sm:text-base mt-1 xs:mt-2"
          >
            Sign In
          </Button>
        </form>

        <div className="relative my-3 xs:my-4 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-light" />
          </div>
          <div className="relative flex justify-center text-[10px] xs:text-sm sm:text-sm">
            <span className="bg-surface-elevated px-1.5 xs:px-2 sm:px-3 text-text-secondary rounded-full border border-border-light">
              or
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-9 xs:h-10 sm:h-11 border-border-light text-text-primary text-sm xs:text-sm sm:text-base font-medium hover:bg-surface-muted relative"
          onClick={handleGoogleLogin}
        >
          <div className="absolute left-2 xs:left-3 sm:left-4">
            <FcGoogle className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-sm xs:text-sm sm:text-base">
            Continue with Google
          </span>
        </Button>

        <div className="text-center text-sm xs:text-sm sm:text-base text-text-secondary mt-3 xs:mt-4">
          New to360GMP{" "}
          <Link
            href="/signup"
            className="font-semibold text-brand-primary hover:underline"
          >
            create an account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
