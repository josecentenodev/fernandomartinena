"use client";
import { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@mantine/core";
import { api } from "@/trpc/react";

const BannerImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const utils = api.useUtils();

  const { mutate } = api.banners.create.useMutation({
    onSuccess: () => {
      void utils.banners.getAll.invalidate();
    },
  });

  const handleSave = () => {
    mutate({
      imageUrl,
      category: "CUSTOM",
      title: "Banner principal",
    });
  };

  return (
    <div className="space-y-4">
      <ImageUpload
        value={imageUrl}
        onChange={setImageUrl}
        label="Banner Image"
      >
        <Button 
          color="dark" 
          onClick={handleSave}
          disabled={!imageUrl}
        >
          Guardar Banner
        </Button>
      </ImageUpload>
    </div>
  );
};

export default BannerImage;