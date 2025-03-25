import {
  AuctionAndPlaceOutletTilePhase,
  EndGamePhase,
  PlaceMarkerPhase,
  PlaceWallTilePhase,
  PrepareSelectActionPhase,
  SelectActionPhase,
  WaitingStartPhase,
} from "@age-of-steam/fresh-fish-core";
import { Paper, UnstyledButton } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useContext } from "react";
import { match } from "ts-pattern";
import { GameContext } from "../GameProvider";
import { AuctionAndPlaceOutletTilePhaseActionPrompt } from "./AuctionAndPlaceOutletTilePhaseActionPrompt";
import { EndGamePhaseActionPrompt } from "./EndGamePhaseActionPrompt";
import { PlaceMarkerPhaseActionPrompt } from "./PlaceMarkerPhaseActionPrompt";
import { PlaceWallTilePhaseActionPrompt } from "./PlaceWallTilePhaseActionPrompt";
import { PrepareSelectActionPhaseActionPrompt } from "./PrepareSelectActionPhaseActionPrompt";
import { SelectActionPhaseActionPrompt } from "./SelectActionPhaseActionPrompt";
import { WaitingStartPhaseActionPrompt } from "./WaitingStartPhaseActionPrompt";

export function ActionPrompt() {
  const { game, back } = useContext(GameContext);

  const phaseActionPrompt: React.ReactNode = match(game!.phase)
    .when(
      (phase) => phase instanceof WaitingStartPhase,
      (phase) => (
        <WaitingStartPhaseActionPrompt phase={phase as WaitingStartPhase} />
      )
    )
    .when(
      (phase) => phase instanceof SelectActionPhase,
      (phase) => (
        <SelectActionPhaseActionPrompt phase={phase as SelectActionPhase} />
      )
    )
    .when(
      (phase) => phase instanceof PrepareSelectActionPhase,
      (phase) => (
        <PrepareSelectActionPhaseActionPrompt
          phase={phase as PrepareSelectActionPhase}
        />
      )
    )
    .when(
      (phase) => phase instanceof PlaceMarkerPhase,
      (phase) => (
        <PlaceMarkerPhaseActionPrompt phase={phase as PlaceMarkerPhase} />
      )
    )
    .when(
      (phase) => phase instanceof PlaceWallTilePhase,
      (phase) => (
        <PlaceWallTilePhaseActionPrompt phase={phase as PlaceWallTilePhase} />
      )
    )
    .when(
      (phase) => phase instanceof AuctionAndPlaceOutletTilePhase,
      (phase) => (
        <AuctionAndPlaceOutletTilePhaseActionPrompt
          phase={phase as AuctionAndPlaceOutletTilePhase}
        />
      )
    )
    .when(
      (phase) => phase instanceof EndGamePhase,
      (phase) => <EndGamePhaseActionPrompt phase={phase as EndGamePhase} />
    )
    .run();

  return (
    <Paper className="w-full h-full relative">
      {/* {game!.currentPlayer?.hasTurn && ( */}
      <UnstyledButton className="absolute top-2 right-2" onClick={back}>
        <IconArrowBackUp size={30} />
      </UnstyledButton>
      {/* )} */}
      {phaseActionPrompt}
    </Paper>
  );
}
