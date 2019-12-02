import * as React from "react";

export interface TurnIndicatorProps {
  mrXTurn: boolean;
}

const TurnIndicator: React.SFC<TurnIndicatorProps> = ({ mrXTurn }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        textAlign: "center",
        color: "white",
        width: "100%",
        fontSize: 20
      }}
    >
      {mrXTurn ? "It's Mr. X's turn." : "It's the detectives turn."}
    </div>
  );
};

export default TurnIndicator;
