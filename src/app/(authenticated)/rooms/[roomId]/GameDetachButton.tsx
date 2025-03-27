"use client";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { deleteGame } from "@/app/actions/rooms";

export function GameDetachButton({ roomId }: { roomId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteGame() {
    if (!confirm("本当にゲームを終了してよろしいですか？")) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await deleteGame({ roomId });

      if (response.status === "error") {
        notifications.show({
          color: "red",
          title: response.title,
          message: response.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button variant="outline" loading={isLoading} onClick={handleDeleteGame}>
      ゲーム終了
    </Button>
  );
}
