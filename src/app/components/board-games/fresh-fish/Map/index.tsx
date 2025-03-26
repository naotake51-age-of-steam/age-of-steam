import {
  MAP_SPACE_HEIGHT,
  MAP_SPACE_WIDTH,
} from "@age-of-steam/fresh-fish-core";
import { Group } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { GameInfo } from "./GameInfo";
import { MapSpace } from "./MapSpace";

export function Map() {
  const { game } = useContext(GameContext);

  const width = MAP_SPACE_WIDTH * game!.mapSpacesSize;
  const height = MAP_SPACE_HEIGHT * game!.mapSpacesSize;

  return (
    <>
      <svg
        className="w-full h-[calc(100%-40px)] p-2"
        viewBox={`0, 0, ${width}, ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {game!.mapSpaces
          .flat()
          .map(
            (mapSpace) =>
              mapSpace && <MapSpace key={mapSpace.id} mapSpace={mapSpace} />
          )}
      </svg>
      <Group h="40px" justify="end">
        <GameInfo />
      </Group>
    </>
  );
}
