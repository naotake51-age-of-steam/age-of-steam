import { Menu, Text, Avatar, Group, UnstyledButton } from "@mantine/core";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
import { IconSettings, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useContext } from "react";
import { auth } from "@/app/lib/firebase";
import { AuthContext } from "@/app/providers/AuthProvider";

export function UserButton() {
  function handleLogout() {
    auth.signOut();
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <UserInfo />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>全体</Menu.Label>
        <Link href={"/notifications"}>
          <Menu.Item leftSection={<IconMessageCircle size={14} />}>
            通知
          </Menu.Item>
        </Link>
        <Menu.Divider />
        <Menu.Label>ユーザー</Menu.Label>
        <Link href={"/settings"}>
          <Menu.Item leftSection={<IconSettings size={14} />}>設定</Menu.Item>
        </Link>
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          onClick={handleLogout}
        >
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function UserInfo() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return null;
  }

  return (
    <Group>
      <Avatar className="hidden! md:block!" radius="xl" />
      <div className="hidden! md:block!" style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {currentUser.displayName ?? "名前なし"}
        </Text>
        <Text c="dimmed" size="xs">
          {currentUser.email}
        </Text>
      </div>
      <IconDotsVertical size={20} />
    </Group>
  );
}
