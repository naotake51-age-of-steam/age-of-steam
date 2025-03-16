"use server";

import { MoveGoodsPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _incrementLocomotive = (phase: MoveGoodsPhase) => {
  return phase.actionIncrementLocomotive();
};
export const incrementLocomotive = phaseAction(
  MoveGoodsPhase,
  z.object({}),
  _incrementLocomotive
);

const _pass = (phase: MoveGoodsPhase) => {
  return phase.actionPass();
};
export const pass = phaseAction(MoveGoodsPhase, z.object({}), _pass);

const _selectGoodsCube = (
  phase: MoveGoodsPhase,
  input: { goodsCubeId: number }
) => {
  return phase.actionSelectGoodsCube(input.goodsCubeId);
};
export const selectGoodsCube = phaseAction(
  MoveGoodsPhase,
  z.object({
    goodsCubeId: z.number(),
  }),
  _selectGoodsCube
);

const _moveGoodsCube = (
  phase: MoveGoodsPhase,
  input: { direction: number }
) => {
  return phase.actionMoveGoodsCube(input.direction);
};
export const moveGoodsCube = phaseAction(
  MoveGoodsPhase,
  z.object({
    direction: z.number(),
  }),
  _moveGoodsCube
);

const _completeMoving = (phase: MoveGoodsPhase) => {
  return phase.actionCompleteMoving();
};
export const completeMoving = phaseAction(
  MoveGoodsPhase,
  z.object({}),
  _completeMoving
);
