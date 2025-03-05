"use server";

import z from "zod";
import { db } from "@/app/lib/firebase-admin";
import { getGameConfig } from "@/app/lib/gameConfigs";
import { serverAction } from "@/app/lib/serverAction";

const MAX_ROOMS = 20;

export const createRoom = serverAction(
  z.object({
    name: z.string(),
  }),
  async function (authUser, input) {
    const roomsRef = db.collection("rooms");

    const roomsSnapshot = await roomsRef.get();
    if (roomsSnapshot.size >= MAX_ROOMS) {
      return {
        status: "error",
        title: "ルーム作成失敗",
        message: "ルームの数が上限に達しました。",
      };
    }

    const newRoom = {
      name: input.name,
      users: [],
      game: null,
      timestamp: new Date().getTime(),
    };
    await roomsRef.add(newRoom);

    return {
      status: "success",
      title: "ルーム作成",
      message: "ルームを作成しました。",
    };
  }
);

export const detachGame = serverAction(
  z.object({
    roomId: z.string(),
  }),
  async function (authUser, input) {
    const roomRef = db.collection("rooms").doc(input.roomId);
    const roomSnapshot = await roomRef.get();
    const room = roomSnapshot.data();
    if (!room) {
      return {
        status: "error",
        title: "ゲーム削除失敗",
        message: "ルームが見つかりません。",
      };
    }
    if (!room.game) {
      return {
        status: "success",
        title: "ゲーム削除",
        message: "ゲームは既に削除されています。",
      };
    }

    await roomRef.set({
      ...room,
      game: null,
    });

    return {
      status: "success",
      title: "ゲーム削除",
      message: "ゲームを削除しました。",
    };
  }
);

export const sendMessage = serverAction(
  z.object({
    roomId: z.string(),
    text: z.string(),
  }),
  async function (authUser, input) {
    const newMessage = {
      text: input.text,
      sender: {
        id: authUser.uid,
        name: authUser.name,
      },
      timestamp: new Date().getTime(),
    };

    await db
      .collection("rooms")
      .doc(input.roomId)
      .collection("messages")
      .add(newMessage);

    return {
      status: "success",
      title: "メッセージ送信",
      message: "メッセージを送信しました。",
    };
  }
);

export const createGame = serverAction(
  z.object({
    roomId: z.string(),
    gameType: z.string(),
  }),
  async function (authUser, input) {
    const roomRef = db.collection("rooms").doc(input.roomId);
    const roomSnapshot = await roomRef.get();
    const room = roomSnapshot.data();
    if (!room) {
      return {
        status: "error",
        title: "ゲーム作成失敗",
        message: "ルームが見つかりません。",
      };
    }
    if (room.game) {
      return {
        status: "error",
        title: "ゲーム作成失敗",
        message:
          "既にゲームが選択されています。ゲームを変更するには一度、ゲーム終了してから再選択してください。",
      };
    }

    const gameConfig = getGameConfig(input.gameType);

    const gamesRef = db.collection("games");
    const newGame = gameConfig.initialize();

    const game = await gamesRef.add(newGame);

    await roomRef.set({
      ...room,
      game: {
        type: gameConfig.type,
        id: game.id,
      },
    });

    return {
      status: "success",
      title: "ゲーム作成",
      message: "ゲームを作成しました。",
    };
  }
);
