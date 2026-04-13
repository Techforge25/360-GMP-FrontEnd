import * as Yup from "yup";

const alphaNumericPattern = /^[a-zA-Z0-9 -]*$/;

export const updateAlbums = Yup.object({
     // Basic Info
     albumName: Yup.string()
          .min(3, "Title must be at least 3 characters")
          .max(200, "Title cannot exceed 200 characters")
          .required("Title is required")
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     description: Yup.string()
          .max(5000, "Description cannot exceed 5000 characters")
          .nullable()
          .trim(),
});