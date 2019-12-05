import * as React from "react";
import { TransportationType, transportationColors } from "../constants";
import "./Station.css";

export interface StationProps {
  stationTypes: Array<TransportationType>;
  stationNumber: number;
  x: number | string;
  y: number | string;
  size: number;
  isSelected: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Station: React.SFC<StationProps> = ({
  stationTypes,
  stationNumber,
  x,
  y,
  size,
  isSelected,
  onClick
}) => {
  const upperColor = transportationColors.get(TransportationType.Taxi);
  const lowerColor = stationTypes.includes(TransportationType.Bus)
    ? transportationColors.get(TransportationType.Bus)
    : transportationColors.get(TransportationType.Taxi);
  const innerColor = stationTypes.includes(TransportationType.Underground)
    ? transportationColors.get(TransportationType.Underground)
    : "white";
  const textColor = stationTypes.includes(TransportationType.Underground)
    ? "white"
    : "black";
  const scale = ((isSelected ? 1.2 : 1) * size) / 100;
  return (
    <div
      className="outer"
      onClick={onClick}
      style={{
        left: x,
        top: y,
        transform: `scale(${scale}) translate(-50%, -50%)`,
        transformOrigin: "top left",
        cursor: "pointer"
      }}
    >
      <div className="upper" style={{ backgroundColor: upperColor }} />
      <div className="lower" style={{ backgroundColor: lowerColor }} />
      <div
        className="inner"
        style={{ backgroundColor: innerColor, color: textColor }}
      >
        {stationNumber}
      </div>
    </div>
  );
};

export default React.memo(Station);
