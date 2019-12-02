import * as React from "react";
import { TicketType } from "../constants";
import AnimatedText from "./AnimatedText";

export interface TicketDisplayProps {
  name: string;
  color: string;
  tickets: Map<TicketType, number>;
  posTop: number;
}

const TicketDisplay: React.SFC<TicketDisplayProps> = ({
  color,
  tickets,
  posTop,
  name
}) => {
  const [hover, setHover] = React.useState(false);
  const [left, setLeft] = React.useState(0);
  React.useEffect(() => {
    if (!hover) {
      const timeout = setTimeout(() => setLeft(-150), 2000);
      return () => clearTimeout(timeout);
    }
  });
  return (
    <div
      style={{
        backgroundColor: color,
        position: "absolute",
        left: left,
        top: posTop,
        padding: 10,
        width: 200,
        transition: "left 0.5s ease-out",
        cursor: "default"
      }}
      onMouseEnter={() => {
        setHover(true);
        setLeft(0);
      }}
      onMouseLeave={() => {
        setHover(false);
        setLeft(-150);
      }}
    >
      <div style={{ textAlign: "right", fontSize: "1.5em", height: "1.5em" }}>
        <AnimatedText text={name} />
      </div>
      <table style={{ borderSpacing: 5, marginLeft: "auto" }}>
        <tbody>
          {[
            TicketType.Taxi,
            TicketType.Bus,
            TicketType.Underground,
            TicketType.Black,
            TicketType.Double
          ]
            .filter(ticketType => {
              const ticketCount = tickets.get(ticketType);
              return (
                ticketCount !== undefined && Math.abs(ticketCount) < 10 ** 3
              );
            })
            .map(ticketType => (
              <tr style={{ textAlign: "right" }} key={ticketType}>
                <th>{ticketType}</th>
                <td style={{ minWidth: 25 }}>{tickets.get(ticketType)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TicketDisplay);
