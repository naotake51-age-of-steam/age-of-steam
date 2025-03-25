import { PlaceMarkerPhase } from "@age-of-steam/fresh-fish-core";
import { Text, Stack } from "@mantine/core";
import {} from "@/app/actions/fresh-fish/select-action-phase";

export function PlaceMarkerPhaseActionPrompt({
  phase,
}: {
  phase: PlaceMarkerPhase;
}) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
    </Stack>
  );
}
