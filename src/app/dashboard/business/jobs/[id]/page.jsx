"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ChatWidget } from "../../../../../components/dashboard/chat/ChatWidget";

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Job Not Found
        </h2>
        <p className="text-text-secondary mb-6">
          The job posting you are looking for does not exist or has been
          removed.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Gradient Header Section containing Back Button & Job Info */}
      <div className="bg-gradient-to-r from-blue-100 to-green-100 pb-10 pt-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-text-secondary hover:text-text-primary transition-colors text-base font-medium gap-2"
            >
              <FiArrowLeft /> Back
            </button>
          </div>

          {/* Job Header Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-white border border-border-light flex-shrink-0 relative overflow-hidden shadow-sm">
                <Image
                  src={job.logo}
                  alt={job.company}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 text-base">
                  <span className="font-semibold text-brand-primary underline cursor-pointer">
                    {job.company}
                  </span>
                  <span className="text-text-secondary">•</span>
                  <span
                    className={`font-medium ${
                      job.isActive ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {job.isActive ? "Active" : "Close"}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap items-center bg-white/60 backdrop-blur-sm border border-white/50 rounded-lg overflow-hidden text-base text-text-secondary">
                    <div className="flex items-center gap-1.5 px-4 py-2">
                      <FiMapPin className="text-brand-primary" />
                      {job.location}
                    </div>

                    <div className="w-px h-6 bg-border-light" />

                    <div className="flex items-center gap-1.5 px-4 py-2">
                      <FiBriefcase className="text-brand-primary" />
                      {job.type}
                    </div>

                    <div className="w-px h-6 bg-border-light" />

                    <div className="flex items-center gap-1.5 px-4 py-2">
                      <FiClock className="text-brand-primary" />
                      {job.postedAt}
                    </div>

                    <div className="w-px h-6 bg-border-light" />

                    <div className="flex items-center gap-1.5 px-4 py-2">
                      <FiDollarSign className="text-brand-primary" />
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto self-start md:self-center">
              <Link href="/dashboard/business/jobs/new">
                <Button className="w-full md:w-auto px-8 h-12">
                  Create NEw Job
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Content (Description) - Overlapping slightly or just below */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <Card className="bg-white border-border-light shadow-sm min-h-[500px]">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border-light">
              <h2 className="text-xl font-bold text-text-primary">
                Job Description
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-gray-50 rounded-full transition-colors">
                  <FiShare2 size={20} />
                </button>
                <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-gray-50 rounded-full transition-colors">
                  <FiBookmark size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-8 text-text-secondary">
              {/* Role Summary */}
              <section>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  Role Summary
                </h3>
                <p className="leading-relaxed">
                  {job.description ||
                    "We are seeking a creative and results-driven individual to join our team. You will play a key role in driving our company's success through innovative strategies and diligent execution."}
                </p>
              </section>

              {/* Responsibilities */}
              <section>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  Key Responsibilities
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Develop and implement engaging strategies to meet business
                    goals.
                  </li>
                  <li>
                    Collaborate with cross-functional teams to ensure project
                    success.
                  </li>
                  <li>
                    Analyze performance data (KPIs) and optimize accordingly.
                  </li>
                  <li>
                    Manage day-to-day operations and ensure quality standards.
                  </li>
                  <li>Stay updated with industry trends and best practices.</li>
                </ul>
              </section>

              {/* Qualifications */}
              <section>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  Required Qualifications
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>3+ years of experience in a similar role.</li>
                  <li>Strong understanding of industry tools and platforms.</li>
                  <li>Excellent communication and problem-solving skills.</li>
                  <li>Ability to work independently and as part of a team.</li>
                  <li>Bachelor's degree in a related field.</li>
                </ul>
              </section>
            </div>

            {/* Report Job - Subtle at bottom */}
            <div className="mt-12 pt-6 border-t border-border-light">
              <Button
                variant="outline"
                className="text-base font-medium flex items-center gap-2 transition-colors  px-4 py-2 rounded-lg"
              >
                Report A Job
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ChatWidget />
    </div>
  );
}
