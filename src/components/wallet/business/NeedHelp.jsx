import Image from "next/image";

export default function NeedHelp() {
     return (
          <section className="bg-white rounded-xl border border-gray-200 px-6 py-4 mt-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                    <div className=" bg-gray-50 flex items-center justify-center shrink-0">
                         <Image src="/assets/images/help.png" width={56} height={56} alt="help" />
                    </div>
                    <div>
                         <div className="text-[13px] font-semibold text-gray-900">Need Help?</div>
                         <div className="text-xs text-gray-400">your payment information is processed securely. for any billing questions, please contact our support center.</div>
                    </div>
               </div>
               <button className="bg-brand-primary text-white text-[13px] font-medium px-5 py-2.5 rounded-lg whitespace-nowrap hover:bg-gray-800 transition-colors cursor-pointer border-0">
                    Contact Support
               </button>
          </section>
     )
}