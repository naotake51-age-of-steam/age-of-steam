import {
  type MapSpace as MapSpaceClass,
  MoveGoodsPhase,
} from "@age-of-steam/rust-belt-core";
import clsx from "clsx";
import React from "react";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { groupBy } from "../util";
import { selectGoodsCube } from "@/app/actions/age-of-steam/rust-belt/move-goods-phase";

export function MapSpaceGoodsCubes({ mapSpace }: { mapSpace: MapSpaceClass }) {
  const { game, action } = useContext(GameContext);

  const { x, y } = mapSpace;

  const phase = game!.phase;

  const isSelectable =
    phase instanceof MoveGoodsPhase &&
    phase.isTurnPlayer() &&
    phase.selectedGoodsCubeId === null;

  async function handleSelectCube(goodsCubeId: number) {
    if (isSelectable) {
      await action!(selectGoodsCube, { goodsCubeId });
    }
  }

  return (
    <>
      {groupBy(mapSpace.goodsCubes, "color").map((goodsCubes, index) => (
        <g
          key={index}
          className={clsx(
            "group",
            isSelectable ? "cursor-pointer" : "pointer-events-none"
          )}
          onClick={() => handleSelectCube(goodsCubes[0].id)}
        >
          <image
            height={30}
            width={30}
            href={`/age-of-steam/rust-belt/${goodsCubes[0].image}`}
            x={x + goodsCubes[0].x - 15}
            y={y + goodsCubes[0].y - 15}
          />
          <text
            x={x + goodsCubes[0].x}
            y={y + goodsCubes[0].y + 7}
            fontFamily="Arial, sans-serif"
            fontSize="20"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
            stroke="black"
            strokeWidth="1"
          >
            {goodsCubes.length}
          </text>
          {isSelectable && (
            <>
              <image
                height={30}
                width={30}
                href={`/age-of-steam/rust-belt/cube-overlay.svg`}
                x={x + goodsCubes[0].x - 15}
                y={y + goodsCubes[0].y - 15}
              />
              <image
                className="opacity-0 group-hover:opacity-100"
                height={30}
                width={30}
                href={`/age-of-steam/rust-belt/cube-overlay-2.svg`}
                x={x + goodsCubes[0].x - 15}
                y={y + goodsCubes[0].y - 15}
              />
            </>
          )}
          {phase instanceof MoveGoodsPhase &&
            phase.selectedGoodsCubeId === goodsCubes[0].id && (
              <image
                height={30}
                width={30}
                href={`/age-of-steam/rust-belt/cube-overlay.svg`}
                x={x + goodsCubes[0].x - 15}
                y={y + goodsCubes[0].y - 15}
              />
            )}
        </g>
      ))}
    </>
  );
}
