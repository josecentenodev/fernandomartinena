"use client";
import { useState } from "react";
import { Modal, Button, TextInput, Select, Stack, Textarea } from "@mantine/core";
import { api } from "@/trpc/react";
import { ImageUpload } from "@/components/ImageUpload";
import { showNotification } from "@mantine/notifications";
import { type BannerImage, type BannerCategory } from "@prisma/client";

const BANNER_CATEGORIES: BannerCategory[] = [
  "ARTWORKS",
  "SERVICES",
  "PRODUCTS",
  "EVENTS",
  "NEWS",
  "CUSTOM"
];

interface EditBannerModalProps {
  children: React.ReactNode;
  banner: BannerImage;
}

export const EditBannerModal = ({ children, banner }: EditBannerModalProps) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState(banner.title);
  const [description, setDescription] = useState(banner.description ?? "");
  const [category, setCategory] = useState<BannerCategory>(banner.category);
  const [imageUrl, setImageUrl] = useState(banner.imageUrl ?? "");

  const utils = api.useUtils();
  const { mutate } = api.banners.update.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Éxito",
        message: "Banner actualizado correctamente",
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
      id: banner.id,
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
        title="Editar banner"
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