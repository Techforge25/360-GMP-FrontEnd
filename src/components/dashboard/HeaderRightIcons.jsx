export default function HeaderRightIcons() {
     return (

          <div className="hidden sm:flex items-center gap-4">
               {/* Icon Group */}
               <div className="flex items-center gap-4 border border-gray-200 rounded-full py-2 px-4">
                    {/* Cart Icon */}
                    {headerIconLinks.cart && (
                         <Link href={headerIconLinks.cart} className="block relative">
                              <img
                                   src="/assets/images/cartIcon.png"
                                   alt="Cart"
                                   className="w-6 h-6"
                              />
                              {cartCount > 0 && (
                                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                                        {cartCount}
                                   </span>
                              )}
                         </Link>
                    )}
                    <Link href={headerIconLinks.notifications} className="relative">
                         <img
                              src="/assets/images/notificationIcon.png"
                              alt=""
                              className="w-5 h-5"
                         />
                         <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                              2
                         </span>
                    </Link>
                    <Link
                         href={headerIconLinks.messages}
                         className="text-gray-600 hover:text-indigo-600 transition-colors relative mt-1 flex items-center justify-center p-0 bg-transparent border-none appearance-none cursor-pointer"
                    >
                         <img
                              src="/assets/images/messageIcon.png"
                              alt=""
                              className="w-5 h-5"
                         />
                         <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                              1
                         </span>
                    </Link>
               </div>
               {/* User Profile with Dropdown */}
               <div className="relative">
                    <button
                         onClick={() => setIsProfileOpen(!isProfileOpen)}
                         className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                    >
                         {profileImage ? (
                              <img
                                   src={profileImage}
                                   alt="Profile"
                                   className="w-9 h-9 rounded-full object-contain"
                                   onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/assets/images/Logo.png";
                                   }}
                              />
                         ) : (
                              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-base">
                                   {user?.role === "business"
                                        ? user?.companyName?.[0]?.toUpperCase() || "B"
                                        : user?.firstName?.[0]?.toUpperCase() ||
                                        user?.fullName?.[0]?.toUpperCase() ||
                                        "U"}
                              </div>
                         )}
                         <FiChevronDown
                              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                         />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                         <>
                              <div
                                   className="fixed inset-0 z-10"
                                   onClick={() => setIsProfileOpen(false)}
                              />
                              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
                                   <div className="flex flex-col">
                                        {profileMenuLinks.map((link) => {
                                             const Icon = link.icon;
                                             return (
                                                  <Link
                                                       key={link.label}
                                                       href={link.href}
                                                       className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                                       onClick={() => setIsProfileOpen(false)}
                                                  >
                                                       <Icon className="w-5 h-5 text-gray-900" />
                                                       <span>{link.label}</span>
                                                  </Link>
                                             );
                                        })}

                                        <div className="h-px bg-gray-100 my-1 mx-4" />

                                        {SYSTEM_ACTIONS.map((action) => {
                                             const Icon = action.icon;
                                             const onClick = () => {
                                                  setIsProfileOpen(false);
                                                  if (action.key === "switch") {
                                                       setIsSwitchModalOpen(true);
                                                       return;
                                                  }
                                                  setIsSignOutModalOpen(true);
                                             };

                                             return (
                                                  <button
                                                       key={action.key}
                                                       className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                                       onClick={onClick}
                                                  >
                                                       <Icon className={`w-5 h-5 ${action.desktopIconClassName}`} />
                                                       <span>{action.label}</span>
                                                  </button>
                                             );
                                        })}
                                   </div>
                              </div>
                         </>
                    )}
               </div>
          </div>

     )
}