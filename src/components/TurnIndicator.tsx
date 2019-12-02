import * as React from "react";

export interface TurnIndicatorProps {
  mrXTurn: boolean;
  mrXDouble: boolean;
  winner: "mrx" | "det";
}

const TurnIndicator: React.SFC<TurnIndicatorProps> = ({
  mrXTurn,
  mrXDouble,
  winner
}) => {
  let message = "";
  if (winner) {
    message = winner === "mrx" ? "Mr. X won!" : "Detectives won!";
  } else {
    message = mrXTurn ? "It's Mr. X's turn." : "It's the detectives turn.";
    message += mrXDouble ? " He used a double ticket!" : "";
  }

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
      {message}
    </div>
  );
};

export default TurnIndicator;
