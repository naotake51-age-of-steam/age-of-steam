import { type GoodsGrowthPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group } from "@mantine/core";

export function GoodsGrowthPhaseActionPrompt({
  phase,
}: {
  phase: GoodsGrowthPhase;
}) {
  const width = 40;
  const height = 40;

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.whiteDices.map((dice, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0, 0, ${width}, ${height}`}
          >
            <image
              height={height}
              width={width}
              href={`/age-of-steam/rust-belt/white-dice-${dice}.svg`}
            />
          </svg>
        ))}
        {phase.blackDices.map((dice, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0, 0, ${width}, ${height}`}
          >
            <image
              height={height}
              width={width}
              href={`/age-of-steam/rust-belt/black-dice-${dice}.svg`}
            />
          </svg>
        ))}
      </Group>
    </Stack>
  );
}
