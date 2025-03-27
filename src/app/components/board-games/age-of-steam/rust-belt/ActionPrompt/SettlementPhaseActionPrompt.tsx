import { type SettlementPhase } from "@age-of-steam/rust-belt-core";
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
import { confirm } from "@/app/actions/age-of-steam/rust-belt/settlement-phase";

export function SettlementPhaseActionPrompt({
  phase,
}: {
  phase: SettlementPhase;
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
                <Table.Th>収入</Table.Th>
                <Table.Th>支払</Table.Th>
                <Table.Th>減収</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {phase.playerSettlements.map((playerSettlement) => (
                <Table.Tr key={playerSettlement.player.id}>
                  <Table.Td>
                    <IconTrack
                      className={clsx(
                        playerSettlement.confirm || "animate-spin"
                      )}
                      style={{
                        animationDuration: "1.5s",
                      }}
                      color={toPlayerColorCode(playerSettlement.player.color)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerSettlement.player.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>
                      <NumberFormatter
                        prefix="$"
                        value={playerSettlement.income}
                      />
                      <Text size="xs" c="#AAA" span>
                        （
                        <NumberFormatter
                          prefix="$"
                          value={playerSettlement.money}
                        />
                        ⇨
                        <NumberFormatter
                          prefix="$"
                          value={playerSettlement.afterMoneyByIncome}
                        />
                        ）
                      </Text>
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>
                      <NumberFormatter
                        prefix="$"
                        value={playerSettlement.payment}
                      />
                      <Text size="xs" c="#AAA" span>
                        （
                        <NumberFormatter
                          prefix="$"
                          value={playerSettlement.afterMoneyByIncome}
                        />
                        ⇨
                        <NumberFormatter
                          prefix="$"
                          value={playerSettlement.afterMoneyByPayment}
                        />
                        ）
                      </Text>
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>
                      <NumberFormatter
                        prefix="$"
                        value={playerSettlement.reduceIncome}
                      />
                      <Text size="xs" c="#AAA" span>
                        （
                        <NumberFormatter
                          prefix="$"
                          value={playerSettlement.income}
                        />
                        ⇨
                        <NumberFormatter
                          prefix="$"
                          value={playerSettlement.afterIncome}
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
            <Button onClick={handleConfirm}>次へ</Button>
          </>
        )}
      </Group>
    </Stack>
  );
}
