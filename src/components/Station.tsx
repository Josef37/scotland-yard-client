import * as React from "react";
import "./Station.svg";

export interface StationProps {
  stationNumber: number;
  busStation: boolean;
  undergroundStation: boolean;
  size?: number;
}

const SIZE = 100;
const TAXI_COLOR = "#ffd843";
const BUS_COLOR = "#2ec3c6";
const UNDERGROUND_COLOR = "#ff4d1d";

const Station: React.SFC<StationProps> = props => {
  const upperColor = TAXI_COLOR;
  const lowerColor = props.busStation ? BUS_COLOR : TAXI_COLOR;
  const middleColor = props.undergroundStation ? UNDERGROUND_COLOR : "white";
  const textColor = props.undergroundStation ? "white" : "black";
  const size = props.size || SIZE;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 26.458333 26.458334"
    >
      <path
        style={{
          opacity: 1,
          fill: lowerColor,
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "black",
          strokeWidth: 2.5,
          strokeOpacity: 1
        }}
        d="M 97.525391 50 L 2.4746094 50 A 47.524952 47.524952 0 0 0 50 97.525391 A 47.524952 47.524952 0 0 0 97.525391 50 z "
        transform="matrix(0.26458333,0,0,0.26458333,0,0)"
      />
      <path
        style={{
          opacity: 1,
          fill: upperColor,
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "black",
          strokeWidth: 2.5,
          strokeOpacity: 1
        }}
        d="M 50 2.4746094 A 47.524952 47.524952 0 0 0 2.4746094 50 L 97.525391 50 A 47.524952 47.524952 0 0 0 50 2.4746094 z "
        transform="matrix(0.26458333,0,0,0.26458333,0,0)"
      />
      <rect
        style={{
          opacity: 1,
          fill: middleColor,
          fillOpacity: 1,
          fillRule: "nonzero",
          stroke: "black",
          strokeWidth: 0.64946288,
          strokeOpacity: 1
        }}
        width="17.997221"
        height="12.362501"
        x="4.1916733"
        y="7"
      />
      <text
        x="49%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={11}
        letterSpacing={-0.8}
        fill={textColor}
      >
        {props.stationNumber}
      </text>
    </svg>
  );
};

export default Station;
