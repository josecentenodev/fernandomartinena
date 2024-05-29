import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const UserButtons = () => {
  return (
    <div className="flex w-32 absolute right-5 gap-3">
      <SignedIn>
        <UserButton afterSignOutUrl="/" appearance={{variables: {
          fontSize: "1rem",
        }}}/>
      </SignedIn>
      <SignedOut>
        <button className="btn btn-sm w-20 text-white">
          <Link href="/sign-in">Login</Link>
        </button>
      </SignedOut>
    </div>
  );
};

export default UserButtons;
