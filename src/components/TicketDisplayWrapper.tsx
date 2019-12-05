import * as React from "react";
import { Piece } from "../reducers/dynamicGameboard";
import TicketDisplay from "./TicketDisplay";

export interface TicketDisplayWrapperProps {
  pieces: Array<Piece>;
}

const TicketDisplayWrapper: React.SFC<TicketDisplayWrapperProps> = ({
  pieces
}) => {
  const shiftLeft = 160;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: -shiftLeft,
        width: 200,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      {pieces.map(piece => (
        <TicketDisplay
          name={piece.playerName + (piece.isMrX ? " (Mr. X)" : "")}
          key={piece.id}
          color={piece.color}
          tickets={piece.tickets}
          shiftLeft={shiftLeft}
        />
      ))}
    </div>
  );
};

export default TicketDisplayWrapper;
