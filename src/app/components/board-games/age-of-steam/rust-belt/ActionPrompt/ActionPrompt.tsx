import {
  IssueSharesPhase,
  WaitingStartPhase,
  DeterminePlayerOrderPhase,
  SelectActionsPhase,
  BuildTrackPhase,
  MoveGoodsPhase,
  SettlementPhase,
  ProductionPhase,
  GoodsGrowthPhase,
  AdvanceTurnMarkerPhase,
  EndGamePhase,
} from "@age-of-steam/rust-belt-core";
import { UnderpaymentPhase } from "@age-of-steam/rust-belt-core";
import { Paper, UnstyledButton } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useContext } from "react";
import { match } from "ts-pattern";
import { GameContext } from "../GameProvider";
import { AdvanceTurnMarkerPhaseActionPrompt } from "./AdvanceTurnMarkerPhaseActionPrompt";
import { BuildTrackPhaseActionPrompt } from "./BuildTrackPhaseActionPrompt";
import { DeterminePlayerOrderPhaseActionPrompt } from "./DeterminePlayerOrderPhaseActionPrompt";
import { EndGamePhaseActionPrompt } from "./EndGamePhaseActionPrompt";
import { GoodsGrowthPhaseActionPrompt } from "./GoodsGrowthPhaseActionPrompt";
import { IssueSharesPhaseActionPrompt } from "./IssueSharesPhaseActionPrompt";
import { MoveGoodsPhaseActionPrompt } from "./MoveGoodsPhaseActionPrompt";
import { ProductionPhaseActionPrompt } from "./ProductionPhaseActionPrompt";
import { SelectActionsPhaseActionPrompt } from "./SelectActionsPhaseActionPrompt";
import { SettlementPhaseActionPrompt } from "./SettlementPhaseActionPrompt";
import { UnderpaymentPhaseActionPrompt } from "./UnderpaymentPhaseActionPrompt";
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
      (phase) => phase instanceof IssueSharesPhase,
      (phase) => (
        <IssueSharesPhaseActionPrompt phase={phase as IssueSharesPhase} />
      )
    )
    .when(
      (phase) => phase instanceof DeterminePlayerOrderPhase,
      (phase) => (
        <DeterminePlayerOrderPhaseActionPrompt
          phase={phase as DeterminePlayerOrderPhase}
        />
      )
    )
    .when(
      (phase) => phase instanceof SelectActionsPhase,
      (phase) => (
        <SelectActionsPhaseActionPrompt phase={phase as SelectActionsPhase} />
      )
    )
    .when(
      (phase) => phase instanceof BuildTrackPhase,
      (phase) => (
        <BuildTrackPhaseActionPrompt phase={phase as BuildTrackPhase} />
      )
    )
    .when(
      (phase) => phase instanceof MoveGoodsPhase,
      (phase) => <MoveGoodsPhaseActionPrompt phase={phase as MoveGoodsPhase} />
    )
    .when(
      (phase) => phase instanceof SettlementPhase,
      (phase) => (
        <SettlementPhaseActionPrompt phase={phase as SettlementPhase} />
      )
    )
    .when(
      (phase) => phase instanceof UnderpaymentPhase,
      (phase) => (
        <UnderpaymentPhaseActionPrompt phase={phase as UnderpaymentPhase} />
      )
    )
    .when(
      (phase) => phase instanceof ProductionPhase,
      (phase) => (
        <ProductionPhaseActionPrompt phase={phase as ProductionPhase} />
      )
    )
    .when(
      (phase) => phase instanceof GoodsGrowthPhase,
      (phase) => (
        <GoodsGrowthPhaseActionPrompt phase={phase as GoodsGrowthPhase} />
      )
    )
    .when(
      (phase) => phase instanceof AdvanceTurnMarkerPhase,
      (phase) => (
        <AdvanceTurnMarkerPhaseActionPrompt
          phase={phase as AdvanceTurnMarkerPhase}
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
