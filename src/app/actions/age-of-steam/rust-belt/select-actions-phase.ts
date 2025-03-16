"use server";

import { Action, SelectActionsPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _selectAction = (
  phase: SelectActionsPhase,
  input: { action: Action }
) => {
  return phase.actionSelectAction(input.action);
};
export const selectAction = phaseAction(
  SelectActionsPhase,
  z.object({
    action: z.nativeEnum(Action),
  }),
  _selectAction
);
