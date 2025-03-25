import { PrepareSelectActionPhase } from "@age-of-steam/fresh-fish-core";
import { Stack, Text } from "@mantine/core";

export function PrepareSelectActionPhaseActionPrompt({
  phase,
}: {
  phase: PrepareSelectActionPhase;
}) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
    </Stack>
  );
}
