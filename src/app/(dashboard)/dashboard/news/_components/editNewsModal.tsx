"use client";
import { useState } from "react";
import { Modal, Button, TextInput, Textarea, Stack } from "@mantine/core";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { showNotification } from "@mantine/notifications";
import { type Post } from "@/types/post";

export const EditNewsModal = ({ 
  children, 
  post 
}: { 
  children: React.ReactNode;
  post: Post;
}) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl ?? "");

  const utils = api.useUtils();
  const { mutate } = api.posts.update.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Noticia actualizada correctamente",
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

  const handleSubmit = () => {
    mutate({
      postId: post.id,
      title,
      content,
      imageUrl,
    });
  };

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={() => setOpened(false)}
        title="Editar noticia"
      >
        <Stack>
          <TextInput
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Contenido"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res?.[0]?.url ?? "");
            }}
            onUploadError={(error: Error) => {
              showNotification({
                title: "Error",
                message: error.message,
                color: "red",
              });
            }}
          />
          <Button onClick={handleSubmit} color="dark">
            Actualizar
          </Button>
        </Stack>
      </Modal>

      <div onClick={() => setOpened(true)}>
        {children}
      </div>
    </>
  );
}; 