import * as React from "react";
import Station from "./Station";
import Connection from "./Connection";
import Piece from "./Piece";
import {
  Station as StationInterface,
  Connection as ConnectionInterface
} from "../reducers/staticGameboard";
import { Move, Piece as PieceInterface } from "../reducers/dynamicGameboard";

export interface GameboardProps {
  width: number;
  height: number;
  stations: Array<StationInterface>;
  connections: Array<ConnectionInterface>;
  pieces: Array<PieceInterface>;
  move: Move;
  onStationClick: (stationNumber: number) => () => void;
  onPieceClick: (pieceId: number) => () => void;
}

const Gameboard: React.SFC<GameboardProps> = ({
  width,
  height,
  stations,
  connections,
  pieces,
  move,
  onStationClick,
  onPieceClick
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

  const stationSize = (width + height) / 2 / (Math.sqrt(stations.length) * 4);
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
        position: "relative"
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
            stationSize={stationSize}
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
            isOwnPiece={piece.isOwn}
            onClick={onPieceClick(piece.id)}
          />
        );
      })}
    </div>
  );
};

export default React.memo(Gameboard);
