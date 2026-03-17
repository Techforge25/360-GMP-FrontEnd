import { object, string, optional, boolean, array, number } from "yup";

export const checkoutSchema = object({
     fullName: string()
          .trim()
          .min(3, "Full name must be at least 3 characters")
          .max(40, "Full name must be at most 40 characters")
          .matches(/^[A-Za-z\s]+$/, "Full name can only contain letters and spaces")
          .required("Full name is required"),

     phone1: string()
          .trim()
          .matches(
               /^\+?[1-9]\d{9,14}$/,
               "Phone number must be a valid international format (e.g., +923001234567)"
          )
          .required("Phone is required"),

     lineAddress1: string()
          .trim()
          .min(10, "Address must be at least 10 characters")
          .max(500, "Address is too long")
          .required("Address Line 1 is required"),

     lineAddress2: string()
          .trim()
          .min(10, "Address must be at least 10 characters")
          .max(500, "Address is too long")
          .nullable(),

     state: string()
          .trim()
          .max(50, "State/Province is too long")
          .required("State/Province is required"),

     zipCode: string()
          .trim()
          .max(30, "Postal code too long")
          .required("Postal code is required"),

     isDefault: boolean(),

     items: array()
          .of(
               object({
                    productId: string()
                         .trim()
                         .required("Product ID is required"),

                    quantity: number()
                         .min(1, "Quantity must be at least 1")
                         .required("Quantity is required"),
               })
          )
          .optional(),
});