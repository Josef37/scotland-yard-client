import * as React from "react";
import Station from "./Station";
import Connection from "./Connection";
import Piece from "./Piece";
import { IStation, IConnection, IPiece } from "../reducers";

export enum TransportationType {
  Taxi,
  Bus,
  Underground,
  Ferry
}

export const transportationColors = new Map([
  [TransportationType.Taxi, "#ffd843"],
  [TransportationType.Bus, "#2ec3c6"],
  [TransportationType.Underground, "#ff4d1d"],
  [TransportationType.Ferry, "#000"]
]);

export interface GameboardProps {
  width: number;
  height: number;
  stations: Array<IStation>;
  connections: Array<IConnection>;
  pieces: Array<IPiece>;
  onStationClick: (stationNumber: number) => () => void;
  onConnectionClick: (connection: IConnection) => () => void;
  onPieceClick: (pieceId: number) => () => void;
  onCommitClick: () => void;
}

const Gameboard: React.SFC<GameboardProps> = ({
  width,
  height,
  stations,
  connections,
  pieces,
  onStationClick,
  onConnectionClick,
  onPieceClick,
  onCommitClick
}) => {
  function getStation(stationNumber: number) {
    return stations.filter(station => station.number === stationNumber)[0];
  }

  function getStationTypes(stationNumber: number) {
    return connections
      .filter(
        connection =>
          connection.station1 === stationNumber ||
          connection.station2 === stationNumber
      )
      .map(connection => connection.type);
  }

  const boundingBox = stations.reduce(
    (box, station) => ({
      top: Math.min(box.top, station.y),
      right: Math.max(box.right, station.x),
      bottom: Math.max(box.bottom, station.y),
      left: Math.min(box.left, station.x)
    }),
    {
      top: Infinity,
      right: -Infinity,
      bottom: -Infinity,
      left: Infinity
    }
  );

  const stationSize =
    Math.min(width, height) / (Math.sqrt(stations.length) * 4);
  const padding = 2 * stationSize;

  stations = stations.map(station => {
    return {
      ...station,
      x:
        ((station.x - boundingBox.left) /
          (boundingBox.right - boundingBox.left)) *
          (width - 2 * padding) +
        padding,
      y:
        ((station.y - boundingBox.top) /
          (boundingBox.bottom - boundingBox.top)) *
          (height - 2 * padding) +
        padding
    };
  });

  return (
    <div style={{ width, height, position: "relative" }}>
      {connections.map(connection => {
        let [station1, station2] = [
          connection.station1,
          connection.station2
        ].sort((a, b) => a - b);
        let { x: x1, y: y1 } = getStation(station1);
        let { x: x2, y: y2 } = getStation(station2);
        return (
          <Connection
            key={Object.values(connection).join("")}
            {...{ x1, y1, x2, y2 }}
            strokeWidth={stationSize / 4}
            transportationType={connection.type}
            onClick={onConnectionClick(connection)}
          />
        );
      })}

      {stations.map(station => {
        return (
          <Station
            key={station.number}
            stationTypes={getStationTypes(station.number)}
            stationNumber={station.number}
            x={station.x}
            y={station.y}
            size={stationSize}
            onClick={onStationClick(station.number)}
          />
        );
      })}

      {pieces.map(piece => {
        let { x, y } = getStation(piece.station);
        return (
          <Piece
            key={piece.id}
            x={x}
            y={y}
            color={piece.color}
            stationSize={stationSize}
            selected={piece.selected}
            onClick={onPieceClick(piece.id)}
            movedFromStation={piece.movedFromStation}
          />
        );
      })}

      <button
        style={{
          position: "absolute",
          bottom: 15,
          right: 0,
          left: 0,
          margin: "0 auto",
          fontSize: 40,
          padding: 10
        }}
        onClick={onCommitClick}
      >
        Commit Moves
      </button>
    </div>
  );
};

export default Gameboard;
