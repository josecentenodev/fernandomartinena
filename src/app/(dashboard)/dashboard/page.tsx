import { api } from "@/trpc/server";
import { Paper, Text, Title, Group, Stack } from '@mantine/core';
import { IconUsers, IconPhoto, IconNews, IconShoppingCart } from '@tabler/icons-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between" align="flex-start">
        <Stack gap={0}>
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
            {title}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </Stack>
        {icon}
      </Group>
    </Paper>
  );
}

export default async function Dashboard() {
  const artworksCount = await api.artworks.getCount();
  const newsCount = await api.posts.getCount();
  const usersCount = await api.users.getCount();
  const ordersCount = 0;

  return (
    <div className="p-8">
      <Title order={2} mb="xl">Panel de Administración</Title>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Usuarios"
          value={usersCount}
          icon={<IconUsers size={32} stroke={1.5} className="text-blue-500" />}
        />
        <StatsCard
          title="Obras"
          value={artworksCount}
          icon={<IconPhoto size={32} stroke={1.5} className="text-violet-500" />}
        />
        <StatsCard
          title="Noticias"
          value={newsCount}
          icon={<IconNews size={32} stroke={1.5} className="text-green-500" />}
        />
        <StatsCard
          title="Pedidos"
          value={ordersCount}
          icon={<IconShoppingCart size={32} stroke={1.5} className="text-orange-500" />}
        />
      </div>
    </div>
  );
}
