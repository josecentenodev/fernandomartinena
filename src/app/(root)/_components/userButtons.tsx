"use client";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  Menu,
  Button,
} from "@mantine/core";
import { IconDashboard, IconLogout, IconUser } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserButtons = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="absolute right-5">
      {session ? (
        <Menu width={"14rem"} shadow="xs" radius="md">
          <Menu.Target>
            <Box>
              <UnstyledButton className="flex items-center justify-center gap-3 rounded-md font-medium">
                <Group>
                  <Avatar
                    src={session?.user?.image}
                    radius="xl"
                    size="lg"
                    color="dark"
                    variant="transparent"
                  />
                </Group>
              </UnstyledButton>
            </Box>
          </Menu.Target>

          <Menu.Dropdown>
            <Box className="flex justify-center border-b border-b-slate-100 py-1">
              <Text size="md" fw={500} c="pink">
                {session?.user?.email}
              </Text>
            </Box>
            <Box className="py-1">
              {session?.user?.userType === "ADMIN" && (
                <Menu.Item
                  onClick={() => router.push(`/dashboard`)}
                  leftSection={<IconDashboard />}
                >
                  Dashboard
                </Menu.Item>
              )}
              <Menu.Item
                onClick={() => router.push(`/profile/${session?.user?.id}`)}
                leftSection={<IconUser />}
              >
                My Account
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  void signOut().then(() => {
                    void router.push("/");
                  })
                }
                leftSection={<IconLogout />}
              >
                Log Out
              </Menu.Item>
            </Box>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button bg={"dark"} component={Link} href={"/login"}>
          Login
        </Button>
      )}
    </div>
  );
};

export { UserButtons };
