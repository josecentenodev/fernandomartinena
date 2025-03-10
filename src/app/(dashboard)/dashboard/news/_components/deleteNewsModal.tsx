"use client";
import { useState } from "react";
import { Modal, Button, Text, Stack } from "@mantine/core";
import { api } from "@/trpc/react";
import { showNotification } from "@mantine/notifications";
import { type Post } from "@/types/post";

export const DeleteNewsModal = ({ 
  children, 
  post 
}: { 
  children: React.ReactNode;
  post: Post;
}) => {
  const [opened, setOpened] = useState(false);

  const utils = api.useUtils();
  const { mutate } = api.posts.delete.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Noticia eliminada correctamente",
        color: "green",
      });
      setOpened(false);
      void utils.posts.getAll.invalidate();
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
    mutate({ postId: post.id });
  };

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={() => setOpened(false)}
        title="Eliminar noticia"
      >
        <Stack>
          <Text>¿Estás seguro que deseas eliminar la noticia &quot;{post.title}&quot;?</Text>
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