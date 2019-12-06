import * as React from "react";
import { Station, Connection } from "../reducers/staticGameboard";
import { BuildMode } from "../reducers/builder";
import CloseButton from "./CloseButton";
import BuildModeController from "./BuildModeController";
import Gameboard from "./Gameboard";
import { Piece } from "../reducers/dynamicGameboard";
import { translateStations } from "../selectors/gameboard";
import { useWindowSize } from "../utils/useWindowSizeHook";

export interface GameboardBuilderProps {
  stations: Array<Station>;
  connections: Array<Connection>;
  startingPositions: { mrX: Array<number>; detective: Array<number> };
  saved: boolean;
  onStationClick: (stationNumber: number) => (event: React.MouseEvent) => void;
  onClick: (x: number, y: number) => void;
  onBuildModeSwitch: (mode: BuildMode) => void;
  onSubmit: () => void;
  onExit: () => void;
}

const GameboardBuilder: React.SFC<GameboardBuilderProps> = ({
  stations,
  connections,
  startingPositions,
  saved,
  onStationClick,
  onClick,
  onBuildModeSwitch,
  onSubmit,
  onExit
}) => {
  const mrXPieces = startingPositions.mrX.map(
    (stationNumber, index): Piece => ({
      id: index,
      stationNumber,
      color: "black",
      tickets: new Map(),
      isMrX: true,
      playerName: "Mr. X",
      isOwn: false
    })
  );
  const detectivePieces = startingPositions.detective.map(
    (stationNumber, index): Piece => ({
      id: index + startingPositions.mrX.length,
      stationNumber,
      color: "blue",
      tickets: new Map(),
      isMrX: false,
      playerName: "Detective",
      isOwn: false
    })
  );
  const pieces = mrXPieces.concat(detectivePieces);

  const [width, height] = useWindowSize();

  stations = translateStations(stations, width, height, {
    top: 0,
    right: width,
    bottom: height,
    left: 0
  });

  return (
    <React.Fragment>
      <Gameboard
        width={width}
        height={height}
        stations={stations}
        connections={connections}
        pieces={pieces}
        move={{}}
        onStationClick={onStationClick}
        onPieceClick={() => () => {}}
        onBoardClick={event => onClick(event.clientX, event.clientY)}
      />
      <BuildModeController
        saved={saved}
        onBuildModeSwitch={onBuildModeSwitch}
        onSubmit={onSubmit}
      />
      <CloseButton onClose={onExit} />
    </React.Fragment>
  );
};

export default GameboardBuilder;
