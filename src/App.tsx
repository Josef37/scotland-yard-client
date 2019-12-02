import React from "react";
import { connect } from "react-redux";
import { clickPiece, clickStation, login, selectTicket } from "./actions";
import { useWindowSize } from "./utils/useWindowSizeHook";
import Gameboard, { GameboardProps, TicketType } from "./components/Gameboard";
import Login, { LoginProps } from "./components/Login";
import Lobby, { LobbyProps } from "./components/Lobby";
import { Location } from "./constants";
import TicketHistory from "./components/TicketHistory";
import TurnIndicator from "./components/TurnIndicator";

export interface AppProps {
  location: Location;
  login: LoginProps;
  lobby: LobbyProps;
  gameboard: GameboardProps;
  ticketHistory: Array<TicketType>;
  mrXTurn: boolean;
}

const App: React.SFC<AppProps> = ({
  location,
  login,
  lobby,
  gameboard,
  ticketHistory,
  mrXTurn
}) => {
  const [width, height] = useWindowSize();
  switch (location) {
    case Location.LOGIN:
      return <Login onSubmitLogin={login.onSubmitLogin} />;
    case Location.LOBBY:
      return <Lobby players={lobby.players} />;
    case Location.GAME:
      return (
        <div>
          <Gameboard {...gameboard} height={height} width={width} />
          <TurnIndicator mrXTurn={mrXTurn} />
          <TicketHistory ticketHistory={ticketHistory} />
        </div>
      );
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
    move: state.gameboard.move,
    ownPieceIds: state.gameboard.ownPieceIds,
    players: state.lobby
  },
  mrXTurn: state.gameboard.mrXTurn,
  ticketHistory: state.ticketHistory
});

const mapDispatchToProps = (dispatch: any) => ({
  login: {
    onSubmitLogin: (name: string) => dispatch(login(name))
  },
  gameboard: {
    onStationClick: (stationNumber: number) => () =>
      dispatch(clickStation(stationNumber)),
    onPieceClick: (pieceId: number) => () => dispatch(clickPiece(pieceId)),
    onTicketSelect: (ticketType: TicketType) => () =>
      dispatch(selectTicket(ticketType))
  }
});

// merge the nested gameboard property, so dispatch props won't overwrite state props
const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    gameboard: Object.assign({}, stateProps.gameboard, dispatchProps.gameboard)
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
