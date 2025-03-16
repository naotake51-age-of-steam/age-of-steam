"use server";

import { ProductionPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _produceGoodsCubes = (phase: ProductionPhase) => {
  return phase.actionProduceGoodsCubes();
};
export const produceGoodsCubes = phaseAction(
  ProductionPhase,
  z.object({}),
  _produceGoodsCubes
);

const _passProduction = (phase: ProductionPhase) => {
  return phase.actionPassProduction();
};
export const passProduction = phaseAction(
  ProductionPhase,
  z.object({}),
  _passProduction
);

const _completeProduction = (phase: ProductionPhase) => {
  return phase.actionCompleteProduction();
};
export const completeProduction = phaseAction(
  ProductionPhase,
  z.object({}),
  _completeProduction
);

const _placeToGoodsDisplayLine = (
  phase: ProductionPhase,
  input: { goodsDisplayLineId: number; goodsCubeId: number }
) => {
  return phase.actionPlaceToGoodsDisplayLine(
    input.goodsDisplayLineId,
    input.goodsCubeId
  );
};
export const placeToGoodsDisplayLine = phaseAction(
  ProductionPhase,
  z.object({
    goodsDisplayLineId: z.number(),
    goodsCubeId: z.number(),
  }),
  _placeToGoodsDisplayLine
);
