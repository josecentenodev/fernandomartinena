"use client";
import { Table, Image, Group, ActionIcon, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { type BannerImage } from "@prisma/client";
import { EditBannerModal } from "./editBannerModal";
import { DeleteBannerModal } from "./deleteBannerModal";

interface BannersTableProps {
  banners: BannerImage[];
}

export const BannersTable = ({ banners }: BannersTableProps) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Imagen</Table.Th>
          <Table.Th>Título</Table.Th>
          <Table.Th>Descripción</Table.Th>
          <Table.Th>Categoría</Table.Th>
          <Table.Th>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {banners.map((banner) => (
          <Table.Tr key={banner.id}>
            <Table.Td miw={192}>
              <Image 
                src={banner.imageUrl ?? "/placeholder.jpg"}
                h={108}
                w={192}
                fit="cover"
                radius="md"
                alt={banner.title} 
              />
            </Table.Td>
            <Table.Td>{banner.title}</Table.Td>
            <Table.Td>
              <Text lineClamp={2}>{banner.description}</Text>
            </Table.Td>
            <Table.Td>{banner.category}</Table.Td>
            <Table.Td>
              <Group>
                <EditBannerModal banner={banner}>
                  <ActionIcon variant="subtle" color="blue">
                    <IconEdit size={16} />
                  </ActionIcon>
                </EditBannerModal>
                <DeleteBannerModal banner={banner}>
                  <ActionIcon variant="subtle" color="red">
                    <IconTrash size={16} />
                  </ActionIcon>
                </DeleteBannerModal>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 