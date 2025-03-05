import { Box } from "@mantine/core";
import { getGameConfig } from "@/app/lib/gameConfigs";
import type { Game } from "@/app/type";

export function BoardGame({ game }: { game: Game | null }) {
  const gameConfig = game ? getGameConfig(game.type) : null;

  return (
    <Box w="100%" h="100%" bg="#f0f0f0">
      {gameConfig && gameConfig.component}
    </Box>
  );
}
