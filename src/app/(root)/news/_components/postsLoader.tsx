import { SimpleGrid, Skeleton } from "@mantine/core";
import React from "react";

const PostsLoader = () => {
  return (
    <SimpleGrid cols={3}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </SimpleGrid>
  );
};

export default PostsLoader;
