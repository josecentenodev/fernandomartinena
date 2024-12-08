import React from "react";
import { SimpleGrid } from "@mantine/core";
import { Artwork } from "./artwork";

const Artworkgrid = () => {
  return (
    <SimpleGrid cols={3}>
      <Artwork src='/fernando-martinena-ackerman.jpg'/>
      <Artwork src='/fernando-martinena-bosque.jpg'/>
      <Artwork src='/fernando-martinena-dragones-4-v2.jpg'/>
      <Artwork src='/fernando-martinena-drakaris.jpg'/>
      <Artwork src='/fernando-martinena-el-corrompido.jpg'/>
      <Artwork src='/fernando-martinena-el-libre.jpg'/>
      <Artwork src='/fernando-martinena-el-rey.jpg'/>
      <Artwork src='/fernando-martinena-ezzengirl.gif'/>
      <Artwork src='/fernando-martinena-locura-sacro.jpg'/>
    </SimpleGrid>
  );
};

export { Artworkgrid };
