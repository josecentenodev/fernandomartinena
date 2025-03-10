"use client";
import { useState } from "react";
import { Modal, Button, Text, Stack } from "@mantine/core";
import { api } from "@/trpc/react";
import { showNotification } from "@mantine/notifications";

interface Artwork {
  id: string;
  title: string;
}

export const DeleteArtworkModal = ({ 
  children, 
  artwork 
}: { 
  children: React.ReactNode;
  artwork: Artwork;
}) => {
  const [opened, setOpened] = useState(false);

  const utils = api.useUtils();
  const { mutate } = api.artworks.delete.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Obra eliminada correctamente",
        color: "green",
      });
      setOpened(false);
      void utils.artworks.getAll.invalidate();
    },
    onError: (error) => {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    mutate({ id: artwork.id });
  };

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={() => setOpened(false)}
        title="Eliminar obra"
      >
        <Stack>
          <Text>¿Estás seguro que deseas eliminar la obra &quot;{artwork.title}&quot;?</Text>
          <Button onClick={handleDelete} color="red">
            Eliminar
          </Button>
        </Stack>
      </Modal>

      <div onClick={() => setOpened(true)}>
        {children}
      </div>
    </>
  );
}; 