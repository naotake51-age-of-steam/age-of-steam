import { type MoveGoodsPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Button, Divider } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";
import { useContext } from "react";
import { completeMoving } from "../../../../../actions/age-of-steam/rust-belt/move-goods-phase";
import { GameContext } from "../GameProvider";
import {
  incrementLocomotive,
  pass,
} from "@/app/actions/age-of-steam/rust-belt/move-goods-phase";

export function MoveGoodsPhaseActionPrompt({
  phase,
}: {
  phase: MoveGoodsPhase;
}) {
  const { action } = useContext(GameContext);

  async function handleCompleteMoving() {
    await action!(completeMoving, {});
  }

  async function handleIncrementLocomotive() {
    await action!(incrementLocomotive, {});
  }

  async function handlePass() {
    await action!(pass, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.movingList.length > 0 && (
          <>
            <Text>輸送線路:</Text>
            {phase.movingList.map((moving, idx) => (
              <IconTrack
                key={idx}
                color={moving.player ? moving.player.color : "#754c24"}
              />
            ))}
          </>
        )}
      </Group>
      <Group gap="xs">
        {phase.isTurnPlayer() && (
          <>
            <Button
              disabled={!phase.canCompleteMoving()}
              onClick={handleCompleteMoving}
            >
              商品輸送
            </Button>
            <Divider orientation="vertical" />
            <Button
              disabled={!phase.canIncrementLocomotive()}
              onClick={handleIncrementLocomotive}
            >
              エンジン+1
            </Button>
            <Divider orientation="vertical" />
            <Button onClick={handlePass}>パス</Button>
          </>
        )}
      </Group>
    </Stack>
  );
}
