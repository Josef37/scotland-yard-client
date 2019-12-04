import * as React from "react";

export interface PieceProps {
  color: string;
  x: number;
  y: number;
  stationSize: number;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSelected: boolean;
  isOwnPiece: boolean;
}

const Piece: React.SFC<PieceProps> = ({
  color,
  x,
  y,
  stationSize,
  onClick,
  isSelected,
  isOwnPiece
}) => {
  const [highlight, setHighlight] = React.useState(isSelected);
  let borderWidth = stationSize / 5;
  if (highlight && isOwnPiece) borderWidth *= 1.5;
  return (
    <div
      style={{
        boxSizing: "content-box",
        position: "absolute",
        borderRadius: "50%",
        borderWidth: borderWidth,
        borderColor: color,
        borderStyle: "solid",
        left: x,
        top: y,
        width: stationSize,
        height: stationSize,
        transform: `translate(-50%, -50%)`,
        transition: "border-width 0.2s ease-out, left 0.5s, top 0.5s",
        cursor: isOwnPiece ? "pointer" : "auto",
        pointerEvents: isOwnPiece ? "auto" : "none"
      }}
      onClick={event => {
        onClick(event);
        setHighlight(true);
      }}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    />
  );
};

export default React.memo(Piece);
