import { Action } from "./ActionInterface";
import {
  MR_X_TURN,
  MR_X_DOUBLE,
  MR_X_WON,
  DETECTIVES_WON,
  EXIT_GAME
} from "../constants";

const initialState = { mrXTurn: true, mrXDouble: false };

export const turn = (state = initialState, action: Action) => {
  switch (action.type) {
    case MR_X_TURN: {
      return { ...state, mrXTurn: action.payload, mrXDouble: false };
    }
    case MR_X_DOUBLE: {
      return { ...state, mrXDouble: true };
    }
    case MR_X_WON: {
      return { ...state, winner: "mrx" };
    }
    case DETECTIVES_WON: {
      return { ...state, winner: "det" };
    }
    case EXIT_GAME: {
      return initialState;
    }
    default:
      return state;
  }
};
