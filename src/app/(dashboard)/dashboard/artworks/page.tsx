import { Container, Group, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { ArtworksTable } from './_components/artworksTable';
import { CreateArtworkModal } from './_components/createArtworkModal';

const ArtworksPage = () => {
  return (
    <Container>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Obras de Arte</Title>
        <CreateArtworkModal>
          <Button leftSection={<IconPlus size={14} />} color="dark">
            Crear Obra
          </Button>
        </CreateArtworkModal>
      </Group>
      <ArtworksTable />
    </Container>
  );
};

export default ArtworksPage;