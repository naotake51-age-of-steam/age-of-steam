import { type IncomeReductionPhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Table } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";

export function IncomeReductionPhaseActionPrompt({
  phase,
}: {
  phase: IncomeReductionPhase;
}) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              {phase.playerIncomeReductions.map((playerIncomeReduction) => (
                <Table.Th key={playerIncomeReduction.player.id}>
                  <Group gap="xs">
                    <IconTrack color={playerIncomeReduction.player.color} />
                    {playerIncomeReduction.player.name}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              {phase.playerIncomeReductions.map((playerIncomeReduction) => (
                <Table.Td key={playerIncomeReduction.player.id}>
                  <Text className="text-right">
                    -${playerIncomeReduction.reduceIncome}
                  </Text>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Group>
    </Stack>
  );
}
