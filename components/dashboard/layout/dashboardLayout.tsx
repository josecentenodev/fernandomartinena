'use client'
import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import Image from 'next/image';
import DashboardNavbar from '../navbar/dashboardNavbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  return (
<AppShell
      header={{ height: 100 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="Fernando Martinena Logo"
              width={100}
              height={100}
            />
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <DashboardNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
      {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default DashboardLayout