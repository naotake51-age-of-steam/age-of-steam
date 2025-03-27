import { type EndGamePhase } from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Table, NumberFormatter } from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";
import { toPlayerColorCode } from "../util";

export function EndGamePhaseActionPrompt({ phase }: { phase: EndGamePhase }) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.playerScores.length !== 0 && (
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>プレイヤー</Table.Th>
                <Table.Th>収入</Table.Th>
                <Table.Th>株式発行数</Table.Th>
                <Table.Th>線路</Table.Th>
                <Table.Th>得点</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {phase.playerScores.map((playerScore) => (
                <Table.Tr key={playerScore.player.id}>
                  <Table.Td>
                    <IconTrack
                      color={toPlayerColorCode(playerScore.player.color)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Text className="text-right">
                      {playerScore.player.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text className="text-right">
                      <NumberFormatter prefix="$" value={playerScore.income} />
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text className="text-right">
                      {playerScore.issueShares}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text className="text-right">
                      {playerScore.lineCount}本
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text className="text-right">{playerScore.total}点</Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Group>
    </Stack>
  );
}
