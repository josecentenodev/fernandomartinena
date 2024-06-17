import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@mantine/core";

const UserButtons = () => {
  return (
    <div className="flex w-32 absolute right-5 gap-3">
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            variables: {
              fontSize: "1rem",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default UserButtons;
