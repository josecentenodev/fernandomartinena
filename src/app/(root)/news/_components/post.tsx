import { type Post } from "@/types/post";
import { Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Image } from "@mantine/core";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Group justify="flex-start" align="center" pb={"xl"} pl={"xl"}>
      <Stack flex={1}>
        <Title order={3}>{post.title}</Title>
        <Text>{post.content}</Text>
      </Stack>
      <Image src={post.imageUrl ?? "fernando-martinena-ninfa.jpg"} alt={post.title} h={350} w={350} />
    </Group>
  );
};

export default PostCard;

export const MainPost = ({ post }: { post: Post }) => {
  return (
    <Group justify="flex-start" align="flex-start" pb={"xl"} pl={"xl"}>
      <Image
        src={post.imageUrl ?? "fernando-martinena-ninfa.jpg"}
        alt={post.title}
        h={700}
        w={700}
      />
      <Stack flex={1}>
        <Title order={2} size="4rem">
          {post.title.toLocaleUpperCase()}
        </Title>
        <Text size="xl" >{post.content.toLocaleUpperCase()}</Text>
      </Stack>
    </Group>
  );
};
