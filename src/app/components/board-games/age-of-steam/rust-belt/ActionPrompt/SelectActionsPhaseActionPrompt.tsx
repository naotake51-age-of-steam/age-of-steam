import { Action, type SelectActionsPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Button } from "@mantine/core";
import { useContext } from "react";
import { match } from "ts-pattern";
import { GameContext } from "../GameProvider";
import { selectAction } from "@/app/actions/age-of-steam/rust-belt/select-actions-phase";

function toActionLabel(action: Action) {
  return match(action)
    .with(Action.FIRST_MOVE, () => "優先輸送")
    .with(Action.FIRST_BUILD, () => "優先建設")
    .with(Action.ENGINEER, () => "エンジニア")
    .with(Action.LOCOMOTIVE, () => "機関車")
    .with(Action.URBANIZATION, () => "都市建設")
    .with(Action.PRODUCTION, () => "商品")
    .with(Action.TURN_ORDER_PASS, () => "パス券")
    .run();
}

export function SelectActionsPhaseActionPrompt({
  phase,
}: {
  phase: SelectActionsPhase;
}) {
  const { action } = useContext(GameContext);

  async function handleSelectAction(selectedAction: Action) {
    await action!(selectAction, { action: selectedAction });
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs" justify="center">
        {phase.selectableActions.map((selectableAction) => (
          <Button
            key={selectableAction}
            w="110px"
            disabled={!phase.isTurnPlayer()}
            onClick={() => handleSelectAction(selectableAction)}
          >
            {toActionLabel(selectableAction)}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
