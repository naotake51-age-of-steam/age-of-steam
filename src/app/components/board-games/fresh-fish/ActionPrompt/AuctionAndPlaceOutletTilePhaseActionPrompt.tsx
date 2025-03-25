import {
  AuctionAndPlaceOutletTilePhase,
  AuctionAndPlaceOutletTilePhaseState,
} from "@age-of-steam/fresh-fish-core";
import { Text, Stack, Group, Divider, Table, Button, Box } from "@mantine/core";
import { useState, useContext } from "react";
import { GameContext } from "../GameProvider";
import { bids as actionBids } from "@/app/actions/fresh-fish/auction-outlet-tile-phase";
import { Counter } from "@/app/components/Counter";

export function AuctionAndPlaceOutletTilePhaseActionPrompt({
  phase,
}: {
  phase: AuctionAndPlaceOutletTilePhase;
}) {
  const { action } = useContext(GameContext);

  const width = 100;
  const height = 100;

  const [bids, setBids] = useState(0);

  async function handleBids() {
    await action!(actionBids, { bids });
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xl">
        <svg
          className="w-[100px] h-[100px] p-2"
          viewBox={`0, 0, ${width}, ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <image
            height={height}
            href={"/fresh-fish/" + phase.outletTile.image}
            width={width}
          />
        </svg>

        {phase.state === AuctionAndPlaceOutletTilePhaseState.AUCTION &&
          phase.canBids() && (
            <>
              <Divider orientation="vertical" />
              <Group>
                <Counter
                  value={bids}
                  onChange={setBids}
                  min={0}
                  max={phase.maxBids()}
                />
                <Button onClick={handleBids}>ビッド</Button>
              </Group>
            </>
          )}
        {phase.state ===
          AuctionAndPlaceOutletTilePhaseState.PLACE_OUTLET_TILE && (
          <>
            <Divider orientation="vertical" />
            <Box>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>プレイヤー</Table.Th>
                    <Table.Th>ビッド</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {phase.playerBidsList.map((playerBids) => (
                    <Table.Tr key={playerBids.player.id}>
                      <Table.Td>
                        <Text>{playerBids.player.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text className="text-right">${playerBids.bids}</Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Box>
          </>
        )}
      </Group>
    </Stack>
  );
}
