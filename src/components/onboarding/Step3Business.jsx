export default function Step3() {
     // <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
     //   <div className="relative h-48 w-full rounded-xl mb-12">
     //     {formData.bannerImageUrl && (
     //       <Image
     //         src={
     //           formData.bannerImageUrl || "/assets/images/placeholderBanner.jpg"
     //         }
     //         alt="Banner"
     //         fill
     //         className="object-cover rounded-xl"
     //         priority
     //       />
     //     )}

     //     <div className="absolute -bottom-10 left-8">
     //       <div className="w-24 h-24 bg-white rounded-lg shadow-lg border border-border-light p-2">
     //         {formData.profileImageUrl && (
     //           <Image
     //             src={
     //               formData.profileImageUrl ||
     //               "/assets/images/Portrait_Placeholder.png"
     //             }
     //             alt="Portrait_Placeholder"
     //             width={96}
     //             height={96}
     //             className="object-contain"
     //           />
     //         )}
     //       </div>
     //     </div>
     //   </div>

     //   <div className="pt-4 text-center">
     //     <h2 className="text-2xl font-bold">
     //       {formData.companyName || "Global Manufacturing Co."}
     //     </h2>
     //     <div className="flex justify-center gap-6 mt-2 text-base text-text-secondary">
     //       <span className="flex items-center gap-1">
     //         <BsBuilding /> {formData.industry || "Custom Manufacturer"}
     //       </span>
     //       <span className="flex items-center gap-1">
     //         <FiCalendar />{" "}
     //         <p className="text-base text-text-secondary">
     //           {formData.foundedDate
     //             ? formatYearMonth(formData.foundedDate)
     //             : "August 2021"}
     //         </p>
     //       </span>
     //       <span className="flex items-center gap-1">
     //         <FiMapPin /> {formData.city || "Ottawa"},{" "}
     //         {formData.country || "Canada"}
     //       </span>
     //     </div>
     //   </div>

     //   <div className="p-6 border border-border-light rounded-lg bg-white">
     //     <h3 className="font-bold mb-2">Overview</h3>
     //     <SlateRenderer
     //       content={formData.bio}
     //       maxLength={500}
     //       className="text-base text-text-secondary leading-relaxed"
     //     />

     //     <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-border-light">
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">
     //           Business Type
     //         </p>
     //         <p className="text-base text-text-secondary">
     //           {formData.businessType || "Private Corporation"}
     //         </p>
     //       </div>
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">Founded</p>
     //         <p className="text-base text-text-secondary">
     //           {formData.foundedDate || "2021"}
     //         </p>
     //       </div>
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">
     //           Operating Hours
     //         </p>
     //         <p className="text-base text-text-secondary">
     //           {formData.operatingHours || "09:00 - 18:00"}
     //         </p>
     //       </div>
     //     </div>
     //     <div className="grid grid-cols-3 gap-6 mt-6">
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">
     //           Official Company Website
     //         </p>
     //         <p className="text-base text-text-secondary">
     //           {formData.website || "N/A"}
     //         </p>
     //       </div>
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">Location</p>
     //         <span className="flex text-text-secondary items-center gap-1">
     //           {formData.address || "Canada"}, {formData.city || "Ottawa"},{" "}
     //           {formData.country || "Canada"}
     //         </span>
     //       </div>
     //     </div>
     //   </div>

     //   {formData.certifications?.length > 0 && (
     //     <div className="p-6 border border-border-light rounded-lg bg-white mt-6">
     //       <h3 className="font-bold mb-3">Certifications & Compliance</h3>
     //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     //         {formData.certifications.map((cert, index) => {
     //           const isPDF = cert.url?.toLowerCase().endsWith(".pdf");

     //           return (
     //             <div key={index} className="flex flex-col gap-2">
     //               <div className="relative aspect-video w-full border border-gray-100 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
     //                 {isPDF ? (
     //                   <div className="text-center p-4">
     //                     <div className="text-5xl mb-2">📄</div>
     //                     <p className="text-sm text-text-secondary truncate px-2">
     //                       {cert.name}.pdf
     //                     </p>
     //                   </div>
     //                 ) : (
     //                   <Image
     //                     src={cert.url}
     //                     alt={cert.name}
     //                     fill
     //                     className="object-contain p-2"
     //                   />
     //                 )}
     //               </div>
     //               <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold w-fit">
     //                 {cert.name}
     //               </span>
     //             </div>
     //           );
     //         })}
     //       </div>
     //     </div>
     //   )}

     //   <div className="p-6 border border-border-light rounded-lg bg-white">
     //     {/* <div className="grid grid-cols-3 gap-6 mt-6">
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">
     //           Business Type
     //         </p>
     //         <p className="text-base text-text-secondary">
     //           {formData.businessType || "Private Corporation"}
     //         </p>
     //       </div>
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">Founded</p>
     //         <p className="text-base text-text-secondary">
     //           {formData.foundedDate || "2021"}
     //         </p>
     //       </div>
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">
     //           Operating Hours
     //         </p>
     //         <p className="text-base text-text-secondary">
     //           {formData.operatingHours || "09:00 - 18:00"}
     //         </p>
     //       </div>
     //     </div>
     //     <div className="grid grid-cols-3 gap-6 mt-6">
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">
     //           Official Company Website
     //         </p>
     //         <p className="text-base text-text-secondary">
     //           {formData.website || "N/A"}
     //         </p>
     //       </div>
     //       <div>
     //         <p className="text-sm font-bold text-text-primary mb-1">
     //           Location
     //         </p>
     //         <span className="flex text-text-secondary items-center gap-1">
     //           {formData.address || "Canada"},{" "}
     //           {formData.city || "Ottawa"},{" "}
     //           {formData.country || "Canada"}
     //         </span>
     //       </div>
     //     </div> */}

     //     <div>
     //       <h3 className="text-lg font-semibold mb-4">Primary B2B Contact</h3>
     //       <div className="grid md:grid-cols-2 gap-6">
     //         <div className="space-y-2">
     //           <label className="text-base font-medium">Contact Person Name</label>
     //           <p className="text-base text-text-secondary">
     //             {formData.contactName}
     //           </p>
     //         </div>
     //         <div className="space-y-2">
     //           <label className="text-base font-medium">Title</label>
     //           <p className="text-base text-text-secondary">
     //             {formData.contactTitle}
     //           </p>
     //         </div>
     //         <div className="space-y-2">
     //           <label className="text-base font-medium">Phone</label>
     //           <p className="text-base text-text-secondary">
     //             {formData.contactPhone}
     //           </p>
     //         </div>
     //         <div className="space-y-2">
     //           <label className="text-base font-medium">Support Email</label>
     //           <p className="text-base text-text-secondary">
     //             {formData.contactEmail}
     //           </p>
     //         </div>
     //       </div>
     //     </div>
     //   </div>

     //   <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3 text-base text-orange-800">
     //     <div className="pt-0.5">
     //       <div className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center text-[14px] font-bold">
     //         !
     //       </div>
     //     </div>
     //     <div>
     //       <p className="font-bold">Important Review</p>
     //       <p>
     //         Please review all information above. Once submitted, your profile will
     //         enter the verification queue.
     //       </p>
     //     </div>
     //   </div>
     // </div>
     return <></>
}
