"use server";

import { PlayerColor, WaitingStartPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _joinUser = (phase: WaitingStartPhase, input: { color: PlayerColor }) => {
  return phase.actionJoinUser(input.color);
};
export const joinUser = phaseAction(
  WaitingStartPhase,
  z.object({
    color: z.nativeEnum(PlayerColor),
  }),
  _joinUser
);

const _removeUser = (phase: WaitingStartPhase) => {
  return phase.actionRemoveUser();
};
export const removeUser = phaseAction(WaitingStartPhase, z.object({}), _removeUser);

const _startGame = (phase: WaitingStartPhase) => {
  return phase.actionStartGame();
};
export const startGame = phaseAction(WaitingStartPhase, z.object({}), _startGame);
