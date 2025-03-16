import { type EndGamePhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Table } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";

export function EndGamePhaseActionPrompt({ phase }: { phase: EndGamePhase }) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              {phase.playerScores.map((playerScore) => (
                <Table.Th key={playerScore.player.id}>
                  <Group gap="xs">
                    <IconTrack color={playerScore.player.color} />
                    {playerScore.player.name}
                  </Group>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>収入</Table.Th>
              {phase.playerScores.map((playerScore) => (
                <Table.Td key={playerScore.player.id}>
                  <Text className="text-right">${playerScore.income}</Text>
                </Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>線路</Table.Th>
              {phase.playerScores.map((playerScore) => (
                <Table.Td key={playerScore.player.id}>
                  <Text className="text-right">{playerScore.lineCount}本</Text>
                </Table.Td>
              ))}
            </Table.Tr>
            <Table.Tr>
              <Table.Th>得点</Table.Th>
              {phase.playerScores.map((playerScore) => (
                <Table.Td key={playerScore.player.id}>
                  <Text className="text-right">{playerScore.total}点</Text>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Group>
    </Stack>
  );
}
