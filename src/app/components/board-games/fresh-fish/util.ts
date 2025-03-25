import { PlayerColor } from "@age-of-steam/fresh-fish-core";

export function toPlayerColorCode(playerColor: PlayerColor) {
  switch (playerColor) {
    case PlayerColor.RED:
      return "#FF0000";
    case PlayerColor.BLUE:
      return "#0000FF";
    case PlayerColor.YELLOW:
      return "#DDDD33";
    case PlayerColor.PURPLE:
      return "#800080";
    case PlayerColor.BLACK:
      return "#000000";
  }
}

export function groupBy<T>(array: T[], key: keyof T): T[][] {
  const groups: Record<string, T[]> = {};

  for (const item of array) {
    const value = String(item[key]);
    if (!groups[value]) {
      groups[value] = [];
    }

    groups[value].push(item);
  }

  return Object.values(groups);
}
