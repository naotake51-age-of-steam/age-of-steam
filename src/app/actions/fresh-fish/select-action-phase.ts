"use server";

import { SelectActionPhase } from "@age-of-steam/fresh-fish-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _selectPlaceMarkerAction = (phase: SelectActionPhase) => {
  return phase.actionSelectPlaceMarkerAction();
};
export const selectPlaceMarkerAction = phaseAction(
  SelectActionPhase,
  z.object({}),
  _selectPlaceMarkerAction
);

const _selectPlaceTileAction = (phase: SelectActionPhase) => {
  return phase.actionSelectPlaceTileAction();
};
export const selectPlaceTileAction = phaseAction(
  SelectActionPhase,
  z.object({}),
  _selectPlaceTileAction
);

const _selectPassAction = (phase: SelectActionPhase) => {
  return phase.actionSelectPassAction();
};
export const selectPassAction = phaseAction(
  SelectActionPhase,
  z.object({}),
  _selectPassAction
);
