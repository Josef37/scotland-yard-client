import * as React from "react";
import { TicketType } from "../constants";

export interface TicketDisplayProps {
  color: string;
  tickets: Map<TicketType, number>;
  posTop: number;
}

const shiftLeft = -130;

const TicketDisplay: React.SFC<TicketDisplayProps> = ({
  color,
  tickets,
  posTop
}) => {
  const [left, setLeft] = React.useState(shiftLeft);
  return (
    <div
      style={{
        backgroundColor: color,
        position: "absolute",
        left: left,
        top: posTop,
        padding: 10,
        minWidth: 175,
        transition: "left 0.5s ease-out",
        cursor: "default"
      }}
      onMouseEnter={() => setLeft(0)}
      onMouseLeave={() => setLeft(shiftLeft)}
    >
      <table style={{ borderSpacing: 5, marginLeft: "auto" }}>
        {[
          TicketType.Taxi,
          TicketType.Bus,
          TicketType.Underground,
          TicketType.Black,
          TicketType.Double
        ]
          .filter(ticketType => {
            const ticketCount = tickets.get(ticketType);
            return ticketCount !== undefined && Math.abs(ticketCount) < 10 ** 3;
          })
          .map(ticketType => (
            <tr style={{ textAlign: "right" }}>
              <th>{ticketType}</th>
              <td style={{ minWidth: 25 }}>{tickets.get(ticketType)}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default React.memo(TicketDisplay);
