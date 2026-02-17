"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

import { backendURL } from "@/constants";
import api from "@/lib/axios";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Backend validation requires exactly 8 characters (based on user request)
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // Create the account - backend will send OTP automatically
      const res = await api.post({
        url: `/auth/user/signup`,
        payload: { email, passwordHash: password },
        enableSuccessMessage: false,
        enableErrorMessage: false,
        activateLoader: false,
      });

      if (res.success) {
        // Backend returns userId in res.data
        const userId = res.data;

        // Redirect to OTP verification page with userId and email
        router.push(
          `/otp-verification?userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}&type=signup`,
        );
      } else {
        setError(res.message || "Signup failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      const errorMessage = err.message || "Signup failed";

      // Handle "account not activated" error and redirect to OTP verification
      if (
        errorMessage.includes("Your account is not activated yet") ||
        errorMessage.includes("verify your identity via OTP")
      ) {
        setError(errorMessage);

        // Call resend OTP API and then redirect
        setTimeout(async () => {
          try {
            const res = await api.post({
              url: `/auth/user/resend-otp`,
              payload: { email },
              enableSuccessMessage: true,
              enableErrorMessage: false,
              activateLoader: false,
            });

            // Get userId from response and redirect to OTP verification
            if (res.success && res.data) {
              const userId = res.data;
              router.push(
                `/otp-verification?userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}&type=signup`,
              );
            }
          } catch (resendErr) {
            console.error("Resend OTP error:", resendErr);
          }
        }, 2000);
        return;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${backendURL}/auth/google`, `_self`);
  };

  return (
    <Card className="w-full max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-xl mx-auto border-none shadow-xl bg-surface-elevated">
      <CardHeader className="text-center pb-1 sm:pb-2 px-3 xs:px-4 sm:px-6 pt-4 xs:pt-6 sm:pt-8">
        <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-brand-primary">
          Welcome To 360GMP
        </CardTitle>
        <CardDescription className="text-sm xs:text-sm sm:text-base text-text-secondary mt-1 sm:mt-2">
          One Platform Many Solutions
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 xs:space-y-4 sm:space-y-6 px-3 xs:px-4 sm:px-6 pb-4 xs:pb-6 sm:pb-8 pt-3 xs:pt-4 sm:pt-6">
        {error && (
          <div className="p-2 xs:p-3 text-sm xs:text-sm sm:text-base text-red-500 bg-red-50 rounded-md text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSignup}
          className="space-y-3 xs:space-y-4 sm:space-y-6"
        >
          <div className="space-y-1 xs:space-y-1.5 sm:space-y-2">
            <label
              htmlFor="email"
              className="text-sm xs:text-sm sm:text-base font-medium text-text-primary"
            >
              Email
            </label>
            <Input
              id="email"
              placeholder="info@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface border-border-light h-9 xs:h-10 sm:h-11 text-sm xs:text-sm sm:text-base"
              required
              autoFocus
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
                placeholder="••••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-surface border-border-light h-9 xs:h-10 sm:h-11 pr-8 xs:pr-10 text-sm xs:text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 xs:right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-1"
              >
                {showPassword ? (
                  <FiEyeOff className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                ) : (
                  <FiEye className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-9 xs:h-10 sm:h-11 text-sm xs:text-sm sm:text-base mt-1 xs:mt-2 shadow-lg shadow-brand-primary/20"
          >
            Sign Up
          </Button>
        </form>

        <div className="relative my-3 xs:my-4 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-light" />
          </div>
          <div className="relative flex justify-center text-[10px] xs:text-sm sm:text-sm uppercase">
            <span className="bg-surface-elevated px-1.5 xs:px-2 sm:px-3 text-text-secondary rounded-full border border-border-light">
              or
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-9 xs:h-10 sm:h-11 border-border-light text-text-primary text-sm xs:text-sm sm:text-base font-medium hover:bg-surface-muted relative"
          onClick={handleGoogleSignup}
        >
          <div className="absolute left-2 xs:left-3 sm:left-4">
            <FcGoogle className="h-3 w-3 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="text-sm xs:text-sm sm:text-base">
            Continue with Google
          </span>
        </Button>

        <div className="text-center text-sm xs:text-sm sm:text-base text-text-secondary mt-3 xs:mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
