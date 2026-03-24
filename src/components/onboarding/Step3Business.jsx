"use client";

import Image from "next/image";
import { BsBuilding } from "react-icons/bs";
import { FiCalendar, FiMapPin } from "react-icons/fi";

export default function Step3({ data }) {
     if (!data) return null;
     return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

               {/* Banner + Logo */}
               <div className="relative h-48 w-full rounded-xl mb-12">
                    {data.banner && (
                         <Image
                              src={typeof data.banner === "string" ? data.banner : URL.createObjectURL(data.banner)}
                              alt="Banner"
                              fill
                              className="object-cover rounded-xl"
                         />
                    )}

                    <div className="absolute -bottom-10 left-8">
                         <div className="w-24 h-24 bg-white rounded-lg shadow-lg border border-border-light p-2">
                              {data.logo && (
                                   <Image
                                        src={typeof data.logo === "string" ? data.logo : URL.createObjectURL(data.logo)}
                                        alt="Logo"
                                        width={96}
                                        height={96}
                                        className="object-contain"
                                   />
                              )}
                         </div>
                    </div>
               </div>

               {/* Company Info */}
               <div className="pt-4 text-center">
                    <h2 className="text-2xl font-bold">{data.companyName || "N/A"}</h2>
                    <div className="flex justify-center gap-6 mt-2 text-base text-text-secondary">
                         <span className="flex items-center gap-1">
                              <BsBuilding /> {data.primaryIndustry || "N/A"}
                         </span>
                         <span className="flex items-center gap-1">
                              <FiCalendar /> {data.foundedDate ? new Date(data.foundedDate).toLocaleDateString() : "N/A"}
                         </span>
                         <span className="flex items-center gap-1">
                              <FiMapPin /> {data.location?.city || "N/A"}, {data.location?.country || "N/A"}
                         </span>
                    </div>
               </div>

               {/* Overview / Description */}
               {data.description && (
                    <div
                         dangerouslySetInnerHTML={{ __html: data.description }}
                    />
               )}
               {/* Business Details */}
               <div className="p-6 border border-border-light rounded-lg bg-white">
                    <h3 className="font-bold mb-4">Business Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                         <div>
                              <p className="text-sm font-bold text-text-primary mb-1">Business Type</p>
                              <p className="text-base text-text-secondary">{data.businessType || "N/A"}</p>
                         </div>
                         <div>
                              <p className="text-sm font-bold text-text-primary mb-1">Founded</p>
                              <p className="text-base text-text-secondary">{data.foundedDate ? new Date(data.foundedDate).getFullYear() : "N/A"}</p>
                         </div>
                         <div>
                              <p className="text-sm font-bold text-text-primary mb-1">Operating Hours</p>
                              <p className="text-base text-text-secondary">{data.operationHour || "N/A"}</p>
                         </div>
                         <div>
                              <p className="text-sm font-bold text-text-primary mb-1">Annual Revenue</p>
                              <p className="text-base text-text-secondary">{data.annualRevenueRange || "N/A"}</p>
                         </div>
                         <div>
                              <p className="text-sm font-bold text-text-primary mb-1">Auditing Agency</p>
                              <p className="text-base text-text-secondary">{data.auditingAgency || "N/A"}</p>
                         </div>
                         <div>
                              <p className="text-sm font-bold text-text-primary mb-1">Website</p>
                              <p className="text-base text-text-secondary">{data.website || "N/A"}</p>
                         </div>
                    </div>
               </div>

               {/* B2B Contact */}
               {data.b2bContact && (
                    <div className="p-6 border border-border-light rounded-lg bg-white">
                         <h3 className="font-bold mb-4">Primary B2B Contact</h3>
                         <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                   <p className="text-sm font-bold text-text-primary mb-1">Name</p>
                                   <p className="text-base text-text-secondary">{data.b2bContact.name}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-bold text-text-primary mb-1">Title</p>
                                   <p className="text-base text-text-secondary">{data.b2bContact.title}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-bold text-text-primary mb-1">Phone</p>
                                   <p className="text-base text-text-secondary">{data.b2bContact.phone}</p>
                              </div>
                              <div>
                                   <p className="text-sm font-bold text-text-primary mb-1">Support Email</p>
                                   <p className="text-base text-text-secondary">{data.b2bContact.supportEmail}</p>
                              </div>
                         </div>
                    </div>
               )}

               {/* Stakeholders */}
               {data.stakeholderDisclosure?.length > 0 && (
                    <div className="p-6 border border-border-light rounded-lg bg-white">
                         <h3 className="font-bold mb-4">Stakeholders</h3>
                         <div className="grid md:grid-cols-2 gap-4">
                              {data.stakeholderDisclosure.map((stakeholder, idx) => (
                                   <div key={idx} className="flex justify-between">
                                        <p>{stakeholder.name}</p>
                                        <p>{stakeholder.ownershipPercentage}%</p>
                                   </div>
                              ))}
                         </div>
                    </div>
               )}

               {/* Executive Leadership */}
               {data.executiveLeadership?.length > 0 && (
                    <div className="p-6 border border-border-light rounded-lg bg-white">
                         <h3 className="font-bold mb-4">Executive Leadership</h3>
                         <ul className="list-disc list-inside">
                              {data.executiveLeadership.map((leader, idx) => (
                                   <li key={idx}>{leader}</li>
                              ))}
                         </ul>
                    </div>
               )}

               {/* Trade Affiliations */}
               {data.tradeAffiliations?.length > 0 && (
                    <div className="p-6 border border-border-light rounded-lg bg-white">
                         <h3 className="font-bold mb-4">Trade Affiliations</h3>
                         <ul className="list-disc list-inside">
                              {data.tradeAffiliations.map((trade, idx) => (
                                   <li key={idx}>{trade}</li>
                              ))}
                         </ul>
                    </div>
               )}

               {/* International Offices */}
               {data.location?.internationalOffices?.length > 0 && (
                    <div className="p-6 border border-border-light rounded-lg bg-white">
                         <h3 className="font-bold mb-4">International Offices</h3>
                         <ul className="list-disc list-inside">
                              {data.location.internationalOffices.map((office, idx) => (
                                   <li key={idx}>{office}</li>
                              ))}
                         </ul>
                    </div>
               )}
          </div>
     );
}