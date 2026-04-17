"use client"
import { filterFormFields } from "@/helpers/settings"
import businessProfileAPI from "@/services/businessProfileAPI"
import { useEffect, useState } from "react"

export default function useSettings(activeTab) {
     const [myProfileData, setMyProfileData] = useState(null)
     console.log(activeTab, "active tabsss hook")
     useEffect(() => {
          const fetchMyProfile = async () => {
               let data = null;
               const response = await businessProfileAPI.getMyProfile()
               let getData = filterFormFields(response.data)
               if (activeTab === "company identity") {
                    data = getData.companyIdentity
               } else if (activeTab === "Operations & Logistics") {
                    data = getData.operationsAndLogistics
               } else if (activeTab === "Business Intelligence") {
                    data = getData.businessIntelligence
               } else if (activeTab === "Documentation & Verification") {
                    data = getData.documentationVerification
               } else {
                    data = []
               }
               setMyProfileData(data)
          }
          fetchMyProfile()
     }, [activeTab])

     return myProfileData
}