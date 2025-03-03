import { Stack, Group } from "@mantine/core";
import { NewRoom } from "./NewRoom";
import { RoomList } from "./RoomList";

export default function HomePage() {
  return (
    <Stack p="xl">
      <Group justify="flex-end">
        <NewRoom />
      </Group>
      <RoomList />
    </Stack>
  );
}
