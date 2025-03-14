"use client";
import { Container, Table, Badge, ActionIcon, Group, Stack, SegmentedControl } from '@mantine/core';
import { api } from '@/trpc/react';
import { IconCheck, IconArchive } from '@tabler/icons-react';
import { useState } from 'react';

export default function MessagesPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const { data: messages, refetch } = api.messages.getAll.useQuery();
  const { mutate: markAsRead } = api.messages.markAsRead.useMutation({
    onSuccess: () => void refetch(),
  });
  const { mutate: archive } = api.messages.archive.useMutation({
    onSuccess: () => void refetch(),
  });

  const filteredMessages = messages?.filter(msg => {
    if (filter === 'unread') return msg.status === 'UNREAD';
    if (filter === 'archived') return msg.status === 'ARCHIVED';
    return true;
  });

  return (
    <Container size="xl" py="xl">
      <Stack>
        <Group justify="space-between">
          <SegmentedControl
            value={filter}
            onChange={(value) => setFilter(value as typeof filter)}
            data={[
              { label: 'Todos', value: 'all' },
              { label: 'No leídos', value: 'unread' },
              { label: 'Archivados', value: 'archived' },
            ]}
          />
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Estado</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Asunto</Table.Th>
              <Table.Th>Fecha</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredMessages?.map((message) => (
              <Table.Tr key={message.id}>
                <Table.Td>
                  <Badge 
                    color={message.status === 'UNREAD' ? 'red' : 
                           message.status === 'READ' ? 'green' : 'gray'}
                  >
                    {message.status}
                  </Badge>
                </Table.Td>
                <Table.Td>{message.name}</Table.Td>
                <Table.Td>{message.email}</Table.Td>
                <Table.Td>{message.subject}</Table.Td>
                <Table.Td>{new Date(message.createdAt).toLocaleDateString()}</Table.Td>
                <Table.Td>
                  <Group>
                    {message.status === 'UNREAD' && (
                      <ActionIcon 
                        variant="subtle" 
                        onClick={() => markAsRead({ id: message.id })}
                      >
                        <IconCheck size={16} />
                      </ActionIcon>
                    )}
                    {message.status !== 'ARCHIVED' && (
                      <ActionIcon 
                        variant="subtle" 
                        onClick={() => archive({ id: message.id })}
                      >
                        <IconArchive size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
} 