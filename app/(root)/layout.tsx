import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Banner from "@/components/banner/banner";
import "../globals.css";
import "@fontsource/bebas-neue";


export const metadata: Metadata = {
  title: "Fernando Martinena",
  description: "Portfolio web de Fernando Martinena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-white">
          <Navbar />
          <Banner />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
