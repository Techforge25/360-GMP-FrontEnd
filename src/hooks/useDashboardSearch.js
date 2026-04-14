import businessProfileAPI from "@/services/businessProfileAPI";

export default function useDashboardSearch(activeTab, businessType, businessId) {
     let data;
     const fetchRequests = async () => {
          if (activeTab === "all") {
               const response = await businessProfileAPI.getAll(businessType)
               data = response.data.docs
               console.log(response, "all response")
          } else if (activeTab === "products") {
               const response = await businessProfileAPI.getSearchData(businessId, "products")
               data = response.data.docs
               console.log(response, "products response")
          } else if (activeTab === "jobs") {
               const response = await businessProfileAPI.getSearchData(businessId, "jobs")
               data = response.data.docs
               console.log(response, "jobs response")
          } else {
               const response = await businessProfileAPI.getSearchData(businessId, "communities")
               data = response.data.docs
               console.log(response, "communities response")
          }
     }

     useEffect(() => {
          fetchRequests()
     }, [activeTab, businessType, businessId])
}