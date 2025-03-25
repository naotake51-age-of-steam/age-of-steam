import {
  MAP_SPACE_HEIGHT,
  MAP_SPACE_WIDTH,
} from "@age-of-steam/fresh-fish-core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { MapSpace } from "./MapSpace";

export function Map() {
  const { game } = useContext(GameContext);

  const width = MAP_SPACE_WIDTH * game!.mapSpacesSize;
  const height = MAP_SPACE_HEIGHT * game!.mapSpacesSize;

  console.log(game?.mapSpaces);
  return (
    <svg
      className="w-full h-full p-2"
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
  );
}
