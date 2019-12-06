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
  onStationClick: (stationNumber: number) => (event: React.MouseEvent) => void;
  onPieceClick: (pieceId: number) => (event: React.MouseEvent) => void;
  onBoardClick?: (event: React.MouseEvent) => void;
}

const Gameboard: React.SFC<GameboardProps> = ({
  width,
  height,
  stations,
  connections,
  pieces,
  move,
  onStationClick,
  onPieceClick,
  onBoardClick
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

  // const stationSize = (width + height) / 2 / (Math.sqrt(stations.length) * 4);
  const stationSize = Math.sqrt((width * height) / (5 * stations.length));

  return (
    <div
      style={{
        width,
        height,
        position: "relative"
      }}
      onClick={onBoardClick}
    >
      {connections
        .map(connection => {
          let [station1Number, station2Number] = [
            connection.station1Number,
            connection.station2Number
          ].sort((a, b) => a - b);
          let station1 = getStation(station1Number);
          let station2 = getStation(station2Number);
          return { ...connection, station1, station2 };
        })
        .filter(({ station1, station2 }) => station1 && station2)
        .map(connection => {
          let { x: x1, y: y1 } = connection.station1!; // See filter
          let { x: x2, y: y2 } = connection.station2!;
          return (
            <Connection
              key={[
                connection.station1Number,
                connection.station2Number,
                connection.type
              ].join("-")}
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
