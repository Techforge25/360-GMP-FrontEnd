"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgotPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
      } else {
        setError(data.message || "Request failed");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
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

      <CardContent className="space-y-6 pt-2">
        <div className="bg-brand-secondary/30 p-6 rounded-lg text-center">
          <h3 className="font-bold text-lg mb-2 text-text-primary">
            Forgot Password
          </h3>
          <p className="text-base text-text-secondary">
            Please Enter Your Registered Email Address
          </p>
        </div>

        {error && (
          <div className="p-3 text-base text-red-500 bg-red-50 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-base font-medium text-text-primary"
            >
              Enter Your Email
            </label>
            <Input
              id="email"
              placeholder="info@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-surface border-border-light h-11"
              required
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-11 text-xl shadow-lg shadow-brand-primary/20"
          >
            Request OTP
          </Button>
        </form>

        <div className="text-center text-base text-text-secondary">
          Take me back to{" "}
          <Link
            href="/login"
            className="font-semibold text-brand-primary hover:underline underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
