import { SET_SOCKET } from "../constants";
import { Action } from "./ActionInterface";

export const socket = (state: any = null, action: Action) => {
  switch (action.type) {
    case SET_SOCKET:
      const socket = action.payload;
      return socket;
    default:
      return state;
  }
};
