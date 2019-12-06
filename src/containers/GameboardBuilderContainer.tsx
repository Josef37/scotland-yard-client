import * as React from "react";
import GameboardBuilder, {
  GameboardBuilderProps
} from "../components/GameboardBuilder";
import { connect } from "react-redux";
import {
  CLICK_STATION_BUILD,
  CREATE_STATION,
  SWITCH_BUILD_MODE,
  EXIT_BUILDER
} from "../constants";
import { BuildMode } from "../reducers/builder";
import { submitGameboard } from "../actions";

const GameboardBuilderContainer: React.SFC<GameboardBuilderProps> = props => {
  return <GameboardBuilder {...props} />;
};

const mapStateToProps = (state: any) => ({
  stations: state.builder.stations,
  connections: state.builder.connections,
  startingPositions: state.builder.startingPositions,
  saved: state.builder.saved
});
const mapDispatchToProps = (dispatch: any) => ({
  onStationClick: (stationNumber: number) => (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch({ type: CLICK_STATION_BUILD, payload: stationNumber });
  },
  onClick: (x: number, y: number) =>
    dispatch({ type: CREATE_STATION, payload: { x, y } }),
  onBuildModeSwitch: (mode: BuildMode) =>
    dispatch({ type: SWITCH_BUILD_MODE, payload: mode }),
  onSubmit: () => dispatch(submitGameboard()),
  onExit: () => dispatch({ type: EXIT_BUILDER })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameboardBuilderContainer);
