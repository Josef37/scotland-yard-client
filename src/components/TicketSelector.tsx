import * as React from "react";
import { TicketType } from "../constants";
import { getEnumEntries } from "../utils/getEnumEntries";

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
      {// How to loop typescript numerical enum
      getEnumEntries(TicketType).map(([ticketName, ticketType]) => (
        <button onClick={onTicketSelect(ticketType)} key={ticketType}>
          {ticketName}
        </button>
      ))}
    </div>
  );
};

export default React.memo(TicketSelector);
