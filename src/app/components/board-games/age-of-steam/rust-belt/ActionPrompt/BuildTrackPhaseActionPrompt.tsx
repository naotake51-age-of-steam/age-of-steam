import { cityTiles, type BuildTrackPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Button } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { toPlayerColorCode } from "../util";
import { completeBuild } from "@/app/actions/age-of-steam/rust-belt/build-track-tile-phase";

export function BuildTrackPhaseActionPrompt({
  phase,
}: {
  phase: BuildTrackPhase;
}) {
  const { game, action } = useContext(GameContext);

  async function handleSubmit() {
    await action!(completeBuild, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.buildingCityTileIds.length > 0 && (
          <>
            <Text>建設都市:</Text>
            {phase.buildingCityTileIds.map((tileId) => (
              <svg
                key={tileId}
                className="w-[50px] h-[50px] p-2"
                viewBox={`0, 0, 50, 50`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  height={50}
                  href={"/age-of-steam/rust-belt/" + cityTiles[tileId].image}
                  width={50}
                />
              </svg>
            ))}
          </>
        )}
        {phase.buildingTrackTileIds.length > 0 && (
          <>
            <Text>建設線路:</Text>
            {phase.buildingTrackTileIds.map((tileId) => (
              <IconTrack
                key={tileId}
                color={toPlayerColorCode(game!.turnPlayer!.color)}
              />
            ))}
          </>
        )}
      </Group>
      <Group gap="xs">
        {phase.isTurnPlayer() && <Button onClick={handleSubmit}>完了</Button>}
      </Group>
    </Stack>
  );
}
