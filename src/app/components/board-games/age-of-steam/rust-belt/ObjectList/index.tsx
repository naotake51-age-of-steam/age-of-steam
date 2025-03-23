import { ScrollArea, Paper, Stack, Divider } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { CityTileList } from "./CityTileList";
import { GameRound } from "./GameRound";
import { GoodsDisplay } from "./GoodsDisplay";
import { TrackTileList } from "./TrackTileList";

export function ObjectList() {
  const {} = useContext(GameContext); // Gameが更新されたら再レンダリングする必要がある。

  return (
    <ScrollArea className="w-full h-full">
      <Paper className="w-full h-full p-2">
        <Stack className="w-full h-full p-2">
          <GameRound />
          <Divider label="線路タイル" />
          <TrackTileList />
          <Divider label="都市タイル" />
          <CityTileList />
          <Divider label="商品" />
          <GoodsDisplay />
        </Stack>
      </Paper>
    </ScrollArea>
  );
}
