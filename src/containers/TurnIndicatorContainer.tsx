import * as React from "react";
import { connect } from "react-redux";
import TurnIndicator, { TurnIndicatorProps } from "../components/TurnIndicator";

const TurnIndicatorContainer: React.SFC<TurnIndicatorProps> = props => {
  return <TurnIndicator {...props} />;
};

export default connect((state: any) => ({
  mrXTurn: state.turn.mrXTurn,
  mrXDouble: state.turn.mrXDouble,
  winner: state.turn.winner
}))(TurnIndicatorContainer);
