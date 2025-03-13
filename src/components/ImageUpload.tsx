"use client";
import { type ReactNode } from "react";
import { UploadDropzone } from "@/utils/uploadthing";
import { showNotification } from "@mantine/notifications";
import { Image, Stack, Text } from "@mantine/core";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  children?: ReactNode;
}

export const ImageUpload = ({ value, onChange, label, children }: ImageUploadProps) => {
  return (
    <Stack gap="xs">
      {label && <Text size="sm" fw={500}>{label}</Text>}
      
      {value ? (
        <div className="relative">
          <Image
            src={value}
            alt="Uploaded image"
            radius="md"
            h={200}
            fit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
            {children}
          </div>
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            onChange(res?.[0]?.url ?? "");
            showNotification({
              title: "Éxito",
              message: "Imagen subida correctamente",
              color: "green",
            });
          }}
          onUploadError={(error: Error) => {
            showNotification({
              title: "Error",
              message: error.message,
              color: "red",
            });
          }}
        />
      )}
    </Stack>
  );
}; 