import * as React from "react";
import { TicketType } from "../constants";
import AnimatedText from "./AnimatedText";

export interface TicketDisplayProps {
  name: string;
  color: string;
  tickets: Map<TicketType, number>;
  shiftLeft: number;
}

const TicketDisplay: React.SFC<TicketDisplayProps> = ({
  color,
  tickets,
  name,
  shiftLeft
}) => {
  const [isUserRequested, setIsUserRequested] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    if (!isUserRequested) {
      const timeout = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
  });
  return (
    <div
      style={{
        backgroundColor: color,
        position: "relative",
        left: visible ? shiftLeft : 0,
        padding: 10,
        marginBottom: 30,
        transition: "left 0.5s ease-out",
        cursor: "default"
      }}
      onMouseEnter={() => {
        setVisible(true);
        setIsUserRequested(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
        setIsUserRequested(true);
      }}
      onClick={() => {
        setVisible(!visible);
        setIsUserRequested(true);
      }}
    >
      <div style={{ fontSize: "1.5em", marginRight: 5 }}>
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
