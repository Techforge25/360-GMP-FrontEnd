import React from "react";
import Link from "next/link";

const DashboardFooter = () => {
  return (
    <div className="bg-[#0B1120] text-[#94A3B8] text-sm py-6 px-8 md:px-14 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto w-full">
      <div className="flex items-center gap-1">
        <span>&copy;</span>
        <span>2025 360GMP. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-6">
        <Link href="#" className="hover:text-white transition-colors">
          Terms
        </Link>
        <Link href="#" className="hover:text-white transition-colors">
          Privacy
        </Link>
        <Link href="#" className="hover:text-white transition-colors">
          Cookies
        </Link>
      </div>
    </div>
  );
};

export default DashboardFooter;
