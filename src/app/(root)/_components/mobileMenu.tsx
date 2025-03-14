"use client";
import { Drawer, UnstyledButton, Stack } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { modals } from "@mantine/modals";
import AboutPage from "./aboutPageModal";
import { useSession } from "next-auth/react";

export const MobileMenu = () => {
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();

  const closeDrawer = () => setOpened(false);

  // Verificar si el usuario es admin
  const isAdmin = session?.user?.userType === "ADMIN";

  return (
    <>
      <UnstyledButton onClick={() => setOpened(true)}>
        <IconMenu2 size={24} />
      </UnstyledButton>

      <Drawer
        opened={opened}
        onClose={closeDrawer}
        position="right"
        size="100%"
        withCloseButton={false}
      >
        <Stack className="h-full p-6" justify="center" gap="xl">
          <Link 
            href="/" 
            className="text-center text-3xl font-bebas"
            onClick={closeDrawer}
          >
            HOME
          </Link>
          
          <UnstyledButton
            className="text-center text-3xl font-bebas"
            onClick={() => {
              closeDrawer();
              modals.open({
                size: "xl",
                children: <AboutPage />,
              });
            }}
          >
            ABOUT
          </UnstyledButton>

          <Link 
            href="/news" 
            className="text-center text-3xl font-bebas"
            onClick={closeDrawer}
          >
            NEWS
          </Link>

          <Link 
            href="/shop" 
            className="text-center text-3xl font-bebas"
            onClick={closeDrawer}
          >
            SHOP
          </Link>

          <Link 
            href="/contact" 
            className="text-center text-3xl font-bebas"
            onClick={closeDrawer}
          >
            CONTACT
          </Link>

          {session ? (
            // Usuario autenticado
            <Stack gap="xl" align="center">
              {/* Dashboard solo para admin */}
              {isAdmin && (
                <Link 
                  href="/dashboard" 
                  className="text-center text-3xl font-bebas"
                  onClick={closeDrawer}
                >
                  DASHBOARD
                </Link>
              )}
              {/* Perfil de usuario para todos los usuarios autenticados */}
              <Link 
                href="/profile" 
                className="text-center text-3xl font-bebas"
                onClick={closeDrawer}
              >
                MY PROFILE
              </Link>
            </Stack>
          ) : (
            // Usuario no autenticado
            <Link 
              href="/auth/login" 
              className="text-center text-3xl font-bebas"
              onClick={closeDrawer}
            >
              LOGIN
            </Link>
          )}
        </Stack>
      </Drawer>
    </>
  );
}; 