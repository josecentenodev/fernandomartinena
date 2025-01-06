"use client";
import React from "react";
import { SimpleGrid } from "@mantine/core";
import { Artwork } from "./artwork";
import { api } from "@/trpc/react";
import EmptyState from "./emptyState";

const Artworkgrid = () => {
  const { data } = api.artworks.getAll.useQuery();

  if (data && data.artworks.length === 0)
    return (
      <EmptyState
        title="Sin obras de arte"
        description="Aun no se han subido obras de arte de nuestro grandioso Fernando Martinena"
      />
    );

  return (
    <SimpleGrid cols={3} py='xl'>
      {data?.artworks.map((artwork, i) => (
        <Artwork
          key={i}
          src={artwork.imageUrl ?? "fernando-martinena-el-rey.jpg"}
          alt={artwork.title}
          title={artwork.title}
          description={artwork.description ?? ""}
          createdAt={artwork.createdAt}
        />
      ))}
    </SimpleGrid>
  );
};

export { Artworkgrid };
