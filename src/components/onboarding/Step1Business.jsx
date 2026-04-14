import { BUSINESS_TYPE_OPTIONS, companySizeBusiness, COUNTRIES, INCOTERMS_OPTIONS, productionCapacityBusiness } from "@/constants/index";
import CKEditorField from "@/components/ui/CKEditor";
import { Controller } from "react-hook-form";
import { useState } from "react";

export default function Step1({ register, errors, className, control }) {
     const [descLength, setDescLength] = useState(0)

     return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                         <label>Owner Name</label>
                         <input type="text" {...register("ownerName")} placeholder="John Doe" className={className} />
                         {errors.ownerName && (
                              <p className="text-red-500">{errors?.ownerName?.message}</p>
                         )}
                    </div>

                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Company Name <span className="text-red-500">*</span>
                         </label>
                         <input type="text" maxLength={200} placeholder="Global Manufacturing Co." {...register("companyName")} className={className} />
                         {errors.companyName && (
                              <p className="text-red-500">{errors?.companyName?.message}</p>
                         )}
                    </div>

                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Company Size<span className="text-red-500">*</span>
                         </label>
                         <select
                              className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                              {...register("companySize")}
                              required
                         >
                              <option value="" disabled>
                                   Select Company Size
                              </option>
                              {companySizeBusiness.map((opt) => (
                                   <option key={opt} value={opt}>
                                        {opt}
                                   </option>
                              ))}
                         </select>
                         {errors.companySize && (
                              <p className="text-red-500">{errors?.companySize?.message}</p>
                         )}
                    </div>

                    <div className="space-y-2">
                         <label>Identification Of Business Owner</label>
                         <input maxLength={200} type="text" {...register("identificationOfBusinessOwner")} placeholder="US-PASSPORT-99887766" className={className} />
                         {errors.identificationOfBusinessOwner && (
                              <p className="text-red-500">{errors?.identificationOfBusinessOwner?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Trade Name<span className="text-red-500">*</span>
                         </label>
                         <input placeholder="GSM Sports" {...register("tradeName")} maxLength={200} className={className} />
                         {errors.tradeName && (
                              <p className="text-red-500">{errors?.tradeName?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label>Production Capactiy</label>
                         <select
                              className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                              {...register("productionCapacity")}
                              required
                         >
                              <option value="" disabled>
                                   Select Production Capacity
                              </option>
                              {productionCapacityBusiness.map((opt) => (
                                   <option key={opt} value={opt}>
                                        {opt}
                                   </option>
                              ))}
                         </select>
                         {errors.productionCapacity && (
                              <p className="text-red-500">{errors?.productionCapacity?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Business Type<span className="text-red-500">*</span>
                         </label>
                         <select
                              className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              {...register("businessType")}
                         >
                              <option value="" disabled>
                                   Select Business Type
                              </option>
                              {BUSINESS_TYPE_OPTIONS.map((type) => (
                                   <option key={type} value={type}>
                                        {type}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Founded Date<span className="text-red-500">*</span>
                         </label>
                         <input type="date" placeholder="GSM Sports" {...register("foundedDate")} className={className} />
                         {errors?.foundedDate && (
                              <p className="text-red-500">{errors?.foundedDate?.message}</p>
                         )}
                    </div>

                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Primary Industry<span className="text-red-500">*</span>
                         </label>
                         <input type="text" maxLength={500} placeholder="Sports Manufacturing Industry" {...register("primaryIndustry")} className={className} />
                         {errors?.primaryIndustry && (
                              <p className="text-red-500">{errors?.primaryIndustry?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Operation Hour<span className="text-red-500">*</span>
                         </label>
                         <input type="text" maxLength={50} placeholder="9:00AM - 6:00PM" {...register("operationHour")} className={className} />
                         {errors?.operationHour && (
                              <p className="text-red-500">{errors?.operationHour?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Country Of Registration<span className="text-red-500">*</span>
                         </label>
                         <select
                              className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              {...register("countryOfRegistration")}
                         >
                              <option value="" disabled>
                                   Select Country
                              </option>
                              {COUNTRIES.map((type) => (
                                   <option key={type} value={type}>
                                        {type}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Business Registration Number<span className="text-red-500">*</span>
                         </label>
                         <input type="text" placeholder="BRN-US-458721" {...register("businessRegistrationNumber")} className={className} />
                         {errors?.businessRegistrationNumber && (
                              <p className="text-red-500">{errors?.businessRegistrationNumber?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Tax Identification Number<span className="text-red-500">*</span>
                         </label>
                         <input type="text" placeholder="BRN-US-458721" {...register("taxIdentificationNumber")} className={className} />
                         {errors?.taxIdentificationNumber && (
                              <p className="text-red-500">{errors?.taxIdentificationNumber?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Duns Number<span className="text-red-500">*</span>
                         </label>
                         <input type="text" placeholder="BRN-US-458721" {...register("dunsNumber")} className={className} />
                         {errors?.dunsNumber && (
                              <p className="text-red-500">{errors?.dunsNumber?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2 flex items-center">
                         <label className="text-base font-medium">
                              Compliance Screening Status<span className="text-red-500">*</span>
                         </label>
                         <input type="checkbox" {...register("complianceScreeningStatus")} className={"flex h-5 w-full rounded-md border border-border-light bg-surface px-3 py-2 text-base ring-offset-surface file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-text-hint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"} />
                         {errors?.complianceScreeningStatus && (
                              <p className="text-red-500">{errors?.complianceScreeningStatus?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Inco Terms<span className="text-red-500">*</span>
                         </label>
                         <select
                              className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                              {...register("incoterms")}
                         >
                              <option value="" disabled>
                                   Inco Terms
                              </option>
                              {INCOTERMS_OPTIONS.map((type) => (
                                   <option key={type} value={type}>
                                        {type}
                                   </option>
                              ))}
                         </select>
                    </div>
                    <div className="space-y-2 flex items-center">
                         <label className="text-base font-medium">
                              Export Experience<span className="text-red-500">*</span>
                         </label>
                         <input type="checkbox" {...register("shipping.exportExperience")} className={"flex h-5 w-full rounded-md border border-border-light bg-surface px-3 py-2 text-base ring-offset-surface file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-text-hint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"} />
                         {errors?.shipping?.exportExperience && (
                              <p className="text-red-500">{errors?.shipping?.exportExperience?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Annual Revenue Range<span className="text-red-500">*</span>
                         </label>
                         <input type="text" placeholder="$1M-$10M" {...register("annualRevenueRange")} className={className} />
                         {errors?.annualRevenueRange && (
                              <p className="text-red-500">{errors?.annualRevenueRange?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Auditing Agency<span className="text-red-500">*</span>
                         </label>
                         <input type="text" placeholder="Deloitte" {...register("auditingAgency")} className={className} />
                         {errors?.auditingAgency && (
                              <p className="text-red-500">{errors?.auditingAgency?.message}</p>
                         )}
                    </div>
                    <div className="space-y-2">
                         <label className="text-base font-medium">
                              Website<span className="text-red-500">*</span>
                         </label>
                         <input type="text" placeholder="https://www.example.com" {...register("website")} className={className} />
                         {errors?.website && (
                              <p className="text-red-500">{errors?.website?.message}</p>
                         )}
                    </div>
               </div>

               <div className="space-y-2">
                    <h2 className="font-bold">Standard Product Dimensions:</h2>
                    <div className="flex items-center justify-between">
                         <div >
                              <label className="text-base font-medium">
                                   Length<span className="text-red-500">*</span>
                              </label>
                              <input type="number" placeholder="0" {...register("standardProductDimensions.length")} className={className} />
                              {errors?.standardProductDimensions?.length && (
                                   <p className="text-red-500">{errors?.standardProductDimensions?.length?.message}</p>
                              )}
                         </div>
                         <div>
                              <label className="text-base font-medium">
                                   Width<span className="text-red-500">*</span>
                              </label>
                              <input type="number" placeholder="0" {...register("standardProductDimensions.width")} className={className} />
                              {errors?.standardProductDimensions?.width && (
                                   <p className="text-red-500">{errors?.standardProductDimensions?.width?.message}</p>
                              )}
                         </div>
                         <div>
                              <label className="text-base font-medium">
                                   Height<span className="text-red-500">*</span>
                              </label>
                              <input type="number" placeholder="0" {...register("standardProductDimensions.height")} className={className} />
                              {errors?.standardProductDimensions?.height && (
                                   <p className="text-red-500">{errors?.standardProductDimensions?.height?.message}</p>
                              )}
                         </div>
                         <div>
                              <label className="text-base font-medium">
                                   Weight<span className="text-red-500">*</span>
                              </label>
                              <input type="number" placeholder="0" {...register("standardProductDimensions.weight")} className={className} />
                              {errors?.standardProductDimensions?.weight && (
                                   <p className="text-red-500">{errors?.standardProductDimensions?.weight?.message}</p>
                              )}
                         </div>
                    </div>
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
               <div className="space-y-2">
                    <Controller
                         name="description"
                         control={control}
                         defaultValue=""
                         render={({ field }) => (
                              <CKEditorField
                                   value={field.value}
                                   onChange={(val) => {
                                        field.onChange(val);

                                        const text = val.replace(/<[^>]*>/g, "");
                                        setDescLength(text.length);
                                   }}
                                   onBlur={field.onBlur}
                                   placeholder="Detailed job description..."
                                   maxLength={5000}
                              />
                         )}
                    />

                    {errors?.description && (
                         <p className="text-red-500 text-xs mt-1">
                              {errors?.description?.message}
                         </p>
                    )}
               </div>
          </div >
     );
};