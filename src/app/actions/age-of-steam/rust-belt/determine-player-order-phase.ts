"use server";

import { DeterminePlayerOrderPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _bids = (phase: DeterminePlayerOrderPhase, input: { bids: number }) => {
  return phase.actionBids(input.bids);
};
export const bids = phaseAction(
  DeterminePlayerOrderPhase,
  z.object({
    bids: z.number().min(0),
  }),
  _bids
);

const _softPass = (phase: DeterminePlayerOrderPhase) => {
  return phase.actionSoftPass();
};
export const softPass = phaseAction(
  DeterminePlayerOrderPhase,
  z.object({}),
  _softPass
);

const _dropout = (phase: DeterminePlayerOrderPhase) => {
  return phase.actionDropout();
};
export const dropout = phaseAction(
  DeterminePlayerOrderPhase,
  z.object({}),
  _dropout
);
