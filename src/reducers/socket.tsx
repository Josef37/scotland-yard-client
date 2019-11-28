import { SET_SOCKET } from "../constants";
import { IAction } from "./gameboard";

export const socket = (state: any = null, action: IAction) => {
  switch (action.type) {
    case SET_SOCKET:
      const socket = action.payload;
      return socket;
    default:
      return state;
  }
};
