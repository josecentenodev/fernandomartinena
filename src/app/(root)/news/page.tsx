import React from "react";
import { api } from "@/trpc/server";
import PostsGrid from "./_components/postGrid";
import PageContainer from "../_components/pageContainer";

const NewsPage = async () => {
  const { posts } = await api.posts.getAll();

  return (
    <PageContainer>
      <PostsGrid posts={posts} />
    </PageContainer>
  );
};

export default NewsPage;
