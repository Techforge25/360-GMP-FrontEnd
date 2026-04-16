"use client";
import React, { useState } from "react";
import { IoPersonRemoveOutline } from "react-icons/io5";

const AddExecutiveLeadershipInputs = () => {
  const [leaders, setLeaders] = useState([]);
  const [errors, setErrors] = useState([]);

  // Handle Change
  const handleChange = (index, value) => {
    const updated = [...leaders];
    updated[index].role = value;
    setLeaders(updated);
  };

  // Remove
  const removeLeader = (index) => {
    const updated = leaders.filter((_, i) => i !== index);
    setLeaders(updated);
  };

  // Validate last row
  const canAddMore = () => {
    if (leaders.length === 0) return true;

    const last = leaders[leaders.length - 1];
    let err = {};

    if (!last.role) err.role = "Field is required";

    setErrors((prev) => {
      const updated = [...prev];
      updated[leaders.length - 1] = err;
      return updated;
    });

    return Object.keys(err).length === 0;
  };

  // Add
  const addLeader = () => {
    if (!canAddMore()) return;

    setLeaders([...leaders, { role: "" }]);
  };

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-[16px] font-semibold font-primary text-text-dark ">
          Executive Leadership
        </h2>

        {/* Inputs */}
        {leaders.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[8px] items-center">
              <input
                value={item.role}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="e.g CEO, MD, OFFICER"
                className="md:py-[12px] py-[10px] md:px-[16px] px-[12px] w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more"
              />

              <div>
                <button
                  type="button"
                  onClick={() => removeLeader(index)}
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
          onClick={addLeader}
          className="text-[16px] font-semibold font-secondary border-[1px] border-border-outline-light px-[16px] py-[11px] rounded-[8px] bg-brand-primary text-white flex items-center gap-[4]"
        >
          + Add Executive Leader
        </button>
      </div>
    </div>
  );
};

export default AddExecutiveLeadershipInputs;