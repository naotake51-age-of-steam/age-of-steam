import { Stack, Group } from "@mantine/core";
import { NewRoom } from "./NewRoom";
import { RoomList } from "./RoomList";

export default function Home() {
  return (
    <Stack>
      <Group justify="flex-end">
        <NewRoom />
      </Group>
      <RoomList />
    </Stack>
  );
}
