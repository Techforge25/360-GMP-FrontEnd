import * as Yup from "yup";

const alphaNumericPattern = /^[a-zA-Z0-9 -]*$/;
const addressPattern = /^[a-zA-Z0-9 -,]*$/;
const customPattern = /^[a-zA-Z0-9 \-.,\n\r]*$/;

export const createBusinessProfileSchema = Yup.object({
     // Basic Info
     ownerName: Yup.string()
          .min(3)
          .max(200)
          .required("Owner name is required")
          .matches(alphaNumericPattern, "Only alphanumeric characters allowed")
          .trim(),

     identificationOfBusinessOwner: Yup.string()
          .min(3)
          .max(200)
          .required("Identification is required")
          .matches(alphaNumericPattern)
          .trim(),

     companyName: Yup.string()
          .min(5)
          .max(200)
          .required("Company name is required")
          .matches(alphaNumericPattern)
          .trim(),

     tradeName: Yup.string()
          .max(200)
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     businessType: Yup.string().nullable().matches(alphaNumericPattern).trim(),
     companySize: Yup.string().nullable().matches(alphaNumericPattern).trim(),
     foundedDate: Yup.date().nullable(),

     primaryIndustry: Yup.string()
          .max(500)
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     operationHour: Yup.string().max(50).nullable().trim(),

     countryOfRegistration: Yup.string()
          .max(50)
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     // Legal & Compliance
     businessRegistrationNumber: Yup.string()
          .max(100)
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     taxIdentificationNumber: Yup.string()
          .max(100)
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     dunsNumber: Yup.string()
          .max(100)
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     complianceScreeningStatus: Yup.boolean().default(true),

     // Location
     location: Yup.object({
          country: Yup.string()
               .max(100)
               .nullable()
               .matches(alphaNumericPattern)
               .trim(),

          city: Yup.string()
               .max(100)
               .required("City is required")
               .matches(alphaNumericPattern)
               .trim(),

          addressLine: Yup.string()
               .max(1000)
               .required("Address Line is required")
               .matches(alphaNumericPattern)
               .trim(),

          warehouseAddress: Yup.string()
               .max(1000)
               .nullable()
               .matches(addressPattern)
               .trim(),

          additionalWarehouseAddress: Yup.string()
               .max(1000)
               .nullable()
               .matches(addressPattern)
               .trim(),

          mandatoryPickupAddress: Yup.string()
               .max(1000)
               .required("Mandatory Pickup Address is required")
               .matches(addressPattern)
               .trim(),

          businessRegistrationAddress: Yup.string()
               .max(1000)
               .required("Business Registration Address is required")
               .matches(addressPattern)
               .trim(),

          internationalOffices: Yup.array()
               .of(Yup.string().matches(addressPattern))
               .min(1, "At least 1 international office is required")
               .required("International offices are required"),
     }).nullable(),

     // Incoterms
     incoterms: Yup.string()
          .max(500)
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     // Shipping
     shipping: Yup.object({
          capabilities: Yup.array()
               .of(Yup.string().matches(alphaNumericPattern))
               .max(10, "Max 10 capabilities allowed"),

          exportExperience: Yup.boolean().required("Export experience is required"),
     }),

     // Leadership
     executiveLeadership: Yup.array()
          .of(Yup.string().matches(alphaNumericPattern).trim())
          .max(50, "Maximum 50 executive leaders allowed"),

     stakeholderDisclosure: Yup.array()
          .of(
               Yup.object({
                    name: Yup.string()
                         .min(3)
                         .required("Stakeholder name is required")
                         .matches(alphaNumericPattern)
                         .trim(),

                    ownershipPercentage: Yup.number()
                         .min(0)
                         .max(100)
                         .required("Ownership % is required"),
               })
          )
          .min(1, "At least 1 stakeholder is required")
          .required("Stakeholder disclosure is required"),

     // Operations
     regionOfOperations: Yup.array().of(
          Yup.string().matches(alphaNumericPattern)
     ),

     productionCapacity: Yup.string()
          .max(1000)
          .nullable()
          .matches(customPattern)
          .trim(),

     tradeAffiliations: Yup.array().of(
          Yup.string().matches(alphaNumericPattern)
     ),

     // Financial
     annualRevenueRange: Yup.string().nullable().trim(),
     auditingAgency: Yup.string()
          .nullable()
          .matches(alphaNumericPattern)
          .trim(),

     // Documents
     certificateOfIncorporation: Yup.string()
          .nullable()
          .url("Must be a valid URL"),

     taxRegistrationCertificate: Yup.string()
          .nullable()
          .url("Must be a valid URL"),

     // Dimensions
     standardProductDimensions: Yup.object({
          length: Yup.number().min(0).default(0),
          width: Yup.number().min(0).default(0),
          height: Yup.number().min(0).default(0),
          weight: Yup.number().min(0).default(0),
     }),

     // Certifications
     certifications: Yup.array()
          .of(Yup.string().url("Must be a valid URL"))
          .min(1, "At least 1 certification required")
          .max(3, "Maximum 3 certifications allowed")
          .default([]),

     // B2B Contact
     b2bContact: Yup.object({
          name: Yup.string()
               .max(50)
               .nullable()
               .matches(alphaNumericPattern)
               .trim(),

          title: Yup.string()
               .max(50)
               .nullable()
               .matches(alphaNumericPattern)
               .trim(),

          phone: Yup.string()
               .matches(
                    /^\+?[1-9]\d{9,14}$/,
                    "Phone must be valid international format"
               )
               .required("Phone is required"),

          supportEmail: Yup.string()
               .email("Invalid email")
               .nullable()
               .trim(),
     }).nullable(),

     // Website & Description
     website: Yup.string()
          .url("Invalid URL")
          .max(100)
          .nullable()
          .trim(),

     description: Yup.string()
          .max(5000)
          .nullable()
          .trim(),

     // Media
     logo: Yup.string().nullable().url("Logo must be valid URL"),
     banner: Yup.string().nullable().url("Banner must be valid URL"),
});