"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { useStepper } from "@/hooks/useStepper";
import { SuccessModal } from "@/components/ui/SuccessModal";
import {
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import api from "@/lib/axios";
import { useUserRole } from "@/context/UserContext";
import { completeOnboardingSession } from "@/lib/auth/session";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBusinessProfileSchema } from "@/validations/business-onboarding";
import Step1 from "@/components/onboarding/Step1Business";
import BusinessProfileStep2 from "@/features/onboarding/business/components/BusinessProfileStep2";
import Step3 from "@/components/onboarding/Step3Business";
import { stepsOnboarding } from "@/constants/index";

export default function BusinessProfilePage() {
  const { currentStep, nextStep, prevStep } = useStepper(1, stepsOnboarding.length);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [allData, setData] = useState(null)
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(createBusinessProfileSchema),
    mode: "all",
    defaultValues: {
      ownerName: "",
      identificationOfBusinessOwner: "",
      companyName: "",
      tradeName: "",
      businessType: "",
      companySize: "",
      foundedDate: null,
      primaryIndustry: "",
      operationHour: "",
      countryOfRegistration: "",
      businessRegistrationNumber: "",
      taxIdentificationNumber: "",
      dunsNumber: "",
      incoterms: "",
      complianceScreeningStatus: false,
      location: {
        country: "",
        city: "",
        addressLine: "",
        warehouseAddress: "",
        additionalWarehouseAddress: "",
        mandatoryPickupAddress: "",
        businessRegistrationAddress: "",
        internationalOffices: []
      },
      shipping: {
        capabilities: [],
        exportExperience: false
      },
      executiveLeadership: [],
      stakeholderDisclosure: [],
      regionOfOperations: [],
      productionCapacity: "",
      tradeAffiliations: [],
      annualRevenueRange: "",
      auditingAgency: "",
      certificateOfIncorporation: "",
      taxRegistrationCertificate: "",
      standardProductDimensions: {
        length: 0,
        width: 0,
        height: 0,
        weight: 0
      },
      certifications: [],
      b2bContact: {
        name: "",
        title: "",
        phone: "",
        supportEmail: ""
      },
      logo: "",
      banner: "",
      website: "",
      description: ""
    }
  });
  const [createdProfile, setCreatedProfile] = useState(null);
  const [newToken, setNewToken] = useState(null);
  const { login } = useUserRole();
  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data, "datas")
    setData(data)
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post({
        url: "/businessProfile",
        payload: data,
      });

      if (!response.success) {
        setError(response.message || "Signup failed");
        return;
      }

      if (response.data) {
        setCreatedProfile(response.data);
      }

      const token =
        response.accessToken ||
        response.token ||
        response.data?.accessToken ||
        response.data?.token;

      if (token) {
        setNewToken(token);
      }

      setIsSuccessModalOpen(true);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const currentData = getValues();
    setData(currentData);
    if (currentStep < stepsOnboarding.length) {
      nextStep();
    }
  };


  const handleSuccessNext = async () => {
    await completeOnboardingSession({
      role: "business",
      createdProfile,
      newToken,
      login,
    });
  };

  const handleBack = () => {
    const changed = prevStep();
    console.log(changed, "changed")
    if (!changed) {
      router.push("/onboarding/plans");
    }
  };

  useEffect(() => {
    if (currentStep === 3) {
      trigger();
    }
  }, [currentStep]);

  const className = "flex h-10 w-full rounded-md border border-border-light bg-surface px-3 py-2 text-base ring-offset-surface file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-text-hint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

  return (
    <div className="min-h-screen">
      <form
        onSubmit={handleSubmit((data) => {
          if (currentStep === stepsOnboarding.length) {
            onSubmit(data);
          } else {
            nextStep();
          }
        })}
      >
        <Card className="w-full sm:w-3xl lg:w-5xl max-w-5xl mx-auto mt-16 md:mt-10 flex-shrink-0 bg-white shadow-xl min-h-[800px]">
          <div className="p-8 pb-0">
            <h1 className="text-2xl font-bold text-center mb-8">
              Business Profile Creation
            </h1>
            <Stepper currentStep={currentStep} steps={stepsOnboarding} />
          </div>

          <CardContent className="p-8 pt-4">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-base text-center">
                {error}
              </div>
            )}
            {currentStep === 1 && (
              <Step1 register={register} control={control} errors={errors} className={className} />
            )}
            {currentStep === 2 && (
              <BusinessProfileStep2
                register={register}
                control={control}
                errors={errors}
                className={className}
                setValue={setValue}
                getValues={getValues}
              />
            )}
            {currentStep === 3 && <Step3 data={allData} />}
          </CardContent>

          <div className="p-8 border-t border-border-light flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-text-secondary hover:text-brand-primary font-medium"
            >
              <FiArrowLeft /> Back
            </button>

            <div className="flex gap-4">
              {currentStep !== stepsOnboarding.length && (
                <Button
                  type="button"
                  onClick={handleNext}
                  isLoading={isUploading}
                  disabled={isUploading}
                >
                  Next
                  <FiArrowRight className="ml-2" />
                </Button>
              )}

              {currentStep === stepsOnboarding.length && (
                <Button
                  type="submit"
                  isLoading={isLoading || isUploading}
                  disabled={isUploading || !isValid}
                >
                  Submit Profile For Verification
                  <FiArrowRight className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        <SuccessModal
          isOpen={isSuccessModalOpen}
          title="Profile Complete!"
          description="Your Business Profile Has Been Successfully Saved. Waiting for admin approval (to be done in next phase) till then you can explore the login the account without approval."
          onNext={handleSuccessNext}
          isValid={isValid}
        />
      </form>
    </div >
  );
}
