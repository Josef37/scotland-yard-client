import * as React from "react";
import PlayerList from "./PlayerList";

export interface LobbyProps {
  players: { playing: Array<string>; searching: Array<string> };
}

const Lobby: React.SFC<LobbyProps> = ({ players }) => {
  const { playing, searching } = players;
  return (
    <div style={{ margin: 40, fontSize: "1.5em" }}>
      <PlayerList heading="Playing" names={playing} />
      <hr style={{ border: "1px solid white", margin: "50px 0" }} />
      <PlayerList heading="Searching" names={searching} />
    </div>
  );
};

export default React.memo(Lobby);
