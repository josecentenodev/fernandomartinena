"use client";
import { useState } from "react";
import { Modal, Button, TextInput, Textarea, Stack } from "@mantine/core";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { showNotification } from "@mantine/notifications";

export const CreateArtworkModal = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const utils = api.useUtils();
  const { mutate } = api.artworks.create.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Obra creada correctamente",
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

  const handleSubmit = () => {
    mutate({
      title,
      description,
      imageUrl,
    });
  };

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={() => setOpened(false)}
        title="Crear nueva obra"
      >
        <Stack>
          <TextInput
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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