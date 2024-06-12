import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Banner from "@/components/banner/banner";
import "./globals.css";
import "@mantine/core/styles.css";
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
        <head>
          <ColorSchemeScript />
        </head>
        <body className="bg-white">
          <MantineProvider>
            <Navbar />
            <Banner />
            {children}
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
