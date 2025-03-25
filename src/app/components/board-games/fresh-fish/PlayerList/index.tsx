import {
  Player,
  AuctionAndPlaceOutletTilePhase,
} from "@age-of-steam/fresh-fish-core";
import { AuctionAndPlaceOutletTilePhaseState } from "@age-of-steam/fresh-fish-core";
import {
  Paper,
  Group,
  Stack,
  Divider,
  Table,
  Text,
  ScrollArea,
} from "@mantine/core";
import { IconFish } from "@tabler/icons-react";
import { clsx } from "clsx";
import { useContext } from "react";
import { match } from "ts-pattern";
import { GameContext } from "../GameProvider";
import { toPlayerColorCode } from "../util";

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
  const { game } = useContext(GameContext);

  const color = toPlayerColorCode(player.color);

  const isActiveForAuctionAndPlaceOutletTilePhase =
    game?.phase instanceof AuctionAndPlaceOutletTilePhase &&
    match(game?.phase.state)
      .with(AuctionAndPlaceOutletTilePhaseState.UNABLE_TO_PROCESS, () => false)
      .with(AuctionAndPlaceOutletTilePhaseState.AUCTION, () =>
        (game?.phase as AuctionAndPlaceOutletTilePhase).isBiddingPlayer(
          player.id
        )
      )
      .with(
        AuctionAndPlaceOutletTilePhaseState.PLACE_OUTLET_TILE,
        AuctionAndPlaceOutletTilePhaseState.PLACE_OUTLET_TILE_FOR_SKIP_AUCTION,
        () =>
          (game?.phase as AuctionAndPlaceOutletTilePhase).successfulBidder
            ?.id === player.id
      )
      .run();

  const isActive = player.hasTurn || isActiveForAuctionAndPlaceOutletTilePhase;

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
          <IconFish
            className={clsx(isActive && "animate-spin")}
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
                <Text size="xs">マーカー数</Text>
              </Table.Th>
              <Table.Td>
                <Text size="xs">
                  {player.remainingMarkers.length}
                  <Text span c="#AAA">
                    {` / ${player.useableMarkers.length}`}
                  </Text>
                </Text>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>
                <Text size="xs">所持金</Text>
              </Table.Th>
              <Table.Td>
                <Text size="xs">{player.money}</Text>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>
      <Divider />
    </>
  );
}
