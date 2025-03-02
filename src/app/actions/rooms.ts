"use server";

import z from "zod";
import { db } from "@/app/lib/firebase-admin";
import { serverAction } from "@/app/lib/serverAction";
import type { User } from "@/app/type";

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

export const enterRoom = serverAction(
  z.object({
    roomId: z.string(),
  }),
  async function (authUser, input) {
    const roomRef = db.collection("rooms").doc(input.roomId);
    const userRef = db.collection("users").doc(authUser.uid);

    const docRoomSnap = await roomRef.get();
    const docUserSnap = await userRef.get();

    const users: User[] = docRoomSnap.data()!.users;

    const enterUser = {
      id: docUserSnap.id,
      ...docUserSnap.data(),
    };

    const newRoomUsers = users.some((user) => user.id === authUser.uid)
      ? users
      : [...users, enterUser];

    const newRoom = {
      id: docRoomSnap.id,
      users: newRoomUsers,
      ...docRoomSnap.data(),
    };

    await roomRef.set(newRoom);

    return {
      status: "success",
      title: "ルーム入室",
      message: "ルームに入室しました。",
    };
  }
);
