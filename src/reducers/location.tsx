import { START_GAME, Location, EXIT_GAME, LOGIN } from "../constants";
import { IAction } from "./gameboard";

export const location = (state = Location.LOGIN, action: IAction) => {
  switch (action.type) {
    case START_GAME:
      return Location.GAME;
    case EXIT_GAME:
      return Location.LOBBY;
    case LOGIN:
      return Location.LOBBY;
    default:
      return state;
  }
};
