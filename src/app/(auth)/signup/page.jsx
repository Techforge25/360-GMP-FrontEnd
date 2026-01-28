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

    try {
      // Create the account - backend will send OTP automatically
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, passwordHash: password }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        // Backend returns userId in data.data
        const userId = data.data;

        // Redirect to OTP verification page with userId and email
        router.push(
          `/otp-verification?userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}&type=signup`,
        );
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.open(`${backendURL}/auth/google`, `_self`);
  };

  return (
    <Card className="w-full min-w-[360px] sm:min-w-0 sm:max-w-lg border-none shadow-xl bg-surface-elevated">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-brand-primary">
          Welcome To 360GMP
        </CardTitle>
        <CardDescription className="text-text-secondary">
          One Platform Many Solutions
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {error && (
          <div className="p-3 text-base text-red-500 bg-red-50 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-base font-medium text-text-primary"
            >
              Email
            </label>
            <Input
              id="email"
              placeholder="info@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface border-border-light h-11"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-base font-medium text-text-primary"
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
                className="bg-surface border-border-light h-11 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-11 text-md mt-2 shadow-lg shadow-brand-primary/20"
          >
            Sign Up
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-light" />
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-surface-elevated px-2 text-text-secondary rounded-full border border-border-light">
              or
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-11 border-border-light text-text-primary font-medium hover:bg-surface-muted relative"
          onClick={handleGoogleSignup}
        >
          <div className="absolute left-4">
            <FcGoogle className="h-5 w-5" />
          </div>
          Continue with Google
        </Button>

        <div className="text-center text-base text-text-secondary mt-4">
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
