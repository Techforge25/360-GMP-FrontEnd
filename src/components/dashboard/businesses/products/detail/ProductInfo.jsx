"use client";
import React, { useState } from "react";
import {
  FaStar,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaCommentAlt,
  FaCrown,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsShieldCheck, BsCashCoin, BsHeadset } from "react-icons/bs";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/UserContext";
import ActionRequiredModal from "./ProfileSwitchModal";
import ProfileSwitchModal from "@/components/dashboard/ProfileSwitchModal";

export default function ProductInfo({ product }) {
  const router = useRouter();
  const { user, setOnboardingRole } = useUserRole();
  const role = user?.role;
  const isBusinessUser = role === "business";

  // Robust check for free trial (role or subscription plan)
  const isFreeTrial =
    role === "free_trial" ||
    user?.subscription?.planName?.toLowerCase()?.includes("trial") ||
    user?.subscription?.plan?.name?.toLowerCase()?.includes("trial");

  const [quantity, setQuantity] = useState(product?.minOrderQty || 1);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (isBusinessUser) {
      setShowActionModal(true);
    } else {
      addToCart(product, quantity);
      router.push("/dashboard/user/cart");
    }
  };

  const handleProceedToSwitch = () => {
    setShowActionModal(false);
    setShowSwitchModal(true);
  };

  const handleProfileSwitch = async () => {
    try {
      await setOnboardingRole("user");
      setShowSwitchModal(false);
      addToCart(product, quantity);
      router.push("/dashboard/user/cart");
    } catch (error) {
      console.error("Failed to switch profile:", error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-medium text-black mb-2">{product.title}</h1>
      <p className="text-gray-900 text-md mb-4">{product.detail}</p>

      {/* Ratings */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="font-bold text-gray-900">N/A</span>
        {/* <div className="flex text-orange-400 text-sm">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div> */}
        <span className="text-gray-500 underline">
          ({product.viewsCount || 0} Views)
        </span>
        <span className="text-gray-300">•</span>
        <span className="text-gray-500">
          {product.stockQty || 0} (In Stock)
        </span>
      </div>

      {/* Price */}
      <div className="flex justify-between items-end mb-6 pb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold text-black">
            ${product.pricePerUnit.toFixed(2)}
          </span>
          <span className="text-gray-500 text-base font-semibold">/Pc</span>
        </div>
        <span className="text-gray-500 text-sm">
          MOQ: {product.minOrderQty} pc
        </span>
      </div>

      {/* Supplier Card */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center border border-[#D1D7E3]">
            {/* Logo Placeholder */}
            <div className="text-cyan-500 text-lg">🌐</div>
          </div>
          <span className="font-semibold text-gray-900 text-sm">
            {product.businessId?.name || "Business"}
          </span>
        </div>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <span className="bg-blue-100 text-[#185ADB] border border-[#185ADB] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <MdVerified />{" "}
          <span className="text-gray-800">Verified Supplier</span>
        </span>
      </div>

      {/* Quantity & Subtotal */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-gray-600 text-sm font-medium">
              Quantity :
            </span>
            <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
              <button
                onClick={() =>
                  setQuantity(Math.max(product.minOrderQty, quantity - 1))
                }
                disabled={isFreeTrial}
                className={`w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors ${isFreeTrial ? "bg-gray-50 cursor-not-allowed opacity-50" : ""}`}
              >
                <FaMinus className="text-[12px]" />
              </button>
              <input
                type="number"
                value={quantity}
                readOnly={isFreeTrial}
                onChange={(e) =>
                  setQuantity(
                    Math.max(product.minOrderQty, Number(e.target.value)),
                  )
                }
                className={`w-12 text-center text-sm font-bold text-gray-900 border-x border-gray-200 py-1 outline-none ${isFreeTrial ? "bg-gray-50 cursor-not-allowed" : ""}`}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={isFreeTrial}
                className={`w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors ${isFreeTrial ? "bg-gray-50 cursor-not-allowed opacity-50" : ""}`}
              >
                <FaPlus className="text-[12px]" />
              </button>
            </div>
          </div>

          {isFreeTrial && (
            <div className="flex flex-col gap-1.5 pl-0 sm:pl-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full w-fit">
                <FaCrown className="text-purple-600 text-[11px]" />
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-tight">
                  Upgrade
                </span>
              </div>
              <p className="text-[13px] font-medium text-slate-500">
                Upgrade plan for bulk order
              </p>
            </div>
          )}
        </div>

        <div className="text-gray-600 text-sm font-medium pt-1">
          Sub Total:{" "}
          <span className="">
            ${(quantity * product.pricePerUnit).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-[#240457] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#2a0b4d] transition-colors"
        >
          Add To Cart <FaShoppingCart />
        </button>
        <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          Chat Now <FaCommentAlt />
        </button>
      </div>

      {/* Trust Badges */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <BsShieldCheck className="text-indigo-600 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              Secure payments
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Escrow Protection Assurance: Full B2B protection benefits are
              exclusively provided for orders successfully placed and paid
              through the secure 360GMP Escrow Service.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <BsCashCoin className="text-indigo-600 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              Money-back protection
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              360GMP Order Protection: Claim a full refund if your goods were
              not shipped, are missing, or arrive with verified quality or
              product defects
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <BsHeadset className="text-indigo-600 text-xl flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">
              24/7 support
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Dedicated Global Support: Access our comprehensive virtual help
              center 24/7 or connect with a live B2B support agent for immediate
              assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Action Required Modal */}
      <ActionRequiredModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        onProceed={handleProceedToSwitch}
        businessName={user?.businessName}
      />

      {/* Profile Switch Modal */}
      <ProfileSwitchModal
        isOpen={showSwitchModal}
        onClose={() => setShowSwitchModal(false)}
        userRole={user?.role}
        onSwitch={handleProfileSwitch}
      />
    </div>
  );
}
