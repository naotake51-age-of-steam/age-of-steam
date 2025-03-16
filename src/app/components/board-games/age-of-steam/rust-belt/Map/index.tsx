import {
  mapSpaces,
  BOARD_HEIGHT,
  BOARD_WIDTH,
} from "@age-of-steam/rust-belt-core";
import { MapSpace } from "./MapSpace";
import { MapSpaceGoodsCubes } from "./MapSpaceGoodsCubes";
import { SelectMoveGoodsDirection } from "./SelectMoveGoodsDirection";

export function Map() {
  return (
    <svg
      className="w-full h-full p-2"
      viewBox={`0, 0, ${BOARD_WIDTH}, ${BOARD_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {mapSpaces.map(
        (mapSpace) =>
          mapSpace && <MapSpace key={mapSpace.id} mapSpace={mapSpace} />
      )}
      {mapSpaces.map(
        (mapSpace) =>
          mapSpace && (
            <MapSpaceGoodsCubes key={mapSpace.id} mapSpace={mapSpace} />
          )
      )}
      <SelectMoveGoodsDirection />
    </svg>
  );
}
