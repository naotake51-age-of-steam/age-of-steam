"use client";

import { Card, Image, Text, Badge, Button, Group, Grid } from "@mantine/core";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getGameConfig } from "../lib/gameConfigs";
import { db } from "@/app/lib/firebase";
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
        <Grid.Col key={room.id} span={{ base: 6, sm: 4, lg: 3, xl: 2 }}>
          <Room room={room} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

function Room({ room }: { room: Room }) {
  const game = room.game ? getGameConfig(room.game.type) : null;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
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
