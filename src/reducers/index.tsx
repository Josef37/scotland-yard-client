import { combineReducers } from "redux";
import { gameboard } from "./gameboard";
import { lobby } from "./lobby";
import { location } from "./location";
import { socket } from "./socket";
import { ticketHistory } from "./ticketHistory";
import { turn } from "./turn";

export default combineReducers({
  gameboard,
  lobby,
  location,
  socket,
  ticketHistory,
  turn
});
