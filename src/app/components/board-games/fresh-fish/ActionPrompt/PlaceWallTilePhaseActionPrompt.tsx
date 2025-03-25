import { PlaceWallTilePhase } from "@age-of-steam/fresh-fish-core";
import { Text, Stack, Group } from "@mantine/core";

export function PlaceWallTilePhaseActionPrompt({
  phase,
}: {
  phase: PlaceWallTilePhase;
}) {
  const width = 100;
  const height = 100;

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xl">
        <svg
          className="w-[100px] h-[100px] p-2"
          viewBox={`0, 0, ${width}, ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            height={height}
            href={"/fresh-fish/" + phase.wallTile.image}
            width={width}
          />
        </svg>
      </Group>
    </Stack>
  );
}
