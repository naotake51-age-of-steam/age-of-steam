import { Box } from "@mantine/core";
import { getGameConfig } from "@/app/lib/gameConfigs";
import type { Game } from "@/app/type";

export function BoardGame({ game }: { game: Game | null }) {
  return (
    <Box w="100%" h="100%" bg="#f0f0f0">
      {game && getGameConfig(game.type).component(game.id)}
    </Box>
  );
}
