import { type AdvanceTurnMarkerPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Button } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { confirm } from "@/app/actions/age-of-steam/rust-belt/advance-turn-marker-phase";

export function AdvanceTurnMarkerPhaseActionPrompt({
  phase,
}: {
  phase: AdvanceTurnMarkerPhase;
}) {
  const { action } = useContext(GameContext);

  async function handleConfirm() {
    await action!(confirm, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.canConfirm() && <Button onClick={handleConfirm}>次へ</Button>}
      </Group>
    </Stack>
  );
}
