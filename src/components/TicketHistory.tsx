import * as React from "react";
import { TicketType, ticketColors } from "./Gameboard";

export interface TicketHistoryProps {
  ticketHistory: Array<TicketType>;
}

const TicketHistory: React.SFC<TicketHistoryProps> = ({ ticketHistory }) => {
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
      {ticketHistory.map((ticketType, index) => (
        <span
          key={index}
          style={{
            ...ticketColors.get(ticketType),
            display: "inline-block",
            padding: "5px 10px",
            margin: 5
          }}
        >
          {`${index + 1}: ${TicketType[ticketType]}`}
        </span>
      ))}
    </div>
  );
};

export default TicketHistory;
