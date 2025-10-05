import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/navbar";
import BackgroundVideo from "@/components/ui/backgroundvideo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yarrrhoo | One stop shop for pirates",
  description: "Yarrhoo | One stop shop for pirates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundVideo />
        
        {/* Fixed navbar at the top */}
        <NavBar className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md" />
        
        {/* Main content with top padding to account for navbar */}
        <div className="flex flex-col items-center relative z-10"> {/* Adjust pt-16 based on your navbar height */}
          {children}
        </div>
      </body>
    </html>
  );
}
