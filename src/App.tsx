import React from "react";
import Gameboard, { GameboardProps } from "./components/Gameboard";
import { connect } from "react-redux";
import "./App.css";
import { IConnection } from "./reducers";
import {
  clickStation,
  clickConnection,
  clickPiece,
  clickCommit
} from "./actions";

const App: React.SFC<GameboardProps> = props => {
  return <Gameboard {...props} />;
};

const mapStateToProps = (state: any) => ({
  width: window.innerWidth,
  height: window.innerHeight,
  stations: state.gameboard.stations,
  connections: state.gameboard.connections,
  pieces: state.gameboard.pieces
});

const mapDispatchToProps = (dispatch: any) => ({
  onStationClick: (stationNumber: number) => () =>
    dispatch(clickStation(stationNumber)),
  onConnectionClick: (connection: IConnection) => () =>
    dispatch(clickConnection(connection)),
  onPieceClick: (pieceId: number) => () => dispatch(clickPiece(pieceId)),
  onCommitClick: () => dispatch(clickCommit())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
