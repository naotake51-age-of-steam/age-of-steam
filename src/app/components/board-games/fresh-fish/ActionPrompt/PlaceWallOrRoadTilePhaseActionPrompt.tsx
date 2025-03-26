import { PlaceWallOrRoadTilePhase } from "@age-of-steam/fresh-fish-core";
import { Text, Stack, Group, Button } from "@mantine/core";
import clsx from "clsx";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { pass } from "@/app/actions/fresh-fish/place-wall-or-road-tile-phase";

export function PlaceWallOrRoadTilePhaseActionPrompt({
  phase,
}: {
  phase: PlaceWallOrRoadTilePhase;
}) {
  const { action, selectedTileType, setSelectedTypeType } =
    useContext(GameContext);

  async function handlePass() {
    await action!(pass, {});
  }

  const width = 100;
  const height = 100;

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xl">
        {phase.isTurnPlayer() && (
          <>
            {phase.canPass() ? (
              <Button onClick={handlePass}>パス</Button>
            ) : (
              <>
                {phase.roadTile && (
                  <svg
                    className={clsx(
                      "w-[100px] h-[100px] p-2 cursor-pointer",
                      selectedTileType === "RoadTile" && "scale-125"
                    )}
                    onClick={() => setSelectedTypeType("RoadTile")}
                    viewBox={`0, 0, ${width}, ${height}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image
                      height={height}
                      href={"/fresh-fish/" + phase.roadTile.image}
                      width={width}
                    />
                  </svg>
                )}
                {phase.wallTile && (
                  <svg
                    className={clsx(
                      "w-[100px] h-[100px] p-2 cursor-pointer",
                      selectedTileType === "WallTile" && "scale-125"
                    )}
                    onClick={() => setSelectedTypeType("WallTile")}
                    viewBox={`0, 0, ${width}, ${height}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image
                      height={height}
                      href={"/fresh-fish/" + phase.wallTile.image}
                      width={width}
                    />
                  </svg>
                )}
              </>
            )}
          </>
        )}
      </Group>
    </Stack>
  );
}
