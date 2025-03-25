import { EndGamePhase } from "@age-of-steam/fresh-fish-core";
import { Text, Stack, Group } from "@mantine/core";

export function EndGamePhaseActionPrompt({ phase }: { phase: EndGamePhase }) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xl">End Of Game</Group>
    </Stack>
  );
}
