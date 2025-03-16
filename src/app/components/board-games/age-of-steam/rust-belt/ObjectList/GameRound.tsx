import { Text, Title } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
export function GameRound() {
  const { game } = useContext(GameContext);

  return (
    <Title order={5}>
      ラウンド {game!.round}
      <Text span c="#AAA">
        {" "}
        / {game!.lastRound}
      </Text>
    </Title>
  );
}
