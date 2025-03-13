"use client";
import { Text, Paper, Stack, Button } from "@mantine/core";
import { IconPhotoPlus } from "@tabler/icons-react";
import { ImageUpload } from "@/components/ImageUpload";
import { useState } from "react";
import { api } from "@/trpc/react";
import { showNotification } from "@mantine/notifications";

export const NoBanners = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  
  const utils = api.useUtils();
  const { mutate } = api.banners.create.useMutation({
    onSuccess: () => {
      setIsUploading(false);
      showNotification({
        title: "Éxito",
        message: "Banner creado correctamente",
        color: "green",
      });
      void utils.banners.getAll.invalidate();
    },
    onError: (error) => {
      setIsUploading(false);
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  const handleSave = () => {
    if (!imageUrl) return;
    
    setIsUploading(true);
    mutate({
      imageUrl,
      category: "CUSTOM",
      title: "Banner principal",
    });
  };

  return (
    <Paper 
      p="xl" 
      withBorder 
      className="bg-gray-50"
    >
      {!isUploading ? (
        <Stack align="center" gap="md" py={40}>
          <IconPhotoPlus size={48} className="text-gray-400" />
          <Text size="xl" fw={500} ta="center">
            No hay banners configurados
          </Text>
          <Text c="dimmed" ta="center" maw={400}>
            Sube una imagen para crear tu primer banner. 
            Las imágenes deben tener un tamaño recomendado de 1920x600 píxeles.
          </Text>
          <Button 
            onClick={() => setIsUploading(true)}
            variant="light"
            leftSection={<IconPhotoPlus size={20} />}
          >
            Subir Banner
          </Button>
        </Stack>
      ) : (
        <Stack gap="md">
          <Text size="lg" fw={500}>
            Subir nuevo banner
          </Text>
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            label="Imagen del banner"
          >
            <Stack gap="xs">
              <Button 
                color="dark" 
                onClick={handleSave}
                disabled={!imageUrl}
                fullWidth
              >
                Guardar Banner
              </Button>
              <Button 
                variant="light" 
                onClick={() => {
                  setIsUploading(false);
                  setImageUrl("");
                }}
                fullWidth
              >
                Cancelar
              </Button>
            </Stack>
          </ImageUpload>
        </Stack>
      )}
    </Paper>
  );
}; 