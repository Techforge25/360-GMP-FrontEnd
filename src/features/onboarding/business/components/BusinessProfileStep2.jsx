"use client";
import { Button } from "@/components/ui/Button";
import { useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { SHIPPING_OPTIONS } from "@/constants/index";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { UploadField } from "@/components/ui/UploadField";
export default function BusinessProfileStep2({
  register,
  control,
  errors,
  watch,
  className,
  setValue,
  getValues
}) {
  const REGIONS = ["North America", "Europe", "Middle East", "Asia"];
  const logo = watch("logo")
  const [uploading, setUploading] = useState(null);
  const banner = watch("banner")
  const taxCertificate = watch("taxRegistrationCertificate")
  const {
    fields: leadershipFields,
    append: addLeader,
    remove: removeLeader
  } = useFieldArray({
    control,
    name: "executiveLeadership"
  });

  const {
    fields: officeFields,
    append: addOffice,
    remove: removeOffice
  } = useFieldArray({
    control,
    name: "location.internationalOffices"
  });

  const {
    fields: stakeholderFields,
    append: addStakeholder,
    remove: removeStakeholder
  } = useFieldArray({
    control,
    name: "stakeholderDisclosure"
  });

  const {
    fields: tradeFields,
    append: addTrade,
    remove: removeTrade
  } = useFieldArray({
    control,
    name: "tradeAffiliations"
  });

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-lg font-bold">B2B Contact Details</h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Name */}
          <div className="space-y-2">
            <label className="text-base font-medium">
              Contact Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("b2bContact.name")}
              placeholder="Sarah Thompson"
              className={className}
            />
            {errors?.b2bContact?.name && (
              <p className="text-red-500">
                {errors?.b2bContact?.name?.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-base font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              {...register("b2bContact.title")}
              placeholder="International Sales Manager"
              className={className}
            />
            {errors?.b2bContact?.title && (
              <p className="text-red-500">
                {errors.b2bContact.title.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-base font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              {...register("b2bContact.phone")}
              placeholder="+14155552671"
              className={className}
            />
            {errors?.b2bContact?.phone && (
              <p className="text-red-500">
                {errors.b2bContact.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-base font-medium">
              Support Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("b2bContact.supportEmail")}
              placeholder="sales@company.com"
              className={className}
            />
            {errors?.b2bContact?.supportEmail && (
              <p className="text-red-500">
                {errors.b2bContact.supportEmail.message}
              </p>
            )}
          </div>

        </div>
      </div>


      <div className="space-y-2">
        <label className="font-bold">Region of Operations</label>
        <div className="flex items-center justify-between">
          {REGIONS.map((region) => (
            <label key={region} className="flex gap-2">
              <input
                type="checkbox"
                value={region}
                {...register("regionOfOperations")}
              />
              {region}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold">Stakeholders</h2>
        {stakeholderFields.map((field, index) => (
          <>
            <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
              <input
                {...register(`stakeholderDisclosure.${index}.name`)}
                placeholder="Name"
                className={className}
              />

              <input
                type="number"
                {...register(`stakeholderDisclosure.${index}.ownershipPercentage`)}
                placeholder="Ownership %"
                className={className}
              />
              <button type="button" onClick={() => removeStakeholder(index)}>
                ❌ Remove
              </button>
            </div>
            {errors?.stakeholderDisclosure?.[index]?.name && (
              <p className="text-red-500">
                {errors?.stakeholderDisclosure[index]?.name?.message}
              </p>
            )}

            {errors?.stakeholderDisclosure?.[index]?.ownershipPercentage && (
              <p className="text-red-500">
                {errors?.stakeholderDisclosure[index]?.ownershipPercentage?.message}
              </p>
            )}
          </>
        ))}

        {errors?.stakeholderDisclosure?.length > 0 && (
          <>
            {errors?.stakeholderDisclosure?.map((err) => {
              <p className="text-red-500">{err?.ownershipPercentage?.message}</p>
            })}
          </>
        )}

        <Button
          type="button"
          onClick={() => addStakeholder({ name: "", ownershipPercentage: 0 })}
        >
          + Add Stakeholder
        </Button>
      </div>

      <div className="space-y-2">
        <label className="font-bold">Executive Leadership</label>

        <div className="grid md:grid-cols-2 gap-4">
          {leadershipFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`executiveLeadership.${index}`)}
                placeholder="e.g. John Doe - CEO"
                className={className}
              />
              {errors?.executiveLeadership?.[index] && (
                <p className="text-red-500 text-xs">
                  {errors?.executiveLeadership[index]?.message}
                </p>
              )}
              <button type="button" onClick={() => removeLeader(index)}>
                ❌
              </button>
            </div>
          ))}
        </div>

        <Button type="button" onClick={() => addLeader("")}>
          + Add Leadership
        </Button>
      </div>

      <div className="space-y-4">
        <label className="font-bold">Trade Affiliations</label>

        <div className="grid md:grid-cols-2 gap-4">
          {tradeFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`tradeAffiliations.${index}`)}
                placeholder="e.g. Trade Association"
                className={className}
              />
              {errors?.tradeAffiliations?.[index] && (
                <p className="text-red-500 text-xs">
                  {errors?.tradeAffiliations[index]?.message}
                </p>
              )}
              <button type="button" onClick={() => removeTrade(index)}>
                ❌
              </button>
            </div>
          ))}
        </div>

        <Button type="button" onClick={() => addTrade("")}>
          + Add Affiliation
        </Button>
      </div>

      <div className="space-y-2">
        <label className="font-bold">International Offices</label>
        <div className="grid md:grid-cols-2 gap-4">
          {officeFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`location.internationalOffices.${index}`)}
                placeholder="e.g. Berlin, Germany"
                className={className}
              />
              <button type="button" onClick={() => removeOffice(index)}>
                ❌
              </button>
            </div>
          ))}
        </div>

        <Button type="button" onClick={() => addOffice("")}>
          + Add Office
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-lg">Location Details</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <input
              {...register("location.country")}
              placeholder="Country"
              className={className}
            />
            {errors?.location?.country && (
              <p className="text-red-500">{errors?.location?.country?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("location.city")}
              placeholder="City"
              className={className}
            />
            {errors?.location?.city && (
              <p className="text-red-500">{errors?.location?.city?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("location.addressLine")}
              placeholder="Address Line"
              className={className}
            />
            {errors?.location?.addressLine && (
              <p className="text-red-500">{errors?.location?.addressLine?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("location.warehouseAddress")}
              placeholder="Warehouse Address"
              className={className}
            />
            {errors?.location?.warehouseAddress && (
              <p className="text-red-500">{errors?.location?.warehouseAddress?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("location.additionalWarehouseAddress")}
              placeholder="Additional Warehouse Address"
              className={className}
            />
            {errors?.location?.additionalWarehouseAddress && (
              <p className="text-red-500">{errors?.location?.additionalWarehouseAddress?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("location.mandatoryPickupAddress")}
              placeholder="Mandatory Pickup Address"
              className={className}
            />
            {errors?.location?.mandatoryPickupAddress && (
              <p className="text-red-500">{errors?.location?.mandatoryPickupAddress?.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              {...register("location.businessRegistrationAddress")}
              placeholder="Business Registration Address"
              className={className}
            />
            {errors?.location?.businessRegistrationAddress && (
              <p className="text-red-500">{errors?.location?.businessRegistrationAddress?.message}</p>
            )}
          </div>
        </div>
      </div>
      {/* ================= INTERNATIONAL OFFICES ================= */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Shipping Details</h2>

        {/* Capabilities */}
        <div className="space-y-2">
          <div className="grid md:grid-cols-2 gap-2">
            {SHIPPING_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register("shipping.capabilities")}
                />
                {option}
              </label>
            ))}
          </div>

          {errors?.shipping?.capabilities && (
            <p className="text-red-500">
              {errors?.shipping?.capabilities?.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <UploadField
          label="Business Logo"
          value={logo}
          loading={uploading === "logo"}
          onUpload={async (file) => {
            try {
              setUploading("logo");
              const url = await uploadToCloudinary(file, "logos");
              setValue("logo", url);
            } catch (err) {
              console.error(err);
            } finally {
              setUploading(null);
            }
          }}
          onRemove={() => setValue("logo", null)}
        />

        {errors?.logo && (
          <p className="text-red-500">{errors.logo.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="font-semibold">Certifications</label>

        <input
          type="file"
          multiple
          accept="image/*,application/pdf"
          disabled={watch("certifications").length === 3}
          className="hidden"
          id="cert-upload"
          onChange={async (e) => {
            const files = Array.from(e.target.files);
            const urls = [];

            setUploading("certifications");

            for (const file of files) {
              try {
                const url = await uploadToCloudinary(file, "certifications");
                urls.push(url);
              } catch (err) {
                console.error(err);
              }
            }

            setValue("certifications", [
              ...(getValues("certifications") || []),
              ...urls,
            ]);

            setUploading(null);
          }}
        />

        <label
          htmlFor="cert-upload"
          className="border-2 border-dashed p-6 rounded-xl flex justify-center cursor-pointer"
        >
          {uploading === "certifications" ? "Uploading..." : "Upload Certifications"}
        </label>

        <div className="grid grid-cols-3 gap-3 mt-3">
          {(watch("certifications") || []).map((url, i) => {
            const isPDF = url.toLowerCase().endsWith(".pdf");

            return (
              <div key={i} className="relative bg-gray-50 rounded overflow-hidden">

                {/* Preview */}
                {isPDF ? (
                  <iframe
                    src={url}
                    className="h-20 w-full"
                    title={`pdf-${i}`}
                  />
                ) : (
                  <img
                    src={url}
                    className="h-20 w-full object-cover"
                  />
                )}

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => {
                    const updated = watch("certifications").filter((_, idx) => idx !== i);
                    setValue("certifications", updated);
                  }}
                  className="absolute top-1 right-1 bg-white p-1 rounded shadow"
                >
                  ❌
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <UploadField
          label="Banner"
          value={banner}
          loading={uploading === "banner"}
          onUpload={async (file) => {
            try {
              setUploading("banner");
              const url = await uploadToCloudinary(file, "banners");
              setValue("banner", url);
            } catch (err) {
              console.error(err);
            } finally {
              setUploading(null);
            }
          }}
          onRemove={() => setValue("banner", null)}
        />

        {errors?.banner && (
          <p className="text-red-500">{errors?.banner?.message}</p>
        )}
      </div>


      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <UploadField
            label="Certificate of Incorporation"
            isImage={false}
            value={watch("certificateOfIncorporation")}
            loading={uploading === "incorporation"}
            onUpload={async (file) => {
              try {
                setUploading("incorporation");
                const url = await uploadToCloudinary(file, "certificates");
                setValue("certificateOfIncorporation", url);
              } catch (err) {
                console.error(err);
              } finally {
                setUploading(null);
              }
            }}
            onRemove={() => setValue("certificateOfIncorporation", null)}
          />
          {errors?.certificateOfIncorporation && (
            <p className="text-red-500">{errors?.certificateOfIncorporation?.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <UploadField
            label="Tax Registration Certificate"
            value={taxCertificate}
            isImage={false}
            loading={uploading === "tax"}
            onUpload={async (file) => {
              try {
                setUploading("tax");
                const url = await uploadToCloudinary(file, "tax_certificates");
                setValue("taxRegistrationCertificate", url, {
                  shouldValidate: true,
                });
              } catch (err) {
                console.error(err);
              } finally {
                setUploading(null);
              }
            }}
            onRemove={() => setValue("taxRegistrationCertificate", null)}
          />
          {errors?.taxRegistrationCertificate && (
            <p className="text-red-500">{errors?.taxRegistrationCertificate?.message}</p>
          )}
        </div>

      </div>
    </div>
  );
}