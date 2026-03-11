export default function TransactionHeader() {
     return (
          <div className="rounded-lg border border-border bg-card p-6">
               <div className="flex items-start justify-between">
                    <div>
                         <h1 className="text-xl font-semibold text-black">Transaction @ TRX-99821</h1>
                         <p className="mt-1 text-sm text-[#768299]">Oct 24, 2025, 10:30 AM</p>
                    </div>
                    <span className="rounded-full border border-green bg-green/10 px-4 py-1 text-sm font-medium text-green">Completed</span>
               </div>
          </div>
     );
};