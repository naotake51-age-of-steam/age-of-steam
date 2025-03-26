import {
  PlaceMarkerPhase,
  type MapSpace as MapSpaceClass,
} from "@age-of-steam/fresh-fish-core";
// import clsx from "clsx";
import {
  PlaceWallTilePhase,
  AuctionAndPlaceOutletTilePhase,
} from "@age-of-steam/fresh-fish-core";
import { PlaceWallOrRoadTilePhase } from "@age-of-steam/fresh-fish-core";
import React, { useContext } from "react";
import { GameContext } from "../GameProvider";
import { placeMapSpace as placeMapSpaceForAuctionAndPlaceOutletTilePhase } from "@/app/actions/fresh-fish/auction-outlet-tile-phase";
import { placeMapSpace as placeMapSpaceForPlaceMarkerPhase } from "@/app/actions/fresh-fish/place-marker-phase";
import { placeMapSpace as placeMapSpaceForPlaceWallOrRoadTilePhase } from "@/app/actions/fresh-fish/place-wall-or-road-tile-phase";
import { placeMapSpace as placeMapSpaceForPlaceWallTilePhase } from "@/app/actions/fresh-fish/place-wall-tile-phase";

export function MapSpace({ mapSpace }: { mapSpace: MapSpaceClass }) {
  const { game, action, selectedTileType, setSelectedTypeType } =
    useContext(GameContext);

  const {
    x,
    y,
    width,
    height,
    image,
    selectableImage,
    activeImage,
    centerTile,
    wallTile,
    outletTile,
    roadTile,
    marker,
  } = mapSpace;

  const isSelectableForPlaceMarkerPhase =
    game?.phase instanceof PlaceMarkerPhase &&
    game?.phase.canPlaceMapSpace(mapSpace);

  const isSelectableForPlaceWallTilePhase =
    game?.phase instanceof PlaceWallTilePhase &&
    game?.phase.canPlaceMapSpace(mapSpace);

  const isSelectableForAuctionAndPlaceOutletTilePhase =
    game?.phase instanceof AuctionAndPlaceOutletTilePhase &&
    game?.phase.canPlaceMapSpace(mapSpace);

  const isSelectableForPlaceWallOrRoadTilePhase =
    game?.phase instanceof PlaceWallOrRoadTilePhase &&
    game?.phase.canPlaceMapSpace(mapSpace) &&
    selectedTileType !== null;

  const isSelectable =
    isSelectableForPlaceMarkerPhase ||
    isSelectableForPlaceWallTilePhase ||
    isSelectableForAuctionAndPlaceOutletTilePhase ||
    isSelectableForPlaceWallOrRoadTilePhase;

  async function handleSelectMapSpace() {
    if (isSelectableForPlaceMarkerPhase) {
      await action!(placeMapSpaceForPlaceMarkerPhase, {
        mapSpaceId: mapSpace.id,
      });
    }
    if (isSelectableForPlaceWallTilePhase) {
      await action!(placeMapSpaceForPlaceWallTilePhase, {
        mapSpaceId: mapSpace.id,
      });
    }
    if (isSelectableForAuctionAndPlaceOutletTilePhase) {
      await action!(placeMapSpaceForAuctionAndPlaceOutletTilePhase, {
        mapSpaceId: mapSpace.id,
      });
    }
    if (isSelectableForPlaceWallOrRoadTilePhase) {
      await action!(placeMapSpaceForPlaceWallOrRoadTilePhase, {
        mapSpaceId: mapSpace.id,
        type: selectedTileType!,
      });

      setSelectedTypeType(null);
    }
  }

  return (
    <g className="group">
      <image
        height={height}
        href={"/fresh-fish/" + image}
        width={width}
        x={x}
        y={y}
      />
      {centerTile && (
        <image
          height={height}
          href={"/fresh-fish/" + centerTile.image}
          width={width}
          x={x}
          y={y}
        />
      )}
      {wallTile && (
        <image
          height={height}
          href={"/fresh-fish/" + wallTile.image}
          width={width}
          x={x}
          y={y}
        />
      )}
      {outletTile && (
        <image
          height={height}
          href={"/fresh-fish/" + outletTile.image}
          width={width}
          x={x}
          y={y}
        />
      )}
      {roadTile && (
        <image
          height={height}
          href={"/fresh-fish/" + roadTile.image}
          width={width}
          x={x}
          y={y}
        />
      )}
      {marker && (
        <image
          height={marker.height}
          href={"/fresh-fish/" + marker.image}
          width={marker.width}
          x={x + 5}
          y={y + 5}
        />
      )}
      {isSelectable && (
        <>
          <image
            height={height}
            href={"/fresh-fish/" + selectableImage}
            width={width}
            x={x}
            y={y}
          />
          <image
            className="opacity-0 group-hover:opacity-100 cursor-pointer"
            onClick={() => handleSelectMapSpace()}
            height={height}
            href={"/fresh-fish/" + activeImage}
            width={width}
            x={x}
            y={y}
          />
        </>
      )}
    </g>
  );
}
