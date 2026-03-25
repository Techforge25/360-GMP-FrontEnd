import { FiX, FiUpload, FiTrash2, FiPlus } from "react-icons/fi";
import Image from "next/image";
import dynamic from "next/dynamic";
import { uploadToCloudinary } from "@/lib/cloudinary";

// const SlateEditor = dynamic(() => import("@/components/ui/SlateEditor"), {
//   ssr: false,
//   loading: () => (
//     <div className="h-40 bg-gray-50 border border-gray-200 rounded-lg animate-pulse flex items-center justify-center text-gray-400">
//       Loading Editor...
//     </div>
//   ),
// });

import productAPI from "@/services/productAPI";
import React, { useRef, useState } from "react";
import CKEditorField from "@/components/ui/CKEditor";
import { digitsDecimalOnly, digitsOnly } from "@/constants/index";
// import CKEditorField from "@/components/CKEditorField";

// const CKEditor = dynamic(
//   () => import("@/components/ui/CKEditorField").then(mod => mod.CKEditor),
//   { ssr: false }
// );


const AddProductModal = ({ isOpen, onClose, onSuccess, editProduct }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [descLength, setDescLength] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    minOrderQty: 2,
    pricePerUnit: "",
    isSingleProductAvailable: false,
    tieredPricing: [{
      qty: 0,
      price: 0
    }],
    description: "",
    estimatedDeliveryDays: "",
    stockQty: "",
    lowStockThreshold: 5,
    mainImage: null,
    previewImage: null,
    galleryImages: [],
    isFeatured: false,
  });

  console.log(formData.previewImage, "preview image")

  const step1DisabledNext =
    currentStep === 1 &&
    (
      !formData.title ||
      !formData.category ||
      !formData.pricePerUnit ||
      !formData.description ||
      !formData.lowStockThreshold ||
      (!formData.isSingleProductAvailable && !formData.minOrderQty) ||
      errors.title ||
      errors.category ||
      errors.pricePerUnit ||
      errors.tieredPricing ||
      errors.lowStockThreshold ||
      errors.description
    );

  console.log(formData, "dorm data")

  const step2DisabledNext =
    currentStep === 2 &&
    (
      !formData.estimatedDeliveryDays ||
      !formData.stockQty ||

      errors.estimatedDeliveryDays ||
      errors.category
    );

  const step3DisabledNext =
    currentStep === 3 &&
    (
      !formData.previewImage ||

      errors.image
    );

  const mainImageInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  console.log(mainImageInputRef, "main image input ref")

  // Populate form data if editing
  React.useEffect(() => {
    if (editProduct && isOpen) {
      // Convert backend Object → Array
      let tieredArray = [{ qty: "", price: 0 }];

      if (
        editProduct.tieredPricing &&
        typeof editProduct.tieredPricing === "object"
      ) {
        tieredArray = editProduct.tieredPricing.map((item) => ({
          qty: Number(item.qty),
          price: Number(item.price),
        }));
      }

      console.log(tieredArray, "tieredArray")
      console.log(editProduct.isSingleProductAvailable, "edit product")
      setFormData({
        title: editProduct.title || "",
        category: editProduct.category || "",
        minOrderQty: editProduct.minOrderQty || "",
        pricePerUnit: editProduct.pricePerUnit || "",
        tieredPricing: tieredArray,
        description:
          editProduct.detail ||
          JSON.stringify([{ type: "paragraph", children: [{ text: "" }] }]),
        isSingleProductAvailable: editProduct.isSingleProductAvailable || false,
        estimatedDeliveryDays: editProduct.estimatedDeliveryDays || "",
        stockQty: editProduct.stockQty || "",
        lowStockThreshold: editProduct.lowStockThreshold || 5,
        mainImage: null,
        previewImage: editProduct.image || null,
        galleryImages: (editProduct.groupImages || []).map((url) => ({
          file: null,
          previewUrl: url,
        })),
        isFeatured: editProduct.isFeatured || false,
      });
    } else if (isOpen && !editProduct) {
      setFormData({
        title: "",
        category: "",
        minOrderQty: 2,
        pricePerUnit: "",
        tieredPricing: [{ qty: 0, price: 0 }],
        description: "",
        isSingleProductAvailable: false,
        estimatedDeliveryDays: "",
        stockQty: "",
        lowStockThreshold: 5,
        mainImage: null,
        previewImage: null,
        galleryImages: [],
        isFeatured: false,
      });

      setCurrentStep(1);
    }
  }, [editProduct, isOpen]);

  React.useEffect(() => {
    if (formData.isSingleProductAvailable) {
      setFormData((prev) => ({
        ...prev,
        minOrderQty: 1,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        minOrderQty: prev.minOrderQty || 2,
      }));
    }
  }, [formData.isSingleProductAvailable]);

  if (!isOpen) return null;

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTier = () => {
    setFormData((prev) => ({
      ...prev,
      tieredPricing: [
        ...prev.tieredPricing,
        { qty: 0, price: 0 },
      ],
    }));
  };

  const updateTier = (index, field, value) => {
    const updated = [...formData.tieredPricing];
    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      tieredPricing: updated,
    }));

  };

  const removeTier = (index) => {
    const updated = formData.tieredPricing.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      tieredPricing: updated,
    }));
  };

  const handleStandardInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const finalValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // ✅ Validate field
    const error = validateField(name, finalValue, {
      ...formData,
      [name]: finalValue,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (step1DisabledNext) return;
      setCurrentStep(2);
    }

    if (currentStep === 2) {
      if (step2DisabledNext) return;
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Only image files allowed",
      }));
    }
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
      const remainingSlots = 3 - formData.galleryImages.length;
      if (remainingSlots <= 0) {
        alert("You can only upload up to 3 gallery images.");
        return;
      }

      const filesToAdd = files.slice(0, remainingSlots);
      const newImages = filesToAdd.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, ...newImages],
      }));

      if (files.length > remainingSlots) {
        alert(
          `Only the first ${remainingSlots} images were added (max 3 total).`,
        );
      }
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

      // Upload Gallery Images
      const galleryUrls = await Promise.all(
        formData.galleryImages.map(async (img) => {
          if (img.file) {
            // New file to upload
            return await uploadToCloudinary(img.file, "products");
          }
          // Existing URL
          return img.previewUrl;
        }),
      );

      // Parse Tiered Pricing
      let tieredPricingMap = {};


      if (Array.isArray(formData.tieredPricing)) {
        formData.tieredPricing.forEach((tier) => {
          if (tier.qty && tier.price !== undefined && tier.price !== "") {
            tieredPricingMap[tier.qty] = Number(tier.price);
          }
        });
      }

      console.log(formData.tieredPricing, "tieredPricing")
      console.log(formData.isSingleProductAvailable, "single product")

      const payload = {
        title: formData.title,
        category: formData.category,
        minOrderQty: formData.isSingleProductAvailable ? 1 : formData.minOrderQty,
        pricePerUnit: Number(formData.pricePerUnit),
        detail: formData.description,
        estimatedDeliveryDays: formData.estimatedDeliveryDays,
        image: imageUrl,
        groupImages: galleryUrls.slice(0, 3),
        stockQty: Number(formData.stockQty) || 0,
        lowStockThreshold: Number(formData.lowStockThreshold),
        isSingleProductAvailable: formData.isSingleProductAvailable,
        tieredPricing: formData.tieredPricing,
        shippingCost: 0,
        status: "approved",
      };

      let response;
      if (editProduct) {
        response = await productAPI.update(editProduct._id, payload);
      } else {
        response = await productAPI.create(payload);
      }

      if (response?.data) {
        const productId = response.data._id || response.data.id;

        // If featured is checked, set it via the separate PATCH API
        // For new products, we call it if isFeatured is true.
        // For edits, we check if it changed.
        const originalFeatured = editProduct?.isFeatured || false;
        if (formData.isFeatured !== originalFeatured) {
          await productAPI.toggleFeatured(productId, formData.isFeatured);
        }

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

  const validateField = (name, value, formData) => {
    let error = "";

    console.log(name, value, "errors")

    switch (name) {
      case "title":
        if (!value.trim()) error = "Product title is required";
        else if (value.length < 3) error = "Minimum 3 characters";
        else if (value.length > 150) error = "Max 150 characters";
        break;

      case "category":
        if (!value) error = "Category is required";
        break;

      case "pricePerUnit":
        if (!value) error = "Price is required";
        else if (Number(value) <= 0) error = "Must be positive";
        break;

      case "minOrderQty":
        if (!value) error = "Minimum order quantity required";
        else if (Number(value) < 2 && !formData.isSingleProductAvailable) error = "Must be at greater than 1";
        break;

      case "stockQty":
        if (!value) error = "Stock quantity required";
        else if (Number(value) < Number(formData.minOrderQty || 0)) {
          error = "Stock must be Greater than or equals to Min Order Qty";
        }
        break;

      case "lowStockThreshold":
        if (value && Number(value) < 1) {
          error = "Must be at least 1";
        }
        break;

      case "description":
        if (value && Number(value) > 2000) {
          error = "Description is more then 2000. Please reduce it."
        }
        break

      case "estimatedDeliveryDays":
        if (!value) error = "Delivery time required";
        break;

      default:
        break;
    }

    return error;
  };

  console.log(errors, "errors")

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={currentStep > 1 ? handleBack : onClose}
        className="flex items-center text-gray-500 text-base hover:text-gray-700"
      >
        ← Back
      </button>
      <span className="text-sm font-medium text-gray-500">
        Step {currentStep} Of 3
      </span>
    </div>
  );

  const findQtySingle = () => {
    const data = formData.tieredPricing.find((item) => item.qty !== "1")
    return data
  }

  console.log(formData.previewImage, "formdata")

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleStandardInputChange}
            className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Metals & Fabrication">Metals & Fabrication</option>
            <option value="Electronics">Electronics</option>
            <option value="Textiles">Textiles</option>
            <option value="Raw Materials">Raw Materials</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleStandardInputChange}
            placeholder="Product Title"
            className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>
        <div className="flex items-start gap-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Single Product
          </label>
          <input
            type="checkbox"
            name="isSingleProductAvailable"
            checked={formData.isSingleProductAvailable}
            onChange={(e) => {
              const checked = e.target.checked;
              setFormData((prev) => ({
                ...prev,
                isSingleProductAvailable: checked,
              }));
            }}
            className="w-4 h-4 border-2 border-gray-300 rounded-md checked:border-indigo-600 checked:bg-indigo-50 transition-all cursor-pointer"
          />
          {errors.isSingleProductAvailable && (
            <p className="text-red-500 text-xs mt-1">{errors.isSingleProductAvailable}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!formData.isSingleProductAvailable && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Minimum Order Quantity
            </label>
            <input
              type="text"
              name="minOrderQty"
              value={formData.minOrderQty}
              onChange={(e) => {
                const sanitized = digitsOnly(e.target.value);
                handleStandardInputChange({ target: { name: "minOrderQty", value: sanitized } });
              }}
              placeholder="e.g 100 Units"
              className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.minOrderQty && (
              <p className="text-red-500 text-xs mt-1">{errors.minOrderQty}</p>
            )}
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Pricing Model (Price Per Unit)
          </label>
          <input
            type="text"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={(e) => {
              const sanitized = digitsDecimalOnly(e.target.value);
              handleStandardInputChange({ target: { name: "pricePerUnit", value: sanitized } });
            }}
            placeholder="$50 USD"
            className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {errors.pricePerUnit && (
            <p className="text-red-500 text-xs mt-1">{errors.pricePerUnit}</p>
          )}
        </div>
      </div>

      {/* Tiered Pricing */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tiered Pricing
        </label>

        {formData.tieredPricing.map((tier, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 mb-3 bg-white shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            {/* Quantity */}
            <div className="flex flex-col flex-1">
              <label htmlFor={`quantity-${index}`} className="text-sm font-semibold text-gray-700 mb-1">
                Quantity
              </label>
              <input
                id={`quantity-${index}`}
                type="text"
                value={tier.qty}
                onChange={(e) => updateTier(index, "qty", digitsOnly(e.target.value))}
                placeholder="Quantity (e.g. 100)"
                className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Price */}
            <div className="flex flex-col flex-1">
              <label htmlFor={`price-${index}`} className="text-sm font-semibold text-gray-700 mb-1">
                Price
              </label>
              <input
                id={`price-${index}`}
                type="text"
                value={tier.price}
                onChange={(e) => updateTier(index, "price", digitsDecimalOnly(e.target.value))}
                placeholder="Price"
                className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Remove */}
            {formData.tieredPricing.length > 1 && (
              <div className="mt-2 md:mt-0 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => removeTier(index)}
                  className="flex items-center justify-center w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition-colors duration-200"
                  title="Remove Tier"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add Button */}
        {formData.tieredPricing.length < 4 && (
          <button
            type="button"
            onClick={addTier}
            className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            <FiPlus /> Add Tier
          </button>
        )}
      </div>

      {/* Low Stock Threshold */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Low Stock Threshold
        </label>
        <input
          type="text"
          name="lowStockThreshold"
          value={formData.lowStockThreshold}
          onChange={(e) => {
            const sanitized = digitsOnly(e.target.value);
            handleStandardInputChange({ target: { name: "lowStockThreshold", value: sanitized } });
          }}
          placeholder="10 units"
          className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {errors.lowStockThreshold && (
          <p className="text-red-500 text-xs mt-1">{errors.lowStockThreshold}</p>
        )}
      </div>

      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-semibold text-gray-700">
          Description
        </label>
        <span
          className={`text-[12px] ${descLength >= 2000 ? "text-red-500 font-bold" : "text-gray-400"}`}
        >
          {descLength} / 2000
        </span>
      </div>
      <CKEditorField
        value={formData.description}
        onChange={(val) => {
          handleInputChange("description", val);

          const text = val.replace(/<[^>]*>/g, "");
          if (text.length > 2000) {
            setErrors((prev) => ({
              ...prev,
              description: "Max 2000 characters allowed",
            }));
          } else {
            setErrors((prev) => ({
              ...prev,
              description: "",
            }));
          }
        }} onLengthChange={(len) => setDescLength(len)}
        placeholder="Detailed job description..."
        maxLength={5000}
      />
      {errors.description && (
        <p className="text-red-500 text-xs mt-1">{errors.description}</p>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-2">
        Logistics
      </h3>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Preparing Time
        </label>
        <input
          type="text"
          name="estimatedDeliveryDays"
          value={formData.estimatedDeliveryDays}
          onChange={handleStandardInputChange}
          placeholder="Eg: 1-3 Days"
          className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {errors.estimatedDeliveryDays && (
          <p className="text-red-500 text-xs mt-1">{errors.estimatedDeliveryDays}</p>
        )}
      </div>

      {/* <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Shipping Terms
        </label>
        <select
          name="shippingMethod"
          value={formData.shippingMethod}
          onChange={handleStandardInputChange}
          className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="FOB (Free On Board)">FOB (Free On Board)</option>
          <option value="CIF (Cost, Insurance, and Freight)">
            CIF (Cost, Insurance, and Freight)
          </option>
          <option value="EXW (Ex Works)">EXW (Ex Works)</option>
        </select>
        <p className="text-[14px] text-gray-400 mt-1">
          Select the shipping term applicable for this product.
        </p>
      </div> */}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Current Stock Quantity
        </label>
        <input
          type="number"
          name="stockQty"
          value={formData.stockQty}
          onChange={handleStandardInputChange}
          placeholder="e.g. 1000"
          className="w-full text-black text-base p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {errors.stockQty && (
          <p className="text-red-500 text-xs mt-1">{errors.stockQty}</p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Main Product Image
        </label>
        <p className="text-[14px] text-gray-400 mb-2">
          This Will Be The Primary Image Displayed For Your Product.
        </p>

        <div
          onClick={() => mainImageInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50"
        >
          {formData.previewImage ? (
            <>
              <div className="relative w-full h-48">
                <Image
                  src={formData.previewImage}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>

            </>
          ) : (
            <>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <FiUpload className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-indigo-600 font-semibold mb-1">
                Click To Upload Img{" "}
                <span className="text-gray-400 font-normal">• Drag & drop here</span>
              </p>
              <p className="text-[14px] text-gray-400">JPG, PNG, Max 100 Mb</p>


            </>
          )}
          <input
            type="file"
            ref={mainImageInputRef}
            onChange={handleMainImageChange}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
          />
        </div>
      </div>
      {errors.image && (
        <p className="text-red-500 text-xs mt-1">{errors.image}</p>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Image Gallery
        </label>
        <p className="text-[14px] text-gray-400 mb-2">
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

      <div>
        <label className="flex items-center gap-3 cursor-pointer group mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleStandardInputChange}
              className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-full checked:border-indigo-600 checked:bg-indigo-50 transition-all cursor-pointer"
            />
            <div className="absolute w-3 h-3 rounded-full bg-indigo-600 scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
          </div>
          <span className="text-base font-semibold text-gray-700">
            Set as featured
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
            className="px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              disabled={step1DisabledNext || step2DisabledNext}
              className="px-8 py-2.5 bg-[#2e1065] text-white text-sm font-bold rounded-lg hover:bg-[#1e0a45] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || uploading || step3DisabledNext}
              className="px-8 py-2.5 bg-[#2e1065] text-white text-sm font-bold rounded-lg hover:bg-[#1e0a45] transition-colors disabled:opacity-50 flex items-center gap-2"
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
