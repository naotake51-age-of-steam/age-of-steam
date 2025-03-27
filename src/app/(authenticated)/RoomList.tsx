"use client";

import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import { Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDotsVertical, IconTrash } from "@tabler/icons-react";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { deleteRoom } from "../actions/rooms";
import { getGameConfig } from "../lib/gameConfigs";
import { db } from "@/app/lib/firebase";
import { AuthContext } from "@/app/providers/AuthProvider";
import type { Room } from "@/app/type";

export function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const roomsRef = collection(db, "rooms");

    return onSnapshot(roomsRef, (snapshot) => {
      const rooms = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Room;
      });
      setRooms(rooms);
    });
  }, []);

  const sortedRooms = rooms.sort((a, b) => a.timestamp - b.timestamp);

  return (
    <Grid>
      {sortedRooms.map((room) => (
        <Grid.Col key={room.id} span={{ xs: 6, sm: 4, lg: 3, xl: 2 }}>
          <Room room={room} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

function Room({ room }: { room: Room }) {
  const { currentUser } = useContext(AuthContext);

  const game = room.game ? getGameConfig(room.game.type) : null;

  async function handleDeleteRoom() {
    const response = await deleteRoom({ id: room.id });

    notifications.show({
      color: response.status === "success" ? "teal" : "red",
      title: response.title,
      message: response.message,
    });
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {room.uid === currentUser?.uid && (
          <Box className="absolute top-2 right-2">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <IconDotsVertical />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconTrash size={20} />}
                  disabled={room.users.length > 0}
                  onClick={handleDeleteRoom}
                >
                  削除
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
        )}
        <Image
          src={game ? game.image : "/noimage.jpg"}
          h={160}
          alt="boardgame"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" wrap="nowrap">
        <Text flex={1} fw={500} truncate>
          {room.name}
        </Text>
        <Badge color={room.users.length ? "pink" : "gray"}>
          {room.users.length}人
        </Badge>
      </Group>

      <Text size="xs" c="dimmed" truncate>
        {game ? game.name : "-"}
      </Text>

      <Text size="xs" c="dimmed" mt="xs" truncate>
        {room.users.map((user) => user.name).join(", ") || "-"}
      </Text>

      <Link href={`/rooms/${room.id}`}>
        <Button variant="outline" color="blue" fullWidth mt="md" radius="md">
          入室
        </Button>
      </Link>
    </Card>
  );
}
