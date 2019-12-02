import * as React from "react";

export interface PlayerListProps {
  heading: string;
  names: Array<string>;
}

const PlayerList: React.SFC<PlayerListProps> = ({ heading, names }) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <h3>{heading}</h3>
      {names.map(name => (
        <span key={name} style={{ margin: "10px 20px" }}>
          {name}
        </span>
      ))}
    </div>
  );
};

export default React.memo(PlayerList);
