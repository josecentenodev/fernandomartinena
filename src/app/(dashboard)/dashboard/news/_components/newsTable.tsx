"use client";
import { api } from "@/trpc/react";
import { Table, Image, Group, ActionIcon, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EditNewsModal } from "./editNewsModal";
import { DeleteNewsModal } from "./deleteNewsModal";

export const NewsTable = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Cargando...</div>;

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Imagen</Table.Th>
          <Table.Th>Título</Table.Th>
          <Table.Th>Contenido</Table.Th>
          <Table.Th>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.posts.map((post) => (
          <Table.Tr key={post.title}>
            <Table.Td miw={192}>
              <Image 
                src={post.imageUrl}
                h={192}
                w={192}
                fit="cover"
                radius="md"
                alt={post.title} 
              />
            </Table.Td>
            <Table.Td w={200}>{post.title}</Table.Td>
            <Table.Td>
              <Text lineClamp={2}>{post.content}</Text>
            </Table.Td>
            <Table.Td>
              <Group>
                <EditNewsModal post={post}>
                  <ActionIcon variant="subtle" color="blue">
                    <IconEdit size={16} />
                  </ActionIcon>
                </EditNewsModal>
                <DeleteNewsModal post={post}>
                  <ActionIcon variant="subtle" color="red">
                    <IconTrash size={16} />
                  </ActionIcon>
                </DeleteNewsModal>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}; 