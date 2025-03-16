import { MAX_ENGINE, MAX_ISSUES, Player } from "@age-of-steam/rust-belt-core";
import {
  Paper,
  Group,
  Stack,
  Divider,
  Table,
  Text,
  ScrollArea,
} from "@mantine/core";
import { IconTrack } from "@tabler/icons-react";
import { clsx } from "clsx";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { toActionLabel, toPlayerColorCode } from "../util";

export function PlayerList() {
  const { game } = useContext(GameContext);

  return (
    <ScrollArea className="w-full h-full">
      <Stack gap={0}>
        {game!.players.map((player) => (
          <PlayerListItem key={player.id + "_6"} player={player} />
        ))}
      </Stack>
    </ScrollArea>
  );
}

function PlayerListItem({ player }: { player: Player }) {
  const color = toPlayerColorCode(player.color);

  return (
    <>
      <Paper p="xs">
        <Group wrap="nowrap" mb="xs" gap={1}>
          <Text flex={1} size="sm" truncate>
            {player.name}
          </Text>
          {player.order !== 0 && (
            <Text size="sm" c={color}>
              {player.order}番手
            </Text>
          )}
          <IconTrack
            className={clsx(player.hasTurn && "animate-spin")}
            style={{
              animationDuration: "1.5s",
            }}
            color={color}
          />
        </Group>
        <Table>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th>
                <Text size="xs">株式発行数</Text>
              </Table.Th>
              <Table.Td>
                <Text size="xs">
                  {player.issuedShares}
                  <Text span c="#AAA">
                    {` / ${MAX_ISSUES}`}
                  </Text>
                </Text>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>
                <Text size="xs">アクション</Text>
              </Table.Th>
              <Table.Td>
                <Text size="xs">
                  {player.action && toActionLabel(player.action)}
                </Text>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>
                <Text size="xs">所持金</Text>
              </Table.Th>
              <Table.Td>
                <Text size="xs">${player.money}</Text>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>
                <Text size="xs">収入</Text>
              </Table.Th>
              <Table.Td>
                <Text size="xs">${player.income}</Text>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>
                <Text size="xs">エンジン</Text>
              </Table.Th>
              <Table.Td>
                <Text size="xs">
                  {player.engine}
                  <Text span c="#AAA">
                    {` / ${MAX_ENGINE}`}
                  </Text>
                </Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>
      <Divider />
    </>
  );
}
