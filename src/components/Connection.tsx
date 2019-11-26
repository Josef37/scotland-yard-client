import * as React from "react";
import { TransportationType, transportationColors } from "./Gameboard";

export interface ConnectionProps {
  strokeWidth: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  transportationType: TransportationType;
  onClick: (event: React.MouseEvent) => void;
}

const Connection: React.SFC<ConnectionProps> = ({
  strokeWidth,
  x1,
  y1,
  x2,
  y2,
  transportationType,
  onClick
}) => {
  let shiftRight = 0;
  switch (transportationType) {
    case TransportationType.Taxi:
      shiftRight = (strokeWidth * 2) / 3;
      break;
    case TransportationType.Bus:
      shiftRight = (-strokeWidth * 2) / 3;
      break;
    case TransportationType.Underground:
    case TransportationType.Ferry:
      shiftRight = 0;
      break;
    default:
      shiftRight = 0;
      break;
  }
  const width = Math.abs(x1 - x2) + strokeWidth;
  const height = Math.abs(y1 - y2) + strokeWidth;
  const top = Math.min(y1, y2);
  const left = Math.min(x1, x2);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx ** 2 + dy ** 2);
  const shiftX = (-shiftRight * dy) / length;
  const shiftY = (shiftRight * dx) / length;

  return (
    <div
      style={{
        position: "absolute",
        top: top + shiftY - strokeWidth / 2,
        left: left + shiftX - strokeWidth / 2,
        pointerEvents: "none"
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <line
          style={{ pointerEvents: "stroke", cursor: "pointer" }}
          onClick={onClick}
          x1={x1 - left + strokeWidth / 2}
          y1={y1 - top + strokeWidth / 2}
          x2={x2 - left + strokeWidth / 2}
          y2={y2 - top + strokeWidth / 2}
          stroke={transportationColors.get(transportationType)}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
          strokeDasharray={`${3 * strokeWidth} ${
            transportationType === TransportationType.Underground
              ? 1.5 * strokeWidth
              : 0
          }`}
        />
      </svg>
    </div>
  );
};

export default React.memo(Connection);
