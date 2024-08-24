import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
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
          <Notifications zIndex={1100} />
            {children}
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
