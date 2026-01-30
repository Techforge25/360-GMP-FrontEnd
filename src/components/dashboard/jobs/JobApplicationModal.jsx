import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiX,
  FiCheck,
  FiFileText,
  FiUpload,
  FiArrowRight,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";
import { cn } from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";
import jobAPI from "@/services/jobAPI";

const STEP_FORM = 1;
const STEP_REVIEW = 2;
const STEP_SUCCESS = 3;

export default function JobApplicationModal({
  isOpen,
  onClose,
  jobTitle = "Job Title",
  jobId,
  onSubmit,
}) {
  const router = useRouter();
  const [step, setStep] = useState(STEP_FORM);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    resumeUrl: "",
    resumeName: "",
    portfolio: "",
    experience: "",
    urgentJoining: "",
    salaryExpectation: "",
  });

  // Placeholder user data for review step
  const userData = {
    fullName: "Alex Morgan",
    email: "info@gmail.com",
    about:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    city: "New York-USA",
    phone: "+1 289 7959631",
  };

  if (!isOpen) return null;

  const handleNext = () => {
    if (!formData.resumeUrl) {
      alert("Please upload a resume first.");
      return;
    }
    setStep(STEP_REVIEW);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        resumeUrl: formData.resumeUrl,
        portfolioLink: formData.portfolio,
        yearsOfExperience: Number(formData.experience),
        immediateJoiningStatus: formData.urgentJoining,
        expectedSalary: formData.salaryExpectation,
      };

      await jobAPI.apply(jobId, payload);

      if (onSubmit) {
        onSubmit(payload);
      }
      setStep(STEP_SUCCESS);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (file, onProgress) => {
    try {
      const url = await uploadToCloudinary(file, "resumes", onProgress);
      setFormData((prev) => ({
        ...prev,
        resumeUrl: url,
        resumeName: file.name,
      }));
      return url;
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  };

  const handleSuccessRedirect = () => {
    onClose();
    router.push("/dashboard/business/jobs");
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-base font-medium text-text-primary">
          Upload your resume
        </h3>
        {formData.resumeUrl ? (
          <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-md border border-green-100">
                <FiFileText className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">
                  {formData.resumeName}
                </p>
                <p className="text-sm text-text-secondary">
                  Uploaded Successfully
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  resumeUrl: "",
                  resumeName: "",
                }))
              }
              className="text-text-secondary hover:text-red-500"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <FileUpload
            label="Upload Document"
            subLabel="PDF, DOC, DOCX, JPG, PNG (Max 5MB)"
            onUpload={handleResumeUpload}
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium text-text-primary">
          Your Profolio Link
        </label>
        <Input
        className="text-black"
          placeholder=""
          value={formData.portfolio}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, portfolio: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium text-text-primary">
          How many year of experience
        </label>
        <Input
        className="text-black"
          placeholder="4"
          value={formData.experience}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, experience: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium text-text-primary">
          This is urgent role to fill can you join immediatley?
        </label>
        <Input
        className="text-black"
          placeholder="Yes"
          value={formData.urgentJoining}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, urgentJoining: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium text-text-primary">
          What is your salary expectation for this role?
        </label>
        <Input
        className="text-black"
          placeholder="$1000-1500"
          value={formData.salaryExpectation}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              salaryExpectation: e.target.value,
            }))
          }
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleNext}
          className="w-full sm:w-auto px-12 h-12 bg-[#2E1065] hover:bg-[#4c1d95] text-white rounded-lg flex items-center justify-center gap-2"
        >
          Continue <FiArrowRight />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      {/* General Information */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">
          General Information
        </h3>

        <div className="space-y-4 p-4 border border-border-light rounded-lg">
          <div>
            <p className="text-sm text-text-secondary mb-1">Full Name</p>
            <p className="text-base font-medium text-text-primary">
              {userData.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-1">Email Address</p>
            <p className="text-base font-medium text-text-primary">
              {userData.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-1">About</p>
            <p className="text-sm text-text-secondary leading-relaxed">
              {userData.about}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-text-secondary mb-1">City , State</p>
              <p className="text-base font-medium text-text-primary">
                {userData.city}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">Phone</p>
              <p className="text-base font-medium text-text-primary">
                {userData.phone}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Question */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">
          Employer Question
        </h3>
        <div className="space-y-4 p-4 border border-border-light rounded-lg">
          <div>
            <p className="text-sm text-text-secondary mb-1">
              How Many Year Of Experience
            </p>
            <p className="text-base font-medium text-text-primary">
              {formData.experience || "Not specified"}
            </p>
          </div>
          <hr className="border-border-light" />
          <div>
            <p className="text-sm text-text-secondary mb-1">
              This Is Urgent Role To Fill Can You Join Immediatley?
            </p>
            <p className="text-base font-medium text-text-primary">
              {formData.urgentJoining || "Not specified"}
            </p>
          </div>
          <hr className="border-border-light" />
          <div>
            <p className="text-sm text-text-secondary mb-1">
              What Is Your Salary Expectation For This Role?
            </p>
            <p className="text-base font-medium text-text-primary">
              {formData.salaryExpectation || "Not specified"}
            </p>
          </div>
        </div>
      </section>

      {/* Resume */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">Your Resume</h3>
        <div className="p-4 border border-border-light rounded-lg flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <FiFileText size={24} className="text-text-secondary" />
          </div>
          <div>
            <p className="text-base font-medium text-text-primary">
              {formData.resumeName || "My Cv.Pdf"}
            </p>
            <p className="text-sm text-text-secondary">Uploaded Today</p>
          </div>
        </div>
      </section>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-auto px-12 h-12 bg-[#2E1065] hover:bg-[#4c1d95] text-white rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              Submit your application <FiArrowRight />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderStepSuccess = () => (
    <div className="flex flex-col items-center justify-center py-10 px-4 animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center shadow-md">
          <FiCheck className="text-white w-8 h-8" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
        Your Application Has Been
        <br />
        Submitted!
      </h2>

      <div className="border border-border-light rounded-xl p-6 mb-8 w-full max-w-sm text-center">
        <p className="text-text-secondary">
          As You Will Get Email Confirmation As
        </p>
        <p className="text-[#2E1065] font-medium mt-1">{userData.email}</p>
      </div>

      <Button
        onClick={handleSuccessRedirect}
        className="w-full max-w-sm h-12 bg-[#2E1065] hover:bg-[#4c1d95] text-white rounded-lg"
      >
        Return To Job Search
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide flex flex-col">
        {/* Header */}
        {step !== STEP_SUCCESS && (
          <div className="flex items-center justify-between p-6 border-b border-border-light sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold text-text-primary">
              {step === STEP_FORM ? "Apply Now" : "Review Your Application"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary"
            >
              <FiX size={24} />
            </button>
          </div>
        )}

        {step === STEP_REVIEW && (
          <div className="px-6 py-2 bg-blue-50/50 border-b border-blue-100">
            <p className="text-sm text-text-secondary">
              you will not be able to make changes after you submit application
            </p>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {step === STEP_FORM && renderStep1()}
          {step === STEP_REVIEW && renderStep2()}
          {step === STEP_SUCCESS && renderStepSuccess()}
        </div>
      </div>
    </div>
  );
}
