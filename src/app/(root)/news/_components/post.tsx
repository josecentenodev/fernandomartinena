import { type Post } from "@/types/post";
import { Card, Flex, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Image } from "@mantine/core";

export const MainPost = ({ post }: { post: Post }) => {
  return (
    <Card withBorder>
      <Title order={2} size="4rem" ta="center">
        {post.title.toLocaleUpperCase()}
      </Title>
      <Group justify="center" align="start" mt={"md"} p={"xl"} gap={"xl"}>
        <Image src={post.imageUrl} alt={post.title} h={700} w={700} radius="md" />
        <Stack flex={1} gap={"lg"}>
          <Text size="xl" className="text-justify">
            {post.content.toLocaleUpperCase()}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card withBorder>
      <Flex className="flex-col xl:flex-row" p={"xl"} gap={"xl"}>
        <Stack className="w-full xl:w-2/3" gap={"lg"} align="center" justify="center" >
          <Title ta="center" order={3}>{post.title}</Title>
          <Text className="text-justify mx-auto">{post.content}</Text>
        </Stack>
        <Image src={post.imageUrl} alt={post.title} h={350} w={350} className="mx-auto" radius="md"/>
      </Flex>
    </Card>
  );
};

export default PostCard;
