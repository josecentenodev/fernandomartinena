"use client";
import Link from "next/link";
import { Avatar, Button } from "@mantine/core";
import { useSession } from "next-auth/react";

const UserButtons = () => {
  const { data: session } = useSession();

  return (
    <div className="absolute right-5 flex w-32 gap-3">
      {session ? (
        <Avatar>{session.user.name.slice(0, 1)}</Avatar>
      ) : (
        <Button bg={"dark"} component={Link} href={"/login"}>
          Login
        </Button>
      )}
    </div>
  );
};

export { UserButtons };
