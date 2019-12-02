import * as React from "react";
import { TicketType } from "../constants";

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
      {Object.values(TicketType).map(ticketType => (
        <button onClick={onTicketSelect(ticketType)} key={ticketType}>
          {ticketType}
        </button>
      ))}
    </div>
  );
};

export default React.memo(TicketSelector);
