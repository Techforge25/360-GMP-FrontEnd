import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    heroStats: {
      totalBusinesses: "65,340",
      newThisWeek: "120",
    },
    featuredBusinesses: [
      {
        name: "Technicon Solutions",
        location: "Sydney, Australia",
        category: "Technology Solutions",
        image: "/assets/images/pBG.png",
        logo: "/assets/images/profileLogo.png",
        color: "bg-cyan-500",
      },
      {
        name: "Global Manufacturing Co.",
        location: "San Francisco, USA",
        category: "Manufacturing",
        image: "/assets/images/pBG.png",
        logo: "/assets/images/profileLogo.png",
        color: "bg-orange-500",
      },
      {
        name: "Finance Advisors Group",
        location: "New York, USA",
        category: "Financial Services",
        image: "/assets/images/pBG.png",
        logo: "/assets/images/profileLogo.png",
        color: "bg-blue-500",
      },
      {
        name: "HealthFirst Medical",
        location: "London, UK",
        category: "Healthcare Services",
        image: "/assets/images/pBG.png",
        logo: "/assets/images/profileLogo.png",
        color: "bg-red-500",
      },
      {
        name: "Smart Logistics Inc.",
        location: "Singapore",
        category: "Logistics & Transport",
        image: "/assets/images/pBG.png",
        logo: "/assets/images/profileLogo.png",
        color: "bg-yellow-500",
      },
      {
        name: "EcoSystem Products",
        location: "Berlin, Germany",
        category: "Sustainable Tech",
        image: "/assets/images/pBG.png",
        logo: "/assets/images/profileLogo.png",
        color: "bg-green-500",
      },
    ],
    communities: [
      {
        title: "Healthcare Professionals",
        description:
          "lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        members: "10.2k",
        type: "private",
        image: "/assets/images/community.png",
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Sustainable Power Solutions",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        members: "8.5k",
        type: "private",
        image: "/assets/images/community.png",
        color: "bg-green-100 text-green-600",
      },
      {
        title: "Global Manufacturing Community",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        members: "15k",
        type: "public",
        image: "/assets/images/community.png",
        color: "bg-orange-100 text-orange-600",
      },
      {
        title: "Mining & Heavy Industry",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        members: "5.2k",
        type: "premium",
        image: "/assets/images/community.png",
        color: "bg-gray-100 text-gray-600",
      },
      {
        title: "Mining & Heavy Industry",
        description: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        members: "5.2k",
        type: "private",
        image: "/assets/images/community.png",
        color: "bg-gray-100 text-gray-600",
      },
    ],
    products: {
      featured: [
        {
          name: "Precision Brake Rotor",
          description:
            "High-performance brake rotor for automotive applications.",
          price: "$125.00",
          minOrder: "50 Units",
          image: "/assets/images/productH.png",
          tag: "Hot",
        },
        {
          name: "Industrial Transistor Module",
          description: "Generic heavy-duty transistor for power grids.",
          price: "$45.00",
          minOrder: "200 Units",
          image: "/assets/images/productH.png",
          tag: "New",
        },
        {
          name: "Heavy Duty Battery Pack",
          description: "Long-life battery solutions for industrial equipment.",
          price: "$550.00",
          minOrder: "10 Units",
          image: "/assets/images/productH.png",
          tag: "Best Seller",
        },
      ],
      topRanking: [
        {
          name: "High Density PCB AI+",
          price: "$12.50",
          sold: "25k+",
          image: "/assets/images/productH.png",
        },
        {
          name: "Flexible Solar Film",
          price: "$85.00",
          sold: "12k+",
          image: "/assets/images/productH.png",
        },
      ],
      newArrivals: [
        {
          name: "IoT Control Hub",
          price: "$120.00",
          posted: "2 days ago",
          image: "/assets/images/productH.png",
        },
        {
          name: "Hydraulic Pump Unit",
          price: "$890.00",
          posted: "5 hours ago",
          image: "/assets/images/productH.png",
        },
      ],
    },
    latestJobs: [
      {
        title: "Head Of Global Sourcing",
        company: "Global Manufacturing Co.",
        location: "New York, USA (Hybrid)",
        type: "Full-Time",
        posted: "2 days ago",
        salary: "$120k - $150k",
        logo: "/assets/images/logo_placeholder_2.png",
        tags: ["Sourcing", "Supply Chain", "Senior Level"],
      },
      {
        title: "Job Title Goes Here",
        company: "Company Name Here",
        location: "Remote",
        type: "Contract",
        posted: "5 hours ago",
        salary: "$50 - $80 / hr",
        logo: "/assets/images/logo_placeholder_5.png",
        tags: ["Engineering", "Design"],
      },
      {
        title: "Architecture Designer",
        company: "Sterling Dynamics, Inc.",
        location: "London, UK",
        type: "Full-Time",
        posted: "1 day ago",
        salary: "£55k - £70k",
        logo: "/assets/images/logo_placeholder_5.png",
        tags: ["Architecture", "Design", "CAD"],
      },
      {
        title: "Interior Designer",
        company: "Design Studio X",
        location: "Berlin, Germany",
        type: "Full-Time",
        posted: "3 days ago",
        salary: "€45k - €60k",
        logo: "/assets/images/logo_placeholder_4.png",
        tags: ["Interior", "Creative", "3D"],
      },
    ],
  };

  return NextResponse.json(data);
}
