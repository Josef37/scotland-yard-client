import { LOAD_LOBBY, START_SEARCHING, STOP_SEARCHING } from "../constants";
import { Action } from "./ActionInterface";

export interface LobbyData {
  players: {
    pausing: Array<string>;
    searching: Array<string>;
  };
  isSearching: boolean;
}

const initialState = {
  players: {
    pausing: [],
    searching: []
  },
  isSearching: false
};

export const lobby = (state: LobbyData = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_LOBBY:
      return { ...state, ...action.payload };
    case START_SEARCHING:
      return { ...state, isSearching: true };
    case STOP_SEARCHING:
      return { ...state, isSearching: false };
    default:
      return state;
  }
};
