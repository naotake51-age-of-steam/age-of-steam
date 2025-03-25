"use server";

import { PlaceWallTilePhase } from "@age-of-steam/fresh-fish-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _placeMapSpace = (
  phase: PlaceWallTilePhase,
  input: { mapSpaceId: number }
) => {
  return phase.actionPlaceMapSpace(input.mapSpaceId);
};
export const placeMapSpace = phaseAction(
  PlaceWallTilePhase,
  z.object({
    mapSpaceId: z.number(),
  }),
  _placeMapSpace
);
