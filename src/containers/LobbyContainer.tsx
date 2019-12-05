import * as React from "react";
import Lobby, { LobbyProps } from "../components/Lobby";
import { connect } from "react-redux";
import { toggleSearch } from "../actions";
import { START_BUILDER } from "../constants";

const LobbyContainer: React.SFC<LobbyProps> = props => {
  return <Lobby {...props} />;
};

export default connect(
  (state: any) => ({
    players: state.lobby.players,
    isSearching: state.lobby.isSearching
  }),
  (dispatch: any) => ({
    onSearchChange: () => dispatch(toggleSearch()),
    startBuilder: () => dispatch({ type: START_BUILDER })
  })
)(LobbyContainer);
