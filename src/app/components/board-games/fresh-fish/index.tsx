import { Divider } from "@mantine/core";
import { useContext } from "react";
import { ActionPrompt } from "./ActionPrompt/ActionPrompt";
import { GameProvider } from "./GameProvider";
import { Map } from "./Map";
import { PlayerList } from "./PlayerList";
import { AuthContext } from "@/app/providers/AuthProvider";

export default function FreshFish({ gameId }: { gameId: string }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <GameProvider
      gameId={gameId}
      userId={currentUser!.uid}
      userName={currentUser!.displayName ?? "名前なし"}
    >
      <div className="w-full h-[calc(100vh-60px)] flex">
        <div className="w-[15%] min-w-[220px]">
          <PlayerList />
        </div>
        <Divider orientation="vertical" />
        <div className="flex-1 min-w-[500px]">
          <div className="w-full h-[calc(100%-150px)]">
            <Map />
          </div>
          <div className="h-[150px]">
            <ActionPrompt />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}
