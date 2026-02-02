"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const type = searchParams.get("type"); // 'signup' or 'password-reset'

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(54);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto focus first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "Enter") {
      // Trigger verify on Enter key press
      const code = otp.join("");
      if (code.length === 6) {
        handleVerify();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter a complete 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (type === "signup") {
        // For signup, use the new account verification endpoint
        if (!userId) {
          setError("User ID is missing. Please try signing up again.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/verify-otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              accountVerificationToken: code,
            }),
          },
        );

        let data;
        try {
          data = await res.json();
        } catch (parseError) {
          // If response is not valid JSON, show a more helpful error
          setError(
            "Server error: Invalid response from server. Please check your backend code.",
          );
          setLoading(false);
          return;
        }

        if (res.ok) {
          // Success - redirect to login page
          router.push("/login");
        } else {
          setError(data.message || "Verification failed");
        }
      } else {
        // For password reset, use the old endpoint
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verifyPasswordResetToken`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passwordResetToken: code, email }),
          },
        );

        let data;
        try {
          data = await res.json();
        } catch (parseError) {
          setError("Server error: Invalid response from server.");
          setLoading(false);
          return;
        }

        if (res.ok) {
          // For password reset, redirect to reset password page
          router.push(`/reset-password?token=${code}`);
        } else {
          setError(data.message || "Verification failed");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
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
            Verify OTP
          </h3>
          <p className="text-base text-text-secondary">
            Enter The 6 Digit Code Sent To Your Email And Phone.
          </p>
        </div>

        {error && (
          <div className="p-3 text-base text-red-500 bg-red-50 rounded-md text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <label className="text-base font-medium text-text-primary block">
            Enter Verification Code
          </label>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-bold border border-brand-primary/30 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-surface text-brand-primary"
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleVerify}
          isLoading={loading}
          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-11 text-xl shadow-lg shadow-brand-primary/20"
        >
          Verify
        </Button>

        <div className="text-center text-base text-text-secondary">
          <p className="mb-2">
            Resend OTP in{" "}
            <span className="font-bold text-brand-primary">
              {formatTime(timer)}
            </span>
          </p>
          <button className="text-text-secondary underline decoration-text-secondary/50 hover:text-brand-primary text-sm">
            Resend OTP
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OTPVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPForm />
    </Suspense>
  );
}
