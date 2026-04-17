"use client";
import React, { useState } from "react";
import { IoPersonRemoveOutline } from "react-icons/io5";
const AddStakeHolderInputs = () => {
  const [stakeholders, setStakeholders] = useState([{ name: "", ownershipPercentage: "" }]);
  const [errors, setErrors] = useState([]);

  // Handle Change
  const handleChange = (index, field, value) => {
    const updated = [...stakeholders];
    updated[index][field] = value;
    setStakeholders(updated);
  };

  // Remove
  const removeStakeholder = (index) => {
    const updated = stakeholders.filter((_, i) => i !== index);
    setStakeholders(updated);
  };

  // Validate last row
  const canAddMore = () => {
    if (stakeholders.length === 0) return true;

    const last = stakeholders[stakeholders.length - 1];
    let err = {};

    if (!last.name) err.name = "Name is required";
    if (!last.ownershipPercentage)
      err.ownershipPercentage = "Ownership % is required";

    setErrors((prev) => {
      const updated = [...prev];
      updated[stakeholders.length - 1] = err;
      return updated;
    });

    return Object.keys(err).length === 0;
  };

  // Add
  const addStakeholder = () => {
    if (!canAddMore()) return;

    setStakeholders([...stakeholders, { name: "", ownershipPercentage: "" }]);
  };

  return (
    <div>
      <div className="space-y-4 bg-brand-business-button-light py-[1rem] px-[1rem] rounded-[0.75rem]">
        <h2 className="text-[16px] font-semibold font-primary text-text-dark ">
          Stakeholders
        </h2>

        {/* Inputs */}
        {stakeholders.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1  gap-[8px] items-center">
              <input
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                placeholder="Name"
                className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
              />

              <input
                type="number"
                value={item.ownershipPercentage}
                onChange={(e) =>
                  handleChange(index, "ownershipPercentage", e.target.value)
                }
                placeholder="Ownership %"
                className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
              />

              <div>
                <button
                  type="button"
                  onClick={() => removeStakeholder(index)}
                  className="text-[14px] font-secondary border-[1px] border-border-outline-light px-[16px] py-[11px] rounded-[8px] bg-border-gray-light text-text-dark flex items-center gap-[4]"
                >
                  <span>
                    <IoPersonRemoveOutline size={20} className="" />
                  </span>
                  <span>Remove</span>
                </button>
              </div>
            </div>

            {/* Errors */}
            {errors[index]?.name && (
              <p className="text-red-500 text-sm">{errors[index].name}</p>
            )}

            {errors[index]?.ownershipPercentage && (
              <p className="text-red-500 text-sm">
                {errors[index].ownershipPercentage}
              </p>
            )}
          </div>
        ))}

        {/* Button (always visible) */}
        <button
          type="button"
          onClick={addStakeholder}
          className="text-[16px] font-medium font-secondary border-[1px] border-border-outline-light px-[16px] py-[11px] rounded-[8px] bg-brand-primary text-white flex items-center gap-[4]"
        >
          + Add Stakeholder
        </button>
      </div>
    </div>
  );
};

export default AddStakeHolderInputs;
