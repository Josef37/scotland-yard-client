import React from "react";
import { connect } from "react-redux";
import { clickPiece, clickStation, login } from "./actions";
import { useWindowSize } from "./utils/useWindowSizeHook";
import Gameboard, { GameboardProps } from "./components/Gameboard";
import Login, { LoginProps } from "./components/Login";
import Lobby, { LobbyProps } from "./components/Lobby";
import { Location } from "./constants";

export interface AppProps {
  location: Location;
  login: LoginProps;
  lobby: LobbyProps;
  gameboard: GameboardProps;
}

const App: React.SFC<AppProps> = ({ location, login, lobby, gameboard }) => {
  const [width, height] = useWindowSize();
  switch (location) {
    case Location.LOGIN:
      return <Login onSubmitLogin={login.onSubmitLogin} />;
    case Location.LOBBY:
      return <Lobby players={lobby.players} />;
    case Location.GAME:
      return <Gameboard {...gameboard} height={height} width={width} />;
    default:
      console.log("Invalid location");
      return <p>Invalid location, please reload</p>;
  }
};

const mapStateToProps = (state: any) => ({
  location: state.location,
  lobby: state.lobby,
  gameboard: {
    width: window.innerWidth,
    height: window.innerHeight,
    stations: state.gameboard.stations,
    connections: state.gameboard.connections,
    pieces: state.gameboard.pieces,
    selectedPieceId: state.gameboard.selectedPieceId,
    ownPieceIds: state.gameboard.ownPieceIds,
    players: state.lobby
  }
});

const mapDispatchToProps = (dispatch: any) => ({
  login: {
    onSubmitLogin: (name: string) => dispatch(login(name))
  },
  gameboard: {
    onStationClick: (stationNumber: number) => () =>
      dispatch(clickStation(stationNumber)),
    onPieceClick: (pieceId: number) => () => dispatch(clickPiece(pieceId))
  }
});

// merge the nested gameboard property, so dispatch props won't overwrite state props
const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    gameboard: Object.assign({}, stateProps.gameboard, dispatchProps.gameboard)
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
