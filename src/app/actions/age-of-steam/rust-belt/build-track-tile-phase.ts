"use server";

import { BuildTrackPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _buildTrackTile = (
  phase: BuildTrackPhase,
  input: { trackTileId: number; rotation: number; mapSpaceId: number }
) => {
  return phase.actionBuildTrackTile(
    input.trackTileId,
    input.rotation,
    input.mapSpaceId
  );
};
export const buildTrackTile = phaseAction(
  BuildTrackPhase,
  z.object({
    trackTileId: z.number(),
    rotation: z.number().min(0).max(5),
    mapSpaceId: z.number(),
  }),
  _buildTrackTile
);

const _buildCityTile = (
  phase: BuildTrackPhase,
  input: { cityTileId: number; mapSpaceId: number }
) => {
  return phase.actionBuildCityTile(input.cityTileId, input.mapSpaceId);
};
export const buildCityTile = phaseAction(
  BuildTrackPhase,
  z.object({
    cityTileId: z.number(),
    mapSpaceId: z.number(),
  }),
  _buildCityTile
);

const _completeBuild = (phase: BuildTrackPhase) => {
  return phase.actionCompleteBuild();
};
export const completeBuild = phaseAction(
  BuildTrackPhase,
  z.object({}),
  _completeBuild
);
