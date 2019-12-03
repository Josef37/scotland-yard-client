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
        height: 50,
        width: "100%",
        overflowY: "scroll"
      }}
    >
      {reversedHistory.map((ticketType, index) => (
        <span
          key={ticketHistory.length - index}
          style={{
            ...ticketColors.get(ticketType),
            display: "inline-block",
            padding: "5px 10px",
            margin: 5
          }}
        >
          {`${ticketHistory.length - index}: ${ticketType}`}
        </span>
      ))}
    </div>
  );
};

export default React.memo(TicketHistory);
