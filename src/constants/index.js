import { BsTagsFill } from "react-icons/bs";
import { CiCircleMore, CiWallet } from "react-icons/ci";
import { GrApps } from "react-icons/gr";

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
  New: "/orders/business/new-orders",
  "Prepare Shipment": "/orders/business/processing-orders",
  Shipped: "/orders/business/in-transit-orders",
  Delivered: "/orders/business/delivered-orders",
  Completed: "/orders/business/completed-orders",
  Cancelled: "/orders/business/cancelled-orders",
};

export const userTabs = {
  "All Orders": "/orders/user/all-orders",
  New: "/orders/user/new-orders",
  "Seller Preparing": "/orders/user/processing-orders",
  Shipped: "/orders/user/in-transit-orders",
  Delivered: "/orders/user/delivered-orders",
  Completed: "/orders/user/completed-orders",
  Cancelled: "/orders/user/cancelled-orders",
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
    case "stripe":
      return "bg-amber-100 text-amber-700";
    case "held":
      return "bg-amber-100 text-amber-700";
    case "In Transit":
      return "bg-purple-100 text-purple-700";
    case "Delivered":
      return "bg-blue-200 text-blue-800";
    case "delivered":
      return "bg-blue-200 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-700";
    case "paid":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "released":
      return "bg-green-100 text-green-700";
    case "deleted":
      return "bg-red-100 text-red-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    case "refunded":
      return "bg-red-100 text-red-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "Canceled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const tags = ["Manufacturer", "Healthcare", "Technology", "Consulting"];

export const cardsBusiness = [
  {
    amount: "$12,450.00",
    icon: "/assets/images/card-1.png",
    text: "Net Balance",
    text2: "Available for withdrawal",
  },
  {
    amount: "$3,200.00",
    icon: "/assets/images/card-2.png",
    text: "Pending Settlements",
    text2: "Held in escrow",
  },
  {
    amount: "$156,500.00",
    icon: "/assets/images/card-3.png",
    text: "Total Sales Volume",
    text2: "Total Sales Volume",
  },
  {
    amount: "$3,200.00",
    icon: "/assets/images/card-4.png",
    text: "Platform & Service Deductions",
    text2: "Total Fee",
  },
];

export const cardsUser = [
  {
    amount: "$12,450.00",
    icon: "/assets/images/card-1.png",
    text: "Net Balance",
    text2: "Available for withdrawal",
  },
  {
    amount: "$3,200.00",
    icon: "/assets/images/card-2.png",
    text: "Pending Settlements",
    text2: "Held in escrow",
  },
];

export const businessWalletTabs = ["My Wallet", "Earnings", "Withdrawals"];
export const transactions = [
  {
    id: 1,
    description: "Sale - CNC Machined Component",
    date: "OCT 24, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Completed",
    amount: "+$900.00",
    positive: true,
  },
  {
    id: 2,
    description: "Sale - High-Speed USB-C Data Cable",
    date: "OCT 22, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Pending",
    amount: "+$100.00",
    positive: true,
  },
  {
    id: 3,
    description: "Sale - Industrial Smart Watch",
    date: "OCT 27, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Completed",
    amount: "+$600.00",
    positive: true,
  },
  {
    id: 4,
    description: "Sale - Noise Reduction Headset",
    date: "OCT 29, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Completed",
    amount: "+$2,000.00",
    positive: true,
  },
  {
    id: 5,
    description: "Sale - High-Speed USB-C Data Cable",
    date: "OCT 22, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Pending",
    amount: "+$100.00",
    positive: true,
  },
  {
    id: 6,
    description: "Withdrawal To Bank Account ****4567",
    date: "OCT 22, 2025, 10:30 AM",
    method: "Bank Account ****4567",
    status: "Completed",
    amount: "-$100.00",
    positive: false,
  },
  {
    id: 7,
    description: "Sale - Industrial Smart Watch",
    date: "OCT 27, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Completed",
    amount: "+$600.00",
    positive: true,
  },
  {
    id: 8,
    description: "Sale - Noise Reduction Headset",
    date: "OCT 29, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Completed",
    amount: "+$2,000.00",
    positive: true,
  },
  {
    id: 9,
    description: "Sale - High-Speed USB-C Data Cable",
    date: "OCT 22, 2025, 10:30 AM",
    method: "Visa **** 4321",
    status: "Pending",
    amount: "+$100.00",
    positive: true,
  },
];

export const paymentCards = [
  {
    logo: "/assets/images/mastercard.png",
    cardName: "Mastercard · Default Method",
    extraInfo: "globalmanufacturing@gmail.com",
    btnText: "Disconnect",
  },
  {
    logo: "/assets/images/visa.png",
    cardName: "visa ****2125",
    extraInfo: "Expiry · 12/27",
    btnText: "Set as Default",
  },
];

export const events = [
  {
    date: "OCT 25, 2025,",
    time: "10:30 AM",
    title: "Order Placed",
    description: "Order #ORD-2025-55 Crated.",
  },
  {
    date: "OCT 26, 2025,",
    time: "10:30 AM",
    title: "Escrow Period",
    description: "Fund Held Securely Pending Delivery.",
  },
  {
    date: "OCT 27, 2025,",
    time: "06:15 AM",
    title: "Delivery Confirmed",
    description: "Buyer Confirmed Receipt Of Goods.",
  },
  {
    date: "OCT 28, 2025,",
    time: "12:15 AM",
    title: "Funds Released",
    description: "Payout Successfully Transferred To Seller Wallet",
    isLast: true,
  },
];

export const financialBreakdown = [
  {
    type: "Gross Sale Amount",
    desc: "Total Order Value",
    amount: "$900",
  },
  {
    type: "Platform Fee",
    desc: "Standard Service Rate (10%)",
    amount: "-$100.00",
  },
  {
    type: "VAT/TAX",
    desc: "Applied Regional Tax (0%)",
    amount: "...",
  },
];

export const chartData = [
  { day: "Mon", escrowVolume: 2200, netIncome: 3200 },
  { day: "Tue", escrowVolume: 1200, netIncome: 3000 },
  { day: "Wed", escrowVolume: 8900, netIncome: 2000 },
  { day: "Thu", escrowVolume: 3200, netIncome: 2800 },
  { day: "Fri", escrowVolume: 3500, netIncome: 2200 },
  { day: "Sat", escrowVolume: 2800, netIncome: 2600 },
  { day: "Sun", escrowVolume: 3400, netIncome: 3000 },
];

export const sortOptionsByTime = [
  "Last 3 Month",
  "Last 2 Weeks",
  "Last 1 Week",
];

export const tabsTransactionBusinessWallet = ["All"];

export const tabsTransactionUserWallet = ["All"];

export const walletTransactionTabs = ["Description/Date", "Status", "Amount"];

export const walletMyWalletsTabs = [
  "Description/Date",
  "Payment Method",
  "Status",
  "Amount",
];

export const walletEarningsTabs = [
  "Date",
  "Gross Amounts",
  "Fee (10%)",
  "Net Profit",
  "Status",
];

export const transactionsUserWallet = [
  {
    id: 1,
    title: "Buy - High-Speed USB-C Data Cable",
    date: "TODAY, 14:23 AM",
    amount: "- $100.00",
    type: "debit",
    status: "Completed",
  },
  {
    id: 2,
    title: "Service Subscription",
    date: "OCT 22, 2025, 9:30 AM",
    amount: "- $199.00",
    type: "debit",
    status: "Completed",
  },
  {
    id: 3,
    title: "Buy - Earbuds",
    date: "OCT 22, 2025, 11:30 AM",
    amount: "- $99.00",
    type: "debit",
    status: "Failed",
  },
  {
    id: 4,
    title: "Refund From Store-ABC",
    date: "OCT 22, 2025, 10:30 AM",
    amount: "+ $100.00",
    type: "credit",
    status: "Completed",
  },
  {
    id: 5,
    title: "Refund From Store-ABC",
    date: "OCT 22, 2025, 10:30 AM",
    amount: "+ $100.00",
    type: "credit",
    status: "Completed",
  },
];

export const chartDataUser = [
  { month: "Mon", marketplace: 800, refund: 200 },
  { month: "Tue", marketplace: 1000, refund: 250 },
  { month: "Wed", marketplace: 880, refund: 130 },
  { month: "Thurs", marketplace: 1500, refund: 300 },
  { month: "Fri", marketplace: 2000, refund: 280 },
  { month: "Sat", marketplace: 2200, refund: 350 },
  { month: "Sun", marketplace: 2200, refund: 350 },
];

export const BUSINESS_TYPE_OPTIONS = [
  "Manufacturer",
  "Distributor",
  "Wholesaler",
  "Retailer",
  "Service Provider",
  "Consultant",
  "Franchise",
  "Others",
];

export const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. 'Swaziland')",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const INCOTERMS_OPTIONS = [
  "EXW - Ex Works",
  "FCA - Free Carrier",
  "FAS - Free Alongside Ship",
  "FOB - Free On Board",
  "CFR - Cost and Freight",
  "CIF - Cost, Insurance, Freight",
  "CPT - Carriage Paid To",
  "CIP - Carriage and Insurance Paid To",
  "DAP - Delivered At Place",
  "DPU - Delivered At Place Unloaded",
  "DDP - Delivered Duty Paid",
];

