import { Group, Stack, Text, Avatar } from "@mantine/core";
import type { User } from "@/app/type";

export function MemberList({ users }: { users: User[] }) {
  return (
    <Stack gap={2}>
      {users.map((user) => (
        <Group key={user.id}>
          <Avatar size="sm" />
          <Text size="xs">{user.name}</Text>
        </Group>
      ))}
    </Stack>
  );
}
