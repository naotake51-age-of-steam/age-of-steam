import { type DeterminePlayerOrderPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Button, Divider, Box } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";
import { clsx } from "clsx";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../GameProvider";
import { toPlayerColorCode } from "../util";
import {
  bids as actionBids,
  dropout,
  softPass,
} from "@/app/actions/age-of-steam/rust-belt/determine-player-order-phase";
import { Counter } from "@/app/components/Counter";

export function DeterminePlayerOrderPhaseActionPrompt({
  phase,
}: {
  phase: DeterminePlayerOrderPhase;
}) {
  const { action } = useContext(GameContext);
  const [bids, setBids] = useState(1);

  useEffect(() => {
    // 手番が何度も回ってくる事があるので、入力値をリセットする必要がある
    setBids(phase.minBids());
  }, [phase]);

  async function handleBit() {
    await action!(actionBids, { bids });
  }

  async function handleSoftPass() {
    await action!(softPass, {});
  }

  async function handleDropout() {
    await action!(dropout, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group>
        {phase.playerBids.map((playerBid) => (
          <Group
            key={playerBid.player.id}
            gap="xs"
            c={playerBid.order === null ? "black" : "gray"}
          >
            <IconTrack
              className={clsx(playerBid.player.hasTurn && "animate-spin")}
              style={{
                animationDuration: "1.5s",
              }}
              color={toPlayerColorCode(playerBid.player.color)}
            />
            <Text>{playerBid.player.name}</Text>
            {playerBid.money !== 0 && (
              <Box className="border rounded px-2">
                <Text>${playerBid.money}</Text>
              </Box>
            )}
            {playerBid.canSoftPass && (
              <Box className="border rounded px-2">
                <Text>パス券</Text>
              </Box>
            )}
            {playerBid.order !== null && (
              <Box className="border rounded px-2">
                <Text>{playerBid.order}番手</Text>
              </Box>
            )}
          </Group>
        ))}
      </Group>
      <Group gap="xs">
        {phase.isTurnPlayer() && (
          <>
            {phase.canBids() && (
              <>
                <Counter
                  value={bids}
                  onChange={setBids}
                  min={phase.minBids()}
                  max={phase.maxBids()}
                />
                <Button onClick={handleBit}>決定</Button>
                <Divider orientation="vertical" />
              </>
            )}
            {phase.canSoftPass() && (
              <>
                <Button onClick={handleSoftPass}>パス</Button>
                <Divider orientation="vertical" />
              </>
            )}
            <Button onClick={handleDropout}>降りる</Button>
          </>
        )}
      </Group>
    </Stack>
  );
}
