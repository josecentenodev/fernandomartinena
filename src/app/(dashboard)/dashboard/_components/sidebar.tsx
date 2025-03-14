"use client";
import { Stack, Title, UnstyledButton, ThemeIcon, Text, Divider, rem } from '@mantine/core';
import { 
  IconDashboard, 
  IconPhoto, 
  IconNews, 
  IconShoppingCart,
  IconUsers,
  IconMessage,
  IconBuildingStore
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MainLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function MainLink({ icon, label, href, active }: MainLinkProps) {
  return (
    <UnstyledButton
      component={Link}
      href={href}
      className={`
        p-2 rounded-md transition-colors duration-150
        hover:bg-gray-100
        ${active ? 'bg-gray-100' : ''}
      `}
    >
      <div className="flex items-center">
        <ThemeIcon variant="light" size="sm">
          {icon}
        </ThemeIcon>
        <Text size="lg" ml="sm">
          {label}
        </Text>
      </div>
    </UnstyledButton>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: <IconDashboard size={rem(16)} color="pink"/> },
    { href: '/dashboard/artworks', label: 'Obras de Arte', icon: <IconPhoto size={rem(16)} color="pink"/> },
    { href: '/dashboard/news', label: 'Noticias', icon: <IconNews size={rem(16)} color="pink"/> },
    { href: '/dashboard/banners', label: 'Banners', icon: <IconPhoto size={rem(16)} color="pink"/> },
    { 
      group: 'Tienda',
      links: [
        { href: '/dashboard/products', label: 'Productos', icon: <IconBuildingStore size={rem(16)} color="pink"/> },
        { href: '/dashboard/orders', label: 'Pedidos', icon: <IconShoppingCart size={rem(16)} color="pink"/> },
      ]
    },
    {
      group: 'Gestión',
      links: [
        { href: '/dashboard/users', label: 'Usuarios', icon: <IconUsers size={rem(16)} color="pink"/> },
        { href: '/dashboard/messages', label: 'Mensajes', icon: <IconMessage size={rem(16)} color="pink"/> },
      ]
    }
  ];

  return (
    <Stack h="100%" p="md">
      <Title order={3}>Administración</Title>
      
      <Divider />

      <Stack gap="xs">
        {links.map((item, index) => {
          if ('group' in item) {
            return (
              <Stack key={index} gap="xs">
                <Text size="lg" fw={500} c="dimmed" mt="md">
                  {item.group}
                </Text>
                {item.links?.map((link) => (
                  <MainLink
                    key={link.href}
                    {...link}
                    active={pathname === link.href}
                  />
                ))}
              </Stack>
            );
          }

          return (
            <MainLink
              key={item.href}
              {...item}
              active={pathname === item.href}
            />
          );
        })}
      </Stack>
    </Stack>
  );
} 