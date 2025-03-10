"use client";
import { useState } from "react";
import { Modal, Button, TextInput, Textarea, Stack } from "@mantine/core";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import { showNotification } from "@mantine/notifications";

interface Artwork {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
}

export const EditArtworkModal = ({ 
  children, 
  artwork 
}: { 
  children: React.ReactNode;
  artwork: Artwork;
}) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState(artwork.title);
  const [description, setDescription] = useState(artwork.description ?? "");
  const [imageUrl, setImageUrl] = useState(artwork.imageUrl ?? "");

  const utils = api.useUtils();
  const { mutate } = api.artworks.update.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Obra actualizada correctamente",
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
      id: artwork.id,
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
        title="Editar obra"
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