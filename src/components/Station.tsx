import * as React from "react";
import { TransportationType, transportationColors } from "./Gameboard";
import "./Station.css";

export interface StationProps {
  stationTypes: Array<TransportationType>;
  stationNumber: number;
  x: number;
  y: number;
  size: number;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Station: React.SFC<StationProps> = ({
  stationTypes,
  stationNumber,
  x,
  y,
  size,
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
  return (
    <div
      className="outer"
      onClick={onClick}
      style={{
        left: x,
        top: y,
        transform: `scale(${size / 200}) translate(-50%, -50%)`,
        transformOrigin: "top left",
        transition: "0.5s",
        cursor: "pointer"
      }}
    >
      <div className="upper" style={{ backgroundColor: upperColor }}></div>
      <div className="lower" style={{ backgroundColor: lowerColor }}></div>
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
