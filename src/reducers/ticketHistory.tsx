import { Action } from "./ActionInterface";
import { TicketType, EXIT_GAME } from "../constants";
import { MR_X_TICKET } from "../constants";

const initialState: Array<TicketType> = [];

export const ticketHistory = (state = initialState, action: Action) => {
  switch (action.type) {
    case MR_X_TICKET:
      const ticket = action.payload;
      return state.concat(ticket);
    case EXIT_GAME:
      return initialState;
    default:
      return state;
  }
};
