import {
  GoodsCube,
  type ProductionPhase,
  goodsDisplayWhite,
  goodsDisplayBlack,
  type GoodsDisplay as GoodsDisplayType,
  GoodsDisplayLine,
} from "@age-of-steam/rust-belt-core";
import { Text, Stack, Group, Button, Divider, Badge } from "@mantine/core";
import clsx from "clsx";
import { useContext, useState } from "react";
import React from "react";
import { GameContext } from "../GameProvider";
import {
  completeProduction,
  passProduction,
  placeToGoodsDisplayLine,
  produceGoodsCubes,
} from "@/app/actions/age-of-steam/rust-belt/production-phase";

export function ProductionPhaseActionPrompt({
  phase,
}: {
  phase: ProductionPhase;
}) {
  const { action } = useContext(GameContext);

  const [selectedGoodsCube, setSelectedGoodsCube] = useState<GoodsCube | null>(
    null
  );

  const [selectedGoodsDisplayLine, setSelectedGoodsDisplayLine] =
    useState<GoodsDisplayLine | null>(null);

  async function handleProduceGoodsCubes() {
    await action!(produceGoodsCubes, {});
  }

  async function handlePassProduction() {
    await action!(passProduction, {});
  }

  async function handleCompleteProduction() {
    await action!(completeProduction, {});
  }

  function selectGoodsCube(goodCube: GoodsCube) {
    setSelectedGoodsCube!(goodCube);
  }

  function selectGoodsDisplayLine(goodsDisplayLine: GoodsDisplayLine) {
    setSelectedGoodsDisplayLine!(goodsDisplayLine);
  }

  async function handlePlaceToGoodsDisplayLine() {
    await action!(placeToGoodsDisplayLine, {
      goodsDisplayLineId: selectedGoodsDisplayLine!.id,
      goodsCubeId: selectedGoodsCube!.id,
    });

    setSelectedGoodsCube!(null);
    setSelectedGoodsDisplayLine!(null);
  }

  const width = 30;
  const height = 30;

  return (
    <Stack className="h-full" justify="space-around" align="center">
      <Text className="text-center whitespace-pre-wrap">{phase.message}</Text>
      <Group gap="xs">
        {phase.isTurnPlayer() &&
          (!phase.isExecuteProduction ? (
            <>
              <Button
                disabled={!phase.canProduceGoodsCubes()}
                onClick={handleProduceGoodsCubes}
              >
                商品を引く
              </Button>
              <Divider orientation="vertical" />
              <Button
                disabled={!phase.canPassProduction()}
                onClick={handlePassProduction}
              >
                パス
              </Button>
            </>
          ) : (
            <Stack>
              <Group>
                {phase.placingGoodsCubes.map((goodsCube) => (
                  <svg
                    key={goodsCube.id}
                    onClick={() => selectGoodsCube(goodsCube)}
                    className={clsx(
                      "cursor-pointer hover:scale-125",
                      selectedGoodsCube?.id === goodsCube.id && "scale-125"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    width={width}
                    height={height}
                    viewBox={`0, 0, ${width}, ${height}`}
                  >
                    <image
                      height={height}
                      width={width}
                      href={`/age-of-steam/rust-belt/${goodsCube.image}`}
                    />
                  </svg>
                ))}
                <Divider orientation="vertical" />
                <Stack>
                  <GoodsDisplayByColor
                    phase={phase}
                    goodsDisplay={goodsDisplayWhite}
                    selectedGoodsDisplayLine={selectedGoodsDisplayLine}
                    selectGoodsDisplayLine={selectGoodsDisplayLine}
                    labelBgColor="#EEE"
                    labelTextColor="#111"
                  />
                  <GoodsDisplayByColor
                    phase={phase}
                    goodsDisplay={goodsDisplayBlack}
                    selectedGoodsDisplayLine={selectedGoodsDisplayLine}
                    selectGoodsDisplayLine={selectGoodsDisplayLine}
                    labelBgColor="#111"
                    labelTextColor="#EEE"
                  />
                </Stack>
              </Group>
              <Group justify="center">
                <Button
                  disabled={!selectGoodsCube || !selectedGoodsDisplayLine}
                  onClick={handlePlaceToGoodsDisplayLine}
                >
                  配置
                </Button>
                <Button
                  disabled={!phase.canCompleteProduction()}
                  onClick={handleCompleteProduction}
                >
                  完了
                </Button>
              </Group>
            </Stack>
          ))}
      </Group>
    </Stack>
  );
}

function GoodsDisplayByColor({
  phase,
  goodsDisplay,
  labelBgColor,
  labelTextColor,
  selectedGoodsDisplayLine,
  selectGoodsDisplayLine,
}: {
  phase: ProductionPhase;
  goodsDisplay: GoodsDisplayType;
  labelBgColor: string;
  labelTextColor: string;
  selectedGoodsDisplayLine: GoodsDisplayLine | null;
  selectGoodsDisplayLine: (goodsDisplayLine: GoodsDisplayLine) => void;
}) {
  return (
    <Group wrap="nowrap" align="start" gap="sm">
      {goodsDisplay.goodsDisplayLinesList.map(
        (goodsDisplayLineByDice, index) => (
          <React.Fragment key={index}>
            {goodsDisplayLineByDice.map((goodsDisplayLine) => (
              <React.Fragment key={goodsDisplayLine.id}>
                {phase.canPlaceToGoodsDisplayLine(goodsDisplayLine.id) && (
                  <Badge
                    className={clsx(
                      "cursor-pointer! hover:scale-125",
                      selectedGoodsDisplayLine?.id === goodsDisplayLine.id &&
                        "scale-125"
                    )}
                    circle
                    bg={labelBgColor}
                    c={labelTextColor}
                    onClick={() => selectGoodsDisplayLine(goodsDisplayLine)}
                  >
                    {goodsDisplayLine.label}
                  </Badge>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        )
      )}
    </Group>
  );
}
