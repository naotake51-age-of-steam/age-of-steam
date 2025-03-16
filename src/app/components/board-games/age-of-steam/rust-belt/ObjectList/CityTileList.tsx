import { CityTile, spaceSize, cityTiles } from "@age-of-steam/rust-belt-core";
import { SimpleGrid } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";

export function CityTileList() {
  const remainsCityTiles = cityTiles.filter((cityTile) => !cityTile.isPlaced);

  return (
    <SimpleGrid cols={2}>
      {remainsCityTiles.map((cityTile) => (
        <RemainsCityTile key={cityTile.id} cityTile={cityTile} />
      ))}
    </SimpleGrid>
  );
}

function RemainsCityTile({ cityTile }: { cityTile: CityTile }) {
  const { selectedObject, setSelectedObject } = useContext(GameContext);

  const { height, width } = spaceSize;

  const isSelected = selectedObject?.instance === cityTile;

  function handleSelect() {
    setSelectedObject!({
      type: "CityTile",
      instance: cityTile,
    });
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
          href={`/age-of-steam/rust-belt/${cityTile.image}`}
        />
        {isSelected && (
          <image
            height={height}
            width={width}
            href="/age-of-steam/rust-belt/space-overlay-2.svg"
          />
        )}
      </svg>
    </div>
  );
}
