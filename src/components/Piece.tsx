import * as React from "react";

export interface PieceProps {
  color: string;
  x: number;
  y: number;
  stationSize: number;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selected: boolean;
  movedFromStation: number | undefined;
}

const Piece: React.SFC<PieceProps> = ({
  color,
  x,
  y,
  stationSize,
  onClick,
  selected,
  movedFromStation
}) => {
  let borderWidth = stationSize / 5;
  if (selected) borderWidth *= 1.5;
  return (
    <div
      title={
        movedFromStation !== undefined
          ? `Moved from station ${movedFromStation}`
          : undefined
      }
      style={{
        position: "absolute",
        borderRadius: "50%",
        borderWidth: borderWidth,
        borderColor: color,
        borderStyle: movedFromStation !== undefined ? "solid" : "double",
        left: x,
        top: y,
        width: stationSize + 2 * borderWidth,
        height: stationSize + 2 * borderWidth,
        transform: `translate(-50%, -50%)`,
        transition: "top 1s, left 1s, border-width: 0.2s",
        cursor: "pointer"
      }}
      onClick={onClick}
    />
  );
};

export default React.memo(Piece);
