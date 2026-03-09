import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-lg mx-auto border-none shadow-xl bg-surface-elevated">
      <CardHeader className="text-center pb-1 sm:pb-2 px-3 xs:px-4 sm:px-6 pt-4 xs:pt-6 sm:pt-8">
        <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold text-brand-primary">
          Welcome To 360GMP
        </CardTitle>
        <CardDescription className="text-sm xs:text-sm sm:text-base text-text-secondary mt-1 sm:mt-2">
          One Platform Many Solutions
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 xs:space-y-5 sm:space-y-6 px-3 xs:px-4 sm:px-6 pb-4 xs:pb-6 sm:pb-8 pt-1 xs:pt-2 sm:pt-2">
        <div className="bg-brand-secondary/30 p-3 xs:p-4 sm:p-6 rounded-lg text-center">
          <h3 className="font-bold text-sm xs:text-base sm:text-lg mb-1 xs:mb-2 text-text-primary">
            Forgot Password
          </h3>
          <p className="text-sm xs:text-sm sm:text-base text-text-secondary">
            Please Enter Your Registered Email Address
          </p>
        </div>
        <ForgotPasswordForm />
        <div className="text-center text-sm xs:text-sm sm:text-base text-text-secondary">
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
