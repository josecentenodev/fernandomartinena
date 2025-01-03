import { type Post } from "@/types/post";
import React from "react";
import PostCard, { FullWidthPost } from "./post";

const PostsGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.map((post, index) =>
        index === 0 ? (
          <FullWidthPost key={post.id} post={post} />
        ) : (
          <PostCard key={post.id} post={post} />
        ),
      )}
    </>
  );
};

export default PostsGrid;
