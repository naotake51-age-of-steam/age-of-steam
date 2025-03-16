import { Action, PlayerColor } from "@age-of-steam/rust-belt-core";
import { match } from "ts-pattern";

export function toPlayerColorCode(playerColor: PlayerColor) {
  switch (playerColor) {
    case PlayerColor.RED:
      return "#FF0000";
    case PlayerColor.BLUE:
      return "#0000FF";
    case PlayerColor.GREEN:
      return "#008000";
    case PlayerColor.YELLOW:
      return "#DDDD33";
    case PlayerColor.PINK:
      return "#FF1493";
    case PlayerColor.GRAY:
      return "#808080";
    case PlayerColor.ORANGE:
      return "#FFA500";
  }
}

export function toActionLabel(action: Action) {
  return match(action)
    .with(Action.FIRST_MOVE, () => "優先輸送")
    .with(Action.FIRST_BUILD, () => "優先建設")
    .with(Action.ENGINEER, () => "エンジニア")
    .with(Action.LOCOMOTIVE, () => "機関車")
    .with(Action.URBANIZATION, () => "都市建設")
    .with(Action.PRODUCTION, () => "商品")
    .with(Action.TURN_ORDER_PASS, () => "パス券")
    .run();
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
