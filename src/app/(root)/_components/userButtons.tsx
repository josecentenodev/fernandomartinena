import Link from "next/link";
import { Button } from "@mantine/core";

const UserButtons = () => {
  return (
    <div className="absolute right-5 flex w-32 gap-3">
      <Button bg={'dark'} component={Link} href={'/login'}>Login</Button>
    </div>
  );
};

export { UserButtons };
