import {
  FiBox,
  FiCreditCard,
  FiHelpCircle,
  FiLayers,
  FiLogOut,
  FiRepeat,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import {
  getDashboardPathForRole,
  getProfilePathForRole,
  isBusinessRole,
  isUserRole,
} from "@/lib/auth/session";
import { IoSettingsOutline } from "react-icons/io5";

const getRolePrefix = (role) =>
  isBusinessRole(role) ? "/dashboard/business" : "/dashboard/user";

export const getPrimaryNavLinks = (role) => {
  const prefix = getRolePrefix(role);

  return [
    { label: "Explore", href: getDashboardPathForRole(role) },
    { label: "Businesses", href: `${prefix}/businesses` },
    { label: "Marketplace", href: `${prefix}/marketplace` },
    { label: "Jobs", href: `${prefix}/jobs` },
    { label: "Communities", href: `${prefix}/communities` },
  ];
};

export const getHeaderIconLinks = (role) => {
  const prefix = getRolePrefix(role);

  return {
    cart: isUserRole(role) ? `${prefix}/cart` : null,
    notifications: `${prefix}/notifications`,
    messages: `${prefix}/messages`,
  };
};

export const getProfileMenuLinks = (role) => {
  const prefix = getRolePrefix(role);
  console.log(prefix, "roled")
  const links = [
    {
      label: "My Profile",
      href: getProfilePathForRole(role),
      icon: FiUser,
      mobileIconClassName:
        "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      label: "Wallet",
      href: role === "business" ? "/wallet/business" : "/wallet/user",
      icon: FiCreditCard,
      mobileIconClassName:
        "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      label: "Orders",
      href: `${prefix}/orders`,
      icon: FiShoppingBag,
      mobileIconClassName:
        "bg-gradient-to-r from-indigo-500 to-indigo-600",
    },
    {
      label: "Subscriptions",
      href: `${prefix}/subscriptions`,
      icon: FiLayers,
      mobileIconClassName:
        "bg-gradient-to-r from-pink-500 to-pink-600",
    },
    ...(role === "business"
  ? [
      {
        label: "Setting",
        href: `${prefix}/business-settings`,
        icon: IoSettingsOutline,
        mobileIconClassName: "bg-gradient-to-r from-pink-500 to-pink-600",
      },
    ]
  : []),
    {
      label: "Support",
      href: `${prefix}/support`,
      icon: FiHelpCircle,
      mobileIconClassName:
        "bg-gradient-to-r from-teal-500 to-teal-600",
    },
  ];

  if (isBusinessRole(role)) {
    links.splice(1, 0, {
      label: "My Products",
      href: `${prefix}/products`,
      icon: FiBox,
      mobileIconClassName:
        "bg-gradient-to-r from-orange-500 to-orange-600",
    });
  }

  return links;
};

export const getMobileAccountLinks = (role) => [
  {
    label: "Messages",
    href: getHeaderIconLinks(role).messages,
    icon: MdOutlineMessage,
    mobileIconClassName: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  ...getProfileMenuLinks(role),
];

export const SYSTEM_ACTIONS = [
  {
    key: "switch",
    label: "Switch Role",
    icon: FiRepeat,
    desktopIconClassName: "text-gray-900",
    mobileIconClassName: "bg-gradient-to-r from-cyan-500 to-cyan-600",
  },
  {
    key: "logout",
    label: "Sign Out",
    icon: FiLogOut,
    desktopIconClassName: "text-gray-900",
    mobileIconClassName: "bg-gradient-to-r from-red-500 to-red-600",
    mobileTextClassName: "text-red-600 hover:text-red-700",
  },
];
