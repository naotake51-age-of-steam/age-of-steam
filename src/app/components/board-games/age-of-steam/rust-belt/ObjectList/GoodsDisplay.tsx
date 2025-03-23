import {
  goodsDisplayWhite,
  goodsDisplayBlack,
  type GoodsDisplayLine as GoodsDisplayLineType,
  type GoodsDisplay as GoodsDisplayType,
} from "@age-of-steam/rust-belt-core";
import { Group, Stack, Badge } from "@mantine/core";
import React from "react";

export function GoodsDisplay() {
  return (
    <Stack>
      <GoodsDisplayByColor
        goodsDisplay={goodsDisplayWhite}
        labelBgColor="#EEE"
        labelTextColor="#111"
      />
      <GoodsDisplayByColor
        goodsDisplay={goodsDisplayBlack}
        labelBgColor="#111"
        labelTextColor="#EEE"
      />
    </Stack>
  );
}

function GoodsDisplayByColor({
  goodsDisplay,
  labelBgColor,
  labelTextColor,
}: {
  goodsDisplay: GoodsDisplayType;
  labelBgColor: string;
  labelTextColor: string;
}) {
  return (
    <Group wrap="nowrap" align="start" gap="sm">
      {goodsDisplay.goodsDisplayLinesList.map(
        (goodsDisplayLineByDice, index) => (
          <Stack key={index} gap="xs" align="center">
            {goodsDisplayLineByDice.map((goodsDisplayLine) => (
              <React.Fragment key={goodsDisplayLine.id}>
                <Badge circle bg={labelBgColor} c={labelTextColor}>
                  {goodsDisplayLine.label}
                </Badge>
                <GoodsDisplayLine goodsDisplayLine={goodsDisplayLine} />
              </React.Fragment>
            ))}
          </Stack>
        )
      )}
    </Group>
  );
}

function GoodsDisplayLine({
  goodsDisplayLine,
}: {
  goodsDisplayLine: GoodsDisplayLineType;
}) {
  const width = 20;
  const height = 20;

  return (
    <Stack>
      {goodsDisplayLine.goodsDisplaySpaces.map((space, index) => (
        <Stack key={index}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0, 0, ${width}, ${height}`}
          >
            {space.goodsCube && (
              <image
                height={height}
                width={width}
                href={`/age-of-steam/rust-belt/${space.goodsCube.image}`}
              />
            )}
          </svg>
        </Stack>
      ))}
    </Stack>
  );
}
