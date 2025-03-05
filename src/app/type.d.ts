export type GameType = "age-of-steam/rust-belt" | "age-of-steam/western-us";

export interface User {
  id: string;
  name: string;
}

export interface Game {
  id: string;
  type: GameType;
}

export interface Room {
  id: string;
  name: string;
  timestamp: number;
  users: User[];
  game: Game | null;
}
