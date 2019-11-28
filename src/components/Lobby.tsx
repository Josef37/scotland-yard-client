import * as React from "react";

export interface LobbyProps {
  players: { playing: Array<string>; searching: Array<string> };
}

const Lobby: React.SFC<LobbyProps> = ({ players }) => {
  const { playing, searching } = players;
  return (
    <React.Fragment>
      <div>
        <h3>Playing</h3>
        {playing.map(name => (
          <p key={name}>{name}</p>
        ))}
      </div>
      <hr />
      <div>
        <h3>Searching</h3>
        {searching.map(name => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Lobby;
