import * as React from "react";
import PlayerList from "./PlayerList";

export interface LobbyProps {
  players: { pausing: Array<string>; searching: Array<string> };
  isSearching: boolean;
  onSearchChange: () => void;
}

const Lobby: React.SFC<LobbyProps> = ({
  players,
  isSearching,
  onSearchChange
}) => {
  const toggleSearchButton = (
    <div
      onClick={onSearchChange}
      style={{
        borderRadius: "0.5rem",
        display: "block",
        padding: "1rem 2rem",
        margin: "4rem 2rem",
        border: "0.15rem solid",
        textTransform: "uppercase",
        fontWeight: "lighter",
        fontSize: "1.2em",
        boxShadow: "0 0 1rem, inset 0 0 0.6rem",
        cursor: "pointer",
        textAlign: "center"
      }}
    >
      {isSearching ? "Stop Searching" : "Start Searching"}
    </div>
  );
  return (
    <div style={{ margin: 40, fontSize: "1.5em" }}>
      <PlayerList heading="Pausing" names={players.pausing} />
      <hr style={{ border: "1px solid white", margin: "50px 0" }} />
      <PlayerList heading="Searching" names={players.searching} />
      {toggleSearchButton}
    </div>
  );
};

export default React.memo(Lobby);
