"use client";
import { api } from "@/trpc/react";
import React from "react";
import ProfileInfo from "./_components/profileInfo";

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
      <ProfileInfo name={data?.name ?? 'Unknown and misterious persona'} email={data?.email ?? 'aintno-one@noemail.com'} />
    </main>
  );
};

export default ProfilePage;
