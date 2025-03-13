import { type Post } from "@/types/post";
import { Card, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Image } from "@mantine/core";

export const MainPost = ({ post }: { post: Post }) => {
  return (
    <Card withBorder>
      <Group justify="center" align="center" p={"xl"} gap={"xl"}>
        <Image
          src={post.imageUrl ?? "fernando-martinena-ninfa.jpg"}
          alt={post.title}
          h={700}
          w={700}
        />
        <Stack flex={1} gap={"lg"}>
          <Title order={2} size="4rem" ta="center">
            {post.title.toLocaleUpperCase()}
          </Title>
          <Text size="xl">{post.content.toLocaleUpperCase()}</Text>
        </Stack>
      </Group>
    </Card>
  );
};


const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card withBorder>
      <Group justify="space-between" align="center" p={"xl"} gap={"xl"}>
        <Stack className="w-2/3" gap={"lg"}>
          <Title order={3}>{post.title}</Title>
          <Text>{post.content}</Text>
        </Stack>
        <Image
          src={post.imageUrl ?? "fernando-martinena-ninfa.jpg"}
          alt={post.title}
          h={350}
          w={350}
        />
      </Group>
    </Card>
  );
};

export default PostCard;