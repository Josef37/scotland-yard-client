import * as React from "react";
import Gameboard, { GameboardProps } from "../components/Gameboard";
import { connect } from "react-redux";
import { clickStation, clickPiece } from "../actions";
import { useWindowSize } from "../utils/useWindowSizeHook";
import { translateStations, getBoundingBox } from "../selectors/gameboard";

const GameboardContainer: React.SFC<GameboardProps> = props => {
  const [width, height] = useWindowSize();
  props.stations = translateStations(
    props.stations,
    width,
    height,
    getBoundingBox(props.stations)
  );
  props = { ...props, width, height };
  return <Gameboard {...props} />;
};

const mapStateToProps = (state: any) => ({
  width: window.innerWidth,
  height: window.innerHeight,
  stations: state.staticGameboard.stations,
  connections: state.staticGameboard.connections,
  pieces: state.dynamicGameboard.pieces,
  move: state.dynamicGameboard.move,
  players: state.lobby
});

const mapDispatchToProps = (dispatch: any) => ({
  onStationClick: (stationNumber: number) => () =>
    dispatch(clickStation(stationNumber)),
  onPieceClick: (pieceId: number) => () => dispatch(clickPiece(pieceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameboardContainer);
