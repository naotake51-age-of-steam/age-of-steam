"use server";

import { PlaceWallOrRoadTilePhase } from "@age-of-steam/fresh-fish-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const __placeMapSpace = (
  phase: PlaceWallOrRoadTilePhase,
  input: { mapSpaceId: number; type: "RoadTile" | "WallTile" }
) => {
  return phase.actionPlaceMapSpace(input.mapSpaceId, input.type);
};
export const placeMapSpace = phaseAction(
  PlaceWallOrRoadTilePhase,
  z.object({
    mapSpaceId: z.number(),
    type: z.union([z.literal("RoadTile"), z.literal("WallTile")]),
  }),
  __placeMapSpace
);

const __pass = (phase: PlaceWallOrRoadTilePhase) => {
  return phase.actionPass();
};
export const pass = phaseAction(PlaceWallOrRoadTilePhase, z.object({}), __pass);
