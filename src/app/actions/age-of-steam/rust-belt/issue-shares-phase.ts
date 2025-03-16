"use server";

import { IssueSharesPhase } from "@age-of-steam/rust-belt-core";
import z from "zod";
import { phaseAction } from "./util";

// TODO:: https://github.com/vercel/next.js/issues/75859 の修正待ち

const _issueShares = (phase: IssueSharesPhase, input: { count: number }) => {
  return phase.actionIssueShares(input.count);
};
export const issueShares = phaseAction(
  IssueSharesPhase,
  z.object({
    count: z.number().min(0),
  }),
  _issueShares
);
