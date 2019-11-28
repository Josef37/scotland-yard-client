import * as React from "react";
import { TicketType } from "./Gameboard";

export interface TicketSelectorProps {
  onTicketSelect: (ticketType: TicketType) => () => void;
}

const TicketSelector: React.SFC<TicketSelectorProps> = ({ onTicketSelect }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 15,
        border: "3px solid white",
        borderRadius: 10,
        backgroundColor: "#111b"
      }}
    >
      {Object.keys(TicketType)
        .filter(key => typeof TicketType[key as any] === "number")
        .map(ticketType => (
          <button
            onClick={onTicketSelect(TicketType[ticketType as any] as any)}
          >
            {ticketType}
          </button>
        ))}
    </div>
  );
};

export default TicketSelector;
