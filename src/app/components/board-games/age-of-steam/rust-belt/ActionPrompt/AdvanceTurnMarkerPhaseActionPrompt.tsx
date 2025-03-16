import { type AdvanceTurnMarkerPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group } from "@mantine/core";

export function AdvanceTurnMarkerPhaseActionPrompt({
  phase,
}: {
  phase: AdvanceTurnMarkerPhase;
}) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs"></Group>
    </Stack>
  );
}
