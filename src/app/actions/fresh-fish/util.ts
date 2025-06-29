import {
  Game,
  GameError,
  Phase,
  toInstance,
  toPlain,
  User,
  withContext,
  hasDelayExecute,
} from "@age-of-steam/fresh-fish-core";
import { FieldValue } from "firebase-admin/firestore";
import z from "zod";
import { db } from "@/app/lib/firebase-admin";
import { serverAction } from "@/app/lib/serverAction";

function gameAction<Schema extends z.Schema>(
  inputSchema: Schema,
  action: (game: Game, input: z.infer<Schema>) => Game
) {
  return serverAction(
    z.object({
      gameId: z.string(),
      input: inputSchema,
    }),
    async (authUser, input) => {
      try {
        const gameRef = db.collection("games").doc(input.gameId);
        const historiesRef = db
          .collection("games")
          .doc(input.gameId)
          .collection("histories");

        const plain = (await gameRef.get()).data();
        if (!plain) {
          return {
            status: "error",
            title: "エラー",
            message: "ゲームデータが見つかりません。",
          };
        }

        const game = toInstance(plain);
        const user = new User(authUser.uid, authUser.name ?? "名前なし");

        const updatedGame = withContext(game, user, () => {
          return action(game, input.input);
        });

        await historiesRef.add({
          data: plain,
          timestamp: FieldValue.serverTimestamp(),
        });

        await gameRef.set(toPlain(updatedGame));

        runDelayExecute(input.gameId, updatedGame, user);

        return {
          status: "success",
          title: "アクション実行",
          message: "アクションを実行しました。",
        };
      } catch (e) {
        if (e instanceof GameError) {
          return {
            status: "error",
            title: "エラー",
            message: e.message,
          };
        }

        console.error(e);

        return {
          status: "error",
          title: "エラー",
          message: "不明なエラーが発生しました。",
        };
      }
    }
  );
}

function runDelayExecute(gameId: string, game: Game, user: User) {
  const gameRef = db.collection("games").doc(gameId);

  const phase = game.phase;
  if (hasDelayExecute(phase)) {
    setTimeout(() => {
      const updatedGame = withContext(game, user, () => phase.executeDelay());
      gameRef.set(toPlain(updatedGame));

      runDelayExecute(gameId, updatedGame, user);
    }, 1000 * 0);
  }
}

export function phaseAction<P extends Phase, Schema extends z.Schema>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  phaseType: new (...args: any[]) => P,
  inputSchema: Schema,
  action: (phase: P, input: z.infer<Schema>) => Game
) {
  return gameAction(inputSchema, (game, input) => {
    const phase = game.phase;
    if (!(phase instanceof phaseType)) {
      throw new GameError(
        "現在のゲームフェーズでは実行できないアクションです。"
      );
    }

    return action(phase, input);
  });
}
