import { type PayExpensesPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Table } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";

export function PayExpensesPhaseActionPrompt({
  phase,
}: {
  phase: PayExpensesPhase;
}) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              {phase.playerPayments.map((playerPayment) => (
                <Table.Th key={playerPayment.player.id}>
                  <Group gap="xs">
                    <IconTrack color={playerPayment.player.color} />
                    {playerPayment.player.name}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              {phase.playerPayments.map((playerPayment) => (
                <Table.Td key={playerPayment.player.id}>
                  <Text className="text-right">-${playerPayment.payment}</Text>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Group>
    </Stack>
  );
}
