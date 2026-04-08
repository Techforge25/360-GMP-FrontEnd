import * as Yup from "yup";

const alphaNumericPattern = /^[a-zA-Z0-9 -]*$/;
const addressPattern = /^[a-zA-Z0-9 -,]*$/;

export const createCommunitySchema = Yup.object({
     name: Yup.string()
          .matches(
               alphaNumericPattern,
               "Community name can only contain letters, numbers, spaces, and hyphens"
          )
          .min(3, "Community name must be at least 3 characters long")
          .max(100, "Community name must not exceed 100 characters")
          .required("Community name is required")
          .trim(),

     category: Yup.string()
          .matches(alphaNumericPattern, "Invalid category format")
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .trim(),

     type: Yup.string()
          .oneOf(["public", "private", "featured"], "Community type must be one of: public, private, featured")
          .default("public"),

     description: Yup.string()
          .max(1000, "Description must not exceed 1000 characters")
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .trim(),

     purpose: Yup.string()
          .max(2000, "Purpose must not exceed 2000 characters")
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .trim(),

     tags: Yup.array()
          .of(
               Yup.string()
                    .matches(alphaNumericPattern, "Tags can only contain letters, numbers, spaces, and hyphens")
                    .trim()
          )
          .default([]),

     rules: Yup.string()
          .max(2000, "Rules must not exceed 2000 characters")
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .trim(),

     coverImage: Yup.string()
          .url("Cover image must be a valid URL")
          .optional()
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .trim(),

     profileImage: Yup.string()
          .url("Community image must be a valid URL")
          .optional()
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .trim(),

     industry: Yup.string()
          .matches(alphaNumericPattern, "Invalid industry format")
          .nullable()
          .transform((value) => (value === "" ? null : value)),

     region: Yup.string()
          .matches(addressPattern, "Invalid region format")
          .nullable()
          .transform((value) => (value === "" ? null : value)),
});