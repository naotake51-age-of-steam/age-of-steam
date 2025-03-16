"use server";

import { initializeGame } from "@age-of-steam/rust-belt-core";
import z from "zod";

export const initialize = async () => {
  return initializeGame();
};

import { db } from "@/app/lib/firebase-admin";
import { serverAction } from "@/app/lib/serverAction";

export const back = serverAction(
  z.object({ gameId: z.string() }),
  async function (authUser, input) {
    const gameRef = db.collection("games").doc(input.gameId);
    const latestHistoriesRef = db
      .collection("games")
      .doc(input.gameId)
      .collection("historiees")
      .orderBy("timestamp", "desc")
      .limit(1);

    const latestHistories = await latestHistoriesRef.get();
    if (latestHistories.size === 0) {
      return {
        status: "error",
        title: "エラー",
        message: "履歴がありません。",
      };
    }

    const latestHistory = latestHistories.docs[0];

    await gameRef.set(latestHistory.data().data);

    await latestHistory.ref.delete();

    return {
      status: "success",
      title: "戻る",
      message: "ゲーム状態が戻りました。",
    };
  }
);
