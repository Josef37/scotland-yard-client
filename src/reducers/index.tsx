import { combineReducers } from "redux";
import { gameboard } from "./gameboard";
import { lobby } from "./lobby";
import { location } from "./location";
import { socket } from "./socket";
import { ticketHistory } from "./ticketHistory";
import { turn } from "./turn";
import { builder } from "./builder";

export default combineReducers({
  gameboard,
  lobby,
  location,
  socket,
  ticketHistory,
  turn,
  builder
});
