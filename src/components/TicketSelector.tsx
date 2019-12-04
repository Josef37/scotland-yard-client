import * as React from "react";
import { TicketType, ticketColors } from "../constants";

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
        backgroundColor: "#555e",
        display: "flex",
        justifyContent: "space-evenly"
      }}
    >
      {Object.values(TicketType).map(ticketType => (
        <span
          onClick={onTicketSelect(ticketType)}
          key={ticketType}
          style={{
            ...ticketColors.get(ticketType),
            cursor: "pointer",
            padding: ".5rem 1rem",
            margin: ".5rem 1rem",
            display: "inline-block",
            borderRadius: ".5rem",
            fontSize: "1.5em",
            border: ".15rem solid",
            fontWeight: "bold"
          }}
        >
          {ticketType}
        </span>
      ))}
    </div>
  );
};

export default React.memo(TicketSelector);
