"use client";
import React, { useState } from "react";
import { IoPersonRemoveOutline } from "react-icons/io5";

const AddExecutiveLeadershipInputs = ({
    buttonName,
  heading,
  placeholder,
  name,
  formData,
  setFormData
}) => {
   const [errors, setErrors] = useState({});

  const list = formData[name] || [];

  // Handle Change
  const handleChange = (index, value) => {
    const updated = [...list];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      [name]: updated
    }));
  };

  // Remove
  const removeItem = (index) => {
    const updated = list.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      [name]: updated
    }));
  };

  // Validate
  const canAddMore = () => {
    if (list.length === 0) return true;

    const last = list[list.length - 1];
    let err = {};

    if (!last.role) err.role = "Field is required";

    setErrors((prev) => ({
      ...prev,
      [list.length - 1]: err
    }));

    return Object.keys(err).length === 0;
  };

  // Add
  const addItem = () => {
    if (!canAddMore()) return;

    setFormData((prev) => ({
      ...prev,
      [name]: [...prev[name], { name: "" }]
    }));
  };

  return (
    <div>
      <div className="space-y-4 bg-brand-business-button-light py-[1rem] px-[1rem] rounded-[0.75rem]">
        <h2 className="text-[16px] font-semibold font-primary text-text-dark ">
          {heading ? heading : "Executive Leadership"}
        </h2>

        {/* Inputs */}
        {list?.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="grid md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-[8px] items-center">
              <input
                value={item.role}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={placeholder}
                className="inputs"
              />

              <div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-[14px] font-secondary border-[1px] border-border-outline-light px-[16px] py-[11px] rounded-[8px] bg-border-gray-light text-text-dark flex items-center gap-[4]"
                >
                  <span>
                    <IoPersonRemoveOutline size={20} />
                  </span>
                  <span>Remove</span>
                </button>
              </div>
            </div>

            {/* Errors */}
            {errors[index]?.role && (
              <p className="text-red-500 text-sm">{errors[index].role}</p>
            )}
          </div>
        ))}

        {/* Button */}
        <button
          type="button"
          onClick={addItem}
          className="text-[16px] font-medium font-secondary border-[1px] border-border-outline-light px-[16px] py-[11px] rounded-[8px] bg-brand-primary text-white flex items-center gap-[4]"
        >
          + {buttonName ? buttonName : "Add Executive Leader"}
        </button>
      </div>
    </div>
  );
};

export default AddExecutiveLeadershipInputs;
