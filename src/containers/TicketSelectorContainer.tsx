import * as React from "react";
import { connect } from "react-redux";
import TicketSelector, {
  TicketSelectorProps
} from "../components/TicketSelector";
import { TicketType } from "../constants";
import { selectTicket } from "../actions";
import { Move } from "../reducers/dynamicGameboard";

type TicketSelectorContainerProps = TicketSelectorProps & {
  move: Move;
};

const TicketSelectorContainer: React.SFC<TicketSelectorContainerProps> = ({
  onTicketSelect,
  move
}) => {
  return move.pieceId && move.stationNumber ? (
    <TicketSelector onTicketSelect={onTicketSelect} />
  ) : null;
};

export default connect(
  (state: any) => ({
    move: state.dynamicGameboard.move
  }),
  (dispatch: any) => ({
    onTicketSelect: (ticketType: TicketType) => () =>
      dispatch(selectTicket(ticketType))
  })
)(TicketSelectorContainer);
