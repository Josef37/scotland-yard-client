import * as React from "react";
import { TicketType, ticketColors } from "../constants";

export interface TicketHistoryProps {
  ticketHistory: Array<TicketType>;
}

const TicketHistory: React.SFC<TicketHistoryProps> = ({ ticketHistory }) => {
  const reversedHistory = ticketHistory.slice().reverse();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        maxHeight: "5rem",
        width: "100%",
        overflowY: "scroll"
      }}
    >
      {reversedHistory.map((ticketType, index) => (
        <span
          key={ticketHistory.length - index}
          style={{
            ...ticketColors.get(ticketType),
            padding: ".5rem 1rem",
            margin: ".5rem",
            display: "inline-flex",
            alignItems: "center",
            borderRadius: ".5rem"
          }}
        >
          <span style={{ marginRight: ".5rem", fontSize: "1.2rem" }}>
            {ticketHistory.length - index}
          </span>
          <b style={{ fontSize: "1.5em" }}>{ticketType}</b>
        </span>
      ))}
    </div>
  );
};

export default React.memo(TicketHistory);
