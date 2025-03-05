"use client";

import { Box, Group, Stack, Button, Divider, Title } from "@mantine/core";
import { ref, set, onDisconnect, goOnline, goOffline } from "firebase/database";
import { onSnapshot, doc } from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { GameDetachButton } from "./GameDetachButton";
import { GameSelectButton } from "./GameSelectButton";
import { MemberList } from "./MemberList";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import { BoardGame } from "@/app/components/board-games";
import { db, realtimeDb } from "@/app/lib/firebase";
import { AuthContext } from "@/app/providers/AuthProvider";
import { Room } from "@/app/type";

export default function RoomPage() {
  const params = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const roomId = params.roomId as string;

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    goOnline(realtimeDb);

    return () => {
      goOffline(realtimeDb);
    };
  }, []);

  useEffect(() => {
    const sessionId = crypto.randomUUID();
    const timestamp = new Date().getTime();

    const sessionRef = ref(
      realtimeDb,
      `sessions/${currentUser!.uid}/${roomId}/${sessionId}`
    );

    set(sessionRef, timestamp);

    onDisconnect(sessionRef).remove();
  }, [roomId, currentUser]);

  useEffect(() => {
    const roomRef = doc(db, "rooms", roomId);

    return onSnapshot(roomRef, (snapshot) => {
      const room = snapshot.data();
      setRoom({
        id: snapshot.id,
        ...room,
      } as Room);
    });
  }, [roomId]);

  if (!room) {
    return null;
  }

  return (
    <Group w="100%" h="100%" justify="space-between" p={0}>
      <Box h="100%" flex={1}>
        <BoardGame game={room.game} />
      </Box>
      <Divider orientation="vertical" />
      <Stack w="300px" h="100%" p="sm" pl={0}>
        <Title className="truncate" order={3}>
          {room.name}
        </Title>
        <Divider label="メンバー" />
        <MemberList users={room.users} />
        <Divider label="メッセージ" />
        <MessageList roomId={roomId} />
        <MessageForm roomId={roomId} />
        <Divider label="アクション" />
        {room.game ? (
          <GameDetachButton roomId={roomId} />
        ) : (
          <GameSelectButton roomId={roomId} />
        )}
        <Link href="/">
          <Button variant="outline" color="blue" fullWidth radius="md">
            退室
          </Button>
        </Link>
      </Stack>
    </Group>
  );
}
