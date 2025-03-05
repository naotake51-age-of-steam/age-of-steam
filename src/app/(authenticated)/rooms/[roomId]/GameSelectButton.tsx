"use client";

import { Button, Modal, Grid, Card, Image, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { createGame } from "@/app/actions/rooms";
import { gameConfigs, type GameConfig } from "@/app/lib/gameConfigs";

export function GameSelectButton({ roomId }: { roomId: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSelect(gameType: string) {
    close();

    try {
      setIsLoading(true);

      const response = await createGame({ roomId, gameType });

      if (response.status === "error") {
        notifications.show({
          color: "red",
          title: response.title,
          message: response.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="マップ選択" size="xl">
        <GameList handleSelect={handleSelect} />
      </Modal>

      <Button variant="outline" loading={isLoading} onClick={open}>
        マップ選択
      </Button>
    </>
  );
}

function GameList({
  handleSelect,
}: {
  handleSelect: (gameType: string) => void;
}) {
  return (
    <Grid>
      {gameConfigs.map((gameConfig) => (
        <Grid.Col key={gameConfig.type} span={{ base: 12, xs: 6, sm: 4 }}>
          <Game gameConfig={gameConfig} handleSelect={handleSelect} />
        </Grid.Col>
      ))}
    </Grid>
  );
}

function Game({
  gameConfig,
  handleSelect,
}: {
  gameConfig: GameConfig;
  handleSelect: (gameType: string) => void;
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={gameConfig.image} h={160} alt="boardgame" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs" wrap="nowrap">
        <Text flex={1} fw={500}>
          {gameConfig.name}
        </Text>
      </Group>

      <Text size="xs" c="dimmed" truncate>
        {gameConfig.description}
      </Text>

      <Text size="xs" c="dimmed" truncate>
        {gameConfig.numberOfPlayers}
      </Text>

      <Button
        onClick={() => handleSelect(gameConfig.type)}
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        選択
      </Button>
    </Card>
  );
}
