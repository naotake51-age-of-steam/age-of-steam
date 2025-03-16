import {
  type MapSpace as MapSpaceClass,
  spaceSize,
  BuildTrackPhase,
} from "@age-of-steam/rust-belt-core";
import clsx from "clsx";
import React, { useContext } from "react";
import { buildCityTile } from "../../../../../actions/age-of-steam/rust-belt/build-track-tile-phase";
import { GameContext } from "../GameProvider";
import { toPlayerColorCode } from "../util";
import { buildTrackTile } from "@/app/actions/age-of-steam/rust-belt/build-track-tile-phase";

export function MapSpace({ mapSpace }: { mapSpace: MapSpaceClass }) {
  const { game, action, selectedObject, setSelectedObject } =
    useContext(GameContext);

  const phase = game!.phase;

  const isSelectableByBuildTrack =
    phase instanceof BuildTrackPhase &&
    phase.isTurnPlayer() &&
    selectedObject?.type === "TrackTile" &&
    phase.canBuildTrackTile(
      selectedObject.instance.id,
      selectedObject.rotation,
      mapSpace.id
    );

  const isSelectableByBuildCity =
    phase instanceof BuildTrackPhase &&
    phase.isTurnPlayer() &&
    selectedObject?.type === "CityTile" &&
    phase.canBuildCityTile(selectedObject.instance.id, mapSpace.id);

  const { width, height } = spaceSize;
  const { x, y } = mapSpace;

  const { trackTile, townMarker } = mapSpace;

  const cityTile = mapSpace.cityTile;

  async function handleOnClick() {
    if (isSelectableByBuildTrack) {
      setSelectedObject!(null);

      await action!(buildTrackTile, {
        trackTileId: selectedObject.instance.id,
        rotation: selectedObject.rotation,
        mapSpaceId: mapSpace.id,
      });
    }
    if (isSelectableByBuildCity) {
      await action!(buildCityTile, {
        cityTileId: selectedObject.instance.id,
        mapSpaceId: mapSpace.id,
      });
    }
  }

  return (
    <g
      className={clsx(
        "group",
        isSelectableByBuildTrack || isSelectableByBuildCity
          ? "cursor-pointer"
          : "pointer-events-none"
      )}
      onClick={handleOnClick}
    >
      <image
        height={height}
        href={"/age-of-steam/rust-belt/" + mapSpace.image}
        width={width}
        x={x}
        y={y}
      />
      {trackTile && (
        <>
          {trackTile.lines.map((line) => {
            const color = line.owner
              ? toPlayerColorCode(line.owner.color)
              : "#754c24";
            return (
              <use
                height={height}
                href={`/age-of-steam/rust-belt/${trackTile.image}#line-${line.baseDirection}`}
                key={line.baseDirection}
                stroke={color}
                transform={`rotate(${trackTile.rotation * 60}, ${
                  x + width / 2
                }, ${y + height / 2})`}
                width={width}
                x={x}
                y={y}
              />
            );
          })}
          <image
            height={height}
            href={`/age-of-steam/rust-belt/${trackTile.image}`}
            transform={`rotate(${trackTile.rotation * 60}, ${
              mapSpace.x + width / 2
            }, ${mapSpace.y + height / 2})`}
            width={width}
            x={mapSpace.x}
            y={mapSpace.y}
          />
        </>
      )}
      {townMarker && (
        <image
          height={height}
          href="/age-of-steam/rust-belt/town-marker.svg"
          width={width}
          x={x}
          y={y}
        />
      )}
      {cityTile && (
        <image
          height={height}
          href={"/age-of-steam/rust-belt/" + cityTile.image}
          width={width}
          x={x}
          y={y}
        />
      )}
      {(isSelectableByBuildTrack || isSelectableByBuildCity) && (
        <>
          <image
            height={height}
            width={width}
            href="/age-of-steam/rust-belt/space-overlay-2.svg"
            x={x}
            y={y}
          />
          <image
            className="opacity-0 group-hover:opacity-100"
            height={height}
            width={width}
            href="/age-of-steam/rust-belt/space-overlay.svg"
            x={x}
            y={y}
          />
        </>
      )}
    </g>
  );
}
