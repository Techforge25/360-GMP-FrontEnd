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
    .transform((value) => (value === "" ? null : value)),

  city: Yup.string()
    .matches(locationPattern, "Invalid city format")
    .trim()
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});

// Main schema
export const createJobSchema = Yup.object().shape({
  jobTitle: Yup.string()
    .matches(
      jobTitlePattern,
      "Job title can only contain letters, numbers, spaces, hyphens, and parentheses",
    )
    .required("Job title is required")
    .trim(),

  jobCategory: Yup.string()
    .matches(alphaNumericPattern, "Invalid job category")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  customCategory: Yup.string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .when("jobCategory", {
      is: "Other",
      then: (schema) =>
        schema
          .required("Custom category is required")
          .matches(alphaNumericPattern, "Invalid category"),
      otherwise: (schema) => schema.notRequired(),
    }),

  employmentType: Yup.string()
    .matches(alphaNumericPattern, "Invalid employment type")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  experienceLevel: Yup.string()
    .matches(alphaNumericPattern, "Invalid experience level")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  description: Yup.string()
    .max(5000, "Description cannot exceed 5000 characters")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  salaryMin: Yup.number()
    .min(0, "Minimum salary must be at least 0")
    .nullable(),

  salaryMax: Yup.number()
    .min(0, "Maximum salary must be at least 0")
    .nullable()
    .moreThan(
      Yup.ref("salaryMin"),
      "Maximum salary must be greater than minimum salary",
    ),

    period: Yup.string().matches(alphaNumericPattern, "Invalid employment type")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  postingDuration: Yup.string().required("Posting duration is required"),

  location: jobLocationSchema.nullable(),

  status: Yup.string()
    .matches(alphaNumericPattern, "Invalid status")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
});
