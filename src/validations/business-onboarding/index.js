import * as Yup from "yup";

export const createBusinessProfileSchema = Yup.object({
     // Basic Info
     ownerName: Yup.string()
          .min(3, "Owner Name should be at least 3 characters")
          .max(200, "Owner Name cannot exceed 200 characters")
          .required("Owner name is required")
          .trim(),
     identificationOfBusinessOwner: Yup.string()
          .min(3, "Identification should be at least 3 characters")
          .max(200, "Identification cannot exceed 200 characters")
          .required("Identification is required")
          .trim(),
     companyName: Yup.string()
          .min(5, "Company Name should be at least 5 characters")
          .max(200, "Company Name cannot exceed 200 characters")
          .required("Company name is required")
          .trim(),
     tradeName: Yup.string().max(200, "Trade Name cannot exceed 200 characters").nullable().trim(),
     businessType: Yup.string().nullable().trim(),
     companySize: Yup.string().nullable().trim(),
     foundedDate: Yup.date().nullable(),
     primaryIndustry: Yup.string().max(500, "Primary Industry cannot exceed 500 characters").nullable().trim(),
     operationHour: Yup.string().max(50, "Operation Hour cannot exceed 50 characters").nullable().trim(),
     countryOfRegistration: Yup.string().max(50, "Country of Registration cannot exceed 50 characters").nullable().trim(),

     // Legal & Compliance
     businessRegistrationNumber: Yup.string().max(100, "Business Registration Number cannot exceed 100 characters").nullable().trim(),
     taxIdentificationNumber: Yup.string().max(100, "Tax ID cannot exceed 100 characters").nullable().trim(),
     dunsNumber: Yup.string().max(100, "DUNS Number cannot exceed 100 characters").nullable().trim(),
     complianceScreeningStatus: Yup.boolean().default(true),

     // Location
     location: Yup.object({
          country: Yup.string().max(100, "Country cannot exceed 100 characters").nullable().trim(),
          city: Yup.string().max(100, "City cannot exceed 100 characters").required("City is required").trim(),
          addressLine: Yup.string().max(1000, "Address Line cannot exceed 1000 characters").required("Address Line is required").trim(),
          warehouseAddress: Yup.string().max(1000, "Warehouse Address cannot exceed 1000 characters").nullable().trim(),
          additionalWarehouseAddress: Yup.string().max(1000, "Additional Warehouse Address cannot exceed 1000 characters").nullable().trim(),
          mandatoryPickupAddress: Yup.string().max(1000, "Mandatory Pickup Address cannot exceed 1000 characters").required("Mandatory Pickup Address is required").trim(),
          businessRegistrationAddress: Yup.string().max(1000, "Business Registration Address cannot exceed 1000 characters").required("Business Registration Address is required").trim(),
          internationalOffices: Yup.array()
               .of(Yup.string().max(200, "International Office cannot exceed 200 characters").trim())
               .min(1, "At least 1 international office is required")
               .required("International offices are required"),
     }).nullable(),

     // Incoterms
     incoterms: Yup.string().max(500, "Incoterms cannot exceed 500 characters").nullable().trim(),

     // Shipping Info
     shipping: Yup.object({
          capabilities: Yup.array().of(Yup.string().trim()).max(10, "Maximum 10 shipping capabilities allowed"),
          exportExperience: Yup.boolean().required("Export experience is required")
     }),

     // Leadership
     executiveLeadership: Yup.array().of(Yup.string().trim()).max(50, "Maximum 50 executive leaders allowed"),
     stakeholderDisclosure: Yup.array()
          .of(
               Yup.object({
                    name: Yup.string().min(3, "Stakeholder Name should be at least 3 characters").required("Stakeholder name is required").trim(),
                    ownershipPercentage: Yup.number().min(0, "Ownership % cannot be negative").max(100, "Ownership % cannot exceed 100").required("Ownership % is required")
               })
          )
          .min(1, "At least 1 stakeholder is required")
          .required("Stakeholder disclosure is required"),

     // Operations
     regionOfOperations: Yup.array().of(Yup.string().trim()),
     productionCapacity: Yup.string().max(1000, "Production Capacity cannot exceed 1000 characters").nullable().trim(),
     tradeAffiliations: Yup.array().of(Yup.string().trim()),

     // Financial & Regulatory
     annualRevenueRange: Yup.string().nullable().trim(),
     auditingAgency: Yup.string().nullable().trim(),

     // Documentation
     certificateOfIncorporation: Yup.string().nullable().trim(),
     taxRegistrationCertificate: Yup.string().nullable().trim(),

     // Product Dimensions
     standardProductDimensions: Yup.object({
          length: Yup.number().min(0, "Length cannot be negative").default(0),
          width: Yup.number().min(0, "Width cannot be negative").default(0),
          height: Yup.number().min(0, "Height cannot be negative").default(0),
          weight: Yup.number().min(0, "Weight cannot be negative").default(0)
     }),

     // Certifications
     certifications: Yup.array()
          .of(Yup.string().trim())
          .min(1, "At least 1 certification required")
          .max(3, "Maximum 3 certifications allowed")
          .default([]),

     // B2B Contact
     b2bContact: Yup.object({
          name: Yup.string().max(50, "B2B Name cannot exceed 50 characters").nullable().trim(),
          title: Yup.string().max(50, "B2B Title cannot exceed 50 characters").nullable().trim(),
          phone: Yup.string()
               .matches(/^\+?[1-9]\d{9,14}$/, "Phone number must be a valid international format (e.g., +923001234567).")
               .required("Phone is required"),
          supportEmail: Yup.string().email("Invalid email format").nullable().trim()
     }).nullable(),

     // Website & Description
     website: Yup.string().url("Invalid URL").max(100, "Website cannot exceed 100 characters").nullable().trim(),
     description: Yup.string().max(5000, "Description cannot exceed 5000 characters").nullable().trim(),
     logo: Yup.string().required("Logo is required"),
     banner: Yup.string().required("Banner is required"),
});