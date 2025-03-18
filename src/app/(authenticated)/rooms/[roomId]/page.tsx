"use client";

import {
  Box,
  Group,
  Stack,
  Button,
  Divider,
  Title,
  UnstyledButton,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBarRight } from "@tabler/icons-react";
import clsx from "clsx";
import {
  ref,
  set,
  onDisconnect,
  remove,
  onValue,
  serverTimestamp,
} from "firebase/database";
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
import { useIsMobile } from "@/app/lib/use-mobile";
import { AuthContext } from "@/app/providers/AuthProvider";
import { Room } from "@/app/type";

export default function RoomPage() {
  const params = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const roomId = params.roomId as string;

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const sessionId = crypto.randomUUID();
    const sessionRef = ref(
      realtimeDb,
      `sessions/${currentUser!.uid}/${roomId}/${sessionId}`
    );

    const connectedRef = ref(realtimeDb, ".info/connected");

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        set(sessionRef, serverTimestamp());

        onDisconnect(sessionRef).remove();
      }
    });

    return () => {
      unsubscribe();
      remove(sessionRef);
    };
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
    <RoomLayout
      boardGameComponent={<BoardGame game={room.game} />}
      roomMenuComponent={<RoomMenu room={room} roomId={roomId} />}
    />
  );
}

function RoomMenu({ room, roomId }: { room: Room; roomId: string }) {
  return (
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
        <Button variant="outline" color="blue" fullWidth>
          退室
        </Button>
      </Link>
    </Stack>
  );
}

function RoomLayout({
  boardGameComponent,
  roomMenuComponent,
}: {
  boardGameComponent: React.ReactNode;
  roomMenuComponent: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <RoomMobileLayout
      boardGameComponent={boardGameComponent}
      roomMenuComponent={roomMenuComponent}
    />
  ) : (
    <RoomPCLayout
      boardGameComponent={boardGameComponent}
      roomMenuComponent={roomMenuComponent}
    />
  );
}

function RoomMobileLayout({
  boardGameComponent,
  roomMenuComponent,
}: {
  boardGameComponent: React.ReactNode;
  roomMenuComponent: React.ReactNode;
}) {
  const [openedMenu, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <Group w="100%" h="100%" justify="space-between" wrap="nowrap" p={0}>
      <Box h="100%" flex={1}>
        {boardGameComponent}
      </Box>
      <Drawer
        opened={openedMenu}
        onClose={closeMenu}
        position="right"
        size="xs"
        closeButtonProps={{
          icon: <IconArrowBarRight />,
        }}
        withCloseButton={false}
      >
        <div className="h-[calc(100vh-60px)]">{roomMenuComponent}</div>
      </Drawer>
      <Divider orientation="vertical" />
      <UnstyledButton
        className="fixed bottom-4 right-4 rotate-180"
        onClick={openMenu}
      >
        <IconArrowBarRight className="border rounded p-1 bg-white" size={40} />
      </UnstyledButton>
    </Group>
  );
}

function RoomPCLayout({
  boardGameComponent,
  roomMenuComponent,
}: {
  boardGameComponent: React.ReactNode;
  roomMenuComponent: React.ReactNode;
}) {
  const [openedMenu, { toggle: toggleMenu }] = useDisclosure(true);

  return (
    <Group w="100%" h="100%" justify="space-between" wrap="nowrap" p={0}>
      <Box h="100%" flex={1}>
        {boardGameComponent}
      </Box>
      <Divider orientation="vertical" />
      {openedMenu && roomMenuComponent}
      <UnstyledButton
        className={clsx(
          "fixed top-[80px] right-4 transition",
          openedMenu || "rotate-180"
        )}
        onClick={toggleMenu}
      >
        <IconArrowBarRight />
      </UnstyledButton>
    </Group>
  );
}
