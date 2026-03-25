import * as Yup from "yup";

const noPlusMinusPattern = /^[^+-]*$/; // regex to disallow + or - anywhere

export const createProductSchema = Yup.object({
     title: Yup.string()
          .trim()
          .min(3, "Product title must be at least 3 characters")
          .max(150, "Product title must be at most 150 characters")
          .required("Product title is required"),

     image: Yup.string()
          .url("Main image must be a valid URL")
          .required("Main image is required"),

     groupImages: Yup.array()
          .of(Yup.string().url("Each group image must be a valid URL"))
          .max(3, "Maximum 3 group images allowed")
          .nullable(),

     detail: Yup.string()
          .trim()
          .max(2000, "Product description must be at most 2000 characters")
          .nullable(),

     category: Yup.string()
          .required("Product category is required"),

     pricePerUnit: Yup.number()
          .typeError("Price per unit must be a number")
          .positive("Price per unit must be positive")
          .required("Price per unit is required"),

     tieredPricing: Yup.array()
          .of(
               Yup.object({
                    qty: Yup.string()
                         .trim()
                         .matches(noPlusMinusPattern, "Quantity range cannot contain + or -")
                         .required("Quantity range is required"),

                    price: Yup.number()
                         .transform((value, originalValue) => (originalValue === "" ? NaN : value))
                         .typeError("Price must be a number")
                         .positive("Price must be positive")
                         .required("Price is required"),
               })
          )
          .nullable(),

     minOrderQty: Yup.number()
          .typeError("Minimum order quantity must be a number")
          .integer("Minimum order quantity must be an integer")
          .min(1, "Minimum order quantity must be at least 1")
          .test(
               "no-plus-minus",
               "Minimum order quantity cannot contain + or -",
               (value) => value !== undefined && !value.toString().includes("+") && !value.toString().includes("-")
          )
          .required("Minimum order quantity is required"),

     stockQty: Yup.number()
          .typeError("Stock quantity must be a number")
          .integer("Stock quantity must be an integer")
          .min(
               Yup.ref("minOrderQty"),
               "Stock quantity must be greater than or equal to minimum order quantity"
          )
          .required("Stock quantity is required"),

     lowStockThreshold: Yup.number()
          .typeError("Low stock threshold must be a number")
          .integer("Low stock threshold must be an integer")
          .min(1, "Low stock threshold must be at least 1")
          .test(
               "no-plus-minus",
               "Low stock threshold cannot contain + or -",
               (value) => value === undefined || (!value.toString().includes("+") && !value.toString().includes("-"))
          )
          .nullable(),

     shippingCost: Yup.number()
          .typeError("Shipping Cost must be a number")
          .min(0, "Shipping Cost cannot be negative")
          .required("Shipping Cost is required"),

     estimatedDeliveryDays: Yup.string()
          .required("Estimated Delivery Days is required"),

     isFeatured: Yup.boolean(),

     status: Yup.string()
          .oneOf(["pending", "approved", "rejected", "draft"]),

     shippingTerms: Yup.string()
          .nullable(),
});