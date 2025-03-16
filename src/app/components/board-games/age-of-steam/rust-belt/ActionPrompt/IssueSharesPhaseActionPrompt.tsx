import { IssueSharesPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Button, Group } from "@mantine/core";
import { useState } from "react";

import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { issueShares } from "@/app/actions/age-of-steam/rust-belt/issue-shares-phase";
import { Counter } from "@/app/components/Counter";

export function IssueSharesPhaseActionPrompt({
  phase,
}: {
  phase: IssueSharesPhase;
}) {
  const { action } = useContext(GameContext);
  const [count, setCount] = useState(0);

  async function handleSubmit() {
    await action!(issueShares, { count });
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.isTurnPlayer() && (
          <>
            <Counter
              value={count}
              onChange={setCount}
              min={0}
              max={phase.maxIssueShares()}
            />
            <Button onClick={handleSubmit}>決定</Button>
          </>
        )}
      </Group>
    </Stack>
  );
}
