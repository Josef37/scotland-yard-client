import { Action } from "./ActionInterface";
import { TicketType } from "../components/Gameboard";
import { MR_X_TICKET } from "../constants";

const initialState: Array<TicketType> = [];

export const ticketHistory = (state = initialState, action: Action) => {
  switch (action.type) {
    case MR_X_TICKET:
      const ticket = action.payload;
      return state.concat(ticket);
    default:
      return state;
  }
};
