"use client";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { detachGame } from "@/app/actions/rooms";

export function GameDetachButton({ roomId }: { roomId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDetachGame() {
    if (!confirm("本当にゲームを終了してよろしいですか？")) {
      return;
    }

    try {
      setIsLoading(true);

      const response = await detachGame({ roomId });

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
    <Button variant="outline" loading={isLoading} onClick={handleDetachGame}>
      ゲーム終了
    </Button>
  );
}
