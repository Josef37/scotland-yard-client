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
  if (highlight && isOwnPiece) borderWidth *= 2;
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        borderWidth: borderWidth,
        borderColor: color,
        borderStyle: "solid",
        left: x,
        top: y,
        width: stationSize + 2 * borderWidth,
        height: stationSize + 2 * borderWidth,
        transform: `translate(-50%, -50%)`,
        transition: "all 0.5s",
        cursor: "pointer"
      }}
      onClick={onClick}
      onMouseEnter={() => setHighlight(true)}
      onMouseLeave={() => setHighlight(false)}
    />
  );
};

export default React.memo(Piece);
