import { lazy } from "react";

const RustBelt = lazy(
  () => import("@/app/components/board-games/age-of-steam/rust-belt")
);
const WesternUs = lazy(
  () => import("@/app/components/board-games/age-of-steam/western-us")
);

export interface GameConfig {
  type: string;
  name: string;
  image: string;
  description: string;
  numberOfPlayers: string;
  component: (gameId: string) => React.ReactNode;
}

export const gameConfigs: GameConfig[] = [
  {
    type: "age-of-steam/rust-belt",
    name: "Rust Belt",
    image: "/age-of-steam/rust-belt.png",
    description: "基本マップ",
    numberOfPlayers: "3-6人",
    component: (gameId: string) => <RustBelt gameId={gameId} />,
  },
  {
    type: "age-of-steam/western-us",
    name: "Western U.S.",
    image: "/age-of-steam/western-us.jpg",
    description: "アメリカ西部マップ",
    numberOfPlayers: "3-6人",
    component: (gameId: string) => <WesternUs gameId={gameId} />,
  },
] as const;

export const getGameConfig = (type: string) => {
  const game = gameConfigs.find((game) => game.type === type);
  if (!game) {
    throw new Error(`GameConfig not found: ${type}`);
  }

  return game;
};
