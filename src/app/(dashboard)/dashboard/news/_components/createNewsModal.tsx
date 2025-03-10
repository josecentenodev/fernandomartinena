"use client";
import { useState } from "react";
import { Modal, Button, TextInput, Textarea, Stack } from "@mantine/core";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { showNotification } from "@mantine/notifications";

export const CreateNewsModal = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const utils = api.useUtils();
  const { mutate } = api.posts.create.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Noticia creada correctamente",
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
        title="Crear nueva noticia"
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
            Crear
          </Button>
        </Stack>
      </Modal>

      <div onClick={() => setOpened(true)}>
        {children}
      </div>
    </>
  );
}; 