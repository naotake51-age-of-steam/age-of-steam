import { type CollectIncomePhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Table } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";

export function CollectIncomePhaseActionPrompt({
  phase,
}: {
  phase: CollectIncomePhase;
}) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              {phase.playerIncomes.map((playerIncome) => (
                <Table.Th key={playerIncome.player.id}>
                  <Group gap="xs">
                    <IconTrack color={playerIncome.player.color} />
                    {playerIncome.player.name}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              {phase.playerIncomes.map((playerIncome) => (
                <Table.Td key={playerIncome.player.id}>
                  <Text className="text-right">${playerIncome.income}</Text>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Group>
    </Stack>
  );
}