export const SHIPPING_OPTIONS = [
  "Air Freight",
  "Sea Freight",
  "Express Courier",
  "Rail Freight",
  "Road Transport",
];

export const stepsOnboarding = [
  { id: 1, label: "Basic Identity" },
  { id: 2, label: "Location Contact" },
  { id: 3, label: "Review And Submission" },
];

export const stepFields = {
  1: [
    "ownerName",
    "identificationOfBusinessOwner",
    "companyName",
    "tradeName",
    "businessType",
    "companySize",
    "foundedDate",
    "primaryIndustry",
    "operationHour",
    "countryOfRegistration",
    "businessRegistrationNumber",
    "taxIdentificationNumber",
    "dunsNumber",
    "complianceScreeningStatus",
    "incoterms",
    "shipping.exportExperience",
    "annualRevenueRange",
    "auditingAgency",
    "website",
    "standardProductDimensions.length",
    "standardProductDimensions.width",
    "standardProductDimensions.height",
    "standardProductDimensions.weight",
  ],
  2: [
    "certificateOfIncorporation",
    "taxRegistrationCertificate",
    "logo",
    "banner",
    "location.country",
    "location.city",
    "location.addressLine",
    "location.warehouseAddress",
    "location.additionalWarehouseAddress",
    "location.mandatoryPickupAddress",
    "location.businessRegistrationAddress",
    "location.internationalOffices",
    "shipping.capabilities",
    "regionOfOperations",
    "executiveLeadership",
    "stakeholderDisclosure",
    "tradeAffiliations",
    "certifications",
    "b2bContact.name",
    "b2bContact.title",
    "b2bContact.phone",
    "b2bContact.supportEmail",
    "description",
  ],
  3: [
    // step 3 is review-only, so no editable fields
  ],
};

