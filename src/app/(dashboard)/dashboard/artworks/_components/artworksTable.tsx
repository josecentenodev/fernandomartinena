"use client";
import { api } from "@/trpc/react";
import { Table, Image, Group, ActionIcon, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EditArtworkModal } from "./editArtworkModal";
import { DeleteArtworkModal } from "./deleteArtworkModal";

export const ArtworksTable = () => {
  const { data, isLoading } = api.artworks.getAll.useQuery();

  if (isLoading) return <div>Cargando...</div>;

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Imagen</Table.Th>
          <Table.Th>Título</Table.Th>
          <Table.Th>Descripción</Table.Th>
          <Table.Th>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.artworks.map((artwork) => (
          <Table.Tr key={artwork.title}>
            <Table.Td miw={192}>
              <Image 
                src={artwork.imageUrl ? `https://fernandomartinena.vercel.app/${artwork.imageUrl}` : "/placeholder.jpg"}
                h={192}
                w={192}
                fit="cover"
                radius="md"
                alt={artwork.title} 
              />
            </Table.Td>
            <Table.Td w={200}>{artwork.title}</Table.Td>
            <Table.Td>
              <Text lineClamp={2}>{artwork.description}</Text>
            </Table.Td>
            <Table.Td>
              <Group>
                <EditArtworkModal artwork={artwork}>
                  <ActionIcon variant="subtle" color="blue">
                    <IconEdit size={16} />
                  </ActionIcon>
                </EditArtworkModal>
                <DeleteArtworkModal artwork={artwork}>
                  <ActionIcon variant="subtle" color="red">
                    <IconTrash size={16} />
                  </ActionIcon>
                </DeleteArtworkModal>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 