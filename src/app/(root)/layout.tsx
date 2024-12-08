import "@mantine/carousel/styles.css";
import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@fontsource/bebas-neue";
import "@fontsource/old-standard-tt";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { NavBar } from "./_components";
import { SessionProvider } from "@/server/SessionProvider";
import { getServerAuthSession } from "@/server/auth";

export const metadata: Metadata = {
  title: "Fernando Martinena Portfolio Web",
  description:
    "Portfolio web de Fernando Martinena, artista digital. Aquí podrás ver mis trabajos, contratar mis servicios y comprar también mis productos.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SessionProvider session={session}>
          <MantineProvider>
            <TRPCReactProvider>
              <Notifications />
              <ModalsProvider>
                <NavBar />
                {children}
              </ModalsProvider>
            </TRPCReactProvider>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
