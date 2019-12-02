import * as React from "react";
import Station from "./Station";
import Connection from "./Connection";
import Piece from "./Piece";
import { IStation, IConnection, IPiece, IMove } from "../reducers/gameboard";
import TicketSelector from "./TicketSelector";

export enum TransportationType {
  Taxi,
  Bus,
  Underground,
  Ferry
}

export enum TicketType {
  Taxi,
  Bus,
  Underground,
  Black,
  Double
}

export const transportationColors = new Map([
  [TransportationType.Taxi, "#ffd843"],
  [TransportationType.Bus, "#2ec3c6"],
  [TransportationType.Underground, "#ff4d1d"],
  [TransportationType.Ferry, "#000"]
]);

export const ticketColors = new Map([
  [TicketType.Taxi, { color: "black", backgroundColor: "#ffd843" }],
  [TicketType.Bus, { color: "black", backgroundColor: "#2ec3c6" }],
  [TicketType.Underground, { color: "white", backgroundColor: "#ff4d1d" }],
  [TicketType.Black, { color: "white", backgroundColor: "#000" }]
]);

export interface GameboardProps {
  width: number;
  height: number;
  stations: Array<IStation>;
  connections: Array<IConnection>;
  pieces: Array<IPiece>;
  move: IMove;
  ownPieceIds: Array<number>;
  onStationClick: (stationNumber: number) => () => void;
  onPieceClick: (pieceId: number) => () => void;
  onTicketSelect: (ticketType: TicketType) => () => void;
}

const Gameboard: React.SFC<GameboardProps> = ({
  width,
  height,
  stations,
  connections,
  pieces,
  move,
  ownPieceIds,
  onStationClick,
  onPieceClick,
  onTicketSelect
}) => {
  function getStation(stationNumber: number) {
    return stations.find(station => station.number === stationNumber);
  }

  function getStationTypes(stationNumber: number) {
    return connections
      .filter(
        connection =>
          connection.station1Number === stationNumber ||
          connection.station2Number === stationNumber
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
    <div
      style={{
        width,
        height,
        position: "relative",
        backgroundColor: "#111"
      }}
    >
      {connections.map(connection => {
        let [station1Number, station2Number] = [
          connection.station1Number,
          connection.station2Number
        ].sort((a, b) => a - b);
        let station1 = getStation(station1Number);
        let station2 = getStation(station2Number);
        if (!station1 || !station2) return null;
        let { x: x1, y: y1 } = station1;
        let { x: x2, y: y2 } = station2;
        return (
          <Connection
            key={Object.values(connection).join("")}
            {...{ x1, y1, x2, y2 }}
            strokeWidth={stationSize / 4}
            transportationType={connection.type}
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
            isSelected={station.number === move.stationNumber}
            onClick={onStationClick(station.number)}
          />
        );
      })}

      {pieces.map(piece => {
        let station = getStation(piece.stationNumber);
        if (!station) return null;
        let { x, y } = station;
        return (
          <Piece
            key={piece.id}
            x={x}
            y={y}
            color={piece.color}
            stationSize={stationSize}
            isSelected={piece.id === move.pieceId}
            isOwnPiece={ownPieceIds.includes(piece.id)}
            onClick={onPieceClick(piece.id)}
          />
        );
      })}

      {move.pieceId && move.stationNumber ? (
        <TicketSelector onTicketSelect={onTicketSelect} />
      ) : null}
    </div>
  );
};

export default React.memo(Gameboard);
