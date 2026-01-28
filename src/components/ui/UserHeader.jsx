import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MdVerified, MdLocationOn } from "react-icons/md";
import { FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { Card } from "@/components/ui/Card";

const UserHeader = ({ user }) => {
  // Mock user data fallback
  const {
    name = "Alex Morgan",
    role = "Supply Chain Manager",
    industry = "Automotive Industry",
    location = "Toronto, Canada",
    image,
    isVerified = true,
    verificationYears = 2,
    rating = 4.2,
    reviewCount = 1,
    stats = {
      likes: 120,
      followers: 450,
    },
  } = user || {};

  return (
    <Card className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row md:items-start">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
        <Avatar className="h-20 w-20 border-2 border-primary/10">
          <AvatarImage src={image} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <h2 className="text-2xl font-bold">{name}</h2>
            {isVerified && (
              <span className="flex items-center text-sm text-blue-600">
                <MdVerified className="mr-1" /> Verified ({verificationYears}yr)
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              | CAN {rating}/{5.0} ({reviewCount})
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-base text-muted-foreground md:justify-start">
            <span className="flex items-center gap-1">{role}</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">{industry}</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              <MdLocationOn /> {location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="gap-2">
          <FiUserPlus /> Follow
        </Button>
        <Button className="gap-2 bg-brand-primary text-text-inverse hover:opacity-90">
          <FiMessageSquare /> Message
        </Button>
      </div>
    </Card>
  );
};

export { UserHeader };
