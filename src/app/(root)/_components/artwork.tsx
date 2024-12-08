"use client";
import { Card, Image, Text, Badge, Button, Group, Stack } from "@mantine/core";

const Artwork = ({ src }: { src: string }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={src} height={160} alt="Norway" />
      </Card.Section>
      <Stack justify="space-between" h="100%">
        <Stack gap={'sm'}>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Artwork title</Text>
            <Badge color="pink">On Sale</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            El famosisimo Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit repudiandae enim tempora, repellendus odio aliquam impedit alias eligendi provident fugiat facilis dignissimos eveniet eos necessitatibus laudantium saepe culpa cum natus?
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export { Artwork };
