import * as React from "react";
import { connect } from "react-redux";
import TicketHistory, { TicketHistoryProps } from "../components/TicketHistory";

const TicketHistoryContainer: React.SFC<TicketHistoryProps> = props => {
  return <TicketHistory {...props} />;
};

export default connect((state: any) => ({
  ticketHistory: state.ticketHistory
}))(TicketHistoryContainer);
