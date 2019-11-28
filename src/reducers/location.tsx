import { EXIT_GAME, Location, LOGIN, START_GAME } from "../constants";
import { Action } from "./ActionInterface";

export const location = (state = Location.LOGIN, action: Action) => {
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
