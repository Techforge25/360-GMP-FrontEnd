export const filterFormFields = (data) => {
     const filterFields = {
          companyIdentity: {
               basicInfo: {
                    headingName: "Basic Info",
                    details: [
                         {
                              key: "Owner Name",
                              value: data?.ownerName
                         },
                         {
                              key: "Identification Of Business Owner",
                              value: data?.identificationOfBusinessOwner
                         },
                         {
                              key: "Identification Of Business Owner",
                              value: data?.identificationOfBusinessOwner
                         },
                         {
                              key: "Company Name",
                              value: data?.companyName
                         },
                         {
                              key: "Select Primary Industry",
                              value: data?.primaryIndustry
                         },
                         {
                              key: "Trade Name",
                              value: data?.tradeName
                         },
                         {
                              key: "Country Of Registration",
                              value: data?.countryOfRegistration
                         },
                         {
                              key: "Business Type",
                              value: data?.businessType
                         },
                         {
                              key: "Company Size",
                              value: data?.companySize
                         },
                         {
                              key: "Founded Date",
                              value: data?.foundedDate
                         },
                         {
                              key: "Operating Hours",
                              value: data?.operationHour
                         },
                         {
                              key: "Official Company Website",
                              value: data?.website
                         },
                         {
                              key: "Mission/Bio",
                              value: data?.description
                         },
                    ]
               },
               legalCompliance: {
                    headingName: "Legal & Compliance",
                    details: [
                         {
                              key: "Registration Numbers",
                              value: data?.businessRegistrationNumber
                         },
                         {
                              key: "Tax Identification Number",
                              value: data?.taxIdentificationNumber
                         },
                         {
                              key: "Duns Number",
                              value: data?.dunsNumber
                         },
                         {
                              key: "Primary Industry",
                              value: data?.primaryIndustry
                         },
                    ]
               }
          },
          operationsAndLogistics: {
               companyLocation: {
                    headingName: "Company Location",
                    details: [
                         {
                              key: "Country",
                              value: data?.location?.country
                         },
                         {
                              key: "City",
                              value: data?.location?.city
                         },
                         {
                              key: "Address Line",
                              value: data?.location?.addressLine
                         },
                         {
                              key: "Warehouse Address",
                              value: data?.location?.warehouseAddress
                         },
                         {
                              key: "Additional Warehouse Address",
                              value: data?.location?.additionalWarehouseAddress
                         },
                         {
                              key: "Mandatory Pickup Address",
                              value: data?.location?.mandatoryPickupAddress
                         },
                         {
                              key: "Business Registration Address",
                              value: data?.location?.internationalOffices
                         },
                    ]
               },
               incoTerms: {
                    headingName: "Incoterms",
                    details: [
                         {
                              key: "International Commercial Terms",
                              value: data?.incoterms
                         },
                    ]
               },
               shippingInfo: {
                    headingName: "Shipping Info",
                    details: [
                         {
                              key: "Terms capability",
                              value: data?.shipping?.capabilities
                         },
                    ]
               },
               productPackagingDefault: {
                    headingName: "Product packaging default",
                    details: [
                         {
                              key: "Height",
                              value: data?.standardProductDimensions?.height
                         },
                         {
                              key: "Width",
                              value: data?.standardProductDimensions?.width
                         },
                         {
                              key: "Length",
                              value: data?.standardProductDimensions?.length
                         },
                         {
                              key: "Weight",
                              value: data?.standardProductDimensions?.weight
                         },
                    ]
               }
          },
          businessIntelligence: {
               primaryB2BContact: {
                    headingName: "Primary B2B Contact",
                    details: [
                         {
                              key: "Contact Person Name",
                              value: data?.b2bContact?.name
                         },
                         {
                              key: "Phone",
                              value: data?.b2bContact?.phone
                         },
                         {
                              key: "Title",
                              value: data?.b2bContact?.title
                         },
                         {
                              key: "Support Email",
                              value: data?.b2bContact?.supportEmail
                         }
                    ]
               },
               stakeHolderDisclosure: {
                    headingName: "Stake Holder Disclosure",
                    details: [
                         {
                              key: "Owner & Leadership",
                              value: data?.executiveLeadership
                         }
                    ]
               },
               operationalTradeProfile: {
                    headingName: "Operational & Trade Profile",
                    details: [
                         {
                              key: "Region Of Operation",
                              value: data?.regionOfOperations
                         },
                         {
                              key: "Production Capacity",
                              value: data?.productionCapacity
                         },
                         {
                              key: "Trade Affiliations",
                              value: data?.tradeAffiliations
                         }
                    ]
               },
               financialAndRegulatory: {
                    headingName: "Financial and Regulatory",
                    details: [
                         {
                              key: "Auditing Agency",
                              value: data?.auditingAgency
                         },
                    ]
               }
          },
          documentationVerification: {
               documentationVerificationAssets: {
                    headingName: "Documentation and Verification Assets",
                    details: [
                         {
                              key: "Certificate of Incorporation",
                              value: data?.certificateOfIncorporation
                         },
                         {
                              key: "Tax Registration Certificate",
                              value: data?.taxRegistrationCertificate
                         },
                    ]
               },
               otherCertification: {
                    headingName: "Other certification",
                    details: [
                         {
                              key: "",
                              value: data?.certificateOfIncorporation
                         }
                    ]
               }
          }
     }
     return filterFields
}