import * as React from "react";
import PlayerList from "./PlayerList";
import LobbyButton from "./LobbyButton";

export interface LobbyProps {
  players: { pausing: Array<string>; searching: Array<string> };
  isSearching: boolean;
  onSearchChange: () => void;
  startBuilder: () => void;
}

const Lobby: React.SFC<LobbyProps> = ({
  players,
  isSearching,
  onSearchChange,
  startBuilder
}) => {
  return (
    <div style={{ margin: 40, fontSize: "1.5em" }}>
      <PlayerList heading="Pausing" names={players.pausing} />
      <hr style={{ border: "1px solid white", margin: "50px 0" }} />
      <PlayerList heading="Searching" names={players.searching} />
      <LobbyButton
        text={isSearching ? "Stop Searching" : "Start Searching"}
        onClick={onSearchChange}
      />
      <LobbyButton text="Build your own map" onClick={startBuilder} />
    </div>
  );
};

export default React.memo(Lobby);
