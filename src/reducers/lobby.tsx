import { LOAD_LOBBY } from "../constants";
import { Action } from "./ActionInterface";

export interface LobbyData {
  players: {
    playing: Array<string>;
    searching: Array<string>;
  };
}

const initialState = {
  players: {
    playing: [],
    searching: []
  }
};

export const lobby = (state: LobbyData = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_LOBBY:
      return action.payload;
    default:
      return state;
  }
};
