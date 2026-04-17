"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const SettingHeader = ({ backButton, saveButton }) => {
  const router =useRouter()
  return (
    <section className="bg-gradient-to-l from-brand-setting-ligh to-brand-setting-sky py-[12px] px-[20px]">
      <div className="">
        {backButton && (
          <button onClick={()=>{router.back()}} className="flex items-center gap-2">
            <span>
              <IoMdArrowBack size={20} className="text-text-dark" />
            </span>
            <span className="text-text-dark font-[14px] font-secondary ">
              Back
            </span>
          </button>
        )}

        <div className="mt-2 flex items-center sm:flex-row flex-col sm:justify-between justify-center sm:text-start text-center gap-2">
          <div>
            <h1 className="md:text-[32px] sm:text-[28px] text-[20px] text-text-dark font-primary font-bold">
              Settings
            </h1>
            <p className="text-text-light-setting sm:leading-[28px] leading-[20px] sm:text-[16px] text-[14px] font-secondary ">
              Manage your company's digital presence and operations.
            </p>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default SettingHeader;
