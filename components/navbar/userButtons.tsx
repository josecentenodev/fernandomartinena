import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
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
        <Button
          component={Link}
          href="/sign-in"
          color="#212121"
        >
          Login
        </Button>
      </SignedOut>
    </div>
  );
};

export default UserButtons;
