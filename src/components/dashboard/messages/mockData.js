export const mockConversations = [
  {
    id: 1,
    user: {
      name: "TechVision Solutions.",
      avatar:
        "https://ui-avatars.com/api/?name=TechVision+Solutions&background=0D8ABC&color=fff",
      role: "IT consulting",
      country: "USA",
      status: "Online",
      email: "contact@techvision.com",
      phone: "+1 234 567 890",
      experience: "3 Years Exp",
      avgResponse: "≤6h",
      revenue: "$1.5M +",
      verified: true,
    },
    lastMessage: "Lorem ipsum dolor sit amet, consecte...",
    time: "1:23 PM",
    unread: 3,
    isUnread: true,
    messages: [
      {
        id: 1,
        sender: "me",
        type: "product",
        content: {
          title: "ANC Pro Wireless Earbuds",
          price: "USD $9,800",
          moq: "100 pc",
          image:
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
          text: "Hi, I am interested in this product. Do you offer customization for this product?",
        },
        time: "Yesterday, 9:05 AM",
        status: "read",
        dateHeader: "Today",
      },
      {
        id: 2,
        sender: "other",
        type: "text",
        content:
          "Hello Alex! Yes, we can customize this product. However, for custom order, the MOQ is 500 pieces.",
        time: "Yesterday, 9:15 AM",
      },
      {
        id: 3,
        sender: "me",
        type: "text",
        content:
          "That works for us. Can you send a quotation for 200 units with shipping to New York?",
        time: "Yesterday, 9:20 AM",
        status: "read",
      },
      {
        id: 4,
        sender: "other",
        type: "quotation",
        content: {
          title: "Official Quotation",
          items: [
            {
              name: "ANC Pro Wireless Earbuds",
              quantity: 500,
              price: "$9,800",
            },
          ],
          total: "$4,900,000",
        },
        time: "Yesterday, 9:25 AM",
      },
      {
        id: 5,
        sender: "other",
        type: "text",
        content:
          "Here is the quotation for 500 units as requested. Let me know if you need any changes.",
        time: "Yesterday, 9:26 AM",
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Veridian Industrial Solutions",
      avatar:
        "https://ui-avatars.com/api/?name=Veridian+Industrial&background=FF5722&color=fff",
      role: "Manufacturing",
      country: "Germany",
      status: "Offline",
      verified: true,
    },
    lastMessage: "We have updated the proforma invoice...",
    time: "11:01 AM",
    unread: 1,
    isUnread: true,
    messages: [],
  },
  {
    id: 3,
    user: {
      name: "Veridian Industrial Solutions",
      avatar:
        "https://ui-avatars.com/api/?name=Veridian+Industrial&background=0B8806&color=fff",
      role: "Supplier",
      country: "China",
      status: "Online",
      verified: false,
    },
    lastMessage: "Lorem ipsum dolor sit amet, consecte...",
    time: "Yesterday",
    unread: 0,
    isUnread: false,
    messages: [],
  },
  {
    id: 4,
    user: {
      name: "NovaForge Systems",
      avatar:
        "https://ui-avatars.com/api/?name=NovaForge+Systems&background=FFC107&color=000",
      role: "Logistics",
      country: "Canada",
      status: "Away",
      verified: true,
    },
    lastMessage: "We have updated the proforma invoice...",
    time: "20/Nov/25",
    unread: 0,
    isUnread: false,
    messages: [],
  },
  {
    id: 5,
    user: {
      name: "Al Bawani Manufacturing",
      avatar:
        "https://ui-avatars.com/api/?name=Al+Bawani&background=4CAF50&color=fff",
      role: "Construction",
      country: "UAE",
      status: "Online",
      verified: true,
    },
    lastMessage: "Lorem ipsum dolor sit amet, consecte...",
    time: "1/Nov/25",
    unread: 0,
    isUnread: false,
    messages: [],
  },
];

export const featuredProducts = [
  {
    id: 1,
    name: "CNC Machined Comp...",
    priceRange: "USD $120 - $980",
    moq: "100 pc",
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd495f043?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Silent Block Suspensti...",
    priceRange: "USD $120 - $980",
    moq: "100 pc",
    image:
      "https://images.unsplash.com/photo-1588619461141-8663806a0904?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Precision Disc Brake S...",
    priceRange: "USD $120 - $980",
    moq: "100 pc",
    image:
      "https://images.unsplash.com/photo-1550523826-b51e60f2524a?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: "CNC Machined Comp...",
    priceRange: "USD $120 - $980",
    moq: "100 pc",
    image:
      "https://images.unsplash.com/photo-1590918076620-33c87ce90288?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];
