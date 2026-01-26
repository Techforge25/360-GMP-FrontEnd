import React, { useState, useRef } from "react";
import { FiX, FiUpload, FiTrash2, FiPlus } from "react-icons/fi";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import productAPI from "@/services/productAPI";

const AddProductModal = ({ isOpen, onClose, onSuccess, editProduct }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    minOrderQty: "",
    pricePerUnit: "",
    tieredPricing: "",
    description: "",
    isSingleProductAvailable: false,
    shippingMethod: "FOB (Free On Board)",
    estimatedDeliveryDays: "",
    stockQty: "",
    lowStockThreshold: 5,
    mainImage: null,
    previewImage: null,
    galleryImages: [],
  });

  const mainImageInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Populate form data if editing
  React.useEffect(() => {
    if (editProduct && isOpen) {
      // Format tiered pricing Map/Object to string "Q:P, Q:P"
      let tieredString = "";
      if (editProduct.tieredPricing) {
        tieredString = Object.entries(editProduct.tieredPricing)
          .map(([q, p]) => `${q}:${p}`)
          .join(", ");
      }

      setFormData({
        title: editProduct.title || "",
        category: editProduct.category || "",
        minOrderQty: editProduct.minOrderQty || "",
        pricePerUnit: editProduct.pricePerUnit || "",
        tieredPricing: tieredString,
        description: editProduct.detail || "",
        isSingleProductAvailable: editProduct.isSingleProductAvailable || false,
        shippingMethod: editProduct.shippingMethod || "FOB (Free On Board)",
        estimatedDeliveryDays: editProduct.estimatedDeliveryDays || "",
        stockQty: editProduct.stockQty || "",
        lowStockThreshold: editProduct.lowStockThreshold || 5,
        mainImage: null, // New file not selected yet
        previewImage: editProduct.image || null, // Existing image URL
        galleryImages: [], // Handle existing gallery if needed later
      });
    } else if (isOpen && !editProduct) {
      // Reset if opening in Add mode
      setFormData({
        title: "",
        category: "",
        minOrderQty: "",
        pricePerUnit: "",
        tieredPricing: "",
        description: "",
        isSingleProductAvailable: false,
        shippingMethod: "FOB (Free On Board)",
        estimatedDeliveryDays: "",
        stockQty: "",
        lowStockThreshold: 5,
        mainImage: null,
        previewImage: null,
        galleryImages: [],
      });
      setCurrentStep(1);
    }
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    // Basic validation could go here
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        mainImage: file,
        previewImage: previewUrl,
      }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newImages],
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Upload Main Image
      let imageUrl = formData.previewImage; // Use existing by default
      if (formData.mainImage) {
        setUploading(true); // Only if new image
        imageUrl = await uploadToCloudinary(formData.mainImage, "products");
      }

      // Parse Tiered Pricing
      let tieredPricingMap = {};
      if (formData.tieredPricing) {
        const parts = formData.tieredPricing.split(",");
        parts.forEach((part) => {
          const [qty, price] = part.split(":").map((s) => s.trim());
          if (qty && price) {
            tieredPricingMap[qty] = Number(price);
          }
        });
      }

      const payload = {
        title: formData.title,
        category: formData.category,
        minOrderQty: Number(formData.minOrderQty),
        pricePerUnit: Number(formData.pricePerUnit),
        detail: formData.description,
        shippingMethod: formData.shippingMethod,
        estimatedDeliveryDays: formData.estimatedDeliveryDays,
        image: imageUrl,
        stockQty: Number(formData.stockQty) || 0,
        lowStockThreshold: Number(formData.lowStockThreshold),
        isSingleProductAvailable: formData.isSingleProductAvailable,
        tieredPricing: tieredPricingMap,
        shippingCost: 0,
      };

      let response;
      if (editProduct) {
        response = await productAPI.update(editProduct._id, payload);
      } else {
        response = await productAPI.create(payload);
      }

      if (response?.data) {
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product. Check console for details.");
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={currentStep > 1 ? handleBack : onClose}
        className="flex items-center text-gray-500 text-sm hover:text-gray-700"
      >
        ← Back
      </button>
      <span className="text-xs font-medium text-gray-500">
        Step {currentStep} Of 3
      </span>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Product Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Metals & Fabrication">Metals & Fabrication</option>
            <option value="Electronics">Electronics</option>
            <option value="Textiles">Textiles</option>
            <option value="Raw Materials">Raw Materials</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Product Title"
            className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Minimum Order Quantity
          </label>
          <input
            type="number"
            name="minOrderQty"
            value={formData.minOrderQty}
            onChange={handleInputChange}
            placeholder="e.g 100 Units"
            className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Pricing Model (Price Per Unit)
          </label>
          <input
            type="number"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleInputChange}
            placeholder="$50 USD"
            className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Tiered Pricing (Q: Price, Q: Price)
        </label>
        <input
          type="text"
          name="tieredPricing"
          value={formData.tieredPricing}
          onChange={handleInputChange}
          placeholder="e.g., 100:150.00, 500:120.00"
          className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Single Product
        </label>
        <select
          name="isSingleProductAvailable"
          value={formData.isSingleProductAvailable}
          onChange={(e) =>
            setFormData({
              ...formData,
              isSingleProductAvailable: e.target.value === "true",
            })
          }
          className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="false">Bulk Only</option>
          <option value="true">Single Product Available</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Low Stock Threshold
        </label>
        <input
          type="number"
          name="lowStockThreshold"
          value={formData.lowStockThreshold}
          onChange={handleInputChange}
          placeholder="10 units"
          className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
        ></textarea>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">
        Logistics
      </h3>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Lead Time
        </label>
        <input
          type="text"
          name="estimatedDeliveryDays"
          value={formData.estimatedDeliveryDays}
          onChange={handleInputChange}
          placeholder="Estimated Production Days Based On Order Quantity (e.g., 'Ready To Ship In 7 Days')"
          className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Shipping Terms
        </label>
        <select
          name="shippingMethod"
          value={formData.shippingMethod}
          onChange={handleInputChange}
          className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="FOB (Free On Board)">FOB (Free On Board)</option>
          <option value="CIF (Cost, Insurance, and Freight)">
            CIF (Cost, Insurance, and Freight)
          </option>
          <option value="EXW (Ex Works)">EXW (Ex Works)</option>
        </select>
        <p className="text-[10px] text-gray-400 mt-1">
          Select the shipping term applicable for this product.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Current Stock Quantity
        </label>
        <input
          type="number"
          name="stockQty"
          value={formData.stockQty}
          onChange={handleInputChange}
          placeholder="e.g. 1000"
          className="w-full text-black text-sm p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Main Product Image
        </label>
        <p className="text-[10px] text-gray-400 mb-2">
          This Will Be The Primary Image Displayed For Your Product.
        </p>

        <div
          onClick={() => mainImageInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50"
        >
          {formData.previewImage ? (
            <div className="relative w-full h-48">
              <Image
                src={formData.previewImage}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <FiUpload className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-indigo-600 font-semibold mb-1">
                Click To Upload Img{" "}
                <span className="text-gray-400 font-normal">
                  • Drag & drop here
                </span>
              </p>
              <p className="text-[10px] text-gray-400">JPG,PNG, Max 100 Mb</p>
            </>
          )}
          <input
            type="file"
            ref={mainImageInputRef}
            onChange={handleMainImageChange}
            accept="image/*"
            className="hidden "
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">
          Image Gallery
        </label>
        <p className="text-[10px] text-gray-400 mb-2">
          Add More Images To Showcase Your Product From Different Angles.
        </p>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {formData.galleryImages.map((img, index) => (
            <div
              key={index}
              className="w-20 h-20 relative flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group"
            >
              <Image
                src={img.previewUrl}
                alt={`Gallery ${index}`}
                fill
                className="object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeGalleryImage(index);
                }}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
          ))}

          <button
            onClick={() => galleryInputRef.current?.click()}
            className="w-20 h-20 flex-shrink-0 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <FiPlus className="w-5 h-5 text-gray-400" />
          </button>
          <input
            type="file"
            multiple
            ref={galleryInputRef}
            onChange={handleGalleryChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="publishStatus"
            className="text-indigo-600 focus:ring-indigo-500"
            defaultChecked
          />
          <span className="text-xs font-medium text-gray-700">
            Set as featured
          </span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="publishStatus"
            className="text-gray-400  focus:ring-gray-400"
          />
          <span className="text-xs font-medium text-gray-700">
            Save as draft
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {renderStepIndicator()}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="px-8 py-2.5 bg-[#2e1065] text-white text-xs font-bold rounded-lg hover:bg-[#1e0a45] transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || uploading}
              className="px-8 py-2.5 bg-[#2e1065] text-white text-xs font-bold rounded-lg hover:bg-[#1e0a45] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
