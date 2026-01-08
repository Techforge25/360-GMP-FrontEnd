"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { UserHeader } from "@/components/ui/UserHeader";
import { UserMenu } from "@/components/ui/UserMenu";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ChartWidget } from "@/components/ui/ChartWidget";
import { RoleSelectionCard } from "@/components/ui/RoleSelectionCard";

export default function ComponentsDemo() {
  const [selectedRole, setSelectedRole] = useState("business");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-8 text-4xl font-bold">Components Demo</h1>

      {/* Base Components */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Base Components</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button isLoading>Loading</Button>
        </div>
        <div className="mt-4 flex max-w-sm flex-col gap-4">
          <Input placeholder="Standard Input" />
          <div className="flex gap-2">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </section>

      {/* Profile Cards */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Profile Cards</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ProfileCard
            name="Marcus O'Connell"
            role="Sales Manager"
            theme="purple"
            description="Specializes in high-value industrial machinery sales and handles complex bulk equipment deals."
          />
          <ProfileCard
            name="David Chen"
            role="Chief Quality Assurance Officer"
            theme="purple"
            description="Responsible for maintaining global product quality standards and critical industry certifications."
          />
          <ProfileCard
            name="Sofia"
            role="Technical Consultant, APAC"
            theme="purple" // Can add 'blue' or 'indigo' support if updated
            description="Provides regional technical expertise and crucial market insights across the Asia-Pacific territory."
          />
        </div>
      </section>

      {/* User Header */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">User Header</h2>
        <div className="space-y-4">
          <UserHeader />
          <div className="flex justify-end p-4">
            <UserMenu />
          </div>
        </div>
      </section>

      {/* Sidebar & FAQ */}
      <section className="mb-12 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Filters</h2>
          <FilterSidebar />
        </div>
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-semibold">FAQ Accordion</h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Charts & Role Selection */}
      <section className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Chart Widget</h2>
          <ChartWidget />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Role Selection</h2>
          <div className="space-y-4">
            <RoleSelectionCard
              type="business"
              selected={selectedRole}
              onSelect={setSelectedRole}
            />
            <RoleSelectionCard
              type="user"
              selected={selectedRole}
              onSelect={setSelectedRole}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
