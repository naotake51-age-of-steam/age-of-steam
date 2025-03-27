import { type UnderpaymentPhase } from "@age-of-steam/rust-belt-core";
import {
  Text,
  Stack,
  Group,
  Table,
  Divider,
  Button,
  Box,
  NumberFormatter,
} from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";
import clsx from "clsx";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { toPlayerColorCode } from "../util";
import { confirm } from "@/app/actions/age-of-steam/rust-belt/underpayment-phase";

export function UnderpaymentPhaseActionPrompt({
  phase,
}: {
  phase: UnderpaymentPhase;
}) {
  const { action } = useContext(GameContext);

  async function handleConfirm() {
    await action!(confirm, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="md">
        <Box>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>プレイヤー</Table.Th>
                <Table.Th>支払不足による減収</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {phase.playerUnderpayments.map((playerUnderpayment) => (
                <Table.Tr key={playerUnderpayment.player.id}>
                  <Table.Td>
                    <IconTrack
                      className={clsx(
                        playerUnderpayment.confirm || "animate-spin"
                      )}
                      style={{
                        animationDuration: "1.5s",
                      }}
                      color={toPlayerColorCode(playerUnderpayment.player.color)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerUnderpayment.player.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>
                      <NumberFormatter
                        prefix="$"
                        value={playerUnderpayment.reduceIncome}
                      />
                      <Text size="xs" c="#AAA" span>
                        （
                        <NumberFormatter
                          prefix="$"
                          value={playerUnderpayment.income}
                        />
                        ⇨
                        <NumberFormatter
                          prefix="$"
                          value={playerUnderpayment.afterIncome}
                        />
                        ）
                      </Text>
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
        {phase.canConfirm() && (
          <>
            <Divider orientation="vertical" />
            <Button onClick={handleConfirm}>確認</Button>
          </>
        )}
      </Group>
    </Stack>
  );
}
