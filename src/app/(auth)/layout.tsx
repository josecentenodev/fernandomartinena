import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@fontsource/bebas-neue";
import "@fontsource/old-standard-tt"
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";


export const metadata: Metadata = {
  title: "Login Fernando Martinena Portfolio Web",
  description:
    "Portfolio web de Fernando Martinena, artista digital. Aquí podrás ver mis trabajos, contratar mis servicios y comprar también mis productos.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <TRPCReactProvider>
            <Notifications />
              {children}
          </TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
