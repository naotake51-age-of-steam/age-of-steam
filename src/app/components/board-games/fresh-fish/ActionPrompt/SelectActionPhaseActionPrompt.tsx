import { SelectActionPhase } from "@age-of-steam/fresh-fish-core";
import { Text, Stack, Button, Group } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import {
  selectPlaceMarkerAction,
  selectPlaceTileAction,
  selectPassAction,
} from "@/app/actions/fresh-fish/select-action-phase";

export function SelectActionPhaseActionPrompt({
  phase,
}: {
  phase: SelectActionPhase;
}) {
  const { action } = useContext(GameContext);

  async function handelSelectPlaceMakerAction() {
    await action!(selectPlaceMarkerAction, {});
  }

  async function handleSelectPlaceTileAction() {
    await action!(selectPlaceTileAction, {});
  }

  async function handleSelectPassAction() {
    await action!(selectPassAction, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xl">
        {phase.isTurnPlayer() && (
          <>
            <Button
              onClick={handelSelectPlaceMakerAction}
              disabled={!phase.canSelectPlaceMarkerAction()}
            >
              マーカー配置
            </Button>
            <Button
              onClick={handleSelectPlaceTileAction}
              disabled={!phase.canSelectPlaceTileAction()}
            >
              タイルドロー
            </Button>
            <Button
              onClick={handleSelectPassAction}
              disabled={!phase.canSelectPassAction()}
            >
              パス
            </Button>
          </>
        )}
      </Group>
    </Stack>
  );
}
