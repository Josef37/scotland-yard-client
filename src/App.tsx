import React from "react";
import { connect } from "react-redux";
import {
  clickPiece,
  clickStation,
  login,
  selectTicket,
  leaveGame,
  toggleSearch
} from "./actions";
import { useWindowSize } from "./utils/useWindowSizeHook";
import Gameboard, { GameboardProps } from "./components/Gameboard";
import { TicketType, START_BUILDER } from "./constants";
import Login, { LoginProps } from "./components/Login";
import Lobby, { LobbyProps } from "./components/Lobby";
import { Location } from "./constants";
import TicketHistory from "./components/TicketHistory";
import CloseButton from "./components/CloseButton";
import TurnIndicator, { TurnIndicatorProps } from "./components/TurnIndicator";
import GameboardBuilder from "./components/GameboardBuilder";
import TicketDisplayContainer from "./components/TicketDisplayContainer";

export interface AppProps {
  location: Location;
  login: LoginProps;
  lobby: LobbyProps;
  gameboard: GameboardProps;
  ticketHistory: Array<TicketType>;
  turn: TurnIndicatorProps;
  leaveGame: () => void;
}

const App: React.SFC<AppProps> = ({
  location,
  login,
  lobby,
  gameboard,
  ticketHistory,
  turn,
  leaveGame
}) => {
  const [width, height] = useWindowSize();
  switch (location) {
    case Location.LOGIN:
      return <Login onSubmitLogin={login.onSubmitLogin} />;
    case Location.LOBBY:
      return <Lobby {...lobby} />;
    case Location.GAME:
      return (
        <React.Fragment>
          <Gameboard {...gameboard} height={height} width={width} />
          <TurnIndicator {...turn} />
          <TicketDisplayContainer pieces={gameboard.pieces} />
          <TicketHistory ticketHistory={ticketHistory} />
          {turn.winner ? <CloseButton onClose={leaveGame} /> : null}
        </React.Fragment>
      );
    case Location.BUILDER:
      return <GameboardBuilder />;
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
  turn: {
    mrXTurn: state.turn.mrXTurn,
    mrXDouble: state.turn.mrXDouble,
    winner: state.turn.winner
  },
  ticketHistory: state.ticketHistory
});

const mapDispatchToProps = (dispatch: any) => ({
  lobby: {
    onSearchChange: () => dispatch(toggleSearch()),
    startBuilder: () => dispatch({ type: START_BUILDER })
  },
  login: {
    onSubmitLogin: (name: string) => dispatch(login(name))
  },
  gameboard: {
    onStationClick: (stationNumber: number) => () =>
      dispatch(clickStation(stationNumber)),
    onPieceClick: (pieceId: number) => () => dispatch(clickPiece(pieceId)),
    onTicketSelect: (ticketType: TicketType) => () =>
      dispatch(selectTicket(ticketType))
  },
  leaveGame: () => dispatch(leaveGame())
});

// merge the nested gameboard property, so dispatch props won't overwrite state props
const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
  return Object.assign(
    {},
    ownProps,
    stateProps,
    dispatchProps,
    {
      gameboard: Object.assign(
        {},
        stateProps.gameboard,
        dispatchProps.gameboard
      )
    },
    { lobby: Object.assign({}, stateProps.lobby, dispatchProps.lobby) }
  );
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
