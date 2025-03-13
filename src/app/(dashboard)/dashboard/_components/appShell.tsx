"use client";
import { AppShell, Burger, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLinks } from "./navLinks";
import Link from "next/link";
import Image from "next/image";

export function BasicAppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="Fernando Martinena Logo"
                width={100}
                height={100}
              />
            </Link>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack>
          <NavLinks />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
