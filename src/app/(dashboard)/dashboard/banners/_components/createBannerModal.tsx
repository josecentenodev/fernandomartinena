"use client";
import { useState } from "react";
import { Modal, Button, TextInput, Select, Stack, Textarea } from "@mantine/core";
import { api } from "@/trpc/react";
import { ImageUpload } from "@/components/ImageUpload";
import { showNotification } from "@mantine/notifications";
import { type BannerCategory } from "@prisma/client";

const BANNER_CATEGORIES: BannerCategory[] = [
  "ARTWORKS",
  "SERVICES",
  "PRODUCTS",
  "EVENTS",
  "NEWS",
  "CUSTOM"
];

export const CreateBannerModal = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<BannerCategory>("CUSTOM");
  const [imageUrl, setImageUrl] = useState("");

  const utils = api.useUtils();
  const { mutate } = api.banners.create.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Banner creado correctamente",
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

  const handleSubmit = () => {
    mutate({
      title,
      description,
      category,
      imageUrl,
    });
  };

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={() => setOpened(false)}
        title="Crear nuevo banner"
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
          <Select
            label="Categoría"
            value={category}
            onChange={(value) => setCategory(value as BannerCategory)}
            data={BANNER_CATEGORIES.map(cat => ({
              value: cat,
              label: cat.charAt(0) + cat.slice(1).toLowerCase()
            }))}
          />
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            label="Imagen del banner"
          />
          <Button 
            onClick={handleSubmit} 
            color="dark"
            disabled={!title || !imageUrl}
          >
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