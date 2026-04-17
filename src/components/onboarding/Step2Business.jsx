export default function Step2({ formData, handleChange, setIsUploading, phoneError }) {
     const [currentCertName, setCurrentCertName] = useState("");
     const [isCustomCert, setIsCustomCert] = useState(false);
     const [previewCert, setPreviewCert] = useState(null);

     const predefinedCerts = [
          "ISO 9001",
          "CE Certified",
          "TUV SUD",
          "FDA Approved",
          "Ethical Sourcing",
     ];

     return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
               <div>
                    <h3 className="text-lg font-semibold mb-4">Company Location</h3>

                    {/* Location Search */}
                    <div className="space-y-2 mb-6">
                         <label className="text-base font-medium">
                              Search Location <span className="text-red-500">*</span>
                         </label>
                         <LocationSearch
                              placeholder="Search for your business location..."
                              onLocationSelect={(locationData) => {
                                   handleChange("country", locationData.country);
                                   handleChange("city", locationData.city);
                                   handleChange("address", locationData.address);
                              }}
                         />
                         <p className="text-sm text-text-secondary">
                              Search and select your location, then edit the fields below if
                              needed
                         </p>
                    </div>

                    {/* Manual Input Fields */}
                    <div className="grid md:grid-cols-3 gap-6">
                         <div className="space-y-2">
                              <label className="text-base font-medium">
                                   Country <span className="text-red-500">*</span>
                              </label>
                              <Input
                                   placeholder="Country"
                                   value={formData.country || ""}
                                   onChange={(e) => handleChange("country", e.target.value)}
                                   required
                              />
                         </div>
                         <div className="space-y-2">
                              <label className="text-base font-medium">
                                   City <span className="text-red-500">*</span>
                              </label>
                              <Input
                                   placeholder="Ottawa"
                                   value={formData.city || ""}
                                   onChange={(e) => handleChange("city", e.target.value)}
                                   required
                              />
                         </div>
                         <div className="space-y-2">
                              <label className="text-base font-medium">
                                   Address Line <span className="text-red-500">*</span>
                              </label>
                              <Input
                                   placeholder="street address"
                                   value={formData.address || ""}
                                   onChange={(e) => handleChange("address", e.target.value)}
                                   required
                              />
                         </div>
                    </div>
               </div>

               <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Compliance & Certification</h3>

                    <div className="bg-gray-50 border border-border-light rounded-xl p-6 space-y-6">
                         <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                   <label className="text-sm font-semibold text-text-primary">
                                        Select or Enter Certificate Name
                                   </label>
                                   {!isCustomCert ? (
                                        <div className="relative">
                                             <select
                                                  className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                                                  value={currentCertName}
                                                  onChange={(e) => {
                                                       if (e.target.value === "Other") {
                                                            setIsCustomCert(true);
                                                            setCurrentCertName("");
                                                       } else {
                                                            setCurrentCertName(e.target.value);
                                                       }
                                                  }}
                                             >
                                                  <option value="">Select Certificate</option>
                                                  {predefinedCerts.map((cert) => (
                                                       <option key={cert} value={cert}>
                                                            {cert}
                                                       </option>
                                                  ))}
                                                  <option value="Other">Other (Custom)</option>
                                             </select>
                                             <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
                                        </div>
                                   ) : (
                                        <div className="flex gap-2">
                                             <Input
                                                  placeholder="Enter custom certificate name"
                                                  value={currentCertName}
                                                  onChange={(e) => setCurrentCertName(e.target.value)}
                                                  className="flex-1"
                                             />
                                             <Button
                                                  type="button"
                                                  variant="outline"
                                                  onClick={() => {
                                                       setIsCustomCert(false);
                                                       setCurrentCertName("");
                                                  }}
                                                  className="shrink-0"
                                             >
                                                  Cancel
                                             </Button>
                                        </div>
                                   )}
                              </div>

                              <div className="space-y-3">
                                   <label className="text-sm font-semibold text-text-primary">
                                        {currentCertName
                                             ? `Upload for ${currentCertName}`
                                             : "Upload Document"}
                                   </label>
                                   <FileUpload
                                        label="Upload Document"
                                        subLabel="JPG, PNG, PDF (Max 5MB)"
                                        disabled={
                                             !currentCertName ||
                                             (formData.certifications || []).length >= 3
                                        }
                                        onUploadingChange={setIsUploading}
                                        onUpload={(file, onProgress) => {
                                             if (!currentCertName) {
                                                  alert("Please select or enter a certificate name first");
                                                  return Promise.reject("No name");
                                             }
                                             return uploadToCloudinary(
                                                  file,
                                                  "business/certifications",
                                                  onProgress,
                                             ).then((url) => {
                                                  handleAddCert(currentCertName, url);
                                                  return url;
                                             });
                                        }}
                                   />
                              </div>
                         </div>

                         <p className="text-sm text-text-secondary italic">
                              * Select a certificate name first, then upload the corresponding
                              image. You can add up to 3 certifications.
                         </p>
                    </div>

                    {/* List of Added Certificates */}
                    <div className="space-y-3">
                         <div className="flex justify-between items-center">
                              <h4 className="text-base font-semibold">Added Certifications</h4>
                              <span className="text-sm text-text-secondary">
                                   {(formData.certifications || []).length} / 3
                              </span>
                         </div>

                         {(formData.certifications || []).length === 0 ? (
                              <div className="text-center py-8 border border-dashed border-border-light rounded-xl bg-gray-50/50">
                                   <p className="text-sm text-text-secondary">
                                        No certifications added yet.
                                   </p>
                              </div>
                         ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                   {formData.certifications.map((cert, index) => {
                                        const isPDF = cert.url?.toLowerCase().endsWith(".pdf");

                                        return (
                                             <div
                                                  key={index}
                                                  className="relative group p-4 border border-border-light rounded-xl bg-white hover:border-brand-primary/30 transition-all shadow-sm"
                                             >
                                                  <div
                                                       className="relative aspect-video w-full border border-gray-100 rounded-lg overflow-hidden bg-gray-50 mb-3 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                                                       onClick={() => setPreviewCert(cert)}
                                                  >
                                                       {isPDF ? (
                                                            <div className="text-center p-4">
                                                                 <div className="text-5xl mb-2">📄</div>
                                                                 <p className="text-sm text-text-secondary truncate px-2">
                                                                      {cert.name}.pdf
                                                                 </p>
                                                            </div>
                                                       ) : (
                                                            <Image
                                                                 src={cert.url}
                                                                 alt={cert.name}
                                                                 fill
                                                                 className="object-contain p-2"
                                                            />
                                                       )}
                                                  </div>
                                                  <div className="flex flex-col gap-2">
                                                       <span
                                                            className="text-sm font-medium text-text-primary truncate"
                                                            title={cert.name}
                                                       >
                                                            {cert.name}
                                                       </span>
                                                       <div className="flex gap-2">
                                                            <button
                                                                 type="button"
                                                                 onClick={() => setPreviewCert(cert)}
                                                                 className="text-sm font-semibold text-brand-primary hover:text-brand-primary/80 flex items-center gap-1 transition-colors flex-1"
                                                            >
                                                                 View Certificate
                                                            </button>
                                                            <button
                                                                 type="button"
                                                                 onClick={() => {
                                                                      const updated = formData.certifications.filter(
                                                                           (_, i) => i !== index,
                                                                      );
                                                                      handleChange("certifications", updated);
                                                                 }}
                                                                 className="text-sm font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                                                            >
                                                                 Remove
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        );
                                   })}
                              </div>
                         )}
                    </div>
               </div>

               <div>
                    <h3 className="text-lg font-semibold mb-4">Primary B2B Contact</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                              <label className="text-base font-medium">
                                   Contact Person Name <span className="text-red-500">*</span>
                              </label>
                              <Input
                                   value={formData.contactName || ""}
                                   onChange={(e) => handleChange("contactName", e.target.value)}
                                   required
                              />
                         </div>
                         <div className="space-y-2">
                              <label className="text-base font-medium">
                                   Title <span className="text-red-500">*</span>
                              </label>
                              <Input
                                   value={formData.contactTitle || ""}
                                   onChange={(e) => handleChange("contactTitle", e.target.value)}
                                   required
                              />
                         </div>
                         <div className="space-y-2">
                              <label className="text-base font-medium">
                                   Phone <span className="text-red-500">*</span>
                              </label>
                              <PhoneInputWithCountry
                                   value={formData.contactPhone || ""}
                                   onChange={(value) => handleChange("contactPhone", value)}
                                   required
                              />
                              {phoneError && (
                                   <p className="text-sm text-red-500 mt-1 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                                        {phoneError}
                                   </p>
                              )}
                         </div>
                         <div className="space-y-2">
                              <label className="text-base font-medium">
                                   Support Email <span className="text-red-500">*</span>
                              </label>
                              <Input
                                   value={formData.contactEmail || ""}
                                   onChange={(e) => handleChange("contactEmail", e.target.value)}
                                   required
                              />
                         </div>
                    </div>
               </div>

               {/* Certificate Preview Modal */}
               {previewCert && (
                    <div
                         className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                         onClick={() => setPreviewCert(null)}
                    >
                         <div
                              className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                              onClick={(e) => e.stopPropagation()}
                         >
                              <div className="sticky top-0 bg-white border-b border-border-light p-4 flex justify-between items-center z-10">
                                   <h3 className="text-lg font-semibold">{previewCert.name}</h3>
                                   <div className="flex items-center gap-3">
                                        <button
                                             type="button"
                                             onClick={() => setPreviewCert(null)}
                                             className="text-2xl text-text-secondary hover:text-text-primary transition-colors"
                                        >
                                             ×
                                        </button>
                                   </div>
                              </div>
                              <div className="p-6">
                                   {previewCert.url?.toLowerCase().endsWith(".pdf") ? (
                                        <PDFViewer url={previewCert.url} fileName={previewCert.name} />
                                   ) : (
                                        <div className="relative w-full min-h-[400px]">
                                             <Image
                                                  src={previewCert.url}
                                                  alt={previewCert.name}
                                                  width={800}
                                                  height={600}
                                                  className="w-full h-auto object-contain"
                                             />
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
};