export const digitsOnly = (value) => value.replace(/[^0-9]/g, "");
export const digitsDecimalOnly = (value) => value.replace(/[^0-9.]/g, ""); // allow decimal for price
export const subscriptionTableHeaders = [
  "Date",
  "Invoice ID",
  "Plans",
  "Amount",
  "Status",
];
export const routesSubscriptionCancelled = [
  "/onboarding/business-profile/",
  "/onboarding/user-profile/",
  "/onboarding/role",
  "reset-password",
  "forgot-password",
  "otp-verification",
  "signup",
];

export const popularTags = [
  "Innovation",
  "Networking",
  "Industry News",
  "Best Practices",
  "Technology",
];

export const nutShellPoints = [
  {
    id: 1,
    title: "Eliminating inefficiencies",
  },
  {
    id: 2,
    title: "Supporting global expansion",
  },
  {
    id: 3,
    title: "Increasing visibility and collaboration",
  },
];

export const settingsTabs = [
  {
    title: "company identity",
    icon: "/assets/images/identity.svg",
    href: "",
  },
  {
    title: "Operations & Logistics",
    icon: "/assets/images/truck.svg",
    href: "",
  },
  {
    title: "Business Intelligence",
    icon: "/assets/images/rate.svg",
    href: "",
  },
  {
    title: "Documentation & Verification",
    icon: "/assets/images/verification.svg",
    href: "",
  },
];

