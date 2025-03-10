import { type Post } from "@/types/post";
import React from "react";
import PostCard, { MainPost } from "./post";
import { Stack } from "@mantine/core";

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  if (!posts.length) return null;

  const [mainPost, ...otherPosts] = posts;

  if (!mainPost) return null;

  return (
    <Stack gap="xl">
      <MainPost post={mainPost} />
      {otherPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Stack>
  );
};

export default PostsGrid;
