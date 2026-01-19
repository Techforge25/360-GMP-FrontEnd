import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  // Redirect to the actual frontend success page
  // The backend was trying to hit /api/v1/subscription/stripe/success
  // We catch it and send it to /subscription/success
  const redirectUrl = new URL("/subscription/success", request.url);

  if (sessionId) {
    redirectUrl.searchParams.set("session_id", sessionId);
  }

  return NextResponse.redirect(redirectUrl);
}
