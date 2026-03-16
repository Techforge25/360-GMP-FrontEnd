import { getStatusColor } from "@/constants/index";

export default function TransactionHeader({ data }) {
     const formattedDate = new Date(data?.orderPlacedAt).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
     }); return (
          <div className="rounded-lg border bg-white border-border bg-card p-6">
               <div className="flex items-start justify-between">
                    <div>
                         <h1 className="text-xl font-semibold text-black">Transaction @ {data?._id}</h1>
                         <p className="mt-1 text-sm text-[#768299]">{formattedDate}</p>
                    </div>
                    <span className={`rounded-full border px-4 py-1 text-sm font-medium ${getStatusColor(data?.status)}`}>{data?.status}</span>
               </div>
          </div>
     );
};