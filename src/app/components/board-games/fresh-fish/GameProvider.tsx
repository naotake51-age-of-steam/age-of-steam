import {
  Game,
  User,
  setContext,
  toInstance,
} from "@age-of-steam/fresh-fish-core";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { clsx } from "clsx";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { FC, createContext, useEffect, useState } from "react";
import { back as _back } from "@/app/actions/age-of-steam/rust-belt";
import { db } from "@/app/lib/firebase";

type GameContextProps = {
  game?: Game;
  action?: <T, R extends { status: string; title: string; message: string }>(
    action: (args: { gameId: string; input: T }) => Promise<R>,
    input: T
  ) => Promise<R>;
  back?: () => Promise<void>;
};

const GameContext = createContext<GameContextProps>({
  game: undefined,
  action: undefined,
  back: undefined,
});

interface GameProviderProps {
  gameId: string;
  userId: string;
  userName: string;
  children: React.ReactNode;
}

const GameProvider: FC<GameProviderProps> = ({
  gameId,
  userId,
  userName,
  children,
}) => {
  const [game, setGame] = useState<Game | undefined>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const gameRef = doc(collection(db, "games"), gameId);

    return onSnapshot(gameRef, (snapshot) => {
      const plain = snapshot.data();

      if (plain) {
        const game = toInstance(plain);
        setContext(game, new User(userId, userName));
        setGame(game);
      }
    });
  }, [gameId, userId, userName]);

  if (!game) {
    return null;
  }

  async function action<
    T,
    R extends { status: string; title: string; message: string }
  >(
    action: (args: { gameId: string; input: T }) => Promise<R>,
    input: T
  ): Promise<R> {
    try {
      setIsLoading(true);

      const response = await action({ gameId, input });

      if (response.status === "error") {
        notifications.show({
          color: "red",
          title: response.title,
          message: response.message,
        });
      }

      return response;
    } finally {
      setIsLoading(false);
    }
  }

  async function back() {
    try {
      setIsLoading(true);

      await _back({ gameId });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GameContext.Provider value={{ game, action, back }}>
      <div className={clsx("relative", isLoading && "pointer-events-none")}>
        {children}
        {isLoading && <Loader className="absolute top-1 right-1" />}
      </div>
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
