import { Container, Group, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { NewsTable } from './_components/newsTable';
import { CreateNewsModal } from './_components/createNewsModal';

const NewsPage = () => {
  return (
    <Container>
      <Group justify="space-between" mb="xl">
        <Title order={2}>Noticias</Title>
        <CreateNewsModal>
          <Button leftSection={<IconPlus size={14} />} color="dark">
            Crear Noticia
          </Button>
        </CreateNewsModal>
      </Group>
      <NewsTable />
    </Container>
  );
};

export default NewsPage;