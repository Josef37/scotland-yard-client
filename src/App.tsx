import React from "react";
import { connect } from "react-redux";
import { leaveGame } from "./actions";
import { Location } from "./constants";
import CloseButton from "./components/CloseButton";
import GameboardBuilder from "./components/GameboardBuilder";
import GameboardContainer from "./containers/GameboardContainer";
import LoginContainer from "./containers/LoginContainer";
import LobbyContainer from "./containers/LobbyContainer";
import TicketDisplayContainer from "./containers/TicketDisplayContainer";
import TicketHistoryContainer from "./containers/TicketHistoryContainer";
import TurnIndicatorContainer from "./containers/TurnIndicatorContainer";
import TicketSelectorContainer from "./containers/TicketSelectorContainer";

export interface AppProps {
  location: Location;
  hideCloseButton: boolean;
  leaveGame: () => void;
}

const App: React.SFC<AppProps> = ({ location, hideCloseButton, leaveGame }) => {
  switch (location) {
    case Location.LOGIN:
      return <LoginContainer />;
    case Location.LOBBY:
      return <LobbyContainer />;
    case Location.GAME:
      return (
        <React.Fragment>
          <GameboardContainer />
          <TurnIndicatorContainer />
          <TicketDisplayContainer />
          <TicketHistoryContainer />
          <TicketSelectorContainer />
          {hideCloseButton ? null : <CloseButton onClose={leaveGame} />}
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
  hideCloseButton: !state.turn.winner
});

const mapDispatchToProps = (dispatch: any) => ({
  leaveGame: () => dispatch(leaveGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
