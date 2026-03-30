export default function SubscriptionHeader({ showPlans }) {
     return (
          <div className="bg-emerald-50/50 py-6 sm:py-8 lg:py-12 border-b border-gray-200 mb-4 sm:mb-6 lg:mb-8">
               <div className="max-w-4xl mx-auto text-center space-y-2 px-4 sm:px-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900">
                         {showPlans
                              ? "Available Subscription Plans"
                              : "Current Plan Overview"}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-800">
                         {showPlans
                              ? "Upgrade or Change Your Membership Plan Below."
                              : "Manage Your Subscription, Billing Details, And Usage Limits."}
                    </p>
               </div>
          </div>
     )
}