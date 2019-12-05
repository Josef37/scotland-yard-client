import * as React from "react";
import { connect } from "react-redux";
import TicketDisplayWrapper, {
  TicketDisplayWrapperProps
} from "../components/TicketDisplayWrapper";

const TicketDisplayContainer: React.SFC<TicketDisplayWrapperProps> = props => {
  return <TicketDisplayWrapper {...props} />;
};

export default connect((state: any) => ({
  pieces: state.dynamicGameboard.pieces
}))(TicketDisplayContainer);
