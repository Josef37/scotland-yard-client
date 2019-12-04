import * as React from "react";
import { IPiece } from "../reducers/gameboard";
import TicketDisplay from "./TicketDisplay";

export interface TicketDisplayContainerProps {
  pieces: Array<IPiece>;
}

const TicketDisplayContainer: React.SFC<TicketDisplayContainerProps> = ({
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

export default TicketDisplayContainer;
