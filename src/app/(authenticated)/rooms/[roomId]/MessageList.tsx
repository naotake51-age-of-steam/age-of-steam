import { Paper, Text, Avatar, Group, ScrollArea } from "@mantine/core";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
  };
  timestamp: number;
}

export default function MessageList({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = collection(db, "rooms", roomId, "messages");

    return onSnapshot(messagesRef, (snapshot) => {
      const messages = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Message)
        )
        .sort((a, b) => b.timestamp - a.timestamp);

      setMessages(messages);
    });
  }, [roomId]);

  return (
    <ScrollArea flex={1} type="scroll" bg="#f9f9f9" px="xs">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ScrollArea>
  );
}

function Message({ message }: { message: Message }) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Paper key={message.id} my="md" p="xs" radius="md" withBorder>
      <Group mb="sm">
        <Avatar radius="xl" size="sm" />
        <Text size="xs">{message.sender.name}</Text>
        <Text size="xs" c="#999" style={{ marginLeft: "auto" }}>
          {formatTime(message.timestamp)}
        </Text>
      </Group>
      <Text size="xs" style={{ whiteSpace: "pre-wrap" }}>
        {message.text}
      </Text>
    </Paper>
  );
}