export const companyIdentityData = [
  {
    lable: "Owner Name",
    fieldsData: "Alex john",
  },
  {
    lable: "Identification Of Business Owner Name",
    fieldsData: "Alex John",
  },
  {
    lable: "Company Name",
    fieldsData: "Global Manufacturing LLC",
  },
  {
    lable: "Select Primary Industry",
    fieldsData: "Manufacturing",
  },
  {
    lable: "Trade Name",
    fieldsData: "Manufacturing",
  },
  {
    lable: "Country Of Registration",
    fieldsData: "USA",
  },
  {
    lable: "Business Type",
    fieldsData: "Private Corporation",
  },

  {
    lable: "Company Size",
    fieldsData: "12-40 Employees",
  },

  {
    lable: "Founded Date",
    fieldsData: "12-3-2023",
  },

  {
    lable: "Operating Hours",
    fieldsData: "Monday - Friday: 9:00 AM - 6:00 PM PST",
  },
  {
    lable: "Official Company Website",
    fieldsData: "www.globalmanufacturing.com",
  },

  {
    lable: "Operating Hours",
    fieldsData: "Monday - Friday: 9:00 AM - 6:00 PM PST",
  },
];


export const OperationsAndLogisticsData = [
  {
    lable: "Country",
    fieldsData: "Canada",
  },
  {
    lable: "City",
    fieldsData: "Ottawa",
  },
  {
    lable: "Address Line",
    fieldsData: "Block 123 Carbon Town Ottawa  ",
  },
   {
    lable: "Warehouse Address",
    fieldsData: "123 Maple Street, Toronto, ON M5V 2T6",
  },
  {
    lable: "Additional Warehouse Address",
    fieldsData: "123 Maple Street, Toronto, ON M5V 2T6",
  },
  {
    lable: "Mandatory Pickup Address",
    fieldsData: "1 Maple Street, Toronto, ON M5V 2T6",
  },
  {
    lable: "Business Registration Address",
    fieldsData: "250 King Street W, Suite 1200, Toronto, ON M5V 3L9",
  },
  {
    lable: "International Office",
    fieldsData: "1 Maple Street, Toronto, ON M5V 2T6",
  },
 
  
];

export const standerdUnitWeight = [
  { unit: "123", value: "Kg" },
  { unit: "length", value: "102cm" },
  { unit: "height", value: "22cm" },
  { unit: "width", value: "123cm" },
];

export const PAKING_TYPES = ["costume box", "Pallets", "Industrial Wrap"];

export const BusinessIntelligenceDetails = [
  {
    lable: "Contact Person Name",
    fieldsData: "Sarah Jenkins",
  },
  {
    lable: "Phone",
    fieldsData: "+171 50 123 4567",
  },
  {
    lable: "Title",
    fieldsData: "Head of Operations",
  },
  
  {
    lable: "Support Email",
    fieldsData: "info@gmail.com",
  },
];

export const regionOfOperations = ["Local", "GCC", "European Union"];

export const IOS_OPTIONS = [
  "ISO 9001",
  "CE certified",
  "TUV SUD",
  "FDA approved",
  "Ethical Sourcing",
];
export const companySizeBusiness = [
  "1-50",
  "51-100",
  "101-150",
  "151-200",
  "201-250",
  "251-500",
  "501-1000",
  "1000-2500",
  "2500-5000",
];

export const productionCapacityBusiness = [
  "1000-10000",
  "10001-20000",
  "20001-30000",
  "30001-40000",
  "40001-50000",
  "50001-60000",
  "60001-70000",
  "700001-80000",
  "80001-90000",
  "90001-100000",
];

export const jobsDropDown = ["Edit Job", "Delete Job", "Job Detail"];

export const REGIONS = ["North America", "Europe", "Middle East", "Asia","Other"];
