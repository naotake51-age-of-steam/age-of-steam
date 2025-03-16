import {
  allPlayerColors,
  WaitingStartPhase,
  type PlayerColor,
} from "@age-of-steam/rust-belt-core";
import {
  Text,
  Stack,
  Button,
  Group,
  Modal,
  ColorSwatch,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { toPlayerColorCode } from "../util";
import { startGame } from "@/app/actions/age-of-steam/rust-belt/waiting-start-phase";
import {
  joinUser,
  removeUser,
} from "@/app/actions/age-of-steam/rust-belt/waiting-start-phase";

export function WaitingStartPhaseActionPrompt({
  phase,
}: {
  phase: WaitingStartPhase;
}) {
  const { action } = useContext(GameContext);

  const [
    openedJoinUserModal,
    { open: openJoinUserModal, close: closeJoinUserModal },
  ] = useDisclosure(false);

  async function handleJoinUser(color: PlayerColor) {
    await action!(joinUser, { color });

    closeJoinUserModal();
  }

  async function handleRemoveUser() {
    await action!(removeUser, {});
  }

  async function handleStartGame() {
    await action!(startGame, {});
  }

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xl">
        {phase.canJoinUser() && (
          <Button onClick={openJoinUserModal} variant="outline">
            参加
          </Button>
        )}
        {phase.canRemoveUser() && (
          <Button onClick={handleRemoveUser} variant="outline">
            離脱
          </Button>
        )}
        {phase.canStartGame() && (
          <Button onClick={handleStartGame}>開始</Button>
        )}
      </Group>
      <Modal
        opened={openedJoinUserModal}
        onClose={closeJoinUserModal}
        title="プレイヤーカラー"
      >
        <PlayerColorSelect phase={phase} onSelect={handleJoinUser} />
      </Modal>
    </Stack>
  );
}

function PlayerColorSelect({
  phase,
  onSelect,
}: {
  phase: WaitingStartPhase;
  onSelect: (color: PlayerColor) => void;
}) {
  return (
    <SimpleGrid cols={3}>
      {allPlayerColors.map((color) => (
        <Button
          key={color}
          variant="outline"
          leftSection={
            <ColorSwatch size={20} color={toPlayerColorCode(color)} />
          }
          disabled={!phase.canSelectColor(color)}
          onClick={() => onSelect(color)}
        >
          選択
        </Button>
      ))}
    </SimpleGrid>
  );
}
