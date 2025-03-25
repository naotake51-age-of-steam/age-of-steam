import { initializeGame, toPlain } from "@age-of-steam/fresh-fish-core";

export const initialize = async () => {
  return toPlain(initializeGame());
};
