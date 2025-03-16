import { MoveGoodsPhase, spaceSize } from "@age-of-steam/rust-belt-core";
import { range } from "@mantine/hooks";
import { useContext } from "react";
import { GameContext } from "../GameProvider";
import { moveGoodsCube } from "@/app/actions/age-of-steam/rust-belt/move-goods-phase";
export function SelectMoveGoodsDirection() {
  const { game, action } = useContext(GameContext);

  const phase = game?.phase;

  const { width, height } = spaceSize;

  if (!(phase instanceof MoveGoodsPhase)) return null;

  async function handleSelectDirection(direction: number) {
    await action!(moveGoodsCube, { direction });
  }

  return (
    <>
      {phase.isTurnPlayer() &&
        phase.currentMapSpace &&
        range(0, 5).map(
          (direction) =>
            phase.canMoveGoodsCube(direction) && (
              <g
                key={direction}
                className="group cursor-pointer"
                style={{
                  transform: `translateX(${
                    Math.sin((Math.PI / 180) * direction * 60) * height
                  }px) translateY(${
                    -Math.cos((Math.PI / 180) * direction * 60) * height
                  }px)`,
                }}
                onClick={() => handleSelectDirection(direction)}
              >
                <image
                  height={height}
                  width={width}
                  href="/age-of-steam/rust-belt/line-overlay-2.svg"
                  x={phase.currentMapSpace!.x}
                  y={phase.currentMapSpace!.y}
                />
                <image
                  className="opacity-0 group-hover:opacity-100"
                  height={height}
                  width={width}
                  href="/age-of-steam/rust-belt/line-overlay.svg"
                  x={phase.currentMapSpace!.x}
                  y={phase.currentMapSpace!.y}
                />
              </g>
            )
        )}
      {phase.movingList.map((moving) => (
        <image
          key={moving.spaceMapId}
          height={height}
          width={width}
          href="/age-of-steam/rust-belt/space-overlay-4.svg"
          x={moving.spaceMap.x}
          y={moving.spaceMap.y}
        />
      ))}
    </>
  );
}
