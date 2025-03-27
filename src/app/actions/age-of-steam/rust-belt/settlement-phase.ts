"use server";

import { SettlementPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _confirm = (phase: SettlementPhase) => {
  return phase.actionConfirm();
};
export const confirm = phaseAction(SettlementPhase, z.object({}), _confirm);
