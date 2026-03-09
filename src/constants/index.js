export const orders = [
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Awaiting Shipment",
  },
  {
    id: "#39203",
    buyer: "Pioneer Labs",
    date: "Nov 26, 2025",
    total: "$8,890",
    type: "Single",
    status: "Delivered",
  },
  {
    id: "#39201",
    buyer: "TechGlobal Inc.",
    date: "Nov 24, 2025",
    total: "$13,475",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39203",
    buyer: "Pioneer Labs",
    date: "Nov 26, 2025",
    total: "$8,890",
    type: "Single",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "In Transit",
  },
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "Pioneer Labs",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Cancelled",
  },
  {
    id: "#39201",
    buyer: "Pioneer Labs",
    date: "Nov 24, 2025",
    total: "$13,475",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39203",
    buyer: "TechGlobal Inc.",
    date: "Nov 26, 2025",
    total: "$8,890",
    type: "Single",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "TechGlobal Inc.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39201",
    buyer: "Pioneer Labs",
    date: "Nov 24, 2025",
    total: "$13,475",
    type: "Bulk",
    status: "Completed",
  },
];

export const businessTabs = {
  "All Orders": "/orders/business/all-orders",
  "New": "/orders/business/new-orders",
  "Prepare Shipment": "/orders/business/processing-orders",
  "Shipped": "/orders/business/in-transit-orders",
  "Delivered": "/orders/business/delivered-orders",
  "Completed": "/orders/business/completed-orders",
  "Cancelled": "/orders/business/cancelled-orders",
};

export const userTabs = {
  "All Orders": "/orders/user/all-orders",
  "New": "/orders/user/new-orders",
  "Seller Preparing": "/orders/user/processing-orders",
  "Shipped": "/orders/user/in-transit-orders",
  "Delivered": "/orders/user/delivered-orders",
  "Completed": "/orders/user/completed-orders",
  "Cancelled": "/orders/user/cancelled-orders",
};

export const tabs = [
  "All Orders",
  "New",
  "Prepare Shipment",
  "Shipped",
  "Delivered",
  "Completed",
  "Cancelled",
];

export const getStatusColor = (status) => {
  switch (status) {
    case "Awaiting Shipment":
      return "bg-amber-100 text-amber-700";
    case "In Transit":
      return "bg-purple-100 text-purple-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    case "Canceled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const tags = ["Manufacturing", "Healthcare", "Technology", "Consulting"]