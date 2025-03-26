import { Group, Text } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";

export function GameInfo() {
  const { game } = useContext(GameContext);

  return (
    <Group p="xs">
      <Text size="sm">残りタイル枚数: </Text>
      <Text size="sm">
        {game!.remainingDrawableTiles.length}{" "}
        <Text size="xs" c="#AAA" span>
          / {game!.drawableTiles.length}
        </Text>
      </Text>
    </Group>
  );
}
