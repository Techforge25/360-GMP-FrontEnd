import { Open_Sans } from "next/font/google";
import "./styles/globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "3Sixty GMP",
  description: "360gmp is an all-in-one digital platform to discover businesses, communities, jobs, and e-commerce in one place. Connect, explore, and grow with a complete 360° online experience."
};

import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/jodit@latest/build/jodit.min.css"
        />
      </head>
      <body
        className={`${openSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <CartProvider>
          <UserProvider>
            {children}
            {/* <ToastContainer /> */}
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
