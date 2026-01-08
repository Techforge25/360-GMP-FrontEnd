import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const ProfileCard = ({
  name,
  role,
  image,
  description,
  theme = "purple", // 'purple' | 'blue' | 'indigo'
  className,
}) => {
  const themeStyles = {
    purple: {
      gradient: "from-brand-primary-light to-brand-primary",
      badge: "bg-highlight-purple text-purple-dark hover:opacity-80",
    },
    blue: {
      gradient: "from-highlight-blue to-blue-dark",
      badge: "bg-highlight-blue/20 text-blue-dark hover:opacity-80",
    },
    indigo: {
      gradient: "from-brand-primary to-brand-primary",
      badge: "bg-brand-secondary text-brand-primary hover:opacity-80",
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.purple;

  return (
    <Card
      className={cn(
        "group relative w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div
        className={cn("h-24 w-full bg-gradient-to-r", currentTheme.gradient)}
      />

      <CardContent className="relative px-4 pb-6 pt-0 text-center">
        <div className="mx-auto -mt-12 mb-4 h-24 w-24 rounded-full border-4 border-scaffold-background p-1">
          <Avatar className="h-full w-full">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>

        <h3 className="mb-1 text-xl font-bold">{name}</h3>
        <Badge variant="secondary" className={cn("mb-4", currentTheme.badge)}>
          {role}
        </Badge>

        <p className="line-clamp-3 text-sm text-text-secondary">
          {description}
        </p>

        {/* Hover overlay or action could go here if needed per design */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105">
            View Profile
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProfileCard };
