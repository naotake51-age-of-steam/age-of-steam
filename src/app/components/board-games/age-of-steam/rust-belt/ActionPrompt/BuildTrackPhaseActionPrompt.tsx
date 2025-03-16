import { type BuildTrackPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Button } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { completeBuild } from "@/app/actions/age-of-steam/rust-belt/build-track-tile-phase";

export function BuildTrackPhaseActionPrompt({
  phase,
}: {
  phase: BuildTrackPhase;
}) {
  const { action } = useContext(GameContext);

  async function handleSubmit() {
    await action!(completeBuild, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.isTurnPlayer() && <Button onClick={handleSubmit}>完了</Button>}
      </Group>
    </Stack>
  );
}
