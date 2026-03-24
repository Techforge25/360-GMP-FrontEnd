import * as Yup from "yup";

const alphaNumericPattern = /^[a-zA-Z0-9 -]*$/;
const addressPattern = /^[a-zA-Z0-9 -,]*$/;
const customPattern = /^[a-zA-Z0-9 \-.,\n\r]*$/;
const stackHoldersNamePattern = /^[a-zA-Z]*$/;

export const createBusinessProfileSchema = Yup.object({
     // Basic Info
     ownerName: Yup.string()
          .min(3, "Owner name must be at least 3 characters")
          .max(200, "Owner name cannot exceed 200 characters")
          .required("Owner name is required")
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     identificationOfBusinessOwner: Yup.string()
          .min(3, "Identification must be at least 3 characters")
          .max(200, "Identification cannot exceed 200 characters")
          .required("Identification is required")
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     companyName: Yup.string()
          .min(5, "Company name must be at least 5 characters")
          .max(200, "Company name cannot exceed 200 characters")
          .required("Company name is required")
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     tradeName: Yup.string()
          .max(200, "Trade name cannot exceed 200 characters")
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     businessType: Yup.string()
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     companySize: Yup.string()
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     foundedDate: Yup.date()
          .nullable()
          .typeError("Founded date must be a valid date"),

     primaryIndustry: Yup.string()
          .max(500, "Primary industry cannot exceed 500 characters")
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     operationHour: Yup.string()
          .max(50, "Operation hour cannot exceed 50 characters")
          .nullable()
          .trim()
          .matches(
               /^[0-9\s\-apmAPM]+$/,
               "Operation hour can only contain numbers, '-', spaces, and am/pm"
          ),

     countryOfRegistration: Yup.string()
          .max(50, "Country of registration cannot exceed 50 characters")
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     // Legal & Compliance
     businessRegistrationNumber: Yup.string()
          .max(100, "Business registration number cannot exceed 100 characters")
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     taxIdentificationNumber: Yup.string()
          .max(100, "Tax identification number cannot exceed 100 characters")
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     dunsNumber: Yup.string()
          .max(100, "DUNS number cannot exceed 100 characters")
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     complianceScreeningStatus: Yup.boolean()
          .default(true),

     // Location
     location: Yup.object({
          country: Yup.string()
               .max(100, "Country cannot exceed 100 characters")
               .nullable()
               .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
               .trim(),

          city: Yup.string()
               .max(100, "City cannot exceed 100 characters")
               .required("City is required")
               .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
               .trim(),

          addressLine: Yup.string()
               .max(1000, "Address Line cannot exceed 1000 characters")
               .required("Address Line is required")
               .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, commas, and hyphens are allowed")
               .trim(),

          warehouseAddress: Yup.string()
               .max(1000, "Warehouse address cannot exceed 1000 characters")
               .nullable()
               .matches(addressPattern, "Only alphanumeric characters, spaces, commas, and hyphens are allowed")
               .trim(),

          additionalWarehouseAddress: Yup.string()
               .max(1000, "Additional warehouse address cannot exceed 1000 characters")
               .nullable()
               .matches(addressPattern, "Only alphanumeric characters, spaces, commas, and hyphens are allowed")
               .trim(),

          mandatoryPickupAddress: Yup.string()
               .max(1000, "Mandatory pickup address cannot exceed 1000 characters")
               .required("Mandatory Pickup Address is required")
               .matches(addressPattern, "Only alphanumeric characters, spaces, commas, and hyphens are allowed")
               .trim(),

          businessRegistrationAddress: Yup.string()
               .max(1000, "Business registration address cannot exceed 1000 characters")
               .required("Business Registration Address is required")
               .matches(addressPattern, "Only alphanumeric characters, spaces, commas, and hyphens are allowed")
               .trim(),

          internationalOffices: Yup.array()
               .of(Yup.string().matches(addressPattern, "Only alphanumeric characters, spaces, commas, and hyphens are allowed"))
               .min(1, "At least 1 international office is required")
               .required("International offices are required"),
     }).nullable(),

     // Incoterms
     incoterms: Yup.string()
          .max(500, "Incoterms cannot exceed 500 characters")
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
          .trim(),

     // Shipping
     shipping: Yup.object({
          capabilities: Yup.array()
               .of(Yup.string().matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed"))
               .max(10, "Max 10 capabilities allowed"),

          exportExperience: Yup.boolean()
               .required("Export experience is required"),
     }),

     // Leadership
     executiveLeadership: Yup.array()
          .of(Yup.string().matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed").trim())
          .max(50, "Maximum 50 executive leaders allowed"),

     stakeholderDisclosure: Yup.array()
          .of(
               Yup.object({
                    name: Yup.string()
                         .min(3, "Stakeholder name must be at least 3 characters")
                         .required("Stakeholder name is required")
                         .matches(stackHoldersNamePattern, "Only letters are allowed")
                         .trim(),

                    ownershipPercentage: Yup.number()
                         .min(0, "Ownership % cannot be less than 0")
                         .max(100, "Ownership % cannot exceed 100")
                         .required("Ownership % is required"),
               })
          )
          .min(1, "At least 1 stakeholder is required")
          .required("Stakeholder disclosure is required"),

     // Operations
     regionOfOperations: Yup.array().of(
          Yup.string().matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
     ),

     productionCapacity: Yup.string()
          .max(1000, "Production capacity cannot exceed 1000 characters")
          .nullable()
          .matches(customPattern, "Invalid characters in production capacity")
          .trim(),

     tradeAffiliations: Yup.array().of(
          Yup.string().matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
     ),

     // Financial
     annualRevenueRange: Yup.string()
          .nullable()
          .trim()
          .matches(
               /^\$\d+M-\$\d+M$/,
               "Annual revenue must be in the format $<number>M-$<number>M, e.g., $4M-$5M"
          ),

     auditingAgency: Yup.string()
          .nullable()
          .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
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
          length: Yup.number().min(0, "Length must be at least 0").default(0),
          width: Yup.number().min(0, "Width must be at least 0").default(0),
          height: Yup.number().min(0, "Height must be at least 0").default(0),
          weight: Yup.number().min(0, "Weight must be at least 0").default(0),
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
               .max(50, "Name cannot exceed 50 characters")
               .nullable()
               .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
               .trim(),

          title: Yup.string()
               .max(50, "Title cannot exceed 50 characters")
               .nullable()
               .matches(alphaNumericPattern, "Only alphanumeric characters, spaces, and hyphens are allowed")
               .trim(),

          phone: Yup.string()
               .matches(/^\+?[1-9]\d{9,14}$/, "Phone must be valid international format")
               .required("Phone is required"),

          supportEmail: Yup.string()
               .email("Invalid email")
               .nullable()
               .trim(),
     }).nullable(),

     // Website & Description
     website: Yup.string()
          .url("Invalid URL")
          .max(100, "Website cannot exceed 100 characters")
          .nullable()
          .trim(),

     description: Yup.string()
          .max(5000, "Description cannot exceed 5000 characters")
          .nullable()
          .trim(),

     // Media
     logo: Yup.string()
          .nullable()
          .url("Logo must be a valid URL"),

     banner: Yup.string()
          .nullable()
          .url("Banner must be a valid URL"),
});