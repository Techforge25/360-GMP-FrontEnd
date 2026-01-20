"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useUserRole();
  const router = useRouter();

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
      setError("Something went wrong. Please try again.");
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
    <Card className="w-full min-w-[360px] sm:min-w-0 sm:max-w-lg border-none shadow-xl bg-surface-elevated">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
          Welcome To 360GMP
        </CardTitle>
        <CardDescription className="text-text-secondary">
          One Platform Many Solutions
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-primary"
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

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-primary"
            >
              Password
            </label>
            <Input
              id="password"
              placeholder="******"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-surface border-border-light h-11"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary h-4 w-4"
              />
              <span className="text-sm text-text-secondary">Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-text-secondary hover:text-brand-primary"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-11 text-base"
          >
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-light" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-surface-elevated px-2 text-text-secondary rounded-full border border-border-light">
              or
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-11 border-border-light text-text-primary font-medium hover:bg-surface-muted relative"
          onClick={handleGoogleLogin}
        >
          <div className="absolute left-4">
            <FcGoogle className="h-5 w-5" />
          </div>
          Continue with Google
        </Button>

        <div className="text-center text-sm text-text-secondary mt-4">
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
