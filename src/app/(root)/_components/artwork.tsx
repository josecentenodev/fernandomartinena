"use client";
import { Card, Image, Text, Group, Stack } from "@mantine/core";
import BadgeComponent from "./badgeComponent";

const Artwork = ({
  src,
  alt,
  title,
  description,
  createdAt,
}: {
  src: string;
  alt: string;
  title: string;
  description: string;
  createdAt: Date,
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={src} height={160} alt={alt} />
      </Card.Section>
      <Stack justify="space-between" h="100%">
        <Stack gap={"sm"}>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{title}</Text>
            <BadgeComponent createdAt={createdAt} />
          </Group>

          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export { Artwork };
