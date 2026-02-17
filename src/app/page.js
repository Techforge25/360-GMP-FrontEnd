// Enable Static Site Generation (SSG) for optimal performance
export const dynamic = "force-static";
export const revalidate = false; // Never revalidate, fully static

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Welcome from "@/components/landing/Welcome";
import AboutVision from "@/components/landing/AboutVision";
import Capabilities from "@/components/landing/Capabilities";
import Zones from "@/components/landing/Zones";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="">
        <Hero />
        <Welcome />
        <AboutVision />
        <Capabilities />
        <Zones />

        <section className="bg-gradient-to-r from-brand-primary to-brand-primary-light py-20 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6">
              Unlock Unlimited Potential
            </h2>
            <p className="text-text-inverse mb-8 max-w-2xl mx-auto">
              Upgrade to Premium Membership.
            </p>
            <div className="bg-surface backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <div className="grid grid-row gap-8 text-left">
                <h2 className="text-2xl font-semibold text-text-primary text-center mb-4">
                  Why You Should Upgrade Today
                </h2>
                <div className="flex flex-cols-1 md:grid-cols-2 justify-between">
                  <ul className="space-y-3 text-text-primary max-w-[15rem]">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Unlimited Product Listings
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Priority Technical Support
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Unlimited Job Postings
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Direct Manufacturer Access (B2B)
                    </li>
                  </ul>
                  <ul className="space-y-3 text-text-primary max-w-[15rem]">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Global business visibility
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Secure escrow transactions
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Unlimited job postings
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-brand-primary shrink-0" />{" "}
                      Access to special suppliers networks
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center sm:items-start gap-4 mt-8">
                  <Link href="/landing/pricing">
                    <Button variant="default" className=" px-6">
                      Become a Premium Member <FaArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link href="/landing/pricing">
                    <Button
                      variant="outline"
                      className=" px-6 border border-gray-900"
                    >
                      Start your 14 free trial <FaArrowRight className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
