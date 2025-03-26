import { EndGamePhase } from "@age-of-steam/fresh-fish-core";
import { Text, Stack, Group, Box, Table } from "@mantine/core";
import { IconFish } from "@tabler/icons-react";

export function EndGamePhaseActionPrompt({ phase }: { phase: EndGamePhase }) {
  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xl">
        <Box>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th></Table.Th>
                <Table.Th>プレイヤー</Table.Th>
                <Table.Th>a</Table.Th>
                <Table.Th>b</Table.Th>
                <Table.Th>c</Table.Th>
                <Table.Th>d</Table.Th>
                <Table.Th>所持金</Table.Th>
                <Table.Th>得点</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {phase.playerScores.map((playerScore) => (
                <Table.Tr key={playerScore.player.id}>
                  <Table.Td>
                    <IconFish color={playerScore.player.color} />
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerScore.player.name}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerScore.fishMarketScore}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerScore.gasStationScore}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerScore.nuclearPowerPlantScore}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerScore.gameShopScore}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerScore.money}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{playerScore.total}</Text>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </Group>
    </Stack>
  );
}
