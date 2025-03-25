"use server";

import { AuctionAndPlaceOutletTilePhase } from "@age-of-steam/fresh-fish-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _bids = (
  phase: AuctionAndPlaceOutletTilePhase,
  input: { bids: number }
) => {
  return phase.actionBids(input.bids);
};
export const bids = phaseAction(
  AuctionAndPlaceOutletTilePhase,
  z.object({
    bids: z.number(),
  }),
  _bids
);

const _placeMapSpace = (
  phase: AuctionAndPlaceOutletTilePhase,
  input: { mapSpaceId: number }
) => {
  return phase.actionPlaceMapSpace(input.mapSpaceId);
};
export const placeMapSpace = phaseAction(
  AuctionAndPlaceOutletTilePhase,
  z.object({
    mapSpaceId: z.number(),
  }),
  _placeMapSpace
);
