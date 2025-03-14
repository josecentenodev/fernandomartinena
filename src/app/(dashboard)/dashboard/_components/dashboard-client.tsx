"use client";
import { Container, Grid, Paper, Text, Title, Group, Stack } from '@mantine/core';
import { IconUsers, IconPhoto, IconNews, IconShoppingCart } from '@tabler/icons-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

function StatsCard({ title, value, icon, description }: StatsCardProps) {
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
          {description && (
            <Text size="xs" c="dimmed">
              {description}
            </Text>
          )}
        </Stack>
        {icon}
      </Group>
    </Paper>
  );
}

interface DashboardClientProps {
  artworksCount: number;
  newsCount: number;
  usersCount: number;
  ordersCount: number;
}

export function DashboardClient({ artworksCount, newsCount, usersCount, ordersCount }: DashboardClientProps) {
  return (
    <Container size="xl" py="xl">
      <Title order={2} mb="xl">Panel de Administración</Title>
      <Text size="lg" c="dimmed" mb="xl">
        ¡Bienvenido al panel de administración! Aquí podrás gestionar todos los aspectos de tu sitio web, incluyendo usuarios, obras, noticias y pedidos.
      </Text>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Usuarios"
            value={usersCount}
            icon={<IconUsers size={32} stroke={1.5} className="text-blue-500" />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Obras"
            value={artworksCount}
            icon={<IconPhoto size={32} stroke={1.5} className="text-violet-500" />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Noticias"
            value={newsCount}
            icon={<IconNews size={32} stroke={1.5} className="text-green-500" />}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Pedidos"
            value={ordersCount}
            icon={<IconShoppingCart size={32} stroke={1.5} className="text-orange-500" />}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
} 