"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface px-4 text-center">
      <h1 className="text-6xl font-bold text-brand-primary mb-4">403</h1>
      <h2 className="text-2xl font-semibold text-text-primary mb-2">
        Access Denied
      </h2>
      <p className="text-text-secondary mb-8 max-w-md">
        You don't have permission to access this page. If you believe this is an
        error, please contact support.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="default">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
