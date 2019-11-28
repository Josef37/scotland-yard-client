import * as React from "react";
import { TransportationType, transportationColors } from "./Gameboard";

export interface ConnectionProps {
  strokeWidth: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  transportationType: TransportationType;
}

/** Shifts connection line to avoid overlapping bus and taxi */
const getShiftRight = (
  strokeWidth: number,
  transportationType: TransportationType
) => {
  switch (transportationType) {
    case TransportationType.Taxi:
      return (2 / 3) * strokeWidth;
    case TransportationType.Bus:
      return -(2 / 3) * strokeWidth;
    default:
      return 0;
  }
};

function getShift(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  shiftRight: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx ** 2 + dy ** 2);
  const scale = shiftRight / length;
  const shiftX = -dy * scale;
  const shiftY = dx * scale;
  return { shiftX, shiftY };
}

const Connection: React.SFC<ConnectionProps> = ({
  strokeWidth,
  x1,
  y1,
  x2,
  y2,
  transportationType
}) => {
  const containerWidth = Math.abs(x1 - x2) + strokeWidth;
  const containerHeight = Math.abs(y1 - y2) + strokeWidth;
  const top = Math.min(y1, y2);
  const left = Math.min(x1, x2);
  const shiftRight = getShiftRight(strokeWidth, transportationType);
  const { shiftX, shiftY } = getShift(x1, y1, x2, y2, shiftRight);

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
        width={containerWidth}
        height={containerHeight}
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
      >
        <line
          style={{ pointerEvents: "stroke", cursor: "pointer" }}
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
