"use client";
import { useState } from "react";
import { Modal, Button, Text, Stack } from "@mantine/core";
import { api } from "@/trpc/react";
import { showNotification } from "@mantine/notifications";
import { type BannerImage } from "@prisma/client";

interface DeleteBannerModalProps {
  children: React.ReactNode;
  banner: BannerImage;
}

export const DeleteBannerModal = ({ children, banner }: DeleteBannerModalProps) => {
  const [opened, setOpened] = useState(false);

  const utils = api.useUtils();
  const { mutate } = api.banners.delete.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Banner eliminado correctamente",
        color: "green",
      });
      setOpened(false);
      void utils.banners.getAll.invalidate();
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
    mutate({ id: banner.id });
  };

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={() => setOpened(false)}
        title="Eliminar banner"
      >
        <Stack>
          <Text>
            ¿Estás seguro de que deseas eliminar el banner &quot;{banner.title}&quot;? Esta acción no se puede deshacer.
          </Text>
          <Button 
            onClick={handleDelete} 
            color="red"
          >
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