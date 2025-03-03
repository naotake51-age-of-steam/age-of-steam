"use server";

import z from "zod";
import { db } from "@/app/lib/firebase-admin";
import { serverAction } from "@/app/lib/serverAction";

const MAX_ROOMS = 20;

export const createRoom = serverAction(
  z.object({
    name: z.string(),
  }),
  async function (authUser, input) {
    const roomsRef = db.collection("rooms");
    const gamesRef = db.collection("games");

    const roomsSnapshot = await roomsRef.get();
    if (roomsSnapshot.size >= MAX_ROOMS) {
      return {
        status: "error",
        title: "ルーム作成失敗",
        message: "ルームの数が上限に達しました。",
      };
    }

    const newGame = {
      type: "age-of-steam/pittsburgh",
      name: "ピッツバーグ",
    };
    const docGame = await gamesRef.add(newGame);

    const newRoom = {
      name: input.name,
      users: [],
      game: {
        id: docGame.id,
        ...newGame,
      },
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
