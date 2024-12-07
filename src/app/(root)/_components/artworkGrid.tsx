import React from "react";
import { SimpleGrid } from "@mantine/core";
import { Artwork } from "./artwork";

const Artworkgrid = () => {
  return (
    <SimpleGrid cols={3}>
      <Artwork />
      <Artwork />
      <Artwork />
    </SimpleGrid>
  );
};

export { Artworkgrid };
