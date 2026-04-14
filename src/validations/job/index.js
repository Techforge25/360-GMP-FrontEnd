import * as Yup from "yup";
const alphaNumericPattern = /^[a-zA-Z0-9 -]*$/;
const locationPattern = /^[a-zA-Z0-9 -,]*$/;
const jobTitlePattern = /^[a-zA-Z0-9 \-()]*$/;

// Location schema
const jobLocationSchema = Yup.object().shape({
  country: Yup.string()
    .matches(locationPattern, "Invalid country format")
    .trim()
    .nullable()
    .transform(value => (value === "" ? null : value)),

  city: Yup.string()
    .matches(locationPattern, "Invalid city format")
    .trim()
    .nullable()
    .transform(value => (value === "" ? null : value)),
});

// Main schema
export const createJobSchema = Yup.object().shape({
  businessId: Yup.string()
    .required("Business ID is required")
    .trim(),

  jobTitle: Yup.string()
    .matches(
      jobTitlePattern,
      "Job title can only contain letters, numbers, spaces, hyphens, and parentheses"
    )
    .required("Job title is required")
    .trim(),

  jobCategory: Yup.string()
    .matches(alphaNumericPattern, "Invalid job category")
    .nullable()
    .transform(value => (value === "" ? null : value)),

  employmentType: Yup.string()
    .matches(alphaNumericPattern, "Invalid employment type")
    .nullable()
    .transform(value => (value === "" ? null : value)),

  experienceLevel: Yup.string()
    .matches(alphaNumericPattern, "Invalid experience level")
    .nullable()
    .transform(value => (value === "" ? null : value)),

  description: Yup.string()
    .max(5000, "Description cannot exceed 5000 characters")
    .nullable()
    .transform(value => (value === "" ? null : value)),

  salaryMin: Yup.number()
    .min(0, "Minimum salary must be at least 0")
    .nullable(),

  salaryMax: Yup.number()
    .min(0, "Maximum salary must be at least 0")
    .nullable()
    .moreThan(Yup.ref("salaryMin"), "Maximum salary must be greater than minimum salary"),

  location: jobLocationSchema.nullable(),

  status: Yup.string()
    .matches(alphaNumericPattern, "Invalid status")
    .nullable()
    .transform(value => (value === "" ? null : value)),
});


export const createJobApplicationSchema = Yup.object({
  resumeUrl: Yup.string()
    .trim()
    .url("Resume must be a valid URL")
    .required("Resume is required"),

  portfolioLink: Yup.string()
    .trim()
    .nullable()
    .notRequired()
    .url("Portfolio link must be a valid URL"),

  yearsOfExperience: Yup.number()
    .min(0, "Years of experience must be 0 or more")
    .nullable()
    .notRequired(),

  immediateJoiningStatus: Yup.string()
    .oneOf(["Yes", "No"], "Invalid value")
    .nullable()
    .notRequired(),

  expectedSalary: Yup.number()
    .integer("Salary must be an integer")
    .positive("Salary must be positive")
    .nullable()
    .notRequired(),
});