"use client";
import { api } from "@/trpc/react";
import React from "react";

const ProfilePage = ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const { data } = api.users.getById.useQuery({ id: params.userId });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 pt-24">
      {data?.name}
    </main>
  );
};

export default ProfilePage;
