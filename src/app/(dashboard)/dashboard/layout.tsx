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
import { SessionProvider } from "@/server/SessionProvider";
import { getServerAuthSession } from "@/server/auth";
import { BasicAppShell } from "./_components/appShell";

export const metadata: Metadata = {
  title: "Dashboard - Fernando Martinena",
  description: "Panel de administración de Fernando Martinena Portfolio Web",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function DashboardLayout({
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
                <BasicAppShell>
                  {children}
                </BasicAppShell>
              </ModalsProvider>
            </TRPCReactProvider>
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
