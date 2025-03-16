import {
  allTrackTileTypes,
  trackTiles,
  TrackTileType,
  spaceSize,
} from "@age-of-steam/rust-belt-core";
import { SimpleGrid, Badge } from "@mantine/core";
import { useContext, useState } from "react";
import { GameContext } from "../GameProvider";

export function TrackTileList() {
  return (
    <SimpleGrid cols={2}>
      {allTrackTileTypes.map((trackTileType) => (
        <RemainsTrackTile key={trackTileType} trackTileType={trackTileType} />
      ))}
    </SimpleGrid>
  );
}

function RemainsTrackTile({ trackTileType }: { trackTileType: TrackTileType }) {
  const { selectedObject, setSelectedObject } = useContext(GameContext);

  const [rotation, setRotation] = useState(0);

  const remainsTrackTiles = trackTiles.filter(
    (trackTile) => trackTile.type === trackTileType && !trackTile.isPlaced
  );

  if (remainsTrackTiles.length === 0) return null;

  const { height, width } = spaceSize;

  const trackTile = remainsTrackTiles[0];

  const isSelected = selectedObject?.instance === trackTile;

  function handleSelect() {
    if (isSelected) {
      const _rotation = (rotation + 1) % 6;

      setRotation(_rotation);

      setSelectedObject!({
        type: "TrackTile",
        instance: trackTile,
        rotation: _rotation,
      });
    } else {
      setSelectedObject!({
        type: "TrackTile",
        instance: trackTile,
        rotation,
      });
    }
  }

  return (
    <div className="relative cursor-pointer" onClick={handleSelect}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={70}
        height={70}
        viewBox={`0, 0, ${width}, ${height}`}
      >
        <image
          height={height}
          width={width}
          href="/age-of-steam/rust-belt/plain.svg"
        />
        {trackTile.lines.map((line) => {
          return (
            <use
              height={height}
              width={width}
              href={`/age-of-steam/rust-belt/${trackTile.image}#line-${line.baseDirection}`}
              key={line.baseDirection}
              stroke="#754c24"
              transform={`rotate(${rotation * 60}, ${width / 2}, ${
                height / 2
              })`}
            />
          );
        })}
        <image
          height={height}
          width={width}
          href={`/age-of-steam/rust-belt/${trackTile.image}`}
          stroke="#754c24"
          transform={`rotate(${rotation * 60}, ${width / 2}, ${height / 2})`}
        />
        {isSelected && (
          <image
            height={height}
            width={width}
            href="/age-of-steam/rust-belt/space-overlay-2.svg"
          />
        )}
      </svg>
      <Badge pos="absolute" top={0} right={0} size="sm">
        {remainsTrackTiles.length}
      </Badge>
    </div>
  );
}
