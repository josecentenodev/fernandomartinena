import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Fernando Martinena Portfolio Web",
  description:
    "Portfolio web de Fernando Martinena, artista digital. Aquí podrás ver mis trabajos, contratar mis servicios y comprar también mis productos.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <TRPCReactProvider>
            <Notifications />
            <ModalsProvider>{children}</ModalsProvider>
          </TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
