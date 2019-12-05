import * as React from "react";
import { IStation, IConnection } from "../reducers/gameboard";
import {
  CLICK_STATION_BUILD,
  CREATE_STATION,
  SWITCH_BUILD_MODE,
  EXIT_BUILDER
} from "../constants";
import { BuildMode } from "../reducers/builder";
import { connect } from "react-redux";
import CloseButton from "./CloseButton";
import BuildModeController from "./BuildModeController";

export interface GameboardBuilderProps {
  stations: Array<IStation>;
  connections: Array<IConnection>;
  startingPositions: { mrX: Array<number>; detective: Array<number> };
  onStationClick: (stationNumber: number) => void;
  onClick: (x: number, y: number) => void;
  onBuildModeSwitch: (mode: BuildMode) => void;
  onSubmit: () => void;
  onExit: () => void;
}

const GameboardBuilder: React.SFC<GameboardBuilderProps> = ({
  stations,
  connections,
  startingPositions,
  onStationClick,
  onClick,
  onBuildModeSwitch,
  onSubmit,
  onExit
}) => {
  return (
    <React.Fragment>
      <BuildModeController
        onBuildModeSwitch={onBuildModeSwitch}
        onSubmit={onSubmit}
      />
      <CloseButton onClose={onExit} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  stations: state.builder.stations,
  connections: state.builder.connections,
  startingPositions: state.builder.startingPositions
});
const mapDispatchToProps = (dispatch: any) => ({
  onStationClick: (stationNumber: number) =>
    dispatch({ type: CLICK_STATION_BUILD, payload: stationNumber }),
  onClick: (x: number, y: number) =>
    dispatch({ type: CREATE_STATION, payload: { x, y } }),
  onBuildModeSwitch: (mode: BuildMode) =>
    dispatch({ type: SWITCH_BUILD_MODE, payload: mode }),
  onSubmit: () => console.log("submit gameboard"),
  onExit: () => dispatch({ type: EXIT_BUILDER })
});

export default connect(mapStateToProps, mapDispatchToProps)(GameboardBuilder);
