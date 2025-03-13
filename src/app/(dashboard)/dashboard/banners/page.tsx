"use client";
import { Container, Stack, Title, Group, Button } from "@mantine/core";
import { api } from "@/trpc/react";
import { IconPlus } from "@tabler/icons-react";
import { BannersTable, CreateBannerModal, NoBanners } from "./_components";

export default function BannersPage() {
  const { data: banners, isLoading } = api.banners.getAll.useQuery();

  if (isLoading) {
    return (
      <Container size="lg" py="xl">
        <div>Cargando...</div>
      </Container>
    );
  }

  if (!banners?.length) {
    return (
      <Container size="lg" py="xl">
        <NoBanners />
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={2}>Banners</Title>
          <CreateBannerModal>
            <Button 
              leftSection={<IconPlus size={16} />}
              color="dark"
            >
              Nuevo Banner
            </Button>
          </CreateBannerModal>
        </Group>

        <BannersTable banners={banners} />
      </Stack>
    </Container>
  );
}