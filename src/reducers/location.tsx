import {
  EXIT_GAME,
  Location,
  LOGIN,
  START_GAME,
  EXIT_BUILDER,
  START_BUILDER
} from "../constants";
import { Action } from "./ActionInterface";

export const location = (state = Location.LOGIN, action: Action) => {
  switch (action.type) {
    case START_GAME:
      return Location.GAME;
    case START_BUILDER:
      return Location.BUILDER;
    case EXIT_GAME:
    case EXIT_BUILDER:
      return Location.LOBBY;
    case LOGIN:
      return Location.LOBBY;
    default:
      return state;
  }
};
