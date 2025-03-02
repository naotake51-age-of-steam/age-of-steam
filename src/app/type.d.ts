export type GameType =
  | "age-of-steam/pittsburgh"
  | "age-of-steam/southern-china";

export interface User {
  id: string;
  name: string;
}

export interface Game {
  type: GameType;
  id: string;
  name: string;
}

export interface Room {
  id: string;
  name: string;
  timestamp: number;
  users: User[];
  game: Game;
}
