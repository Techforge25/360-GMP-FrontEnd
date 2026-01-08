import Image from "next/image";

export default function OnboardingLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center relative overflow-hidden bg-scaffold-background">
        

            <div className="absolute left-4 top-4 z-20 sm:left-8 sm:top-8">
                <div className="flex h-12 w-32 items-center justify-center rounded-lg bg-white p-4 sm:h-16 sm:w-48">
                    <Image
                        src="/assets/images/Logo.png"
                        alt="3SIXTY Logo"
                        width={150}
                        height={50}
                        className="h-auto w-full object-contain"
                        priority
                    />
                </div>
            </div>

            <div className="relative z-10 w-full flex items-center justify-center p-4 md:p-20">
                {children}
            </div>
        </div>
    );
}
